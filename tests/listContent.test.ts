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

  test("Filter content by date range", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({
      ReleasedateFrom: "2024-06-01",
      ReleasedateTo: "2024-08-31"
    });
    expect(contents).toMatchSnapshot();
  });

  test("Filter content by keywords", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({
      tags: { has: "JavaScript" }
    });
    expect(contents).toMatchSnapshot();
  });
  test("Filter content by author", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ author: "Alice Smith" });
    expect(contents).toMatchSnapshot();
  });
  test("Check listing all content without filters", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({});
    expect(contents).toMatchSnapshot();
  });
  test("Check sorting by date", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({ sortBy: "date", order: "asc" });
    expect(contents).toMatchSnapshot();
  });
  test("Filter content by type and keyword", async () => {
    Config.setRootDir(commonRootDir);
    const contents = await listContent({
      type: "product",
      title: "Noise-Canceling Headphones"
    });
    expect(contents).toMatchSnapshot();
  });
});
