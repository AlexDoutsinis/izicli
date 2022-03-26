export function prepareCommand(program, command) {
  const programRef = program.command(command.name).description(command.description)

  if (!command.argument && !command.options) {
    programRef.action(command.action)
    return
  }

  if (command.argument) {
    programRef.argument(command.argument.name)
  }

  if (command.options) {
    command.options.forEach(option => {
      if (option.isRequired) {
        programRef.requiredOption(option.definition, option.description)
        return
      }
      programRef.option(option.definition, option.description)
    })
  }

  programRef.action(command.action)
}
