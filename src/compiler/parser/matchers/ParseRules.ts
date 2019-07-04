import { Precedence } from './Precedence';
import {
  Node, Token, Parser, LexicalToken,
} from '../..';

// Expressions
import { assignmentExpr } from './expressions/assignmentExpr';
import { asyncExpr } from './expressions/asyncExpr';
import { binaryExpr } from './expressions/binaryExpr';
import { callExpr } from './expressions/callExpr';
import { indexExpr } from './expressions/indexExpr';
import { instanceofExpr } from './expressions/instanceofExpr';
import { memberExpr } from './expressions/memberExpr';
import { newExpr } from './expressions/newExpr';
import { unaryExpr } from './expressions/unaryExpr';
import { wrappedExpr } from './expressions/wrappedExpr';

// Literals
import { arrayLiteral } from './literals/arrayLiteral';
import { literals } from './literals/literals';
import { superLiteral } from './literals/superLiteral';
import { thisLiteral } from './literals/thisLiteral';

// Statements
import { breakStmt } from './statements/breakStmt';
import { continueStmt } from './statements/continueStmt';
import { fallthroughStmt } from './statements/fallthroughStmt';
import { forStmt } from './statements/forStmt';
import { ifStmt } from './statements/ifStmt';
import { repeatStmt } from './statements/repeatStmt';
import { returnStmt } from './statements/returnStmt';
import { switchStmt } from './statements/switchStmt';
import { throwStmt } from './statements/throwStmt';
import { tryStmt } from './statements/tryStmt';
import { whileStmt } from './statements/whileStmt';

type PrefixFunction = (this: Parser, prefix: Token) => Node;
type InfixFunction = (this: Parser, left: Node, infix: Token) => Node;
type ParsingHandler = (this: Parser) => Node;

export interface ExpressionParseRule {
  prefix: PrefixFunction | null;
  infix: InfixFunction | null;
  precedence: Precedence;
  ignoreWhiteSpace?: boolean;
}

export const expressionRules: ExpressionParseRule[] = [
  // Whitespace
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // NEWLINE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // INDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // OUTDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COMMENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // WHITESPACE

  // Identifier
  { prefix: literals, infix: null, precedence: Precedence.OP1 }, // IDENTIFIER

  // Operators
  { prefix: unaryExpr, infix: binaryExpr, precedence: Precedence.OP7 }, // PLUS
  { prefix: unaryExpr, infix: binaryExpr, precedence: Precedence.OP7 }, // MINUS
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP8, ignoreWhiteSpace: true,
  }, // STAR
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP8, ignoreWhiteSpace: true,
  }, // SLASH
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP8, ignoreWhiteSpace: true,
  }, // PERCENT
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP9, ignoreWhiteSpace: true,
  }, // CARET
  {
    prefix: null, infix: assignmentExpr, precedence: Precedence.OP2, ignoreWhiteSpace: true,
  }, // EQUAL

  // Punctuation
  {
    prefix: null, infix: memberExpr, precedence: Precedence.OP11, ignoreWhiteSpace: true,
  }, // DOT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COMMA
  { prefix: arrayLiteral, infix: indexExpr, precedence: Precedence.OP11 }, // LSQB
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RSQB
  { prefix: wrappedExpr, infix: callExpr, precedence: Precedence.OP11 }, // LPAR
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
  { prefix: newExpr, infix: null, precedence: Precedence.OP1 }, // NEW
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // STATIC
  { prefix: thisLiteral, infix: null, precedence: Precedence.OP1 }, // THIS
  { prefix: superLiteral, infix: null, precedence: Precedence.OP1 }, // SUPER
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // EXTENDS
  {
    prefix: null, infix: instanceofExpr, precedence: Precedence.OP6, ignoreWhiteSpace: true,
  }, // INSTANCEOF

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // IF
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // ELSE

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // SWITCH
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // CASE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // FALLTHROUGH

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // FUNCTION
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RETURN
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RETURNS

  { prefix: asyncExpr, infix: null, precedence: Precedence.OP1 }, // ASYNC

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

  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP4, ignoreWhiteSpace: true,
  }, // AND
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP3, ignoreWhiteSpace: true,
  }, // OR
  { prefix: unaryExpr, infix: null, precedence: Precedence.OP1 }, // NOT

  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP5, ignoreWhiteSpace: true,
  }, // IS
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP5, ignoreWhiteSpace: true,
  }, // IS_NOT
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP6, ignoreWhiteSpace: true,
  }, // IS_LESS_THAN
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP6, ignoreWhiteSpace: true,
  }, // IS_GREATER_THAN

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // ANY

  // End of file
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // EOF
];

export const statementRules: { [key: number]: ParsingHandler } = {
  [LexicalToken.BREAK]: breakStmt,
  [LexicalToken.CONTINUE]: continueStmt,
  [LexicalToken.FALLTHROUGH]: fallthroughStmt,
  [LexicalToken.FOR]: forStmt,
  [LexicalToken.IF]: ifStmt,
  [LexicalToken.REPEAT]: repeatStmt,
  [LexicalToken.RETURN]: returnStmt,
  [LexicalToken.SWITCH]: switchStmt,
  [LexicalToken.THROW]: throwStmt,
  [LexicalToken.TRY]: tryStmt,
  [LexicalToken.WHILE]: whileStmt,
};
