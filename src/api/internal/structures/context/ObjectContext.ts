import Context from './Context';

export default class ObjectContext extends Context {
  /**
   * The context outside of the object context
   */
  readonly outerContext: Context;

  /**
   * Create a new context object for objects. This does not contain an upper context,
   * which allows objects to also declare variables that are also in the upper scope
   *
   * @param outerContext - The context outside of the object context. In theory the
   * same as uppercontext.
   */
  constructor(outerContext: Context) {
    super();

    this.outerContext = outerContext;
  }

  /**
   * Create a child of the object context. This returns a child of the outer context,
   * such that functions have access to the outer scope instead of the object scope
   *
   * @returns A child of the outer scope
   */
  createChild(): Context {
    return this.outerContext.createChild();
  }
}
