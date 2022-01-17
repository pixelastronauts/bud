---
id: bud-framework.extension.module.mixin
title: mixin property
sidebar_label: mixin property
hide_title: true
sidebar: "api"
slug: mixin
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

## Extension.Module.mixin property

Objects to bind to the framework. May be expressed as an object literal or a factory function.

Signature:

```typescript
mixin?: (app: Framework) => Promise<Record<string, any>>;
```

## Remarks

You might also use to accomplish the same thing.

If expressed as a factory function, the function will be called with the [Framework](/api/bud-framework/framework) as the first parameter.