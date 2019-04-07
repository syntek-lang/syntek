# Classes
Syntek is an object oriented language. Types such as strings and arrays are objects. A class is similar to an object, as it can hold properties and methods.

## Creating a class
You can create a class using the `class` keyword.
```
class MyClass
```

### Properties
Properties can be added to a class to store information.
```
class MyClass
  x = 5
```

To access a class property from inside the class you use the `this` keyword. Without the `this` keyword it tries to find the variable in the top level of the file, instead of in the class.

### Methods
Methods are used to add specific behaviour to a class.
```
class MyClass
  x = 5

  function printX()
    print(this.x)
```

### Constructor
The constructor of a class is called when the class is instantiated. The constructor is a function with the same name as the class.
```
class MyClass
  function MyClass()
    print('New MyClass object!')
```

A constructor can also take in parameters, which can be passed to it on creation.
```
class MyClass
  function MyClass(x)
    print(x)
```

### Static
To declare a property or method as static you prefix it with the `static` keyword.
```
class MyClass
  static x = 5

MyClass.x # 5
```

## Instantiating a class
To instantiate a class you use the `new` keyword.
```
class MyClass
  function MyClass(x)
    this.x = x

myClass = new MyClass(5)
print(myClass.x) # 5
```
