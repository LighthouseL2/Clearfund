/**
 * Pure validation functions - no dependencies on React or Web3
 * Can be tested independently
 */

/**
 * Validates grant title
 * @param {string} title - Grant title to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateGrantTitle(title) {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' }
  }
  if (title.length > 200) {
    return { valid: false, error: 'Title must be less than 200 characters' }
  }
  return { valid: true }
}

/**
 * Validates grant URL
 * @param {string} url - Grant URL to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateGrantUrl(url) {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'URL is required' }
  }
  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

/**
 * Validates grant limits (count, max, submission interval)
 * @param {number} grantCount - Current number of grants
 * @param {number} maxGrants - Maximum allowed grants
 * @param {number} lastSubmission - Last submission timestamp (Unix)
 * @param {number} minInterval - Minimum interval between submissions in seconds
 * @returns {{valid: boolean, error?: string}}
 */
export function validateGrantLimits(grantCount, maxGrants, lastSubmission, minInterval) {
  if (grantCount >= maxGrants) {
    return {
      valid: false,
      error: `You have reached the maximum of ${maxGrants} grants`
    }
  }

  if (lastSubmission > 0) {
    const timeSinceLastSubmission = Math.floor(Date.now() / 1000) - lastSubmission
    if (timeSinceLastSubmission < minInterval) {
      const hoursRemaining = Math.ceil((minInterval - timeSinceLastSubmission) / 3600)
      return {
        valid: false,
        error: `Please wait ${hoursRemaining} hour(s) before submitting another grant`
      }
    }
  }

  return { valid: true }
}

/**
 * Validates image CID
 * @param {string} imageCID - IPFS CID to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateImageCID(imageCID) {
  if (!imageCID || imageCID.trim().length === 0) {
    return { valid: false, error: 'Image upload is required' }
  }
  // Basic CID validation (starts with Qm for v0 or bafy for v1)
  if (!imageCID.match(/^(Qm|bafy|bafkrei)/)) {
    return { valid: false, error: 'Invalid IPFS CID format' }
  }
  return { valid: true }
}

