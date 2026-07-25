export function sanitize(input: unknown): string {
  if (typeof input !== "string") return ""
  return input.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, " ").trim()
}
