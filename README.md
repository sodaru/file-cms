# File-CMS

File-CMS is a filesystem-based Content Management System (CMS), offering functionality similar to a headless CMS. It provides APIs to fetch content from files stored in a specified convention, making content management easy and developer-friendly.

## Key Features

- **Filesystem-Based**: File-CMS allows you to manage your content directly within the filesystem, making it easy to use version control tools like Git or any other Source Code Management (SCM) system to track changes.

- **Headless CMS**: Like a traditional headless CMS, File-CMS separates content management from front-end presentation. You can fetch content via APIs, giving you full flexibility over how and where your content is displayed.

- **Markdown Support**: Create the content in Markdown format along with metadata

- **Developer-Friendly**: With a simple setup, File-CMS is designed with developers in mind. It integrates seamlessly into modern development workflows, enabling efficient content management and versioning without the need for complex backend systems.

- **Version Control Integration**: Since content is stored as files, you can manage updates, rollback changes, and collaborate with others using Git or any other SCM system. This ensures a clear history of content updates, branching, and merging capabilities.

## How It Works

1.  **Store Content**: Store your content in the filesystem using a predefined structure or convention.

2.  **Version Control**: Use Git or any other SCM to version and manage content.

3.  **Fetch Content**: Use the provided API to fetch the content from the filesystem, and integrate it into your application’s front-end, mobile app, or any other service.

## Content Structure

- **Root Directory**: All content is stored under a specified `rootDir`.
- **Type Folders**: Content is grouped into folders based on its "type" (e.g., `blog`, `product`, `page`).
- **Slug Naming**: Each file is named following the convention `[slug].md`.

### File Format

Each content file is divided into two sections:

1. **Metadata (YAML)**: This section contains metadata for the content (e.g., `title`, `date`, `author`).
2. **Content (Markdown)**: The main content, written in Markdown format.

Example of a content file:

    ```YAML
    title: "Sample Blog Post"
    author: "John Doe"
    date: "2024-09-06"
    tags: ["blog", "example"]
    ```
    # Welcome to the Sample Blog Post

    This is an example of content written in Markdown.

> NOTE: Make sure **Meta section** starts with ` ```YAML ` and ends with ` ``` `

### API Response Structure

The content returned from the API follows this structure:

```JSON
{
  "type": "blog",
  "slug": "sample-blog-post",
  "content": "Content in Markdown",
  "title": "Sample Blog Post",
  "author": "John Doe",
  "date": "2024-09-06",
  "tags": ["blog", "example"]
}
```

## Why Choose File-CMS?

- **No Databases**: Manage content without needing a database. File-CMS uses the filesystem, simplifying your infrastructure.

- **Versioning Made Easy**: Leverage the power of Git or any SCM for full control over content revisions, changes, and collaboration.

- **Decoupled Architecture**: Fetch content via APIs and render it anywhere—whether in a web application, mobile app, or other environments.

## Getting Started

1. **Install**: Install the npm package
   ```BASH
   npm install file-cms
   ```
2. **Setup Content Structure**: Organize your content files under a root directory with type folders
   ```BASH
   /rootDir/
       /blog/
           post-1.md
           post-2.md
       /product/
           product-1.md
   ```
3. **Use the APIs to fetch the Content**

## Example Usage

### Get Single Content

```TS
import { Config, getContent } from 'file-cms';
Config.setRootDir('/rootDir'); // set the root dir to path where the content is stored

const content = getContent('blog', 'post-1'); // getContent by type and slug
console.log(content);
```

### List contents

```TS
import { Config, listContent } from 'file-cms';
Config.setRootDir('/rootDir'); // set the root dir to path where the content is stored

const contents = listContent({
  type: 'blog',
  meta: {
    keywords: {
      has: "serverless"
    }
  }
}); // list all contents of type blog and containing serverless keyword in the meta section
console.log(contents);
```

> Check [tests](/tests) folder for more examples

## Contributing

Contributions are welcome! Please read the fork and open a PR to improve File-CMS.

## License

File-CMS is released under the MIT License. See the [LICENSE](/LICENSE) file for more details.

## Support

This project is a part of the Open Source Initiative from [Sodaru Technologies](https://sodaru.com)

Write an email to opensource@sodaru.com for queries on this project
