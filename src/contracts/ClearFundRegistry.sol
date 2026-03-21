// SPDX-License-Identifier: MIT
pragma solidity >=0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ClearFundRegistry
 * @dev Registry contract for managing ReFi Project submissions on Celo blockchain
 */
contract ClearFundRegistry is AccessControl, ReentrancyGuard {
    string public constant CONTRACT_NAME = "ClearFund Registry";
    string public constant VERSION = "2.3.0";

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    struct ReFiProject {
        string title;
        string description; // About this campaign
        string location;
        string website;
        string twitter;
        string github;
        string impactDescription; // Where your tip goes
        string category; // e.g., "ReFi Project"
        string contactEmail; // New field for admin contact purposes
        address submitter;
        string logoCID;
        string bannerCID; // Compulsory banner image
        bool active;
    }

    // Storage
    mapping(uint256 => ReFiProject) private projects;
    uint256[] private projectIds;
    uint256 private nextProjectId;

    // Submitter restrictions
    mapping(address => uint256) public submitterProjectCount;
    mapping(address => uint256) public lastSubmissionTime;

    // Configuration
    uint256 public constant MAX_PROJECTS_PER_SUBMITTER = 10;
    uint256 public constant MIN_SUBMISSION_INTERVAL = 1 hours;
    uint256 public submissionFee = 0.05 ether; // 0.05 CELO

    // Events
    event ProjectSubmitted(
        uint256 indexed projectId,
        address indexed submitter,
        string title,
        string location,
        string category
    );

    event ProjectUpdated(
        uint256 indexed projectId,
        address indexed updater,
        string newTitle,
        string newLocation
    );

    event ProjectDeactivated(
        uint256 indexed projectId,
        address indexed deactivatedBy,
        string reason
    );

    event ProjectReactivated(
        uint256 indexed projectId,
        address indexed reactivatedBy
    );

    event FeeUpdated(uint256 newFee);
    event FeesWithdrawn(address indexed admin, uint256 amount);

    // Custom Errors
    error InvalidProjectId(uint256 projectId);
    error EmptyField(string field);
    error UnauthorizedSubmitter(address submitter);
    error ProjectLimitExceeded(
        address submitter,
        uint256 currentCount,
        uint256 maxAllowed
    );
    error SubmissionTooFrequent(address submitter, uint256 timeRemaining);
    error ProjectNotActive(uint256 projectId);
    error ProjectAlreadyActive(uint256 projectId);
    error IncorrectFee(uint256 expected, uint256 provided);
    error TransferFailed();

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MODERATOR_ROLE, msg.sender);
        nextProjectId = 1;
    }

    /**
     * @dev Submit a new ReFi Project proposal with extended details
     * @param textInfo Array of strings [title, description, location, website, twitter, github, impactDescription, category, contactEmail]
     * @param assets Array of strings [logoCID, bannerCID]
     */
    function submitProject(
        string[9] calldata textInfo,
        string[2] calldata assets
    ) external payable nonReentrant returns (uint256) {
        if (msg.value != submissionFee)
            revert IncorrectFee(submissionFee, msg.value);

        if (bytes(textInfo[0]).length == 0) revert EmptyField("title");
        if (bytes(textInfo[2]).length == 0) revert EmptyField("location");
        if (bytes(textInfo[7]).length == 0) revert EmptyField("category");
        if (bytes(textInfo[8]).length == 0) revert EmptyField("contactEmail");
        if (bytes(assets[0]).length == 0) revert EmptyField("logoCID");
        if (bytes(assets[1]).length == 0) revert EmptyField("bannerCID");

        if (submitterProjectCount[msg.sender] >= MAX_PROJECTS_PER_SUBMITTER) {
            revert ProjectLimitExceeded(
                msg.sender,
                submitterProjectCount[msg.sender],
                MAX_PROJECTS_PER_SUBMITTER
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

        uint256 projectId = nextProjectId++;

        projects[projectId] = ReFiProject({
            title: textInfo[0],
            description: textInfo[1],
            location: textInfo[2],
            website: textInfo[3],
            twitter: textInfo[4],
            github: textInfo[5],
            impactDescription: textInfo[6],
            category: textInfo[7],
            contactEmail: textInfo[8],
            submitter: msg.sender,
            logoCID: assets[0],
            bannerCID: assets[1],
            active: true
        });

        projectIds.push(projectId);
        submitterProjectCount[msg.sender]++;
        lastSubmissionTime[msg.sender] = block.timestamp;

        emit ProjectSubmitted(
            projectId,
            msg.sender,
            textInfo[0],
            textInfo[2],
            textInfo[7]
        );

        return projectId;
    }

    /**
     * @dev Allows admin to withdraw collected submission fees
     */
    function withdrawFees() external onlyRole(ADMIN_ROLE) nonReentrant {
        uint256 balance = address(this).balance;
        if (balance == 0) revert TransferFailed();
        (bool success, ) = msg.sender.call{value: balance}("");
        if (!success) revert TransferFailed();
        emit FeesWithdrawn(msg.sender, balance);
    }

    /**
     * @dev Allows admin to update the submission fee
     */
    function updateSubmissionFee(
        uint256 _newFee
    ) external onlyRole(ADMIN_ROLE) {
        submissionFee = _newFee;
        emit FeeUpdated(_newFee);
    }

    /**
     * @dev Update project details
     */
    function updateProject(
        uint256 projectId,
        string[9] calldata textInfo,
        string[2] calldata assets
    ) external nonReentrant {
        if (!_projectExists(projectId)) revert InvalidProjectId(projectId);

        ReFiProject storage project = projects[projectId];

        if (
            msg.sender != project.submitter && !hasRole(ADMIN_ROLE, msg.sender)
        ) {
            revert UnauthorizedSubmitter(msg.sender);
        }

        project.title = textInfo[0];
        project.description = textInfo[1];
        project.location = textInfo[2];
        project.website = textInfo[3];
        project.twitter = textInfo[4];
        project.github = textInfo[5];
        project.impactDescription = textInfo[6];
        project.category = textInfo[7];
        project.contactEmail = textInfo[8];
        project.logoCID = assets[0];
        project.bannerCID = assets[1];

        emit ProjectUpdated(projectId, msg.sender, textInfo[0], textInfo[2]);
    }

    function deactivateProject(
        uint256 projectId,
        string calldata reason
    ) external {
        if (!_projectExists(projectId)) revert InvalidProjectId(projectId);
        ReFiProject storage project = projects[projectId];
        if (!project.active) revert ProjectNotActive(projectId);
        if (
            msg.sender != project.submitter &&
            !hasRole(MODERATOR_ROLE, msg.sender)
        ) {
            revert UnauthorizedSubmitter(msg.sender);
        }
        project.active = false;
        if (submitterProjectCount[project.submitter] > 0) {
            submitterProjectCount[project.submitter]--;
        }
        emit ProjectDeactivated(projectId, msg.sender, reason);
    }

    function reactivateProject(
        uint256 projectId
    ) external onlyRole(ADMIN_ROLE) {
        if (!_projectExists(projectId)) revert InvalidProjectId(projectId);
        ReFiProject storage project = projects[projectId];
        if (project.active) revert ProjectAlreadyActive(projectId);
        if (
            submitterProjectCount[project.submitter] >=
            MAX_PROJECTS_PER_SUBMITTER
        ) {
            revert ProjectLimitExceeded(
                project.submitter,
                submitterProjectCount[project.submitter],
                MAX_PROJECTS_PER_SUBMITTER
            );
        }
        project.active = true;
        submitterProjectCount[project.submitter]++;
        emit ProjectReactivated(projectId, msg.sender);
    }

    function getProject(
        uint256 projectId
    ) external view returns (ReFiProject memory) {
        if (!_projectExists(projectId)) revert InvalidProjectId(projectId);
        return projects[projectId];
    }

    function getAllProjectIds() external view returns (uint256[] memory) {
        return projectIds;
    }

    function getActiveProjects(
        uint256 offset,
        uint256 limit
    )
        external
        view
        returns (ReFiProject[] memory projectData, uint256 totalActive)
    {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projects[projectIds[i]].active) {
                activeCount++;
            }
        }
        totalActive = activeCount;
        if (offset >= activeCount) return (new ReFiProject[](0), totalActive);
        uint256[] memory activeIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projects[projectIds[i]].active) {
                activeIds[index] = projectIds[i];
                index++;
            }
        }
        uint256 end = offset + limit;
        if (end > activeCount) end = activeCount;
        projectData = new ReFiProject[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            projectData[i - offset] = projects[activeIds[i]];
        }
        return (projectData, totalActive);
    }

    function getProjectsBySubmitter(
        address submitter
    ) external view returns (ReFiProject[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projects[projectIds[i]].submitter == submitter) count++;
        }
        ReFiProject[] memory result = new ReFiProject[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projects[projectIds[i]].submitter == submitter) {
                result[index] = projects[projectIds[i]];
                index++;
            }
        }
        return result;
    }

    function getTotalProjectCount() external view returns (uint256) {
        return projectIds.length;
    }

    function _projectExists(uint256 projectId) internal view returns (bool) {
        return projectId > 0 && projectId < nextProjectId;
    }
}
