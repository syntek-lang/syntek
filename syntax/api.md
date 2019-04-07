# API
Syntek provides a JavaScript API that can be used for creating interactive assignments. It allows JavaScript to create functions and variables, execute functions, and access variables.

## Assignments
Assignments can range anywhere from making a calculator to writing a piece of logic for snake. Assignments are also able to disable pieces of functionality in Syntek, such as operators.

## Example
Below are several assignment ideas.

### Calculating
Because Syntek allows functionality to be disabled, operators such as `*` can be removed. This can be used to create an assignment where multiplication and pow have to be made using only `+`. This would make the code for the assignment similar to the following code.

```
function multiply(a, b)
  sum = 0
  repeat b times
    sum = sum + a
  return sum

function pow(base, exponent)
  sum = base
  repeat exponent - 1 times
    sum = multiply(sum, base)
  return sum
```

### Snake
The code that has to be written for a snake assignment would look similar to the following code.

```
direction = 1

function arrowUp()
    direction = 0

function arrowRight()
    direction = 1

function arrowDown()
    direction = 2

function arrowLeft()
    direction = 3

function loop()
    if direction is 0
        moveUp()
    else if direction is 1
        moveRight()
    else if direction is 2
        moveDown()
    else if direction is 3
        moveLeft()
```
The functions `arrowUp`, `arrowRight`, `arrowDown` and `arrowLeft` would be called from the browser when the user presses any of the arrow keys. `loop` would be called every second to simulate an event loop. The functions `moveUp`, `moveRight`, `moveDown` and `moveLeft` would call a function in the browser, which moves the snake character.

The code behind the assignment would look similar to the code below.
```js
syntek.createFunction('moveUp', () => {
  // Handle logic for moving the snake up
});

syntek.createFunction('moveRight', () => {
  // Handle logic for moving the snake right
});

syntek.createFunction('moveDown', () => {
  // Handle logic for moving the snake down
});

syntek.createFunction('moveLeft', () => {
  // Handle logic for moving the snake left
});

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      syntek.executeFunction('arrowUp');
      break;
    case 'ArrowRight':
      syntek.executeFunction('arrowRight');
      break;
    case 'ArrowDown':
      syntek.executeFunction('arrowDown');
      break;
    case 'ArrowLeft':
      syntek.executeFunction('arrowLeft');
      break;
  }
});

setInterval(() => {
  syntek.executeFunction('loop');
}, 100);
```
