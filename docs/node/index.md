# Node.js Project Architecture

Okay, it's 2025 and we're getting ready to write a new Node.js library and publish it to npm.

Let's identify some (for Moeru AI) basics:

- **ESM only**
  - Did you know that ESM has been supported since Node.js 12?
  - Restricting to ESM only not only reduces package size, but also gives you the freedom to use new features such as top-level-await.
- **TypeScript**
  - As a library, not including type definitions is unacceptable to me.
  - While other solutions like JSDoc can be used, but DX is extremely poor.
- **pnpm**
  - pnpm provides many of the features that will be used below.
