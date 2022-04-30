import { program } from 'commander'
import { prepareCommand } from '../utils/prepareCommand.js'
import { isEmpty } from '../utils/isEmpty.js'
import { trimString } from '../utils/trimString.js'

export default {
  version(v) {
    program.version(v)
  },
  command,
  parse(argv) {
    program.parse(argv)
  },
}

function command({ name, description }) {
  if (isEmpty(name, description)) throw new Error('Missing required arguments')

  const commandInfo = {
    name,
    description,
  }

  const action = callback => {
    commandInfo.action = callback
    prepareCommand(program, commandInfo)
  }

  return {
    action,
    argument({ name, description, isRequired }) {
      const argName = isRequired ? `<${name}>` : `[${name}]`
      commandInfo.argument = { name: argName, description }

      return {
        action,
      }
    },
    options(opts) {
      const options = opts.map(opt => {
        const fullName = trimString(opt.name.full)
        const shortName = trimString(opt.name.short)
        const description = opt.description
        const acceptMultipleValues = opt.acceptMultipleValues
        const isRequired = opt.isRequired
        const argumentIsRequired = opt.argumentIsRequired
        let definition = !acceptMultipleValues
          ? `-${shortName}, --${fullName} <${fullName}>`
          : `-${shortName}, --${fullName} <${fullName}...>`

        if (!argumentIsRequired) {
          definition = definition.replace(/</g, '[')
          definition = definition.replace(/>/g, ']')
        }

        const option = {
          definition,
          description,
          isRequired,
        }

        return option
      })

      commandInfo.options = options

      return {
        action,
      }
    },
  }
}
