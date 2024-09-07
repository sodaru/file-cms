import { NoRootDirSetError } from "./errors/NoRootDirSetError";
import { UnknownFilterProviderError } from "./errors/UnknownFilterProviderError";
import { defaultProviders } from "./internal/filterProviders";
import { FilterProvider } from "./types";

export class Config {
  private static rootDir: string;
  private static filterProviders: Record<string, FilterProvider> = {
    ...defaultProviders
  };

  static setRootDir(rootDir: string) {
    this.rootDir = rootDir;
  }

  static getRootDir() {
    if (typeof this.rootDir == "string") {
      return this.rootDir;
    }
    throw new NoRootDirSetError();
  }

  static setFilterProvider(name: string, provider: FilterProvider) {
    this.filterProviders[name] = provider;
  }

  static getFilterProvider(name: string) {
    if (this.filterProviders[name] === undefined) {
      throw new UnknownFilterProviderError(name);
    }
    return this.filterProviders[name];
  }
}
