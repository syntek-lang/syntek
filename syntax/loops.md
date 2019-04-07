# Loops
Loops can be used to execute a block of code several times. Syntek has 3 different loop statements. `for`, `while` and `repeat`.

## For
For loops can be used to iterate over all elements of an array or each character in a string.
```
# Looping over an array
fruits = ['banana', 'apple',  'mango']
for fruit in fruits
  print(fruit)

# Looping over a string
for letter in 'Syntek'
  print(letter)
```

To loop over numbers, you need to use a range function which returns an array.
```
for x in range(0, 10)
  print(x)
```
In this example it will loop through all numbers from `0` to `9` and print them.

## While
A while loop repeats a block of code as long as the given condition is `true`. This can also be used to create infinite loops for game mechanics.

The code below prints the numbers `0` through `9`.
```
x = 0
while x is less than 10
  print(x)
  x = x + 1
```

An infinite loop can be made as following.
```
while true
  print('This goes on forever')
```

## Repeat
The repeat statement is a shorthand way of writing a for or while loop for repeating a block of code x times. It follows the format `repeat x times`, where `x` is a number.

Take the following example.
```
for x in range(0, 10)
  print('Hello')
```
Because variable `x` is not used, we can rewrite this using the repeat statement. The following code would produce the exact same outcome.
```
repeat 10 times
  print('Hello')
```

## Control statements
Syntek has 2 control statements. `break` and `continue`.

### Break
The break keyword is used to terminate the loop execution. The following code would print the numbers `0` and `1`.
```
for x in range(0, 5)
  if x is 2
    break
  else
    print(x)
```

### Continue
The continue keyword is used to skip the remainder of the loop body. The following code would print the numbers `0` and `2`.
```
for x in range(0, 3)
  if x is 1
    continue
  else
    print(x)
```
