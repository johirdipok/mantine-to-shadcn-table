# mantine-to-shadcn-table

[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A migration-focused project to convert **Mantine React Table** components to **ShadCN UI** components, while preserving and reusing the core logic and hooks provided by Mantine.

---

## 🧭 Project Goal

This project is structured in two key phases:

1. **Initial Goal**:  
   Replace Mantine UI components (e.g., tables, buttons, modals) with ShadCN UI components in the existing Mantine React Table setup.

2. **Final Goal**:  
   Refactor and extract the core Mantine React Table **hooks** to make them reusable and framework-agnostic. The goal is to enable using any UI library by plugging in your own components, while still leveraging Mantine's table logic.

---

## 🧰 Tech Stack

- **React** (18+)
- **TypeScript**
- **Vite**
- **Mantine React Table** (logic and state)
- **ShadCN UI** (UI components)

---

## 🏗️ Architecture Overview

- `hooks/`: Reusable Mantine React Table hooks.
- `components/`: ShadCN-based replacements for Mantine components.
- `examples/`: Sample integrations and usage demos.

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/mantine-to-shadcn-table.git
cd mantine-to-shadcn-table
pnpm install     # or yarn / npm
pnpm dev         # start Vite dev server

```

<!--
## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# mantine-to-shadcn-table

-->
