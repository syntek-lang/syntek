import { Node, Token, LexicalToken } from '../grammar';
import { Precedence } from './Precedence';
import { Parser } from '.';

// Declarations
import { classDecl } from './internal/declarations/classDecl';
import { functionDecl } from './internal/declarations/functionDecl';
import { importDecl } from './internal/declarations/importDecl';
import { variableDecl } from './internal/declarations/variableDecl';

// Expressions
import { arrayExpr } from './internal/expressions/arrayExpr';
import { assignmentExpr } from './internal/expressions/assignmentExpr';
import { asyncExpr } from './internal/expressions/asyncExpr';
import { binaryExpr } from './internal/expressions/binaryExpr';
import { callExpr } from './internal/expressions/callExpr';
import { ifExpr } from './internal/expressions/ifExpr';
import { indexExpr } from './internal/expressions/indexExpr';
import { instanceofExpr } from './internal/expressions/instanceofExpr';
import { memberExpr } from './internal/expressions/memberExpr';
import { newExpr } from './internal/expressions/newExpr';
import { unaryExpr } from './internal/expressions/unaryExpr';
import { wrappedExpr } from './internal/expressions/wrappedExpr';

// Literals
import { identifier } from './internal/literals/identifier';
import { literals } from './internal/literals/literals';
import { superLiteral } from './internal/literals/superLiteral';
import { thisLiteral } from './internal/literals/thisLiteral';

// Statements
import { breakStmt } from './internal/statements/breakStmt';
import { continueStmt } from './internal/statements/continueStmt';
import { forStmt } from './internal/statements/forStmt';
import { returnStmt } from './internal/statements/returnStmt';
import { switchStmt } from './internal/statements/switchStmt';
import { whileStmt } from './internal/statements/whileStmt';
import { yieldStmt } from './internal/statements/yieldStmt';

type PrefixFunction = (parser: Parser, prefix: Token) => Node;
type InfixFunction = (parser: Parser, left: Node, infix: Token) => Node;
type ParsingHandler = (parser: Parser) => Node;

export interface ExpressionParseRule {
  prefix: PrefixFunction | null;
  infix: InfixFunction | null;
  precedence: Precedence;
}

/**
 * An object containing the start token of a declaration mapped to the handler
 */
export const declarationRules: { [key: number]: ParsingHandler } = {
  [LexicalToken.ABSTRACT]: classDecl,
  [LexicalToken.CLASS]: classDecl,
  [LexicalToken.FUNCTION]: functionDecl,
  [LexicalToken.IMPORT]: importDecl,
  [LexicalToken.VAR]: variableDecl,
};

/**
 * An array containing the prefix handler, infix handler, precedence, and whitespace
 * information about a token type. The array is ordered the same as LexicalToken
 */
export const expressionRules: ExpressionParseRule[] = [
  // Whitespace
  { prefix: null, infix: null, precedence: Precedence.NONE }, // NEWLINE
  { prefix: null, infix: null, precedence: Precedence.NONE }, // COMMENT

  // Identifier
  { prefix: identifier, infix: null, precedence: Precedence.NONE }, // IDENTIFIER

  // Operators
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP6 }, // PLUS
  { prefix: unaryExpr, infix: binaryExpr, precedence: Precedence.OP6 }, // MINUS
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP7 }, // STAR
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP7 }, // SLASH
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP7 }, // PERCENT
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP8 }, // CARET

  { prefix: null, infix: assignmentExpr, precedence: Precedence.OP1 }, // EQUAL
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP4 }, // EQUAL_EQUAL,

  { prefix: unaryExpr, infix: null, precedence: Precedence.OP9 }, // BANG,
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP4 }, // BANG_EQUAL,

  { prefix: null, infix: binaryExpr, precedence: Precedence.OP5 }, // LT,
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP5 }, // LT_EQUAL,

  { prefix: null, infix: binaryExpr, precedence: Precedence.OP5 }, // GT,
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP5 }, // GT_EQUAL,

  // Punctuation
  { prefix: null, infix: memberExpr, precedence: Precedence.OP10 }, // DOT
  { prefix: null, infix: null, precedence: Precedence.NONE }, // COMMA
  { prefix: arrayExpr, infix: indexExpr, precedence: Precedence.OP10 }, // L_SQB
  { prefix: null, infix: null, precedence: Precedence.NONE }, // R_SQB
  { prefix: wrappedExpr, infix: callExpr, precedence: Precedence.OP10 }, // L_PAR
  { prefix: null, infix: null, precedence: Precedence.NONE }, // R_PAR
  { prefix: null, infix: null, precedence: Precedence.NONE }, // L_BRACE
  { prefix: null, infix: null, precedence: Precedence.NONE }, // R_BRACE
  { prefix: null, infix: null, precedence: Precedence.NONE }, // COLON

  // Literals
  { prefix: literals, infix: null, precedence: Precedence.NONE }, // NUMBER
  { prefix: literals, infix: null, precedence: Precedence.NONE }, // STRING
  { prefix: literals, infix: null, precedence: Precedence.NONE }, // BOOLEAN

  // Keywords
  { prefix: null, infix: null, precedence: Precedence.NONE }, // CLASS
  { prefix: null, infix: null, precedence: Precedence.NONE }, // EXTENDS
  { prefix: newExpr, infix: null, precedence: Precedence.OP10 }, // NEW

  { prefix: null, infix: null, precedence: Precedence.NONE }, // ABSTRACT
  { prefix: null, infix: null, precedence: Precedence.NONE }, // STATIC

  { prefix: thisLiteral, infix: null, precedence: Precedence.NONE }, // THIS
  { prefix: superLiteral, infix: null, precedence: Precedence.NONE }, // SUPER
  { prefix: null, infix: instanceofExpr, precedence: Precedence.OP5 }, // INSTANCEOF

  { prefix: ifExpr, infix: null, precedence: Precedence.NONE }, // IF
  { prefix: null, infix: null, precedence: Precedence.NONE }, // ELSE

  { prefix: null, infix: null, precedence: Precedence.NONE }, // SWITCH
  { prefix: null, infix: null, precedence: Precedence.NONE }, // CASE

  { prefix: null, infix: null, precedence: Precedence.NONE }, // FUNCTION
  { prefix: null, infix: null, precedence: Precedence.NONE }, // RETURN
  { prefix: null, infix: null, precedence: Precedence.NONE }, // VOID

  { prefix: asyncExpr, infix: null, precedence: Precedence.OP9 }, // ASYNC

  { prefix: null, infix: null, precedence: Precedence.NONE }, // IMPORT
  { prefix: null, infix: null, precedence: Precedence.NONE }, // AS

  { prefix: null, infix: null, precedence: Precedence.NONE }, // FOR
  { prefix: null, infix: null, precedence: Precedence.NONE }, // IN
  { prefix: null, infix: null, precedence: Precedence.NONE }, // WHILE

  { prefix: null, infix: null, precedence: Precedence.NONE }, // CONTINUE
  { prefix: null, infix: null, precedence: Precedence.NONE }, // BREAK
  { prefix: null, infix: null, precedence: Precedence.NONE }, // YIELD

  { prefix: null, infix: binaryExpr, precedence: Precedence.OP3 }, // AND
  { prefix: null, infix: binaryExpr, precedence: Precedence.OP2 }, // OR

  { prefix: null, infix: null, precedence: Precedence.NONE }, // VAR

  // End of file
  { prefix: null, infix: null, precedence: Precedence.NONE }, // EOF
];

/**
 * An object containing the start token of a statement mapped to the handler
 */
export const statementRules: { [key: number]: ParsingHandler } = {
  [LexicalToken.BREAK]: breakStmt,
  [LexicalToken.CONTINUE]: continueStmt,
  [LexicalToken.FOR]: forStmt,
  [LexicalToken.RETURN]: returnStmt,
  [LexicalToken.SWITCH]: switchStmt,
  [LexicalToken.WHILE]: whileStmt,
  [LexicalToken.YIELD]: yieldStmt,
};
