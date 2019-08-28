import * as grammar from '.';

/**
 * Tokens that consist of a single character
 */
export const CHAR_TOKENS: { [key: string]: grammar.LexicalToken } = {
  // Whitespace
  '\t': grammar.LexicalToken.WHITESPACE,
  ' ': grammar.LexicalToken.WHITESPACE,

  // Operators
  '+': grammar.LexicalToken.PLUS,
  '-': grammar.LexicalToken.MINUS,
  '*': grammar.LexicalToken.STAR,
  '/': grammar.LexicalToken.SLASH,
  '%': grammar.LexicalToken.PERCENT,
  '^': grammar.LexicalToken.CARET,
  '=': grammar.LexicalToken.EQUAL,

  // Punctuation
  '.': grammar.LexicalToken.DOT,
  ',': grammar.LexicalToken.COMMA,
  '[': grammar.LexicalToken.LSQB,
  ']': grammar.LexicalToken.RSQB,
  '(': grammar.LexicalToken.LPAR,
  ')': grammar.LexicalToken.RPAR,
  '<': grammar.LexicalToken.LT,
  '>': grammar.LexicalToken.GT,
  ':': grammar.LexicalToken.COLON,
};

/**
 * Tokens that are a single word
 */
export const WORD_TOKENS: { [key: string]: grammar.LexicalToken } = {
  // Boolean
  true: grammar.LexicalToken.BOOLEAN,
  false: grammar.LexicalToken.BOOLEAN,

  // Null
  null: grammar.LexicalToken.NULL,

  // Keywords
  class: grammar.LexicalToken.CLASS,
  new: grammar.LexicalToken.NEW,
  static: grammar.LexicalToken.STATIC,
  this: grammar.LexicalToken.THIS,
  super: grammar.LexicalToken.SUPER,
  extends: grammar.LexicalToken.EXTENDS,
  instanceof: grammar.LexicalToken.INSTANCEOF,

  if: grammar.LexicalToken.IF,
  else: grammar.LexicalToken.ELSE,

  switch: grammar.LexicalToken.SWITCH,
  case: grammar.LexicalToken.CASE,
  fallthrough: grammar.LexicalToken.FALLTHROUGH,

  function: grammar.LexicalToken.FUNCTION,
  return: grammar.LexicalToken.RETURN,
  void: grammar.LexicalToken.VOID,

  async: grammar.LexicalToken.ASYNC,

  try: grammar.LexicalToken.TRY,
  catch: grammar.LexicalToken.CATCH,
  throw: grammar.LexicalToken.THROW,

  import: grammar.LexicalToken.IMPORT,
  as: grammar.LexicalToken.AS,

  for: grammar.LexicalToken.FOR,
  in: grammar.LexicalToken.IN,
  repeat: grammar.LexicalToken.REPEAT,
  times: grammar.LexicalToken.TIMES,
  while: grammar.LexicalToken.WHILE,
  continue: grammar.LexicalToken.CONTINUE,
  break: grammar.LexicalToken.BREAK,

  and: grammar.LexicalToken.AND,
  or: grammar.LexicalToken.OR,
  not: grammar.LexicalToken.NOT,

  is: grammar.LexicalToken.IS,

  var: grammar.LexicalToken.VAR,
};

/**
 * Node class mapped to SyntacticToken
 */
export const NODE_TYPE: Map<typeof grammar.Node, grammar.SyntacticToken> = new Map()
  // Declarations
  .set(grammar.VariableDeclaration, grammar.SyntacticToken.VARIABLE_DECL)
  .set(grammar.FunctionDeclaration, grammar.SyntacticToken.FUNCTION_DECL)
  .set(grammar.ClassDeclaration, grammar.SyntacticToken.CLASS_DECL)
  .set(grammar.ImportDeclaration, grammar.SyntacticToken.IMPORT_DECL)

  // Expressions
  .set(grammar.WrappedExpression, grammar.SyntacticToken.WRAPPED_EXPR)
  .set(grammar.UnaryExpression, grammar.SyntacticToken.UNARY_EXPR)
  .set(grammar.BinaryExpression, grammar.SyntacticToken.BINARY_EXPR)
  .set(grammar.CallExpression, grammar.SyntacticToken.CALL_EXPR)
  .set(grammar.IndexExpression, grammar.SyntacticToken.INDEX_EXPR)
  .set(grammar.MemberExpression, grammar.SyntacticToken.MEMBER_EXPR)
  .set(grammar.NewExpression, grammar.SyntacticToken.NEW_EXPR)
  .set(grammar.InstanceofExpression, grammar.SyntacticToken.INSTANCEOF_EXPR)
  .set(grammar.AsyncExpression, grammar.SyntacticToken.ASYNC_EXPR)
  .set(grammar.ArrayExpression, grammar.SyntacticToken.ARRAY_EXPR)
  .set(grammar.AssignmentExpression, grammar.SyntacticToken.ASSIGNMENT_EXPR)

  .set(grammar.Identifier, grammar.SyntacticToken.IDENTIFIER)
  .set(grammar.Literal, grammar.SyntacticToken.LITERAL)
  .set(grammar.Super, grammar.SyntacticToken.SUPER)
  .set(grammar.This, grammar.SyntacticToken.THIS)

  // Statements
  .set(grammar.IfStatement, grammar.SyntacticToken.IF_STMT)
  .set(grammar.ElseStatement, grammar.SyntacticToken.ELSE_STMT)
  .set(grammar.SwitchStatement, grammar.SyntacticToken.SWITCH_STMT)
  .set(grammar.ForStatement, grammar.SyntacticToken.FOR_STMT)
  .set(grammar.RepeatStatement, grammar.SyntacticToken.REPEAT_STMT)
  .set(grammar.WhileStatement, grammar.SyntacticToken.WHILE_STMT)
  .set(grammar.TryStatement, grammar.SyntacticToken.TRY_STMT)
  .set(grammar.CatchStatement, grammar.SyntacticToken.CATCH_STMT)
  .set(grammar.ThrowStatement, grammar.SyntacticToken.THROW_STMT)
  .set(grammar.ReturnStatement, grammar.SyntacticToken.RETURN_STMT)
  .set(grammar.ExpressionStatement, grammar.SyntacticToken.EXPRESSION_STMT)

  .set(grammar.BreakStatement, grammar.SyntacticToken.BREAK_STMT)
  .set(grammar.ContinueStatement, grammar.SyntacticToken.CONTINUE_STMT)
  .set(grammar.FallthroughStatement, grammar.SyntacticToken.FALLTHROUGH_STMT)

  // Other
  .set(grammar.Program, grammar.SyntacticToken.PROGRAM)
  .set(grammar.SwitchCase, grammar.SyntacticToken.SWITCH_CASE);

/**
 * Check if a node is a loop
 *
 * @param node - The node to check
 * @returns Whether the node is a loop
 */
export function isLoop(node: grammar.Node): boolean {
  return node.type === grammar.SyntacticToken.FOR_STMT
    || node.type === grammar.SyntacticToken.REPEAT_STMT
    || node.type === grammar.SyntacticToken.WHILE_STMT;
}
