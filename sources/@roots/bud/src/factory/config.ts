import type {Bud} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {isFunction, sortBy} from 'lodash-es'

/**
 * User config parser
 *
 * @public
 */
class Configuration {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {}

  /**
   * Process configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(description: any): Promise<unknown> {
    this.app
      .log(`processing configuration`, description.name)
      .info(description)

    if (description.dynamic) {
      const callback = description.module?.default ?? description.module
      return await callback(this.app)
    } else {
      return await this.processStaticConfiguration(description)
    }
  }

  /**
   * Process static configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processStaticConfiguration(
    description: Record<string, any>,
  ): Promise<unknown> {
    this.app.info(
      `${description.name} is being processed as a static config`,
    )

    return await Promise.all(
      Object.entries(description.module).map(async ([key, value]) => {
        const request = this.app[key]
        if (isFunction(request)) await request(value)
      }),
    )
  }
}

/**
 * Process configurations
 * @public
 */
export const config = async (app: Bud) => {
  const configuration = new Configuration(app)

  const configs = Object.values(app.context.config).filter(({bud}) => bud)

  const getAllMatchingConfigs = (reqType: string, reqLocal: boolean) =>
    sortBy(
      configs
        .filter(({type}) => type === reqType)
        .filter(({local}) => local === reqLocal),
      `name`,
    )

  await Promise.all(
    getAllMatchingConfigs(`base`, false).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(`base`, true).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, false).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, true).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  try {
    await app.hooks
      .fire(`config.after`)
      .then(async () => await app.api.processQueue())
  } catch (err) {
    app.error(err)
  }
}