import { Precedence } from './Precedence';
import { Matcher } from './Matcher';
import { Node, Token } from '../..';

// Expressions
import { async_ } from './expressions/async_';
import { binary } from './expressions/binary';
import { instanceof_ } from './expressions/instanceof_';
import { unary } from './expressions/unary';
import { wrapped } from './expressions/wrapped';

// Literals
import { literals } from './literals/literals';
import { super_ } from './literals/super_';
import { this_ } from './literals/this_';

export type PrefixFunction = (this: Matcher, prefix: Token) => Node;
export type InfixFunction = (this: Matcher, left: Node, infix: Token) => Node;

export interface ParseRule {
  prefix: PrefixFunction | null;
  infix: InfixFunction | null;
  precedence: Precedence;
}

export const rules: ParseRule[] = [
  // Whitespace
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // NEWLINE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // INDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // OUTDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COMMENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // WHITESPACE

  // Identifier
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // IDENTIFIER

  // Operators
  { prefix: unary, infix: binary, precedence: Precedence.OP7 }, // PLUS
  { prefix: unary, infix: binary, precedence: Precedence.OP7 }, // MINUS
  { prefix: null, infix: binary, precedence: Precedence.OP8 }, // STAR
  { prefix: null, infix: binary, precedence: Precedence.OP8 }, // SLASH
  { prefix: null, infix: binary, precedence: Precedence.OP8 }, // PERCENT
  { prefix: null, infix: binary, precedence: Precedence.OP9 }, // CARET
  { prefix: null, infix: null, precedence: Precedence.OP2 }, // EQUAL

  // Punctuation
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // DOT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COMMA
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // LSQB
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RSQB
  { prefix: wrapped, infix: null, precedence: Precedence.OP12 }, // LPAR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RPAR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // LBRACE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RBRACE

  // Literals
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // NUMBER
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // STRING
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // BOOLEAN
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // NULL

  // Keywords
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // CLASS
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // NEW
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // STATIC
  { prefix: this_, infix: null, precedence: Precedence.OP1 }, // THIS
  { prefix: super_, infix: null, precedence: Precedence.OP1 }, // SUPER
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // EXTENDS
  { prefix: null, infix: instanceof_, precedence: Precedence.OP6 }, // INSTANCEOF

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // IF
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // ELSE

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // SWITCH
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // CASE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // FALLTHROUGH

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // FUNCTION
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RETURN
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RETURNS

  { prefix: async_, infix: null, precedence: Precedence.OP1 }, // ASYNC

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // TRY
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // CATCH
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // THROW

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // IMPORT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // AS

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // FOR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // IN
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // REPEAT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // TIMES
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // WHILE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // CONTINUE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // BREAK

  { prefix: null, infix: binary, precedence: Precedence.OP4 }, // AND
  { prefix: null, infix: binary, precedence: Precedence.OP3 }, // OR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // NOT

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // IS
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // GREATER
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // LESS
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // THAN

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // ANY

  // End of file
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // EOF
];