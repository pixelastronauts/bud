import {Bud, factory} from '../../../util/bud'

describe('bud.publicPath', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it('publicPath: is a function', () => {
    expect(bud.publicPath).toBeInstanceOf(Function)
  })

  it('publicPath: returns the correct default publicPath', () => {
    expect(bud.publicPath()).toEqual('')
    expect(bud.publicPath()).toEqual(
      bud.build.config.output.publicPath,
    )
  })

  it('setPublicPath: is a function', () => {
    expect(bud.setPublicPath).toBeInstanceOf(Function)
  })

  it('setPublicPath: sets publicPath when called', async () => {
    const newPath = '/foo'

    bud.setPublicPath(newPath)
    await bud.build.make()

    expect(bud.build.config.output.publicPath).toEqual(newPath)
  })
})