import {join} from 'path'

import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {beforeAll, describe, expect, it} from 'vitest'

const exampleProjectDir = path(`examples/node-api`)
const tmpProjectDir = path(`storage/fixtures/node-api`)

describe.skip(`node-api`, () => {
  beforeAll(async () => {
    try {
      await fs.remove(tmpProjectDir)
      await fs.copy(exampleProjectDir, tmpProjectDir)
      await execa(
        `yarn`,
        [`install`, `--registry=http://localhost:4873`],
        {
          cwd: tmpProjectDir,
        },
      )
      await execa(`node`, [`node_modules/.bin/webpack`], {
        cwd: tmpProjectDir,
      })
    } catch (error) {
      throw error
    }
  })

  it(`package.json`, async () => {
    const artifact = (
      await fs.readAsync(join(tmpProjectDir, `package.json`))
    )?.toString()

    expect(artifact).toMatchSnapshot()
  })

  it(`dist/manifest.json`, async () => {
    const artifact = await fs.readAsync(
      join(tmpProjectDir, `dist/manifest.json`),
    )
    expect(artifact?.toString()).toMatchSnapshot()
  })

  it(`dist/app.js`, async () => {
    const artifact = await fs.readAsync(
      join(tmpProjectDir, `dist/js/app.js`),
    )
    expect(artifact?.toString()).toMatchSnapshot()
  })
}, 240000)
