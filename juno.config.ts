import {defineConfig} from "@junobuild/config";
import CONFIG from "@/config";

if (!CONFIG.sateliteId) {
  throw new Error("Satelite ID is required");
}

export default defineConfig({
  satellite: {
    id: CONFIG.sateliteId,
    source: "out"
  }
});
