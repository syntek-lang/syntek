/* eslint-disable @typescript-eslint/no-use-before-define */

import * as grammar from '../../grammar';

// Scope imports at the bottom to solve circular deps

import { SymbolTable } from '../symbols/SymbolTable';
import { SymbolEntry } from '../symbols/SymbolEntry';

import { mangleFunctionName } from '../mangle';

export abstract class Scope<T extends grammar.Node = grammar.Node> {
  readonly node: T;

  readonly parent?: Scope;

  readonly table = new SymbolTable();

  readonly scopes = new Map<grammar.Node, Scope>();

  constructor(node: T, parent?: Scope) {
    this.node = node;
    this.parent = parent;
  }

  getScope(node: grammar.Node): Scope | undefined {
    if (node === this.node) {
      return this;
    }

    if (this.hasOwnScope(node)) {
      return this.getOwnScope(node);
    }

    if (this.parent) {
      return this.parent.getScope(node);
    }

    return undefined;
  }

  getOwnScope(node: grammar.Node): Scope | undefined {
    return this.scopes.get(node);
  }

  hasOwnScope(node: grammar.Node): boolean {
    return this.scopes.has(node);
  }

  getThis(): ClassScope {
    if (this instanceof ClassScope) {
      return this;
    }

    if (this.parent) {
      return this.parent.getThis();
    }

    throw new Error("Can't get 'this' outside of a class scope");
  }

  getSymbol(name: string): SymbolEntry {
    const symbol = this.table.get(name);
    if (symbol) {
      return symbol;
    }

    if (this.parent) {
      return this.parent.getSymbol(name);
    }

    throw new Error(`No symbol with the name ${name}`);
  }

  hasSymbol(name: string): boolean {
    if (this.table.has(name)) {
      return true;
    }

    if (this.parent) {
      return this.parent.hasSymbol(name);
    }

    return false;
  }

  hasFunction(name: string): boolean {
    if (this.hasOwnFunction(name)) {
      return true;
    }

    if (this.parent) {
      return this.parent.hasFunction(name);
    }

    return false;
  }

  hasOwnFunction(name: string): boolean {
    return this.table.hasFunction(name);
  }

  protected add(node: grammar.Node): void {
    switch (node.type) {
      // Declarations
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = node as grammar.EmptyVariableDeclaration;
        this.table.add(decl.identifier.lexeme, new SymbolEntry(decl, this));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = node as grammar.VariableDeclaration;
        this.table.add(decl.identifier.lexeme, new SymbolEntry(decl, this));
        break;
      }

      case grammar.SyntacticToken.EMPTY_FUNCTION_DECL: {
        const decl = node as grammar.EmptyFunctionDeclaration;

        this.table.addFunction(decl);
        this.table.add(mangleFunctionName(decl), new SymbolEntry(decl, this));

        const scope = new FunctionScope(decl, this);
        scope.build();
        this.scopes.set(decl, scope);

        break;
      }

      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        this.table.addFunction(decl);
        this.table.add(mangleFunctionName(decl), new SymbolEntry(decl, this));

        const scope = new FunctionScope(decl, this);
        scope.build();
        this.scopes.set(decl, scope);

        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        this.table.add(decl.identifier.lexeme, new SymbolEntry(decl, this));

        const scope = new ClassScope(decl, this);
        scope.build();
        this.scopes.set(decl, scope);

        break;
      }

      case grammar.SyntacticToken.FULL_IMPORT_DECL: {
        const decl = node as grammar.FullImportDeclaration;
        this.table.add(decl.identifier.lexeme, new SymbolEntry(decl, this));
        break;
      }

      case grammar.SyntacticToken.PARTIAL_IMPORT_DECL: {
        const decl = node as grammar.PartialImportDeclaration;
        decl.expose.forEach(expose => this.add(expose));
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

        const scope = new BlockScope(expr, this);
        scope.build();
        this.scopes.set(expr, scope);

        break;
      }

      case grammar.SyntacticToken.ELSE_EXPR: {
        const expr = node as grammar.ElseExpression;

        const scope = new BlockScope(expr, this);
        scope.build();
        this.scopes.set(expr, scope);

        break;
      }

      case grammar.SyntacticToken.IDENTIFIER:
      case grammar.SyntacticToken.SUPER:
      case grammar.SyntacticToken.THIS:
      case grammar.SyntacticToken.NUMBER_LITERAL:
      case grammar.SyntacticToken.STRING_LITERAL:
      case grammar.SyntacticToken.BOOLEAN_LITERAL:
        break;

      // Statements
      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = node as grammar.ForStatement;

        const scope = new BlockScope(stmt, this);
        scope.build();
        this.scopes.set(stmt, scope);

        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const stmt = node as grammar.WhileStatement;

        const scope = new BlockScope(stmt, this);
        scope.build();
        this.scopes.set(stmt, scope);

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
      case grammar.SyntacticToken.VARIABLE_TYPE:
        break;

      case grammar.SyntacticToken.PARAMETER: {
        const param = node as grammar.Parameter;
        this.table.add(param.identifier.lexeme, new SymbolEntry(param, this));
        break;
      }

      case grammar.SyntacticToken.CLASS_PROP: {
        const prop = node as grammar.ClassProp;
        this.add(prop.value);
        break;
      }

      case grammar.SyntacticToken.IMPORT_EXPOSE: {
        const expose = node as grammar.ImportExpose;
        this.table.add(expose.identifier.lexeme, new SymbolEntry(expose, this));
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
