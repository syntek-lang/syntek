import {
  Scope, FunctionScope,
  SymbolTable, SymbolEntry,
} from '../..';
import * as grammar from '../../../grammar';

export class ClassScope extends Scope<grammar.ClassDeclaration> {
  constructor(node: grammar.ClassDeclaration, parent?: Scope) {
    super(node, parent, new SymbolTable());
  }

  handleNode(node: grammar.Node): void {
    switch (node.type) {
      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        if (this.table.has(decl.identifier.lexeme)) {
          throw new Error('Name of function already used');
        } else {
          this.table.set(decl.identifier.lexeme, new SymbolEntry(decl.identifier, this));
          this.scopes.set(node, new FunctionScope(decl, this.parent));
        }

        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        if (this.table.has(decl.identifier.lexeme)) {
          throw new Error('Name of class already used');
        } else {
          this.table.set(decl.identifier.lexeme, new SymbolEntry(decl.identifier, this));
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
