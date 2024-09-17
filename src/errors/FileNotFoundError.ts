export class FileNotFoundError extends Error {
  private _rootDir: string;
  private _path: string;
  private _cause: Error;
  constructor(rootDir: string, path: string, cause: Error) {
    super(`File Not Found, rootDir = ${rootDir}, path = ${path}`);
    this._rootDir = rootDir;
    this._path = path;
    this._cause = cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get rootDir() {
    return this._rootDir;
  }

  get path() {
    return this._path;
  }

  get cause() {
    return this._cause;
  }
}
