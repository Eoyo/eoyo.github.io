import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHash } from "node:crypto";

function md5(str = "") {
  return createHash("md5").update(str).digest("hex").slice(0, 7);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: (name, fileName) => {
        return name + "_" + md5(fileName);
      },
    },
  },
  build: {
    outDir: "www",
  },
});
