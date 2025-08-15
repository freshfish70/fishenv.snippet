import { compile } from "./compiler/typescript/typescript.compiler.ts";

/**
 * Walks through a directory and prints all file paths.
 * @param path - The path to the directory to walk through.
 */
async function walk(
  path: string,
  handler: (entry: Deno.DirEntry, { path }: { path: string }) => void,
) {
  async function recurse(currentPath: string) {
    const dir = Deno.readDir(currentPath);
    for await (const entry of dir) {
      const fullPath = `${currentPath}/${entry.name}`;

      handler(entry, { path: currentPath });

      if (entry.isDirectory) {
        recurse(fullPath);
      }
    }
  }

  await recurse(path);
}

await walk("./snippets/typescript", async (entry, { path }) => {
  if (
    !entry.isFile || !entry.name.endsWith(".ts") || entry.name.startsWith("_")
  ) {
    return;
  }

  await compile(`${path}/${entry.name}`);
});
