import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"]
  },

  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    rules: {
      "no-undef": "off", //coloquei isso porque estava dando problema com alguns métodos do jest
      "no-extra-boolean-cast": "off", //para eu poder usar por exemplo !!variavel
      "react/react-in-jsx-scope": "off" //para não dar o erro 'React' must be in scope when using JSX
    }
  },

  eslintConfigPrettier,
];
