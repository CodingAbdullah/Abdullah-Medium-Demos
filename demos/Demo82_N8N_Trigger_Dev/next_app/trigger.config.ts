import { defineConfig } from "@trigger.dev/sdk";

// Trigger.dev project config - the "project" ref comes from your
// Trigger.dev dashboard (Project Settings > General)
export default defineConfig({
  project: "<your-trigger-project-ref>",
  dirs: ["./trigger"],
  maxDuration: 60,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
    },
  },
});
