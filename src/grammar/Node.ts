import { Token, SyntacticToken } from '.';
import { Span } from '../position';

export abstract class Node {
  readonly type: SyntacticToken;

  readonly span: Span;

  constructor(type: SyntacticToken, span: Span) {
    this.type = type;
    this.span = span;
  }
}

export abstract class DeclarationNode extends Node {
  readonly identifier: Token;

  constructor(identifier: Token, type: SyntacticToken, span: Span) {
    super(type, span);

    this.identifier = identifier;
  }
}
