import {factory} from '@repo/test-kit'
import {default as csv} from '@roots/bud-build/rules/csv'
import {describe, expect, it} from 'vitest'

describe(`csv loader`, () => {
  it(`should return a rule`, async () => {
    const bud = await factory()

    const result = await csv({
      filter: bud.hooks.filter,
      isProduction: bud.isProduction,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      path: bud.path,
      resolve: bud.module.resolve,
    })

    const webpackOutput = result.toWebpack()

    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({
        ident: `csv`,
        loader: expect.stringContaining(
          `@roots/bud-support/lib/csv-loader`,
        ),
      }),
    )
  })
})
