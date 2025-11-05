/**
 * Grant-related business logic - pure functions
 * Handles data formatting and transformation
 */

/**
 * Format grant submission data for contract
 * @param {Object} formData - Form data object
 * @param {string} formData.title - Grant title
 * @param {string} formData.url - Grant URL
 * @param {number} deadlineTimestamp - Deadline as Unix timestamp
 * @param {string} imageCID - IPFS CID for image
 * @returns {Object} Formatted submission data
 */
export function formatGrantSubmissionData(formData, deadlineTimestamp, imageCID) {
  return {
    title: formData.title.trim(),
    url: formData.url.trim(),
    deadline: deadlineTimestamp,
    imageCID: imageCID,
  }
}

/**
 * Calculate minimum deadline timestamp
 * @param {number} minDeadlineDuration - Minimum duration in seconds
 * @returns {number} Minimum deadline as Unix timestamp
 */
export function calculateMinDeadline(minDeadlineDuration) {
  return Math.floor((Date.now() + minDeadlineDuration * 1000) / 1000)
}

/**
 * Format time remaining in human-readable format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTimeRemaining(seconds) {
  if (seconds <= 0) return '0 seconds'
  
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (days > 1) return `${days} days`
  if (days === 1) return '1 day'
  if (hours > 1) return `${hours} hours`
  if (hours === 1) return '1 hour'
  if (minutes > 1) return `${minutes} minutes`
  return '1 minute'
}

/**
 * Format deadline date for input field
 * @param {number} minDeadlineDuration - Minimum duration in seconds
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function formatMinDeadlineDate(minDeadlineDuration) {
  const minDate = new Date(Date.now() + minDeadlineDuration * 1000)
  return minDate.toISOString().split('T')[0]
}

/**
 * Convert Unix timestamp to Date object
 * @param {number} timestamp - Unix timestamp
 * @returns {Date} Date object
 */
export function timestampToDate(timestamp) {
  return new Date(timestamp * 1000)
}

/**
 * Convert Date object to Unix timestamp
 * @param {Date|string} date - Date object or date string
 * @returns {number} Unix timestamp
 */
export function dateToTimestamp(date) {
  if (typeof date === 'string') {
    return Math.floor(new Date(date).getTime() / 1000)
  }
  return Math.floor(date.getTime() / 1000)
}

