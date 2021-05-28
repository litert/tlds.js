# LiteRT/TLD

[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org)
[![npm version](https://img.shields.io/npm/v/@litert/tlds.svg?colorB=brightgreen)](https://www.npmjs.com/package/@litert/tlds "Stable Version")
[![License](https://img.shields.io/npm/l/@litert/tlds.svg?maxAge=2592000?style=plastic)](https://github.com/litert/tlds/blob/master/LICENSE)
[![node](https://img.shields.io/node/v/@litert/tlds.svg?colorB=brightgreen)](https://nodejs.org/dist/latest-v8.x/)
[![GitHub issues](https://img.shields.io/github/issues/litert/tlds.js.svg)](https://github.com/litert/tlds.js/issues)
[![GitHub Releases](https://img.shields.io/github/release/litert/tlds.js.svg)](https://github.com/litert/tlds.js/releases "Stable Release")

A simple TLD (Top Level Domain) helper library.

## Installation

Install by NPM:

```sh
npm i @litert/tlds --save
```

## Usage

See [src/examples/demo.ts](./src/examples/demo.ts).

> How to import full TLD list?
>
> 1. Get data from https://publicsuffix.org/list/public_suffix_list.dat
> 2. Parse the data into string array (pay attention to some TLD items like `*.xxx.xx`)
> 3. Now import them into your `TLDManager`.

## Requirement

- TypeScript v3.2.2 (or newer)
- Node.js v10.0.0 (or newer)

## Document

### 简体中文版

- Preparing

## License

This library is published under [Apache-2.0](./LICENSE) license.
