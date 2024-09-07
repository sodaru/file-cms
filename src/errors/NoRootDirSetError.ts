export class NoRootDirSetError extends Error {
  constructor() {
    super(
      `rootDir not set. Please set the rootDir using Config.setRootDir(rootDir) method. rootDir is the path where the content is stored`
    );
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
