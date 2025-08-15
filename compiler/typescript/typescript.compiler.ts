// bundle-types.ts
import ts from "npm:typescript";
const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  strict: true,
};

export const compile = (entry: string) => {
  const program = ts.createProgram([entry], compilerOptions);

  const seen = new Set<string>();
  const orderedFiles: ts.SourceFile[] = [];

  function collect(file: ts.SourceFile) {
    if (seen.has(file.fileName)) return;
    seen.add(file.fileName);

    // First, visit dependencies
    file.forEachChild((node) => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const spec = node.moduleSpecifier.text;

        if (!spec.startsWith(".")) return; // skip node_modules

        const resolved = ts.resolveModuleName(
          spec,
          file.fileName,
          compilerOptions,
          ts.sys,
        ).resolvedModule?.resolvedFileName;

        if (resolved) {
          const dep = program.getSourceFile(resolved);
          if (dep) collect(dep); // recurse before adding current file
        }
      }
    });

    // Then, add this file
    orderedFiles.push(file);
  }

  const entryFile = program.getSourceFile(entry);
  if (!entryFile) throw new Error(`Entry file not found: ${entry}`);

  collect(entryFile);

  // Remove local imports from the AST
  function stripLocalImports(sf: ts.SourceFile) {
    return ts.transform(sf, [
      (context) => (rootNode) => {
        function visit(node: ts.Node): ts.Node | undefined {
          if (
            (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
            node.moduleSpecifier &&
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text.startsWith(".")
          ) {
            // skip local imports
            return undefined;
          }
          return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(rootNode, visit);
      },
    ]).transformed[0] as ts.SourceFile;
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const combined = orderedFiles
    .map((sf) => printer.printFile(stripLocalImports(sf)))
    .join("\n\n");

  ts.sys.writeFile(`out/` + entry, combined);
  console.log(`lib.ts created with ${orderedFiles.length} files`);
};
