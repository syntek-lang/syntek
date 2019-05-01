const variables: any = {
  print: {
    type: 'function',
    value: {
      call(...parameters) {
        console.log(...parameters.map(param => param.value.toString()));
      },
    },
  },
  main() {
    variables.printValues = {
      type: 'function',
      value: {
        call() {
          variables.sum = {
            type: 'variable',
            value: {
              num: 5,
              toString() {
                return this.num;
              },
            },
          };

          variables.print.value.call(variables.sum);

          const temp = variables.sum;
          variables.sum = {
            type: 'variable',
            value: {
              num: temp.value + 10,
              toString() {
                return this.num;
              },
            },
          };

          variables.print.value.call(variables.sum);
        },
      },
    };

    variables.printValues.value.call();
  },
};

variables.main();
