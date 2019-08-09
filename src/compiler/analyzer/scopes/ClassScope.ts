import {
  Scope, FunctionScope,
  SymbolTable, SymbolEntry,
} from '../..';
import * as grammar from '../../../grammar';

export class ClassScope extends Scope {
  readonly node: grammar.ClassDeclaration;

  constructor(node: grammar.ClassDeclaration, parent?: Scope) {
    super(node, parent, new SymbolTable());

    this.node = node;
  }

  handleNode(node: grammar.Node): void {
    switch (node.type) {
      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        if (this.table.has(decl.identifier.lexeme)) {
          throw new Error('Name of function already used');
        } else {
          this.table.set(decl.identifier.lexeme, new SymbolEntry(node, this));
          this.scopes.set(node, new FunctionScope(decl, this.parent));
        }

        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        if (this.table.has(decl.identifier.lexeme)) {
          throw new Error('Name of class already used');
        } else {
          this.table.set(decl.identifier.lexeme, new SymbolEntry(node, this));
          this.scopes.set(node, new ClassScope(decl, this.parent));
        }

        break;
      }

      default: super.handleNode(node);
    }
  }

  build(): void {
    this.node.staticBody.forEach(child => this.handleNode(child));
    this.node.instanceBody.forEach(child => this.handleNode(child));

    this.buildScopes();
  }
}
