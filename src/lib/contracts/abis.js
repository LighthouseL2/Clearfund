/**
 * Contract ABIs - Minimal ABI exports for ClearFundRegistry
 * Only includes functions and events we actually use
 */

export const CLEARFUND_REGISTRY_ABI = [
  // Write functions
  {
    inputs: [
      { name: "title", type: "string", internalType: "string" },
      { name: "url", type: "string", internalType: "string" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "imageCID", type: "string", internalType: "string" }
    ],
    name: "submitGrant",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "grantId", type: "uint256", internalType: "uint256" },
      { name: "newTitle", type: "string", internalType: "string" },
      { name: "newUrl", type: "string", internalType: "string" },
      { name: "newDeadline", type: "uint256", internalType: "uint256" },
      { name: "newImageCID", type: "string", internalType: "string" }
    ],
    name: "updateGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "grantId", type: "uint256", internalType: "uint256" },
      { name: "reason", type: "string", internalType: "string" }
    ],
    name: "deactivateGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "grantId", type: "uint256", internalType: "uint256" }],
    name: "reactivateGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },

  // Read functions
  {
    inputs: [{ name: "", type: "address", internalType: "address" }],
    name: "submitterGrantCount",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "address", internalType: "address" }],
    name: "lastSubmissionTime",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_GRANTS_PER_SUBMITTER",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_SUBMISSION_INTERVAL",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_DEADLINE_DURATION",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "grantId", type: "uint256", internalType: "uint256" }],
    name: "getGrant",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "url", type: "string", internalType: "string" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "imageCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "",
        type: "tuple",
        internalType: "struct ClearFundRegistry.Grant"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    name: "getActiveGrants",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "url", type: "string", internalType: "string" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "imageCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "grantData",
        type: "tuple[]",
        internalType: "struct ClearFundRegistry.Grant[]"
      },
      { name: "totalActive", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "submitter", type: "address", internalType: "address" }],
    name: "getGrantsBySubmitter",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "url", type: "string", internalType: "string" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "imageCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "",
        type: "tuple[]",
        internalType: "struct ClearFundRegistry.Grant[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },

  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "grantId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "submitter", type: "address", internalType: "address" },
      { indexed: false, name: "title", type: "string", internalType: "string" },
      { indexed: false, name: "deadline", type: "uint256", internalType: "uint256" }
    ],
    name: "GrantSubmitted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "grantId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "updater", type: "address", internalType: "address" },
      { indexed: false, name: "newTitle", type: "string", internalType: "string" },
      { indexed: false, name: "newDeadline", type: "uint256", internalType: "uint256" }
    ],
    name: "GrantUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "grantId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "deactivatedBy", type: "address", internalType: "address" },
      { indexed: false, name: "reason", type: "string", internalType: "string" }
    ],
    name: "GrantDeactivated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "grantId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "reactivatedBy", type: "address", internalType: "address" }
    ],
    name: "GrantReactivated",
    type: "event"
  }
]

