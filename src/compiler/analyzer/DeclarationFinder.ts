import * as grammar from '../../grammar';
import { ASTWalker } from '../../walker';
import { Span } from '../../position';

import { Scope } from './scopes/Scope';
import { FileScope } from './scopes/FileScope';
import { BlockScope } from './scopes/BlockScope';

export class DeclarationFinder {
  readonly fileScope: FileScope;

  private readonly walker: ASTWalker;

  private currentScope: Scope;

  constructor(ast: grammar.Node) {
    this.fileScope = new FileScope(ast.span);
    this.walker = new ASTWalker(ast);
    this.currentScope = this.fileScope;

    this.handleDeclarations();
    this.handleBlockScope();
  }

  search(): FileScope {
    this.walker.walk();
    return this.fileScope;
  }

  private handleDeclarations(): void {
    this.walker
      .onEnter(grammar.ImportDeclaration, (node) => {
        this.currentScope.imports.push(node);
      })
      .onEnter(grammar.ClassDeclaration, (node) => {
        this.currentScope.classes.push(node);
      })
      .onEnter(grammar.VariableDeclaration, (node) => {
        this.currentScope.variables.push(node);
      })
      .onEnter(grammar.AssignmentExpression, (node) => {
        this.currentScope.variables.push(node);
      })
      .onEnter(grammar.FunctionDeclaration, (node) => {
        this.currentScope.functions.push(node);
      });
  }

  private handleBlockScope(): void {
    // Shorthand functions to handle scope changes
    const addBlock = (span: Span): void => {
      const newScope = new BlockScope(this.currentScope, span);
      this.currentScope.branches.push(newScope);
      this.currentScope = newScope;
    };

    const enterBlock = (node: grammar.Node): void => addBlock(node.span);
    const leaveBlock = (): void => {
      this.currentScope = this.currentScope.getParent();
    };

    // Scope of the parents of else and catch statements
    const parentScopes: Scope[] = [];

    // Assign listeners
    this.walker
      .onEnter(grammar.IfStatement, node => addBlock(node.ifSpan))
      .onLeave(grammar.IfStatement, leaveBlock)

      .onEnter(grammar.ElseStatement, (node) => {
        // Else statements have their if statement as a parent, but the scope should behave
        // as if it's a branch of the scope outside the if statement
        const newScope = new BlockScope(this.currentScope.getParent(), node.span);
        this.currentScope.getParent().branches.push(newScope);

        parentScopes.push(this.currentScope);
        this.currentScope = newScope;
      })
      .onLeave(grammar.ElseStatement, () => {
        // The last scope is the scope of the if this else belongs to
        this.currentScope = parentScopes.pop() as Scope;
      })

      // Switch statements don't have a scope, switch cases do
      .onEnter(grammar.SwitchCase, enterBlock)
      .onLeave(grammar.SwitchCase, leaveBlock)

      .onEnter(grammar.ForStatement, enterBlock)
      .onLeave(grammar.ForStatement, leaveBlock)

      .onEnter(grammar.RepeatStatement, enterBlock)
      .onLeave(grammar.RepeatStatement, leaveBlock)

      .onEnter(grammar.WhileStatement, enterBlock)
      .onLeave(grammar.WhileStatement, leaveBlock)

      .onEnter(grammar.TryStatement, enterBlock)
      .onLeave(grammar.TryStatement, leaveBlock)

      .onEnter(grammar.CatchStatement, (node) => {
        // Same as with else statements. Catch is a child of try, but has a separate branch
        const newScope = new BlockScope(this.currentScope.getParent(), node.span);
        this.currentScope.getParent().branches.push(newScope);

        parentScopes.push(this.currentScope);
        this.currentScope = newScope;
      })
      .onLeave(grammar.CatchStatement, () => {
        // The last scope is the scope of the try statement this catch belong to
        this.currentScope = parentScopes.pop() as Scope;
      });
  }
}
