import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`Extensions`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`}, true)
    expect(bud.mode).toBe(`development`)
  })

  it(`[development] bud.extensions.repository options matches snapshot`, () => {
    expect(Object.keys(bud.extensions.repository).sort()).toMatchSnapshot()
  })
})