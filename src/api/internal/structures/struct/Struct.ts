import DataType from '../DataType';

interface Struct {
  /**
   * The type of the structure
   */
  type: DataType;

  /**
   * Get a property of the structure. Called when accessing object properties: `a.b`
   *
   * @param name - The name of the property
   * @returns The property
   */
  getProperty(name: string): Struct;

  /**
   * Set a property of the structure. Called when assigning object properties: `a.b = 5`
   *
   * @param name - The name of the property
   * @param value - The value to assign the property with
   */
  setProperty(name: string, value: Struct): void;

  /**
   * Execute the structure. Called when making a function call on a variable: `a()`
   *
   * @param params - An array of parameters to pass on to the structure
   * @returns A structure if the function returns one, else nothing
   */
  exec(params: Struct[]): any;

  /**
   * Create a new instance of the structure. Called when creating an instance of a class:
   * `new MyClass()`
   *
   * @param params - An array of parameters to pass on to the structure
   * @returns A new structure representing an instance of the previous
   */
  createNew(params: Struct[]): Struct;

  /**
   * Turn the structure into a string when serializing an object
   *
   * @returns A JavaScript value that represents the structure, or undefined if it should be skipped
   */
  toJson(): string | number | object | null | undefined;

  /**
   * Turn the structure into a string
   *
   * @returns The string representation of the structure
   */
  toString(): string;

  /**
   * Turn the structure into a number
   *
   * @returns The number representation of the structure
   */
  toNumber(): number;
}

export default Struct;
