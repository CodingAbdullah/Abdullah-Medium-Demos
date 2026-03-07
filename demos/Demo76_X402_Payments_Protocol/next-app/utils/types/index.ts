export type Status =
  | "idle"
  | "connecting"
  | "switching"
  | "approving"
  | "paying"
  | "confirming"
  | "verifying"
  | "success"
  | "error";

export type Toast = { text: string; ok: boolean } | null;
