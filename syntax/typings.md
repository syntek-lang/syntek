# Typings
Typings can optionally be used to improve the strictness of code. The types listed in the table below can be used.

| Type    | Example                        | Description        |
|---------|--------------------------------|--------------------|
| number  | `number id = 1`                | A numeric value    |
| string  | `string language = 'Syntek'`   | A string           |
| boolean | `boolean enabled = false`      | A boolean          |
| array   | `number[] numbers = [1, 2, 3]` | An array of a type |
| object  | `object obj = {}`              | An object          |
| any     | `any num = 1`                  | Any type           |

## Updating variables
When a variable is declared with any type other than `any` it can't be changed to a different type. The following code would throw an error.
```
number x = 5
x = 'my string'
```

When a variable is declared without a type changing it will work without any errors. The following code would not throw an error.
```
x = 5
x = 'my string'
```
