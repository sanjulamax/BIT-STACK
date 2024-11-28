"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
  // Get the Measurement ID from environment variables
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only render if we have a measurement ID
  if (!measurementId) {
    console.warn("Google Analytics Measurement ID is not defined");
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
}
