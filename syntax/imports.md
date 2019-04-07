# Imports
Syntek offers a module system, which allows code to be split into different files. You can import modules and files as following.

```
# Module
import math
# or
import math as math

# File
import './foo' as foo
```

You can then access functions, variables and classes defined in the modules and files.

## Example
File: **myMath**
```
function add(a, b)
  return a + b

function subtract(a, b)
  return a - b
```

File: **index**
```
import './myMath' as math

math.add(2, 3) # 5
math.subtract(2, 3) # -1
```
