# Operators
Operators in the language are kept to the bare minimum. Some operators found in other programming languages are not implemented to keep the language as easy as possible for beginners.

## Arithmetic
Airthmetic operators are kept to the bare minimum. The operators are listed in the table below.

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| +        | addition    | 5 + 2   | 7      |
| -        | subtraction | 5 - 2   | 3      |
| /        | division    | 5 / 2   | 2.5    |
| %        | modulus     | 5 % 2   | 1      |

Operatos such as `++` and `--` are not implemented, as they can be confusing to beginners. The functionality of these operators are also minor, as they can just be written as
```
x = x + 1
x = x - 1
```

## Assignment
The only assignment operator is `=`. This is to remove possible confusion with operators such as `+=` or `-=`.
```
x = 5
x = x + 5
y = x - 5
y = y / 2
```

## Comparison
Comparison operators are written in plain English to make it easy to read. All comparison operators are listed in the table below.

| Operator        | Description  | Example             | JavaScript |
|-----------------|--------------|---------------------|------------|
| is              | equal to     | a is 5              | a === 5    |
| is not          | not equal    | a is not 5          | a !== 5    |
| is greater than | greater than | a is greater than 5 | a > 5      |
| is less than    | less than    | a is less than 5    | a < 5      |

## Logical
Logical operators are also written in plain English. All logical operators are listed in the table below.

| Operator | Example       | JavaScript |
|----------|---------------|------------|
| and      | true and true | &&         |
| or       | true or false | \|\|         |
| not      | not false     | !          |

## Example
Function using a comparison operator:
```
function factorial(x)
  if x is 0
    return 1
  else
    return x * factorial(x - 1)
```
