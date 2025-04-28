---
title: bundler
---

# Bundler

There are many bundlers out there, so just pick the one that meets your needs.

If I had to recommend one, my recommendation would be [`pkgroll`](https://github.com/privatenumber/pkgroll).

It has the following advantages:

## Zero Configuration

You don't need to configure it, it will be configured automatically based on your package.json.

## Dependency Externalization

Just put the packages you want inline into `devDependencies` instead of `dependencies`.

It will be inline, even including the type (something many other bundlers can't do)

## NOT Opinionated

pkgroll doesn't have the same configuration headaches as unbuild, such as forcing `.cjs`, `.mjs` extensions. (Why am I using the `.mjs` extension when my package is ESM only?)
