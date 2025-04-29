# pnpm

## [Workspace](https://pnpm.io/workspaces)

```yaml
# pnpm-workspace.yaml
packages:
  - packages/*
```

## [Catalogs](https://pnpm.io/catalogs)

When you have multiple packages in your workspace that depend on the same library, you can use catalogs to better standardize versions.

```yaml
# pnpm-workspace.yaml
packages:
  - packages/*

catalog:
  react: ^19.1.0

catalogs:
  xsai:
    xsai: ^0.2.0
```

```jsonc
// packages/foo/package.json
{
  "name": "@example/foo",
  "dependencies": {
    "react": "catalog:",
    "xsai": "catalog:xsai"
  }
}
```

### YAML Anchors

Do you remember that `pnpm-workspace.yaml` is YAML?

This means we can use YAML Anchors to manage the same version, like this:

```yaml
# pnpm-workspace.yaml
packages:
  - packages/*

catalog:
  '@xsai/embed': &xsai ^0.2.0
  '@xsai/generate-text': *xsai
  '@xsai/shared': *xsai
  '@xsai/shared-chat': *xsai
```

## [package.json#publishConfig](https://pnpm.io/package_json#publishconfig)

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
    "types": "./dist/index.d.ts"
  }
}
```

This package will distribute TypeScript directly during local development, no build is required! you no longer need `watch` or `stub`.
