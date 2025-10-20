import js from "@eslint/js";
import globals from "globals";
import tseslint, { plugin } from "typescript-eslint";
import { defineConfig } from "eslint/config";
import config from "eslint-config-prettier";
import plagin from "eslint-plugin-prettier/recommended";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  config,
  plugin,
]);
