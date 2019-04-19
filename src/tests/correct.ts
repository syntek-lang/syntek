/* eslint-disable no-tabs */

export const calculator = `function multiply(a, b)
	sum = 0
	repeat b times
		sum = sum + a
	return sum

function pow(base, exponent)
	sum = base
	repeat exponent - 1 times
		sum = multiply(sum, base)
	return sum`;

export const snake = `direction = 1

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
		moveLeft()`;
