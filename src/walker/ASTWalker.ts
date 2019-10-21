import * as grammar from '../grammar';

import { Scope } from '../scope';
import { WalkerContext } from './WalkerContext';

type WalkerCallback = (node: grammar.Node, context: WalkerContext) => void;

export class ASTWalker {
  private readonly ast: grammar.Node;

  private readonly scope?: Scope;

  private readonly parents: grammar.Node[] = [];

  private readonly enterCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  private readonly leaveCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  constructor(ast: grammar.Node, scope?: Scope) {
    this.ast = ast;
    this.scope = scope;
  }

  onEnter<T extends grammar.Node>(
    node: new (...args: any[]) => T,
    callback: (node: T, context: WalkerContext) => void,
  ): ASTWalker {
    const type = grammar.NODES.get(node);

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
    callback: (node: T, context: WalkerContext) => void,
  ): ASTWalker {
    const type = grammar.NODES.get(node);

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
    this.walkNode(this.ast, new WalkerContext(this.parents, this.scope));
  }

  private walkNode(node: grammar.Node, context: WalkerContext): void {
    // Enter the node
    const enterCallbacks = this.enterCallbacks.get(node.type);
    if (enterCallbacks) {
      enterCallbacks.forEach(callback => callback(node, context));
    }

    // The node is a parent of the nodes that are going to be walked
    this.parents.push(node);

    // newContext is the context that for the children of the current node
    // For instance, if node is a for statement it will be blockscope
    // If the node has no scope of it's own, like an import declaration, it uses the existing scope
    let newContext = context;
    if (context.hasScope() && context.getScope().hasOwnScope(node)) {
      newContext = new WalkerContext(context.parents, context.getScope().getOwnScope(node));
    }

    // Shorthand method that calls walkNode with the context
    const walk = (nodeToWalk: grammar.Node): void => this.walkNode(nodeToWalk, newContext);

    switch (node.type) {
      // Declarations
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = node as grammar.EmptyVariableDeclaration;

        if (decl.variableType) {
          walk(decl.variableType);
        }

        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = node as grammar.VariableDeclaration;

        if (decl.variableType) {
          walk(decl.variableType);
        }

        walk(decl.value);
        break;
      }

      case grammar.SyntacticToken.EMPTY_FUNCTION_DECL: {
        const decl = node as grammar.EmptyFunctionDeclaration;
        decl.params.forEach(walk);

        if (decl.returnType) {
          walk(decl.returnType);
        }

        break;
      }

      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;
        decl.params.forEach(walk);

        if (decl.returnType) {
          walk(decl.returnType);
        }

        decl.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;
        decl.extends.forEach(walk);
        decl.constructors.forEach(walk);
        decl.staticBody.forEach(walk);
        decl.instanceBody.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.IMPORT_DECL:
        break;

      // Expressions
      case grammar.SyntacticToken.ASSIGNMENT_EXPR: {
        const expr = node as grammar.AssignmentExpression;
        walk(expr.left);
        walk(expr.value);
        break;
      }

      case grammar.SyntacticToken.WRAPPED_EXPR: {
        const expr = node as grammar.WrappedExpression;
        walk(expr.expression);
        break;
      }

      case grammar.SyntacticToken.UNARY_EXPR: {
        const expr = node as grammar.UnaryExpression;
        walk(expr.right);
        break;
      }

      case grammar.SyntacticToken.BINARY_EXPR: {
        const expr = node as grammar.BinaryExpression;
        walk(expr.left);
        walk(expr.right);
        break;
      }

      case grammar.SyntacticToken.CALL_EXPR: {
        const expr = node as grammar.CallExpression;
        walk(expr.object);
        expr.genericArgs.forEach(walk);
        expr.params.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.INDEX_EXPR: {
        const expr = node as grammar.IndexExpression;
        walk(expr.object);
        walk(expr.index);
        break;
      }

      case grammar.SyntacticToken.MEMBER_EXPR: {
        const expr = node as grammar.MemberExpression;
        walk(expr.object);
        break;
      }

      case grammar.SyntacticToken.NEW_EXPR: {
        const expr = node as grammar.NewExpression;
        walk(expr.object);
        expr.genericArgs.forEach(walk);
        expr.params.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.INSTANCEOF_EXPR: {
        const expr = node as grammar.InstanceofExpression;
        walk(expr.left);
        walk(expr.right);
        break;
      }

      case grammar.SyntacticToken.ASYNC_EXPR: {
        const expr = node as grammar.AsyncExpression;
        walk(expr.expression);
        break;
      }

      case grammar.SyntacticToken.ARRAY_EXPR: {
        const expr = node as grammar.ArrayExpression;
        expr.content.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.IF_EXPR: {
        const expr = node as grammar.IfExpression;
        walk(expr.condition);
        expr.body.forEach(walk);

        if (expr.elseClause) {
          walk(expr.elseClause);
        }

        break;
      }

      case grammar.SyntacticToken.ELSE_EXPR: {
        const expr = node as grammar.ElseExpression;
        expr.body.forEach(walk);
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
        walk(stmt.expression);
        stmt.cases.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = node as grammar.ForStatement;

        if (stmt.variableType) {
          walk(stmt.variableType);
        }

        walk(stmt.object);
        stmt.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const stmt = node as grammar.WhileStatement;
        walk(stmt.condition);
        stmt.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.RETURN_STMT: {
        const stmt = node as grammar.ReturnStatement;

        if (stmt.expression) {
          walk(stmt.expression);
        }

        break;
      }

      case grammar.SyntacticToken.YIELD_STMT: {
        const stmt = node as grammar.YieldStatement;
        walk(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.EXPRESSION_STMT: {
        const stmt = node as grammar.ExpressionStatement;
        walk(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.BREAK_STMT:
      case grammar.SyntacticToken.CONTINUE_STMT:
        break;

      // Other
      case grammar.SyntacticToken.PROGRAM: {
        const program = node as grammar.Program;
        program.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.SWITCH_CASE: {
        const switchCase = node as grammar.SwitchCase;
        switchCase.conditions.forEach(walk);
        switchCase.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.VARIABLE_TYPE: {
        const variableType = node as grammar.VariableType;
        walk(variableType.object);
        variableType.generics.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.PARAMETER: {
        const functionParam = node as grammar.Parameter;
        walk(functionParam.variableType);
        break;
      }

      case grammar.SyntacticToken.CONSTRUCTOR: {
        const constructor = node as grammar.Constructor;
        constructor.params.forEach(walk);
        constructor.body.forEach(walk);
        break;
      }

      case grammar.SyntacticToken.CLASS_PROP: {
        const prop = node as grammar.ClassProp;
        walk(prop.value);
        break;
      }

      default:
        throw new Error(`Can't walk node of type ${grammar.SyntacticToken[node.type]}`);
    }

    // The node is longer a parent
    this.parents.pop();

    // Leave the node
    const leaveCallbacks = this.leaveCallbacks.get(node.type);
    if (leaveCallbacks) {
      leaveCallbacks.forEach(callback => callback(node, context));
    }
  }
}
