import path from "path";
import { Config } from "../src/Config";
import { getContent } from "../src/getContent";

const commonRootDir = path.join(__dirname, "sample-data");

describe("getContent Tests", () => {
  test("Check title is returned", async () => {
    Config.setRootDir(commonRootDir);
    const blog1 = await getContent("blog", "blog-1");
    expect(blog1.title).toEqual("Understanding JavaScript Closures");
  });
  test("Check author is returned", async () => {
    Config.setRootDir(commonRootDir);
    const blog1 = await getContent("blog", "blog-1");
    expect(blog1.author).toEqual("Alice Smith");
  });
  test("Check date is returned", async () => {
    Config.setRootDir(commonRootDir);
    const blog1 = await getContent("blog", "blog-1");
    expect(blog1.date).toEqual("2024-08-12");
  });
  test("Check tags is returned", async () => {
    Config.setRootDir(commonRootDir);
    const blog1 = await getContent("blog", "blog-1");
    expect(blog1.tags).toEqual(["JavaScript", "Programming"]);
  });
  test("Check missing attributes", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1");
    expect(content).not.toHaveProperty("nonexistentAttribute");
  });
  test("Check extra attributes", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1");
    expect(content).toHaveProperty("type");
    expect(content).toHaveProperty("slug");
  });
  test("Check content for a different type", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("product", "product-1");
    expect(content).toHaveProperty("type", "product");
  });
  test("Check content for a different slug", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("service", "service-1");
    expect(content).toHaveProperty("slug", "service-1");
  });
  test("Handle non-existent type", async () => {
    Config.setRootDir(commonRootDir);
    await expect(getContent("files", "blog-1")).rejects.toThrow(
      "Content Not Found, rootDir = " +
        commonRootDir +
        ", type = files, slug = blog-1"
    );
  });
  test("Handle non-existent slug", async () => {
    Config.setRootDir(commonRootDir);
    await expect(getContent("blog", "blog-8")).rejects.toThrow("");
  });
  test("Check filtering specific attributes", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1", ["title", "author"]);
    expect(content).toEqual({
      title: "Understanding JavaScript Closures",
      author: "Alice Smith"
    });
  });
  test("Check filtering with no attributes", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1");
    expect(content).toEqual({
      type: "blog",
      slug: "blog-1",
      content:
        "# JavaScript Closures\n\nClosures are an important concept in JavaScript, enabling powerful patterns for scoping and memory management.",
      title: "Understanding JavaScript Closures",
      author: "Alice Smith",
      date: "2024-08-12",
      tags: ["JavaScript", "Programming"]
    });
  });
  test("Retrieve filtered content metadata", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1", ["author", "date"]);
    expect(content).toEqual({
      author: "Alice Smith",
      date: "2024-08-12"
    });
  });
  test("Check case sensitivity in attribute names", async () => {
    Config.setRootDir(commonRootDir);

    const blog1 = await getContent("blog", "blog-1", ["Title"]);
    expect(blog1.Title).toBeUndefined();
    const blog1Correct = await getContent("blog", "blog-1", ["title"]);
    expect(blog1Correct.title).toEqual("Understanding JavaScript Closures");
  });

  test("Check correct error for invalid file path", async () => {
    Config.setRootDir(commonRootDir);
    await expect(getContent("blog", "../tests/sample-data")).rejects.toThrow();
  });
  test("Check correct parsing when front matter is missing", async () => {
    Config.setRootDir(commonRootDir);
    const noFrontMatterContent = await getContent("blog", "blog-4");
    expect(noFrontMatterContent).toEqual({
      type: "blog",
      slug: "blog-4",
      content:
        "# Python for Data Science\n\nPython is the go-to programming language for data science due to its simplicity and the vast array of libraries available."
    });
  });
  test("Check content with special characters", async () => {
    Config.setRootDir(commonRootDir);
    const specialCharContent = await getContent("blog", "blog-5");
    expect(specialCharContent).toEqual({
      type: "blog",
      slug: "blog-5",
      title: "Special @#$% Characters!",
      author: "Sarah Brown",
      date: "2024-09-05",
      tags: ["Productivity", "Developers"],
      content:
        "# Productivity Tips\n\nThis content includes special characters: @#$%^&()."
    });
  });
  test("Check if title starts with a specific word", async () => {
    Config.setRootDir(commonRootDir);
    const content = await getContent("blog", "blog-1");
    expect((content.title as string).startsWith("Understanding")).toBe(true);
  });

  test("Check only metadata is returned when there is no content", async () => {
    Config.setRootDir(commonRootDir);
    const noContentMetadata = await getContent("service", "service-2");
    expect(noContentMetadata).toMatchSnapshot();
  });
  test("return full content when no attributes specified", async () => {
    Config.setRootDir(commonRootDir);
    const fullContent = await getContent("product", "product-1");
    expect(fullContent).toMatchSnapshot();
  });
});

describe("Get content With Seo", () => {
  test("with seo = true", async () => {
    Config.setRootDir(commonRootDir);
    await expect(
      getContent("blog", "blog-1", undefined, true)
    ).resolves.toMatchSnapshot();
  });

  test("with default value for non existing seo key", async () => {
    Config.setRootDir(commonRootDir);
    await expect(
      getContent("blog", "blog-1", undefined, {
        twitterSite: { default: "@xyz" }
      })
    ).resolves.toMatchSnapshot();
  });
});
