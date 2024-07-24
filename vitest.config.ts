import { defineConfig } from "vitest/config";
import { VitestExcludeList } from "./src/configs/vitest";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      exclude: [...VitestExcludeList],
    },
    exclude: [...VitestExcludeList],
  },
});
