# Conditional Statements
Syntek contains 3 conditional statements. `if`, `else` and `else if`.

## If
An if statement is used for running a specific piece of code depending on a condition. If statements start with the `if` keyword, and are written without parentheses. When the condition is true, the code inside the body is executed.
```
x = 5

if x is 5
  print('x is 5')
```

If a variable is a boolean it does not require any comparison operator.
```
enabled = true

if enabled
  print('Enabled!')
```

## Else
An else statement is executed when the condition in the if statement is not `true`. An else statement requires an if block above it.
```
x = 6

if x is 5
  print('x is 5')
else
  print('x is not 5')
```

## If else
An if and else statement can be combined into an `else if` statement. This can be used to chain several if statements.
```
x = 5

if x is 4
  print('x is 4')
else if x is 5
  print('x is 5')
else
  print('x is not 4 and not 5')
```
