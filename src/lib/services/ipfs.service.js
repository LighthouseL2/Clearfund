/**
 * IPFS service - Client-side service that communicates with server API
 * All IPFS operations are handled server-side via API routes
 * This keeps Node.js dependencies on the server where they belong
 */

"use client";

/**
 * Upload file to IPFS via server API
 * @param {File} file - File to upload
 * @param {string} [provider] - IPFS provider ('pinata' or 'nft-storage'), defaults to env var
 * @returns {Promise<string>} IPFS CID
 */
export async function uploadFileToIPFS(file, provider) {
  if (!file) {
    throw new Error("File is required");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    if (provider) {
      formData.append("provider", provider);
    }

    const response = await fetch("/api/ipfs/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload file to IPFS");
    }

    const data = await response.json();
    return data.cid;
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw new Error(`Failed to upload file to IPFS: ${error.message}`);
  }
}

/**
 * Initialize IPFS - No longer needed, handled server-side
 * Kept for backward compatibility but does nothing
 * @deprecated No initialization needed, API handles it server-side
 */
export async function initializeIPFS(config) {
  // No-op - initialization happens server-side
  // Kept for backward compatibility
  return Promise.resolve();
}

/**
 * Get IPFS gateway URL for a CID
 * @param {string} cid - IPFS CID
 * @param {string} [gateway] - Custom gateway URL (optional)
 * @returns {string} Full URL to access the file
 */
export function getIPFSGatewayUrl(cid, gateway) {
  if (!cid) {
    throw new Error("CID is required");
  }

  const gatewayUrl = gateway || "https://gateway.pinata.cloud/ipfs";
  return `${gatewayUrl}/${cid}`;
}

/**
 * Check if IPFS is initialized
 * Always returns true since initialization is handled server-side
 * @returns {boolean}
 */
export function isIPFSInitialized() {
  return true;
}

/**
 * Get current IPFS provider
 * @returns {string|null}
 */
export function getCurrentProvider() {
  return process.env.NEXT_PUBLIC_IPFS_PROVIDER || "pinata";
}
