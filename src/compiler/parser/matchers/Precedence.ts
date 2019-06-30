export enum Precedence {
  OP1,
  OP2, // Variable Declaration
  OP3, // or
  OP4, // and
  OP5, // is, is not
  OP6, // is less than, is greater than, Instanceof Expression
  OP7, // Addition, Subtraction
  OP8, // Multiplication, Division, Remainder
  OP9, // Exponentiation
  OP10, // Unary Expression, Async Expression
  OP11, // Member Expression, Index Expression, New Expression, Call Expression
  OP12, // Wrapped Expression
}
