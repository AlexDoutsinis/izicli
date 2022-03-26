export function prepareCommand(program, command) {
  if (!command.argument && !command.options) {
    program.command(command.name).description(command.description).action(command.action)
    return
  }

  if (command.argument) {
    program
      .command(command.name)
      .description(command.description)
      .argument(command.argument.name)
      .action(command.action)
    return
  }

  const programRef = program.command(command.name).description(command.description)
  command.options.forEach(option => {
    if (option.isRequired) {
      programRef.requiredOption(option.definition, option.description)
      return
    }
    programRef.option(option.definition, option.description)
  })
  programRef.action(command.action)
}
