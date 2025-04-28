# pnpm

## [Workspace](https://pnpm.io/workspaces)

## [Catalogs](https://pnpm.io/catalogs)

## [publishConfig](https://pnpm.io/package_json#publishconfig)

pnpm supports overriding something at publish time via publishConfig.

So we can do that:

```json
{
  "exports": {
    ".": "./src/index.ts"
  },
  "publishConfig": {
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    },
    "main": "./dist/index.js",
    "module": "./dist/index.js",
    "types": "./dist/index.d.ts"
  }
}
```

This package will distribute TypeScript directly during local development, no build is required! you no longer need `watch` or `stub`.
