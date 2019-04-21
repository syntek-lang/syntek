/* eslint-disable no-tabs */

export const functionInsideFunction = `function outer()
	function inner()
		print('Hello')`;

export const undefinedVariable = 'sum = x + 5';

export const duplicateSymbols = `import fn

fn = 5

class fn
	x = 5

function fn()
	print('Hello')

function fn()
	print('Hello')`;
