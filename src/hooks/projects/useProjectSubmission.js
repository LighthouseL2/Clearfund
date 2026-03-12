"use client";

import { useState } from "react";
import { useContractWrite } from "@/hooks/web3/useContract";
import { useWallet } from "@/hooks/web3/useWallet";
import {
  validateGrantTitle,
  validateGrantUrl,
  validateGrantLimits,
} from "@/lib/services/validation.service";

/**
 * Handles ReFi Project submission logic
 * Updated for V2.3 (Deadline Removed)
 */
export function useProjectSubmission() {
  const { address, isConnected } = useWallet();
  const { execute, isPending, isConfirming, isConfirmed, error, isSwitching, hash, receipt } =
    useContractWrite();
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Submit a project to the contract
   * @param {Object} formData - Form text fields
   * @param {string[]} assets - [logoCID, bannerCID]
   * @param {Object} limits - Submission limits
   */
  const submitProject = async (formData, assets, limits) => {
    setValidationErrors({});
    const errors = {};

    // Basic Validation
    const titleValidation = validateGrantTitle(formData.title);
    if (!titleValidation.valid) errors.title = titleValidation.error;

    const urlValidation = validateGrantUrl(formData.url);
    if (!urlValidation.valid) errors.url = urlValidation.error;

    if (!formData.location) errors.location = "Location is required";
    if (!formData.description) errors.description = "Project description is required";

    if (!assets || assets.length < 2 || !assets[1]) {
      throw new Error("Banner image is required.");
    }

    const limitsValidation = validateGrantLimits(
      limits.grantCount,
      limits.maxGrants,
      limits.lastSubmission,
      limits.minInterval
    );
    if (!limitsValidation.valid) errors.limits = limitsValidation.error;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      throw new Error("Validation failed");
    }

    // textInfo array for V2.3 contract:
    // [title, description, location, website, twitter, github, impactDescription, category]
    const textInfo = [
      formData.title || "",
      formData.description || "",
      formData.location || "",
      formData.url || "",
      formData.twitter || "",
      formData.github || "",
      formData.impactDescription || "",
      formData.category || "REFI_PROJECT"
    ];

    // Execute contract call to submitProject(string[8], string[2])
    await execute("submitProject", [
      textInfo,
      assets, // [logoCID, bannerCID]
    ]);
  };

  return {
    submitProject,
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
