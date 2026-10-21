import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// This landing page has no ISR/data cache and needs no storage bindings.
export default defineCloudflareConfig();
