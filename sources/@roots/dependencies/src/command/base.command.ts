import {spawn} from 'child_process'

/**
 * Base command
 */
export abstract class Command {
  public constructor(
    public path: string,
    public onMessage?: (message: string) => void,
    public onError?: (...message: unknown[]) => void,
  ) {}

  public async execute(commandArgs: Array<string>): Promise<any> {
    const [bin, ...args] = commandArgs
    return new Promise((resolve, reject) => {
      const message: Array<string> = []

      const command = spawn(bin, args)

      command.stdout.on(`data`, incoming => {
        message.push(incoming.toString())
        this.onMessage && this.onMessage(incoming.toString())
      })

      command.stderr.on(`data`, incoming => {
        message.push(incoming.toString())
        this.onError && this.onError(incoming.toString())
      })

      command.on(`close`, () => resolve(message))
      command.on(`error`, () => reject())
    })
  }

  public normalizeDependencies(
    dependencies: Array<[string, string] | string>,
  ): Array<string> {
    return dependencies
      .reduce((acc: Array<string>, dependency) => {
        if (Array.isArray(dependency)) {
          acc.push(`${dependency[0]}@${dependency[1]}`)
        } else {
          acc.push(dependency)
        }

        return acc
      }, [])
      .filter(Boolean)
  }

  public abstract getLatestVersion(signifier: string): Promise<string>
}
