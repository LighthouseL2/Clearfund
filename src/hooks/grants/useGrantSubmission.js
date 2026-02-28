"use client";

import { useState } from "react";
import { useContractWrite } from "@/hooks/web3/useContract";
import { useWallet } from "@/hooks/web3/useWallet";
import {
  validateGrantTitle,
  validateGrantUrl,
  validateDeadline,
  validateGrantLimits,
  validateImageCID,
} from "@/lib/services/validation.service";
import { formatGrantSubmissionData } from "@/lib/services/grant.service";

/**
 * Handles grant submission logic
 * Single responsibility: manage submission state and validation
 * @returns {Object} Submission state and submit function
 */
export function useGrantSubmission() {
  const { address, isConnected } = useWallet();
  const { execute, isPending, isConfirming, isConfirmed, error, isSwitching, hash, receipt } =
    useContractWrite();
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Submit a grant to the contract
   * @param {Object} formData - Form data
   * @param {string} formData.title - Grant title
   * @param {string} formData.url - Grant URL
   * @param {string} formData.deadline - Deadline date string
   * @param {string} imageCID - IPFS CID for image
   * @param {Object} limits - Grant limits
   * @param {number} limits.grantCount - Current grant count
   * @param {number} limits.maxGrants - Maximum grants
   * @param {number} limits.lastSubmission - Last submission timestamp
   * @param {number} limits.minInterval - Minimum interval in seconds
   * @param {number} limits.minDeadlineDuration - Minimum deadline duration in seconds
   * @returns {Promise<void>}
   */
  const submitGrant = async (formData, imageCID, limits) => {
    // Reset errors
    setValidationErrors({});
    const errors = {};

    // Validate all inputs
    const titleValidation = validateGrantTitle(formData.title);
    if (!titleValidation.valid) {
      errors.title = titleValidation.error;
    }

    const urlValidation = validateGrantUrl(formData.url);
    if (!urlValidation.valid) {
      errors.url = urlValidation.error;
    }

    // const imageValidation = validateImageCID(imageCID);
    // if (!imageValidation.valid) {
    //   errors.image = imageValidation.error;
    // }

    const deadlineValidation = validateDeadline(
      formData.deadline,
      limits.minDeadlineDuration
    );
    if (!deadlineValidation.valid) {
      errors.deadline = deadlineValidation.error;
    }

    const limitsValidation = validateGrantLimits(
      limits.grantCount,
      limits.maxGrants,
      limits.lastSubmission,
      limits.minInterval
    );
    if (!limitsValidation.valid) {
      errors.limits = limitsValidation.error;
    }

    // If any validation failed, set errors and stop
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      throw new Error("Validation failed");
    }

    // Prepare submission data
    const submissionData = formatGrantSubmissionData(
      formData,
      deadlineValidation.deadlineTimestamp,
      imageCID || "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco" // Default image CID
    );

    // Execute contract call
    await execute("submitGrant", [
      submissionData.title,
      submissionData.url,
      BigInt(submissionData.deadline),
      submissionData.imageCID,
    ]);
  };

  return {
    submitGrant,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    validationErrors,
    isConnected,
    isSwitching,
    hash,
    receipt,
  };
}
