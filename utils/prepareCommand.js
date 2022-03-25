export function prepareCommand(program, command) {
  if (!command.options) {
    program.command(command.name).description(command.description).action(command.action)
    return
  }

  const programRef = program.command(command.name).description(command.description)
  command.options.forEach(option =>
    programRef.option(option.definition, option.description),
  )
  programRef.action(command.action)
}
