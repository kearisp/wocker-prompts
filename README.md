# @wocker/prompts

###### Prompts for wocker packages

[![npm version](https://img.shields.io/npm/v/@wocker/prompts.svg)](https://www.npmjs.com/package/@wocker/prompts)
[![Publish latest](https://github.com/kearisp/wocker-prompts/actions/workflows/publish-latest.yml/badge.svg?event=release)](https://github.com/kearisp/wocker-prompts/actions/workflows/publish-latest.yml)
[![License](https://img.shields.io/npm/l/@wocker/prompts)](https://github.com/kearisp/wocker-prompts/blob/master/LICENSE)

[![npm total downloads](https://img.shields.io/npm/dt/@wocker/prompts.svg)](https://www.npmjs.com/package/@wocker/prompts)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@wocker/prompts)](https://bundlephobia.com/package/@wocker/prompts)
![Coverage](https://gist.githubusercontent.com/kearisp/f17f46c6332ea3bb043f27b0bddefa9f/raw/coverage-wocker-prompts-latest.svg)


## Installation

```shell
npm i @wocker/prompts
```


## Usage

### promptConfirm

Simple confirmation prompt (yes/no).

```typescript
import {promptConfirm} from "@wocker/prompts";

const confirmed = await promptConfirm({
    message: "Are you sure?",
    default: true
});
```

### promptInput

Generic input prompt for text, passwords, or numbers.

```typescript
import {promptInput} from "@wocker/prompts";

// Text input
const name = await promptInput({
    message: "Enter your name",
    required: true
});

// Password input
const password = await promptInput({
    message: "Enter password",
    type: "password"
});

// Number input
const age = await promptInput({
    message: "Enter your age",
    type: "number",
    min: 18
});
```

### promptSelect

Select one or multiple options from a list.

```typescript
import {promptSelect} from "@wocker/prompts";

// Single select
const color = await promptSelect({
    message: "Choose a color",
    options: [
        {label: "Red", value: "red"},
        {label: "Green", value: "green"},
        {label: "Blue", value: "blue"}
    ]
});

// Multiple select
const tags = await promptSelect({
    message: "Select tags",
    multiple: true,
    options: ["web", "docker", "api"]
});
```

### promptPath

Interactive file system path selection with autocompletion.

```typescript
import {promptPath} from "@wocker/prompts";

const path = await promptPath({
    message: "Select project directory",
    filter: "directory"
});
```

## Validation

All prompts support common validation rules:

- `required`: boolean or custom error message.
- `min` / `max`: for numeric values.
- `minLength` / `maxLength`: for strings.
- `validate`: custom validation function or object with multiple validators.


