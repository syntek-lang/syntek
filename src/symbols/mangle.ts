import {
  FunctionDeclaration, EmptyFunctionDeclaration,
  Identifier, MemberExpression,
  Constructor, GenericParam,
  VariableType, SyntacticToken,
} from '../grammar';

type Func = FunctionDeclaration | EmptyFunctionDeclaration;

function variableTypeObjectToString(node: Identifier | MemberExpression): string {
  if (node.type === SyntacticToken.IDENTIFIER) {
    return (node as Identifier).lexeme;
  }

  const expr = node as MemberExpression;
  return `${variableTypeObjectToString(expr.object as any)}.${expr.property.lexeme}`;
}

function mangleVariableType(type: VariableType, generics: GenericParam[]): string {
  let mangle = variableTypeObjectToString(type.object);

  // Find a generic that equals the mangle
  const genericType = generics.find(generic => generic.identifier.lexeme === mangle);

  // If there is such a generic, change the mangle
  if (genericType) {
    // If the generic extends a type, use that
    // Otherwise default to Object
    //
    // function <T> foo(t: T) -> function foo(t: Object)
    // function <T extends E> foo(t: T) -> function foo(t: E)
    if (genericType.extend) {
      mangle = mangleVariableType(genericType.extend, generics);
    } else {
      mangle = 'Object';
    }
  }

  if (type.generics.length) {
    mangle += '<';

    type.generics.forEach((generic) => {
      mangle += mangleVariableType(generic, generics);
    });

    mangle += '>';
  }

  if (type.arrayDepth) {
    mangle += '['.repeat(type.arrayDepth);
  }

  return mangle;
}

export function mangleFunctionName(node: Func): string {
  let mangle = `${node.identifier.lexeme}-`;

  mangle += node.params
    .map(param => mangleVariableType(param.variableType, node.genericParams))
    .join('-');

  return mangle;
}

export function mangleConstructor(node: Constructor, generics: GenericParam[]): string {
  return node.params
    .map(param => mangleVariableType(param.variableType, generics))
    .join('-');
}
