## izicli

A library on top of commander.js that results to a more opinionated way of building CLIs.

### Example

```js
import program from './index.js'

program.version('0.0.1')

program
  .command({ name: 'say', description: 'dummy command' })
  .options([
    {
      name: { full: 'value', short: 'v' },
      description: 'dummy option',
      acceptMultipleValues: false,
      isRequired: true,
    },
  ])
  .action(options => {
    const { value } = options

    console.log(value)
  })

program.parse(process.argv)
```
