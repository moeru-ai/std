# @moeru/tsconfig

> TypeScript Configuration for Moeru AI.

## Usage

```jsonc
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```jsonc
// tsconfig.app.json
{
  "extends": "@moeru/tsconfig",
  "include": ["src"]
}
```

```jsonc
// tsconfig.node.json
{
  "extends": "@moeru/tsconfig/tsconfig.node.json",
  "include": ["*.config.ts", "scripts"]
}
```

## License

[MIT](../../LICENSE.md)
