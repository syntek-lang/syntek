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
import { fallthroughStmt } from './internal/statements/fallthroughStmt';
import { forStmt } from './internal/statements/forStmt';
import { ifStmt } from './internal/statements/ifStmt';
import { repeatStmt } from './internal/statements/repeatStmt';
import { returnStmt } from './internal/statements/returnStmt';
import { switchStmt } from './internal/statements/switchStmt';
import { throwStmt } from './internal/statements/throwStmt';
import { tryStmt } from './internal/statements/tryStmt';
import { whileStmt } from './internal/statements/whileStmt';

type PrefixFunction = (parser: Parser, prefix: Token) => Node;
type InfixFunction = (parser: Parser, left: Node, infix: Token) => Node;
type ParsingHandler = (parser: Parser) => Node;

export interface ExpressionParseRule {
  prefix: PrefixFunction | null;
  infix: InfixFunction | null;
  precedence: Precedence;
  ignoreWhiteSpace?: boolean;
}

export const declarationRules: { [key: number]: ParsingHandler } = {
  [LexicalToken.CLASS]: classDecl,
  [LexicalToken.FUNCTION]: functionDecl,
  [LexicalToken.IMPORT]: importDecl,
  [LexicalToken.VAR]: variableDecl,
};

export const expressionRules: ExpressionParseRule[] = [
  // Whitespace
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // NEWLINE
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // INDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // OUTDENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COMMENT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // WHITESPACE

  // Identifier
  { prefix: identifier, infix: null, precedence: Precedence.OP1 }, // IDENTIFIER

  // Operators
  {
    prefix: null, infix: binaryExpr, precedence: Precedence.OP7, ignoreWhiteSpace: true,
  }, // PLUS
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
  { prefix: arrayExpr, infix: indexExpr, precedence: Precedence.OP11 }, // LSQB
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RSQB
  { prefix: wrappedExpr, infix: callExpr, precedence: Precedence.OP11 }, // LPAR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // RPAR
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // LT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // GT
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // COLON

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
  { prefix: null, infix: null, precedence: Precedence.OP1 }, // VOID

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

  { prefix: null, infix: null, precedence: Precedence.OP1 }, // VAR

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
