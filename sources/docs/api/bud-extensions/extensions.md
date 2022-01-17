---
id: bud-extensions.extensions
title: extensions class
sidebar_label: extensions class
hide_title: true
sidebar: "api"
slug: extensions
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

## Extensions class

Extensions Service

Signature:

```typescript
export declare class Extensions extends Service implements Base
```

Extends: Service

Implements: Base

## Remarks

Manages extension controllers

## Properties

| Property                                                | Modifiers | Type    | Description |
| ------------------------------------------------------- | --------- | ------- | ----------- |
| [queue](/api/bud-extensions/extensions/queue)           |           | any\[\] |             |
| [repository](/api/bud-extensions/extensions/repository) |           | {}      |             |

## Methods

| Method                                                                           | Modifiers | Description                                                                                                                |
| -------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| [add(extension)](/api/bud-extensions/extensions/add)                             |           | Add a [Controller](//bud-extensions/controller) to the container                                                           |
| [boot()](/api/bud-extensions/extensions/boot)                                    |           |                                                                                                                            |
| [bootExtension(extension)](/api/bud-extensions/extensions/bootextension)         |           |                                                                                                                            |
| [bootExtensions()](/api/bud-extensions/extensions/bootextensions)                |           |                                                                                                                            |
| [enqueue(extension)](/api/bud-extensions/extensions/enqueue)                     |           | Queue an extension to be added to the container before the build process.                                                  |
| [importExtension(extension)](/api/bud-extensions/extensions/importextension)     |           |                                                                                                                            |
| [injectExtensions()](/api/bud-extensions/extensions/injectextensions)            |           | Inject extension modules                                                                                                   |
| [make()](/api/bud-extensions/extensions/make)                                    |           | Returns an array of plugin instances which have been registered to the container and are set to be used in the compilation |
| [makeController(extension)](/api/bud-extensions/extensions/makecontroller)       |           | Controller factory                                                                                                         |
| [processQueue()](/api/bud-extensions/extensions/processqueue)                    |           |                                                                                                                            |
| [registerExtension(extension)](/api/bud-extensions/extensions/registerextension) |           |                                                                                                                            |
| [registerExtensions()](/api/bud-extensions/extensions/registerextensions)        |           |                                                                                                                            |
| [setController(extension)](/api/bud-extensions/extensions/setcontroller)         |           |                                                                                                                            |