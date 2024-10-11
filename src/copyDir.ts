import { dirname, join, relative } from "path";
import { Config } from "./Config";
import { copyFile, mkdir, readdir, stat } from "fs/promises";

export const copyDir = async (sourceDir: string, targetDir: string) => {
  const rootDir = Config.getRootDir();
  const fullSourceDir = join(rootDir, sourceDir);
  const dirsToCopy = [fullSourceDir];
  while (dirsToCopy.length > 0) {
    const dirToCopy = dirsToCopy.shift();
    const files = await readdir(dirToCopy);
    await Promise.all(
      files.map(async file => {
        const fileOrDirPath = join(dirToCopy, file);
        const stats = await stat(fileOrDirPath);
        if (stats.isDirectory()) {
          dirsToCopy.push(fileOrDirPath);
        } else {
          const targetPath = join(
            targetDir,
            relative(fullSourceDir, fileOrDirPath)
          );
          const targetDirname = dirname(targetPath);
          await mkdir(targetDirname, { recursive: true });
          await copyFile(fileOrDirPath, targetPath);
        }
      })
    );
  }
};
