import { Token, TokenClass, DeclarationToken } from '../token';
import { FunctionDeclaration } from '../../tokens/parsing/declarations/FunctionDeclaration';
import { ClassDeclaration } from '../../tokens/parsing/declarations/ClassDeclaration';
import Program from '../../tokens/parsing/Program';

import { Symbol } from '../../tokens/lexing/literals/Symbol';

const scopes: TokenClass[] = [
  FunctionDeclaration,
  ClassDeclaration,
  Program,
];

export default class SymbolTable {
  readonly symbols: { token: DeclarationToken | Symbol, scope: Token }[] = [];

  /**
   * Add a token to the symbol table
   *
   * @param token - The token to add
   * @param scope - The scope the variable is declared in
   */
  add(token: DeclarationToken | Symbol, scope: Token): void {
    this.symbols.push({ token, scope });
  }

  /**
   * Get the symbols declared in a given scope
   *
   * @param scope - The scope to get the variables of
   * @param ancestors - The ancestors to get the variables of, returning all accessible variables
   */
  getSymbols(scope?: Token, ancestors?: Token[]): (DeclarationToken | Symbol)[] {
    if (scope && ancestors) {
      return this.symbols
        .filter(symbol => symbol.scope === scope || ancestors.indexOf(symbol.scope) > -1)
        .map(symbol => symbol.token);
    }

    if (scope) {
      return this.symbols
        .filter(symbol => symbol.scope === scope)
        .map(symbol => symbol.token);
    }

    return this.symbols.map(symbol => symbol.token);
  }

  /**
  * Get the nearest scope in a list of ancestor tokens
  *
  * @param ancestors - The ancestors to get the scope of
  */
  getScope(ancestors: Token[]): Token {
    let i = ancestors.length - 1;

    while (i >= 0) {
      if (scopes.some(scope => ancestors[i] instanceof scope)) {
        return ancestors[i];
      }

      i -= 1;
    }

    return ancestors[0];
  }
}
