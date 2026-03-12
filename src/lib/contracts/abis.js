/**
 * Contract ABIs - Minimal ABI exports for ClearFundRegistry
 * Updated for V2.3 (Deadline Removed)
 */

export const CLEARFUND_REGISTRY_ABI = [
  // Write functions
  {
    inputs: [
      { name: "textInfo", type: "string[8]", internalType: "string[8]" },
      { name: "assets", type: "string[2]", internalType: "string[2]" }
    ],
    name: "submitProject",
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "projectId", type: "uint256", internalType: "uint256" },
      { name: "textInfo", type: "string[8]", internalType: "string[8]" },
      { name: "assets", type: "string[2]", internalType: "string[2]" }
    ],
    name: "updateProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "projectId", type: "uint256", internalType: "uint256" },
      { name: "reason", type: "string", internalType: "string" }
    ],
    name: "deactivateProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "projectId", type: "uint256", internalType: "uint256" }],
    name: "reactivateProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },

  // Read functions
  {
    inputs: [{ name: "", type: "address", internalType: "address" }],
    name: "submitterProjectCount",
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
    name: "MAX_PROJECTS_PER_SUBMITTER",
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
    inputs: [{ name: "projectId", type: "uint256", internalType: "uint256" }],
    name: "getProject",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "description", type: "string", internalType: "string" },
          { name: "location", type: "string", internalType: "string" },
          { name: "website", type: "string", internalType: "string" },
          { name: "twitter", type: "string", internalType: "string" },
          { name: "github", type: "string", internalType: "string" },
          { name: "impactDescription", type: "string", internalType: "string" },
          { name: "category", type: "string", internalType: "string" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "logoCID", type: "string", internalType: "string" },
          { name: "bannerCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "",
        type: "tuple",
        internalType: "struct ClearFundRegistry.ReFiProject"
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
    name: "getActiveProjects",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "description", type: "string", internalType: "string" },
          { name: "location", type: "string", internalType: "string" },
          { name: "website", type: "string", internalType: "string" },
          { name: "twitter", type: "string", internalType: "string" },
          { name: "github", type: "string", internalType: "string" },
          { name: "impactDescription", type: "string", internalType: "string" },
          { name: "category", type: "string", internalType: "string" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "logoCID", type: "string", internalType: "string" },
          { name: "bannerCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "projectData",
        type: "tuple[]",
        internalType: "struct ClearFundRegistry.ReFiProject[]"
      },
      { name: "totalActive", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "submitter", type: "address", internalType: "address" }],
    name: "getProjectsBySubmitter",
    outputs: [
      {
        components: [
          { name: "title", type: "string", internalType: "string" },
          { name: "description", type: "string", internalType: "string" },
          { name: "location", type: "string", internalType: "string" },
          { name: "website", type: "string", internalType: "string" },
          { name: "twitter", type: "string", internalType: "string" },
          { name: "github", type: "string", internalType: "string" },
          { name: "impactDescription", type: "string", internalType: "string" },
          { name: "category", type: "string", internalType: "string" },
          { name: "submitter", type: "address", internalType: "address" },
          { name: "logoCID", type: "string", internalType: "string" },
          { name: "bannerCID", type: "string", internalType: "string" },
          { name: "active", type: "bool", internalType: "bool" }
        ],
        name: "",
        type: "tuple[]",
        internalType: "struct ClearFundRegistry.ReFiProject[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },

  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "projectId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "submitter", type: "address", internalType: "address" },
      { indexed: false, name: "title", type: "string", internalType: "string" },
      { indexed: false, name: "location", type: "string", internalType: "string" },
      { indexed: false, name: "category", type: "string", internalType: "string" }
    ],
    name: "ProjectSubmitted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "projectId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "updater", type: "address", internalType: "address" },
      { indexed: false, name: "newTitle", type: "string", internalType: "string" },
      { indexed: false, name: "newLocation", type: "string", internalType: "string" }
    ],
    name: "ProjectUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "projectId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "deactivatedBy", type: "address", internalType: "address" },
      { indexed: false, name: "reason", type: "string", internalType: "string" }
    ],
    name: "ProjectDeactivated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "projectId", type: "uint256", internalType: "uint256" },
      { indexed: true, name: "reactivatedBy", type: "address", internalType: "address" }
    ],
    name: "ProjectReactivated",
    type: "event"
  }
]
