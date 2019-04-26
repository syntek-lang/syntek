import { DeclarationHandler, LiteralHandler, MathHandler } from './handlers';

export default class Syntek {
  readonly declarationHandler = new DeclarationHandler();

  readonly literalHandler = new LiteralHandler();

  readonly mathHandler = new MathHandler();

  run() {
    const vars = this.declarationHandler.variables;

    vars.main.call();
  }
}
