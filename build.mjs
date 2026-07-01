import * as esbuild from "esbuild";

const shared = {
  entryPoints: ["index.js"],
  bundle: true,
  external: ["react", "react-dom"],
  jsx: "automatic",
  logLevel: "info",
};

await Promise.all([
  esbuild.build({ ...shared, format: "esm",  outfile: "dist/index.js" }),
  esbuild.build({ ...shared, format: "cjs",  outfile: "dist/index.cjs" }),
]);

console.log("Build complete → dist/");
