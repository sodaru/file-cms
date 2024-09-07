import { Config } from "../src/Config";

describe("Test Config", () => {
  test("get without set", () => {
    expect(() => Config.getRootDir()).toThrow(
      "rootDir not set. Please set the rootDir using Config.setRootDir(rootDir) method. rootDir is the path where the content is stored"
    );
  });

  test("get with set", () => {
    expect(Config.setRootDir("/a/b/c")).toBeUndefined();
    expect(Config.getRootDir()).toEqual("/a/b/c");
  });
});
