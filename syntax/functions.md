# Functions
Functions are declared using the `function` keyword. The `function` keyword is followed by the function name. Parameters come after the function name, and are seperated with a comma. A function with parameters is declared in the following order:

```
function add(a, b)
```

Here `add` is the name of the function, which takes in `a` and `b`.

## Return
Functions can return data using the `return` keyword.
```
function add(a, b)
  return a + b
```
This function takes in `a` and `b` and returns the value of `a + b`.

Return statements don't require a return value, but can also be used to break out of a function.
```
function divide(a, b)
  if b is 0
    return
  return a / b
```
In this example the function returns nothing if `b` is 0, else it returns `a / b`.

## Executing
You can execute a function as following
```
function add(a, b)
  return a + b

add(2, 3)
```
This would call `add` with `2` and `3`, which returns `6`.
