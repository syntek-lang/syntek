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

## Datatypes
The available datatypes are listed below.

### Number
Number represents any numeric value. Because Syntek is built on JavaScript it uses the same number format, IEEE 754. This allows numbers to be floating point numbers.
```
x = 5
y = 2.5
```

### String
Strings hold a sequence of characters. Strings are surrounded in single quotes.
```
language = 'Syntek'
```

### Boolean
Booleans can have 2 values, true and false. Any comparison evaluates to a boolean of either true or false. Conditional statements and loops use booleans to determine whether to execute a piece of code.
```
active = true

if active
  active = false
```

### Array
Arrays are able to store multiple values, such as numbers. Array indexes start at 0 (might be changed to 1, since it makes more sense to humans).
```
numbers = [1, 2, 3]
numbers[0] # 1
numbers[1] # 2
numbers[2] # 3
```
An array can also contain a mix of variable types.
```
values = [true, 1, 'hello']
values[0] # true
values[1] # 1
values[2] # 'hello'
```

### Object
An object groups variables and functions together. For example, defining a car would look like this:
```
car = {
  type = 'Fiat'
  model = 500
  color = 'white'
  function honk()
    print('Honk!')
}

car.type # 'Fiat'
car.model # 500
car.color # 'white'
car.honk()
```
Trying to access a property of an object that does not exist will throw an error.

Objects can also have nested objects.
```
user = {
  id = 1
  info = {
    name = 'Jack'
    email = 'jack@gmail.com'
  }
}

user.info.name # 'Jack'
user.info.email # 'jack@gmail.com'
```
