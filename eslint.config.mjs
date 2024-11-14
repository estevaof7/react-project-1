import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,

  {
    rules: {
      "no-undef": "off", //coloquei isso porque estava dando problema com alguns métodos do jest
      "no-extra-boolean-cast": "off" //para eu poder usar por exemplo !!variavel
    }
  },

  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
];
