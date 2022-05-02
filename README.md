## izicli

A library on top of commander.js that provides a more opinionated API.

### Install

```
npm i izicli
```

### Examples

```js
// file: sample.js
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
      valueIsRequired: true,
    },
  ])
  .action(options => {
    const { value } = options

    console.log(value)
  })

program.parse(process.argv)
```

Usage:

```
node sample.js say -v "hello"
```

```js
// file: sample.js
import program from './index.js'

program.version('0.0.1')

program
  .command({ name: 'say', description: 'dummy command' })
  .argument({
    name: 'value',
    description: 'dummy argument',
    isRequired: true,
    acceptMultipleValues: false,
  })
  .action(value => {
    console.log(value)
  })

program.parse(process.argv)
```

Usage:

```
node sample.js say "hello"
```
