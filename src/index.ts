import { tokenize } from './compiler';

/* eslint-disable no-tabs */
const tokens = tokenize(`        # Snake game
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
		moveLeft()`);
/* eslint-enable no-tabs */

console.log(tokens);
