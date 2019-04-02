# Typings
Typings can optionally be used to improve the strictness of code. The types listed in the table below can be used.

| Type    | Example                        |
|---------|--------------------------------|
| number  | `number age = 17`              |
| string  | `string name = 'Sebastiaan'`   |
| boolean | `boolean enabled = false`      |
| array   | `number[] numbers = [1, 2, 3]` |

## Updating variables
When a variable is declared with a type it can't be changed to a different type. The following code would throw an error.
```
number x = 5
x = 'my string'
```

When a variable is declared without a type changing it will work without any errors. The following code would not throw an error.
```
x = 5
x = 'my string'
```
