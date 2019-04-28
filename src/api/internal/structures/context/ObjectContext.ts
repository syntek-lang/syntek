import Context from './Context';

export default class ObjectContext extends Context {
  readonly outerContext: Context;

  constructor(outerContext: Context) {
    super();

    this.outerContext = outerContext;
  }

  createChild() {
    return this.outerContext.createChild();
  }
}
