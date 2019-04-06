# Variables
Variables are declared using the assignment operator `=`. Variables can always be reassigned. Example:
```
x = 5
x = 10
```

## Scoping
Variables declared in the top level of a file are accessible in the entire file. A variable can be reassigned from the top level, or from a function. Example:
```
x = 10

function setX(a)
  x = a
```

To avoid shadowing of variables, a function parameter can not have the name of a variable declared in the top level of a file and will throw an error. This enforces variable names to be unique.

When a variable is declared inside a function body, or as a function parameter it only exists in the function scope. If a variable is declared inside a nested if statement, it will still be accessible outside the if statement. Example:
```
function abs(num)
  if num is less than 0
    x = -1
  else
    x = 1

  return num * x
```
