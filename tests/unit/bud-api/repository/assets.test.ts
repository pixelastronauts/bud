import {Bud, factory} from '../../../util/bud'

describe('bud.assets', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.assets).toBeInstanceOf(Function)
  })

  it('is configurable by bud.assets', async () => {
    bud.assets([bud.path('src', 'images')])

    await bud.api.processQueue()

    const {options} = bud.extensions.get('copy-webpack-plugin')

    expect(options.get('patterns')).toHaveLength(2)
  })
})