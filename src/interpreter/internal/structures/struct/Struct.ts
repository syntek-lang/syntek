interface Struct {
  getProperty(name: string): Struct;

  setProperty(name: string, value: Struct): void;

  callMethod(name: string, params: Struct[]): Struct;

  createNew(params: Struct[]): Struct;
}

export default Struct;
