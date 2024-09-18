import path from "path";
import { Config } from "../src/Config";
import { listContent } from "../src/listContent";

const commonRootDir = path.join(__dirname, "sample-data");
describe("listContent Tests", () => {
  test("Filter content by non-existent type", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ type: "nonexistentType" });
    expect(contents).toHaveLength(0);
  });
  test("Filter content by type", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ type: "blog" });
    expect(contents).toMatchSnapshot();
  });
  test("Filter content by type with no results", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ type: "non-existent-type" });
    expect(contents).toEqual([]);
  });

  test("return title of all slugs", async () => {
    Config.setRootDir(commonRootDir);
    const slug = await listContent({}, ["title"]);
    slug.sort((a, b) => (a.title as string)?.localeCompare(b.title as string));
    expect(slug).toMatchSnapshot();
  });
  test("Filter content matching in title", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ title: "JavaScript" });
    expect(contents).toMatchSnapshot();
  });

  test("Filter content by keyword in title", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ title: { contains: "JavaScript" } });
    expect(contents).toMatchSnapshot();
  });

  test("Filter content by keywords", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({
      tags: { has: "JavaScript" }
    });
    expect(contents).toMatchSnapshot();
  });
  test("Filter content by meta key", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ author: "Alice Smith" });
    expect(contents).toMatchSnapshot();
  });
  test("Check listing all content without filters", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({});
    expect(contents).toMatchSnapshot();
  });

  test("Filter content by type and meta", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({
      type: "product",
      title: "Noise-Canceling Headphones"
    });
    expect(contents).toMatchSnapshot();
  });

  test("Sort", async () => {
    Config.setRootDir(commonRootDir);
    await expect(
      listContent({}, ["title"], (a, b) => {
        return b.type.localeCompare(a.type);
      })
    ).resolves.toMatchSnapshot();
  });
});
