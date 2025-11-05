// SPDX-License-Identifier: MIT
pragma solidity >=0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ClearFundRegistry
 * @dev Registry contract for managing grant submissions on Celo blockchain
 */
contract ClearFundRegistry is AccessControl, ReentrancyGuard {
    string public constant CONTRACT_NAME = "ClearFund Registry";
    string public constant VERSION = "1.0.0";

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    struct Grant {
        string title;
        string url;
        uint256 deadline; // Unix timestamp
        address submitter;
        string imageCID; // IPFS CID (e.g., bafy...)
        bool active;
    }

    // Storage
    mapping(uint256 => Grant) private grants;
    uint256[] private grantIds;
    uint256 private nextGrantId;

    // Submitter restrictions
    mapping(address => uint256) public submitterGrantCount;
    mapping(address => uint256) public lastSubmissionTime;

    // Configuration
    uint256 public constant MAX_GRANTS_PER_SUBMITTER = 10;
    uint256 public constant MIN_SUBMISSION_INTERVAL = 1 hours;
    uint256 public constant MIN_DEADLINE_DURATION = 7 days;

    // Events
    event GrantSubmitted(
        uint256 indexed grantId,
        address indexed submitter,
        string title,
        uint256 deadline
    );

    event GrantUpdated(
        uint256 indexed grantId,
        address indexed updater,
        string newTitle,
        uint256 newDeadline
    );

    event GrantDeactivated(
        uint256 indexed grantId,
        address indexed deactivatedBy,
        string reason
    );

    event GrantReactivated(
        uint256 indexed grantId,
        address indexed reactivatedBy
    );

    // Custom Errors
    error InvalidGrantId(uint256 grantId);
    error InvalidDeadline(uint256 deadline, uint256 minRequired);
    error EmptyTitle();
    error EmptyUrl();
    error EmptyImageCID();
    error UnauthorizedSubmitter(address submitter);
    error GrantLimitExceeded(
        address submitter,
        uint256 currentCount,
        uint256 maxAllowed
    );
    error SubmissionTooFrequent(address submitter, uint256 timeRemaining);
    error GrantNotActive(uint256 grantId);
    error GrantAlreadyActive(uint256 grantId);
    error DeadlinePassed(uint256 grantId, uint256 currentTime);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MODERATOR_ROLE, msg.sender);
        nextGrantId = 1;
    }

    /**
     * @dev Submit a new grant proposal
     * @param title Grant title
     * @param url Grant details URL
     * @param deadline Grant deadline (Unix timestamp)
     * @param imageCID IPFS CID for grant image
     */
    function submitGrant(
        string calldata title,
        string calldata url,
        uint256 deadline,
        string calldata imageCID
    ) external nonReentrant returns (uint256) {
        if (bytes(title).length == 0) revert EmptyTitle();
        if (bytes(url).length == 0) revert EmptyUrl();
        if (bytes(imageCID).length == 0) revert EmptyImageCID();

        uint256 minDeadline = block.timestamp + MIN_DEADLINE_DURATION;
        if (deadline < minDeadline) {
            revert InvalidDeadline(deadline, minDeadline);
        }

        if (submitterGrantCount[msg.sender] >= MAX_GRANTS_PER_SUBMITTER) {
            revert GrantLimitExceeded(
                msg.sender,
                submitterGrantCount[msg.sender],
                MAX_GRANTS_PER_SUBMITTER
            );
        }

        uint256 timeSinceLastSubmission = block.timestamp -
            lastSubmissionTime[msg.sender];
        if (
            lastSubmissionTime[msg.sender] > 0 &&
            timeSinceLastSubmission < MIN_SUBMISSION_INTERVAL
        ) {
            revert SubmissionTooFrequent(
                msg.sender,
                MIN_SUBMISSION_INTERVAL - timeSinceLastSubmission
            );
        }

        uint256 grantId = nextGrantId++;

        grants[grantId] = Grant({
            title: title,
            url: url,
            deadline: deadline,
            submitter: msg.sender,
            imageCID: imageCID,
            active: true
        });

        grantIds.push(grantId);
        submitterGrantCount[msg.sender]++;
        lastSubmissionTime[msg.sender] = block.timestamp;

        emit GrantSubmitted(grantId, msg.sender, title, deadline);

        return grantId;
    }

    /**
     * @dev Update grant details (only by submitter or admin)
     * @param grantId Grant ID to update
     * @param newTitle New grant title
     * @param newUrl New grant URL
     * @param newDeadline New grant deadline
     * @param newImageCID New IPFS CID
     */
    function updateGrant(
        uint256 grantId,
        string calldata newTitle,
        string calldata newUrl,
        uint256 newDeadline,
        string calldata newImageCID
    ) external nonReentrant {
        if (!_grantExists(grantId)) revert InvalidGrantId(grantId);

        Grant storage grant = grants[grantId];

        if (block.timestamp >= grant.deadline) {
            revert DeadlinePassed(grantId, block.timestamp);
        }

        if (msg.sender != grant.submitter && !hasRole(ADMIN_ROLE, msg.sender)) {
            revert UnauthorizedSubmitter(msg.sender);
        }

        if (bytes(newTitle).length == 0) revert EmptyTitle();
        if (bytes(newUrl).length == 0) revert EmptyUrl();
        if (bytes(newImageCID).length == 0) revert EmptyImageCID();

        uint256 minDeadline = block.timestamp + MIN_DEADLINE_DURATION;
        if (newDeadline < minDeadline) {
            revert InvalidDeadline(newDeadline, minDeadline);
        }

        grant.title = newTitle;
        grant.url = newUrl;
        grant.deadline = newDeadline;
        grant.imageCID = newImageCID;

        emit GrantUpdated(grantId, msg.sender, newTitle, newDeadline);
    }

    /**
     * @dev Deactivate a grant (submitter or moderator)
     * @param grantId Grant ID to deactivate
     * @param reason Reason for deactivation
     */
    function deactivateGrant(uint256 grantId, string calldata reason) external {
        if (!_grantExists(grantId)) revert InvalidGrantId(grantId);

        Grant storage grant = grants[grantId];

        if (!grant.active) revert GrantNotActive(grantId);

        if (
            msg.sender != grant.submitter &&
            !hasRole(MODERATOR_ROLE, msg.sender)
        ) {
            revert UnauthorizedSubmitter(msg.sender);
        }

        grant.active = false;

        // Decrement submitterGrantCount for both submitter and moderator deactivations
        if (submitterGrantCount[grant.submitter] > 0) {
            submitterGrantCount[grant.submitter]--;
        }

        emit GrantDeactivated(grantId, msg.sender, reason);
    }

    /**
     * @dev Reactivate a grant (admin only)
     * @param grantId Grant ID to reactivate
     */
    function reactivateGrant(uint256 grantId) external onlyRole(ADMIN_ROLE) {
        if (!_grantExists(grantId)) revert InvalidGrantId(grantId);

        Grant storage grant = grants[grantId];

        if (grant.active) revert GrantAlreadyActive(grantId);

        if (block.timestamp >= grant.deadline) {
            revert DeadlinePassed(grantId, block.timestamp);
        }

        // Check if reactivating would exceed the grant limit
        if (submitterGrantCount[grant.submitter] >= MAX_GRANTS_PER_SUBMITTER) {
            revert GrantLimitExceeded(
                grant.submitter,
                submitterGrantCount[grant.submitter],
                MAX_GRANTS_PER_SUBMITTER
            );
        }

        grant.active = true;
        submitterGrantCount[grant.submitter]++;

        emit GrantReactivated(grantId, msg.sender);
    }

    /**
     * @dev Get grant details by ID
     * @param grantId Grant ID to query
     * @return Grant struct
     */
    function getGrant(uint256 grantId) external view returns (Grant memory) {
        if (!_grantExists(grantId)) revert InvalidGrantId(grantId);
        return grants[grantId];
    }

    /**
     * @dev Get all grant IDs
     * @return Array of grant IDs
     */
    function getAllGrantIds() external view returns (uint256[] memory) {
        return grantIds;
    }

    /**
     * @dev Get active grants with pagination
     * @param offset Starting index
     * @param limit Number of grants to return
     * @return grantData Array of active grants
     * @return totalActive Total number of active grants
     */
    function getActiveGrants(
        uint256 offset,
        uint256 limit
    ) external view returns (Grant[] memory grantData, uint256 totalActive) {
        // First pass: count active grants
        uint256 activeCount = 0;
        for (uint256 i = 0; i < grantIds.length; i++) {
            if (
                grants[grantIds[i]].active &&
                block.timestamp < grants[grantIds[i]].deadline
            ) {
                activeCount++;
            }
        }

        totalActive = activeCount;

        if (offset >= activeCount) {
            return (new Grant[](0), totalActive);
        }

        // Second pass: collect active grant IDs with correct array size
        uint256[] memory activeIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < grantIds.length; i++) {
            if (
                grants[grantIds[i]].active &&
                block.timestamp < grants[grantIds[i]].deadline
            ) {
                activeIds[index] = grantIds[i];
                index++;
            }
        }

        uint256 end = offset + limit;
        if (end > activeCount) {
            end = activeCount;
        }

        grantData = new Grant[](end - offset);

        for (uint256 i = offset; i < end; i++) {
            grantData[i - offset] = grants[activeIds[i]];
        }

        return (grantData, totalActive);
    }

    /**
     * @dev Get grants by submitter
     * @param submitter Address of the submitter
     * @return Grant[] Array of grants by submitter
     */
    function getGrantsBySubmitter(
        address submitter
    ) external view returns (Grant[] memory) {
        // First pass: count grants by submitter
        uint256 count = 0;
        for (uint256 i = 0; i < grantIds.length; i++) {
            if (grants[grantIds[i]].submitter == submitter) {
                count++;
            }
        }

        // Second pass: collect grant IDs with correct array size
        uint256[] memory submitterGrants = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < grantIds.length; i++) {
            if (grants[grantIds[i]].submitter == submitter) {
                submitterGrants[index] = grantIds[i];
                index++;
            }
        }

        Grant[] memory result = new Grant[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = grants[submitterGrants[i]];
        }

        return result;
    }

    /**
     * @dev Get total number of grants
     * @return Total grant count
     */
    function getTotalGrantCount() external view returns (uint256) {
        return grantIds.length;
    }

    /**
     * @dev Check if grant exists
     * @param grantId Grant ID to check
     * @return Boolean indicating existence
     */
    function _grantExists(uint256 grantId) internal view returns (bool) {
        return grantId > 0 && grantId < nextGrantId;
    }
}
