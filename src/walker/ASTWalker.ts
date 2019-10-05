import * as grammar from '../grammar';

// TODO: Add scope back to the callbacks
type WalkerCallback = (node: grammar.Node, scope: null, parents: grammar.Node[]) => void;

export class ASTWalker {
  private readonly ast: grammar.Node;

  private readonly parents: grammar.Node[] = [];

  private readonly enterCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  private readonly leaveCallbacks = new Map<grammar.SyntacticToken, WalkerCallback[]>();

  constructor(ast: grammar.Node) {
    this.ast = ast;
  }

  onEnter<T extends grammar.Node>(
    node: new (...args: any[]) => T,
    callback: (node: T, scope: null, parents: grammar.Node[]) => void,
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
    callback: (node: T, scope: null, parents: grammar.Node[]) => void,
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
    this.walkNode(this.ast);
  }

  private walkNode(node: grammar.Node): void {
    // Enter the node
    const enterCallbacks = this.enterCallbacks.get(node.type);
    if (enterCallbacks) {
      enterCallbacks.forEach(callback => callback(node, null, this.parents));
    }

    // The node is a parent of the nodes that are going to be walked
    this.parents.push(node);

    switch (node.type) {
      // Declarations
      case grammar.SyntacticToken.EMPTY_VARIABLE_DECL: {
        const decl = node as grammar.EmptyVariableDeclaration;

        if (decl.variableType) {
          this.walkNode(decl.variableType);
        }

        break;
      }

      case grammar.SyntacticToken.VARIABLE_DECL: {
        const decl = node as grammar.VariableDeclaration;

        if (decl.variableType) {
          this.walkNode(decl.variableType);
        }

        this.walkNode(decl.value);
        break;
      }

      case grammar.SyntacticToken.FUNCTION_DECL: {
        const decl = node as grammar.FunctionDeclaration;

        decl.params.forEach(param => this.walkNode(param));

        if (decl.returnType) {
          this.walkNode(decl.returnType);
        }

        decl.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.CLASS_DECL: {
        const decl = node as grammar.ClassDeclaration;

        decl.extends.forEach(extend => this.walkNode(extend));
        decl.staticBody.forEach(child => this.walkNode(child));
        decl.instanceBody.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.IMPORT_DECL:
        break;

      // Expressions
      case grammar.SyntacticToken.ASSIGNMENT_EXPR: {
        const expr = node as grammar.AssignmentExpression;
        this.walkNode(expr.left);
        this.walkNode(expr.value);
        break;
      }

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
        expr.genericArgs.forEach(generic => this.walkNode(generic));
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
        expr.genericArgs.forEach(generic => this.walkNode(generic));
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

      case grammar.SyntacticToken.IF_EXPR: {
        const expr = node as grammar.IfExpression;
        this.walkNode(expr.condition);
        expr.body.forEach(child => this.walkNode(child));

        if (expr.elseClause) {
          this.walkNode(expr.elseClause);
        }

        break;
      }

      case grammar.SyntacticToken.ELSE_EXPR: {
        const expr = node as grammar.ElseExpression;
        expr.body.forEach(child => this.walkNode(child));
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
        this.walkNode(stmt.expression);
        stmt.cases.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.FOR_STMT: {
        const stmt = node as grammar.ForStatement;

        if (stmt.variableType) {
          this.walkNode(stmt.variableType);
        }

        this.walkNode(stmt.object);
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.WHILE_STMT: {
        const stmt = node as grammar.WhileStatement;
        this.walkNode(stmt.condition);
        stmt.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.RETURN_STMT: {
        const stmt = node as grammar.ReturnStatement;

        if (stmt.expression) {
          this.walkNode(stmt.expression);
        }

        break;
      }

      case grammar.SyntacticToken.YIELD_STMT: {
        const stmt = node as grammar.YieldStatement;
        this.walkNode(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.EXPRESSION_STMT: {
        const stmt = node as grammar.ExpressionStatement;
        this.walkNode(stmt.expression);
        break;
      }

      case grammar.SyntacticToken.BREAK_STMT:
      case grammar.SyntacticToken.CONTINUE_STMT:
        break;

      // Other
      case grammar.SyntacticToken.PROGRAM: {
        const program = node as grammar.Program;
        program.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.SWITCH_CASE: {
        const switchCase = node as grammar.SwitchCase;
        switchCase.conditions.forEach(child => this.walkNode(child));
        switchCase.body.forEach(child => this.walkNode(child));
        break;
      }

      case grammar.SyntacticToken.VARIABLE_TYPE: {
        const variableType = node as grammar.VariableType;
        this.walkNode(variableType.object);
        variableType.generics.forEach(generic => this.walkNode(generic));
        break;
      }

      case grammar.SyntacticToken.FUNCTION_PARAM: {
        const functionParam = node as grammar.FunctionParam;

        if (functionParam.variableType) {
          this.walkNode(functionParam.variableType);
        }

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
      leaveCallbacks.forEach(callback => callback(node, null, this.parents));
    }
  }
}
