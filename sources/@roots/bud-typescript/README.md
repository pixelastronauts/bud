<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-typescript</strong></h1>

<p align="center">
  Adds Typescript support to Bud
</p>

---

## Installation

Install **@roots/bud-typescript** to your project.

Yarn:

```sh
yarn add @roots/bud-typescript --dev
```

npm:

```sh
npm install @roots/bud-typescript --save-dev
```

## Configuration

General ts configuration is handled using a standard **tsconfig.json** in your project root. See [the TypeScript docs on tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for more information.

There is a base tsconfig available for you to extend:

```json title=tsconfig.json
{
  "extends": "@roots/bud-typescript/tsconfig/tsconfig.json"
}
```

If you are authoring your config file in TypeScript you must use the `ts-bud` command instead of `bud`.

## Typechecking

By default TypeScript files will only be compiled to JS during builds.
If you also want typechecking, you can enable it in your bud configuration:

```ts title=bud.config.ts
bud.typescript.typecheck.enable();
```

You may wish to configure typechecking only in production so that your development
experience stays snappy:

```ts title=bud.config.ts
bud.isProduction && bud.typescript.typecheck.enable();
```

## Babel

By default, `@roots/bud-typescript` will pass code to `@roots/bud-babel` for further transforms.

To disable babel and only use tsc:

```ts title=bud.config.ts
bud.typescript.useBabel(false);
```

If you aren't using babel make sure your `tsconfig.json` is set up appropriately.

In particular, React users likely want to set `jsx` to `react`.

## react-refresh

React refresh should work out of the box with zero configuration required.

- If you are using [@roots/bud-react](https://bud.js.org/extensions/bud-react)
  the `react-refresh-typescript` transformer will automatically be used.
- If you are using [@roots/bud-babel](https://bud.js.org/extensions/bud-babel) the babel transformer
  will be used instead of the `react-refresh-typescript`.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-typescript is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and projects within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider [sponsoring Roots](https://github.com/sponsors/roots).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
<a href="https://www.freave.com/">
<img src="https://cdn.roots.io/app/uploads/freave.svg" alt="Freave" width="200" height="150"/>
</a>
