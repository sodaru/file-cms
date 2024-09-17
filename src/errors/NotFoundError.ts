export class NotFoundError extends Error {
  private _rootDir: string;
  private _type: string;
  private _slug: string;
  private _cause: Error;
  constructor(rootDir: string, type: string, slug: string, cause: Error) {
    super(
      `Content Not Found, rootDir = ${rootDir}, type = ${type},  slug = ${slug}`
    );
    this._rootDir = rootDir;
    this._type = type;
    this._slug = slug;
    this._cause = cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get rootDir() {
    return this._rootDir;
  }

  get type() {
    return this._type;
  }

  get slug() {
    return this._slug;
  }

  get cause() {
    return this._cause;
  }
}
