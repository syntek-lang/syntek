/* eslint-disable @typescript-eslint/no-use-before-define */

class BooleanStruct {
  readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  toString(): StringStruct {
    return new StringStruct(this.value.toString());
  }

  $toNumber(): NumberStruct {
    return new NumberStruct(this.value ? 1 : 0);
  }

  $toBoolean(): BooleanStruct {
    return this;
  }

  $add(right: NumberStruct): NumberStruct {
    return new NumberStruct(this.$toNumber().$add(right.$toNumber()).value);
  }

  $equals(right: BooleanStruct): BooleanStruct {
    return new BooleanStruct(this.value === right.$toBoolean().value);
  }
}

class StringStruct {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): StringStruct {
    return this;
  }

  $toNumber(): NumberStruct {
    throw new Error('Can\'t turn a string into a number');
  }

  $toBoolean(): BooleanStruct {
    throw new Error('Can\'t turn a string into a boolean');
  }

  $add(): NumberStruct {
    throw new Error('Can\'t add 2 numbers, did you mean String#append?');
  }

  $equals(): BooleanStruct {
    throw new Error('Compare strings with String#equals');
  }
}

class NumberStruct {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): StringStruct {
    return new StringStruct(this.value.toString());
  }

  $toNumber(): NumberStruct {
    return this;
  }

  $toBoolean(): BooleanStruct {
    return new BooleanStruct(this.value !== 0);
  }

  $add(right: NumberStruct): NumberStruct {
    return new NumberStruct(this.value + right.$toNumber().value);
  }

  $equals(right: NumberStruct): BooleanStruct {
    return new BooleanStruct(this.$toNumber() === right.$toNumber());
  }
}

console.log(NumberStruct);
