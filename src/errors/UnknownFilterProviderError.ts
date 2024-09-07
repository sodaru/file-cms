export class UnknownFilterProviderError extends Error {
  private _name: string;
  constructor(name: string) {
    super(`FilterProvider for '${name}' is not found`);
    this._name = name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get name() {
    return this._name;
  }
}
