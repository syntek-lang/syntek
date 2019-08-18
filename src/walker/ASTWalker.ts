import * as grammar from '../grammar';
import { Scope } from '../compiler';

type WalkerCallback = (node: grammar.Node, scope: Scope, parents: grammar.Node[]) => void;

export class ASTWalker {
  private readonly ast: grammar.Node;

  private scope: Scope;

  private readonly parents: grammar.Node[] = [];

  private readonly enterCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  private readonly leaveCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  constructor(ast: grammar.Node, scope: Scope) {
    this.ast = ast;
    this.scope = scope;
  }

  onEnter<T extends grammar.Node>(
    node: new (...args: any[]) => T,
    callback: (node: T, scope: Scope, parents: grammar.Node[]) => void,
  ): ASTWalker {
    const type = grammar.NODE_TYPE.get(node);
    if (type === undefined) {
      throw new Error('Unable to listen for node');
    }

    const callbacks = this.enterCallbacks.get(type) || [];
    // Cast to WalkerCallback to prevent errors, as the compiler can't guarantee
    // the type of node matches T when calling the callback
    callbacks.push(callback as WalkerCallback);

    this.enterCallbacks.set(type, callbacks);
    return this;
  }

  onLeave<T extends grammar.Node>(
    node: new (...args: any[]) => T,
    callback: (node: T, scope: Scope, parents: grammar.Node[]) => void,
  ): ASTWalker {
    const type = grammar.NODE_TYPE.get(node);
    if (type === undefined) {
      throw new Error('Unable to listen for node');
    }

    const callbacks = this.leaveCallbacks.get(type) || [];
    // Reason for casting in onEnter method
    callbacks.push(callback as WalkerCallback);

    this.leaveCallbacks.set(type, callbacks);
    return this;
  }

  walk(): void {
    // Walk the ast
    this.walkNode(this.ast);
  }

  private walkNode(node: grammar.Node): void {
    // Enter the node
    const enterCallbacks = this.enterCallbacks.get(node.type);
    if (enterCallbacks) {
      enterCallbacks.forEach(callback => callback(node, this.scope, this.parents));
    }

    // The node is a parent of the nodes that are going to be walked
    this.parents.push(node);

    // Change the current scope if necessary
    const scope = this.scope;
    if (this.scope.hasOwnScope(node)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.scope = this.scope.getOwnScope(node)!;
    }

    switch (node.type) {
      // Program
      case grammar.SyntacticToken.PROGRAM: {
        const program = node as grammar.Program;
        program.body.forEach(child => this.walkNode(child));
        break;
      }

      // Declarations
      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = node as grammar.VariableDeclaration;

        if (decl.variableType) {
          this.walkNode(decl.variableType.type);
        }

        this.walkNode(decl.value);
        break;
      }

      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        decl.params.forEach((param) => {
          if (param.variableType) {
            this.walkNode(param.variableType.type);
          }
        });

        if (decl.returnType) {
          this.walkNode(decl.returnType.type);
        }

        decl.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        // TODO: Walk extends

        decl.staticBody.forEach(child => this.walkNode(child));
        decl.instanceBody.forEach(child => this.walkNode(child));
        break;
      }

      // Expressions
      case grammar.SyntacticToken.WRAPPED_EXPR: {
        const expr = node as grammar.WrappedExpression;
        this.walkNode(expr.expression);
        break;
      }

      case grammar.SyntacticToken.UNARY_EXPR: {
        const expr = node as grammar.UnaryExpression;
        this.walkNode(expr.right);
        break;
      }

      case grammar.SyntacticToken.BINARY_EXPR: {
        const expr = node as grammar.BinaryExpression;
        this.walkNode(expr.left);
        this.walkNode(expr.right);
        break;
      }

      case grammar.SyntacticToken.CALL_EXPR: {
        const expr = node as grammar.CallExpression;
        this.walkNode(expr.object);
        expr.params.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.INDEX_EXPR: {
        const expr = node as grammar.IndexExpression;
        this.walkNode(expr.object);
        this.walkNode(expr.index);
        break;
      }

      case grammar.SyntacticToken.MEMBER_EXPR: {
        const expr = node as grammar.MemberExpression;
        this.walkNode(expr.object);
        break;
      }

      case grammar.SyntacticToken.NEW_EXPR: {
        const expr = node as grammar.NewExpression;
        this.walkNode(expr.object);
        expr.params.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.INSTANCEOF_EXPR: {
        const expr = node as grammar.InstanceofExpression;
        this.walkNode(expr.left);
        this.walkNode(expr.right);
        break;
      }

      case grammar.SyntacticToken.ASYNC_EXPR: {
        const expr = node as grammar.AsyncExpression;
        this.walkNode(expr.expression);
        break;
      }

      case grammar.SyntacticToken.ARRAY_EXPR: {
        const expr = node as grammar.ArrayExpression;
        expr.content.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.OBJECT_EXPR: {
        const expr = node as grammar.ObjectExpression;
        expr.props.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.ASSIGNMENT_EXPR: {
        const expr = node as grammar.AssignmentExpression;
        this.walkNode(expr.left);
        this.walkNode(expr.value);
        break;
      }

      // Statements
      case grammar.SyntacticToken.IF_STMT: {
        const stmt = node as grammar.IfStatement;
        this.walkNode(stmt.condition);
        stmt.body.forEach(child => this.walkNode(child));

        if (stmt.elseClause) {
          this.walkNode(stmt.elseClause);
        }

        break;
      }

      case grammar.SyntacticToken.ELSE_STMT: {
        const stmt = node as grammar.ElseStatement;
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.SWITCH_STMT: {
        const stmt = node as grammar.SwitchStatement;
        this.walkNode(stmt.expression);
        stmt.cases.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.SWITCH_CASE: {
        const switchCase = node as grammar.SwitchCase;
        switchCase.conditions.forEach(child => this.walkNode(child));
        switchCase.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = node as grammar.ForStatement;

        if (stmt.variableType) {
          this.walkNode(stmt.variableType.type);
        }

        this.walkNode(stmt.object);
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.REPEAT_STMT: {
        const stmt = node as grammar.RepeatStatement;
        this.walkNode(stmt.amount);
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const stmt = node as grammar.WhileStatement;
        this.walkNode(stmt.condition);
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.TRY_STMT: {
        const stmt = node as grammar.TryStatement;
        stmt.body.forEach(child => this.walkNode(child));
        this.walkNode(stmt.catchStmt);
        break;
      }

      case grammar.SyntacticToken.CATCH_STMT: {
        const stmt = node as grammar.CatchStatement;

        if (stmt.variableType) {
          this.walkNode(stmt.variableType.type);
        }

        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.THROW_STMT: {
        const stmt = node as grammar.ThrowStatement;
        this.walkNode(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.RETURN_STMT: {
        const stmt = node as grammar.ReturnStatement;

        if (stmt.expression) {
          this.walkNode(stmt.expression);
        }

        break;
      }

      case grammar.SyntacticToken.EXPRESSION_STMT: {
        const stmt = node as grammar.ExpressionStatement;
        this.walkNode(stmt.expression);
        break;
      }

      // Node does not need to be walked
      default: break;
    }

    // The node is longer a parent
    this.parents.pop();

    // Put the scope back
    this.scope = scope;

    // Leave the node
    const leaveCallbacks = this.leaveCallbacks.get(node.type);
    if (leaveCallbacks) {
      leaveCallbacks.forEach(callback => callback(node, this.scope, this.parents));
    }
  }
}
