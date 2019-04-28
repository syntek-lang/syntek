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
   * Execute the structure. Called when making a function call on a variable: `a()`
   *
   * @param params - An array of parameters to pass on to the structure
   * @returns A structure if the function returns one, else nothing
   */
  exec(params: Struct[]): any;

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
