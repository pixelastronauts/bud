import Form from 'enquirer/lib/prompts/form.js'

import type CreateCommand from '../commands/create.js'

export default (command: CreateCommand) =>
  new Form({
    message: `Provide project details`,
    choices: [
      {
        name: `name`,
        message: `Project name`,
        initial: command.name,
      },
      {
        name: `description`,
        message: `Project description`,
        initial: command.description,
      },
      {
        name: `username`,
        message: `Github user name`,
        initial: command.username,
      },
      {
        name: `license`,
        message: `Project license`,
        initial: command.license,
      },
    ],
  })