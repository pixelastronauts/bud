import * as Babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {Bud, factory} from '../../../util/bud'

describe('bud.use', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    bud.extensions.setStore({})

    await bud.use({
      name: 'css-minimizer-webpack-plugin',
      options: {},
    })
    await bud.extensions.processQueue()
  })

  it('is a function', () => {
    expect(bud.use).toBeInstanceOf(Function)
  })

  it('registers an imported extension', async () => {
    await bud.use(Babel)
    await bud.extensions.processQueue()

    expect(bud.extensions.has('@roots/bud-babel'))
  })

  it('registers an inline extension', async () => {
    await bud.use({
      name: 'inline-extension',
    })
    await bud.extensions.processQueue()

    expect(bud.extensions.has('inline-extension'))
  })

  it('registers an anonymous extension', async () => {
    await bud.use({options: {}})
    await bud.extensions.processQueue()

    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers a webpack plugin', async () => {
    await bud.use(new HtmlWebpackPlugin())
    await bud.extensions.processQueue()

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers an inline webpack plugin', async () => {
    await bud.use({apply() {}})
    await bud.extensions.processQueue()

    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers an imported webpack plugin', async () => {
    await bud.use(new HtmlWebpackPlugin())
    await bud.extensions.processQueue()

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers multiple extensions', async () => {
    await bud.use([Babel, new HtmlWebpackPlugin()])
    await bud.extensions.processQueue()

    expect(bud.extensions.has('@roots/bud-babel')).toBe(true)
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('adds an apply plugin to the config', async () => {
    const plugin = {
      name: 'my-plugin',
      apply(compiler) {
        // noop
      },
    }
    await bud.use(plugin)
    await bud.extensions.processQueue()

    expect(bud.extensions.has('my-plugin')).toBe(true)
  })
})