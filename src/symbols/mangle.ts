import {
  FunctionDeclaration, EmptyFunctionDeclaration,
  Identifier, MemberExpression,
  Constructor,
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

function mangleVariableType(type: VariableType, generics?: string[]): string {
  let mangle = variableTypeObjectToString(type.object);

  if (generics && generics.includes(mangle)) {
    mangle = generics.indexOf(mangle).toString();
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
  let mangle = node.identifier.lexeme;
  const generics = node.genericParams.map(generic => generic.identifier.lexeme);

  node.params.forEach((param) => {
    mangle += `-${mangleVariableType(param.variableType, generics)}`;
  });

  return mangle;
}

export function mangleConstructor(node: Constructor): string {
  return node.params.map(param => mangleVariableType(param.variableType)).join('-');
}
