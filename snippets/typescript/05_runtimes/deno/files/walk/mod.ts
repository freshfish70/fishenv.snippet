/**
 * Walks through a directory and prints all file paths.
 * @param path - The path to the directory to walk through.
 */
export async function walk(
  path: string,
  handler: (entry: Deno.DirEntry) => void,
) {
  async function recurse(currentPath: string) {
    const dir = Deno.readDir(currentPath);
    for await (const entry of dir) {
      const fullPath = `${currentPath}/${entry.name}`;

      handler(entry);

      if (entry.isDirectory) {
        recurse(fullPath);
      }
    }
  }

  await recurse(path);
}
