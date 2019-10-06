/* eslint-disable @typescript-eslint/no-use-before-define */

import * as grammar from '../../grammar';

// Scope imports at the bottom to solve circular deps

import { SymbolTable } from '../symbols/SymbolTable';
import { SymbolEntry } from '../symbols/SymbolEntry';

export abstract class Scope {
  readonly node: grammar.Node;

  readonly parent?: Scope;

  readonly symbols: SymbolTable;

  readonly scopes = new Map<grammar.Node, Scope>()

  constructor(node: grammar.Node, parent?: Scope) {
    this.node = node;
    this.parent = parent;

    if (parent) {
      this.symbols = new SymbolTable(parent.symbols);
    } else {
      this.symbols = new SymbolTable();
    }

    this.build();
  }

  add(node: grammar.Node): void {
    switch (node.type) {
      // Declarations
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = node as grammar.EmptyVariableDeclaration;
        this.symbols.add(decl.identifier, new SymbolEntry(decl, this));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = node as grammar.VariableDeclaration;
        this.symbols.add(decl.identifier, new SymbolEntry(decl, this));
        break;
      }

      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        this.symbols.add(decl.identifier, new SymbolEntry(decl, this));
        this.scopes.set(decl, new FunctionScope(decl, this));

        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        this.symbols.add(decl.identifier, new SymbolEntry(decl, this));
        this.scopes.set(decl, new ClassScope(decl, this));

        break;
      }

      case grammar.SyntacticToken.IMPORT_DECL: {
        const decl = node as grammar.ImportDeclaration;
        this.symbols.add(decl.identifier, new SymbolEntry(decl, this));
        break;
      }

      // Expressions
      case grammar.SyntacticToken.ASSIGNMENT_EXPR:
        break;

      case grammar.SyntacticToken.WRAPPED_EXPR: {
        const expr = node as grammar.WrappedExpression;
        this.add(expr.expression);
        break;
      }

      case grammar.SyntacticToken.UNARY_EXPR:
      case grammar.SyntacticToken.BINARY_EXPR:
      case grammar.SyntacticToken.CALL_EXPR:
      case grammar.SyntacticToken.INDEX_EXPR:
      case grammar.SyntacticToken.MEMBER_EXPR:
      case grammar.SyntacticToken.NEW_EXPR:
      case grammar.SyntacticToken.INSTANCEOF_EXPR:
      case grammar.SyntacticToken.ASYNC_EXPR:
      case grammar.SyntacticToken.ARRAY_EXPR:
        break;

      case grammar.SyntacticToken.IF_EXPR: {
        const expr = node as grammar.IfExpression;
        this.scopes.set(expr, new BlockScope(expr, this));
        break;
      }

      case grammar.SyntacticToken.ELSE_EXPR: {
        const expr = node as grammar.ElseExpression;
        this.scopes.set(expr, new BlockScope(expr, this));
        break;
      }

      case grammar.SyntacticToken.IDENTIFIER:
      case grammar.SyntacticToken.LITERAL:
      case grammar.SyntacticToken.SUPER:
      case grammar.SyntacticToken.THIS:
        break;

      // Statements
      case grammar.SyntacticToken.SWITCH_STMT: {
        const stmt = node as grammar.SwitchStatement;
        this.scopes.set(stmt, new BlockScope(stmt, this));
        break;
      }

      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = node as grammar.ForStatement;
        this.scopes.set(stmt, new BlockScope(stmt, this));
        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const stmt = node as grammar.WhileStatement;
        this.scopes.set(stmt, new BlockScope(stmt, this));
        break;
      }

      case grammar.SyntacticToken.RETURN_STMT:
      case grammar.SyntacticToken.YIELD_STMT:
        break;

      case grammar.SyntacticToken.EXPRESSION_STMT: {
        const stmt = node as grammar.ExpressionStatement;
        this.add(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.BREAK_STMT:
      case grammar.SyntacticToken.CONTINUE_STMT:
        break;

      // Other
      case grammar.SyntacticToken.PROGRAM: {
        const program = node as grammar.Program;
        this.scopes.set(program, new BlockScope(program, this));
        break;
      }

      case grammar.SyntacticToken.SWITCH_CASE: {
        const switchCase = node as grammar.SwitchCase;
        this.scopes.set(switchCase, new BlockScope(switchCase, this));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_TYPE:
        break;

      case grammar.SyntacticToken.FUNCTION_PARAM: {
        const param = node as grammar.FunctionParam;
        this.symbols.add(param.name, new SymbolEntry(param, this));
        break;
      }

      default:
        throw new Error(`Can't add node of type ${grammar.SyntacticToken[node.type]}`);
    }
  }

  abstract build(): void;
}

// Imports are at the bottom to solve circular deps
/* eslint-disable import/first */
import { BlockScope } from './BlockScope';
import { ClassScope } from './ClassScope';
import { FunctionScope } from './FunctionScope';
/* eslint-enable import/first */
