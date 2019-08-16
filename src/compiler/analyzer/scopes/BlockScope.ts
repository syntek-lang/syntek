import { Scope, SymbolEntry } from '../..';

import * as grammar from '../../../grammar';

export class BlockScope extends Scope {
  build(): void {
    switch (this.node.type) {
      case grammar.SyntacticToken.IF_STMT: {
        const node = this.node as grammar.IfStatement;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.ELSE_STMT: {
        const node = this.node as grammar.ElseStatement;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.SWITCH_CASE: {
        const node = this.node as grammar.SwitchCase;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.FOR_STMT: {
        const node = this.node as grammar.ForStatement;

        if (!this.table.has(node.identifier.lexeme)) {
          this.table.set(node.identifier.lexeme, new SymbolEntry(node, this));
        }

        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.REPEAT_STMT: {
        const node = this.node as grammar.RepeatStatement;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const node = this.node as grammar.WhileStatement;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.TRY_STMT: {
        const node = this.node as grammar.TryStatement;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.CATCH_STMT: {
        const node = this.node as grammar.CatchStatement;

        if (!this.table.has(node.identifier.lexeme)) {
          this.table.set(node.identifier.lexeme, new SymbolEntry(node, this));
        }

        node.body.forEach(child => this.handleNode(child));
        break;
      }

      case grammar.SyntacticToken.PROGRAM: {
        const node = this.node as grammar.Program;
        node.body.forEach(child => this.handleNode(child));
        break;
      }

      default: break;
    }

    this.buildScopes();
  }
}
