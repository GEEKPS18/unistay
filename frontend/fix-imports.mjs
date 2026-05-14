import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const WORKSPACE = process.cwd();
const SRC_DIR = path.join(WORKSPACE, "src");

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function fileExists(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function findCandidate(realBasePath) {
  // realBasePath is the resolved path without extension or without trailing slash.
  // We will try common extensions.
  const exts = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"];
  for (const ext of exts) {
    if (fileExists(realBasePath + ext)) return realBasePath + ext;
  }
  // Try index files for directory imports
  if (fs.existsSync(realBasePath) && fs.statSync(realBasePath).isDirectory()) {
    for (const ext of exts) {
      const idx = path.join(realBasePath, "index" + ext);
      if (fileExists(idx)) return idx;
    }
  }
  return null;
}

function normalizeToPosix(p) {
  return p.split(path.sep).join("/");
}

function resolveImport(fromFile, spec) {
  const fromDir = path.dirname(fromFile);
  const resolved = path.resolve(fromDir, spec);
  return resolved;
}

function getRelImport(fromFile, targetAbs) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, targetAbs);
  rel = normalizeToPosix(rel);
  if (!rel.startsWith(".")) rel = "./" + rel;
  // Remove extension in output to keep original style? Requirement says rewrite only broken paths.
  // We'll preserve whether the original spec included an extension.
  return rel;
}

function adjustSpecPreservingExtension(originalSpec, newAbsPath) {
  // If original had explicit extension, keep it.
  const origExt = path.extname(originalSpec);
  const newExt = path.extname(newAbsPath);

  let relNoExt = path.relative(path.dirname(currentFile), newAbsPath);
  relNoExt = normalizeToPosix(relNoExt);
  if (!relNoExt.startsWith(".")) relNoExt = "./" + relNoExt;

  if (origExt) {
    // original included extension; ensure spec uses that extension, not necessarily actual.
    // But we must use real file with correct extension. So we replace whole spec with correct extension.
    // This is still "only path string" change.
    return relNoExt;
  }

  // original did not include extension; strip extension from resolved path
  return relNoExt.replace(newExt + "$", "");
}

function listSrcFiles() {
  return walk(SRC_DIR).filter((p) => /\.(jsx?|tsx?)$/.test(p));
}

function parseImportSpecifiers(content) {
  // Rough regex for import/export from '...'
  // Handles: import X from '...'; import '...'; import {..} from "..."; export ... from '...';
  const specs = [];
  const re = /(?:import|export)\s+[^'";]*?from\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content))) {
    specs.push(m[1]);
  }
  // Handle side-effect imports: import '...';
  const re2 = /import\s+['"]([^'"]+)['"]/g;
  while ((m = re2.exec(content))) {
    specs.push(m[1]);
  }
  return specs;
}

function rewriteFileImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const dir = path.dirname(filePath);

  let changed = false;
  let newContent = content;

  const specs = parseImportSpecifiers(content);
  // iterate unique specs
  const uniq = [...new Set(specs)];

  for (const spec of uniq) {
    if (!spec.startsWith(".")) continue; // only relative imports

    // Try to resolve what the spec *would* map to (including case sensitivity by checking existing filesystem).
    const resolvedAbs = resolveImport(filePath, spec);

    // If spec already resolves to a real file, skip.
    // Consider both with and without extension and index.
    let currentTarget = null;
    if (fileExists(resolvedAbs)) currentTarget = resolvedAbs;
    else {
      currentTarget = findCandidate(resolvedAbs);
    }

    if (currentTarget) {
      // But we also want to fix case mismatches in intermediate path segments.
      // We'll verify by comparing the resolved path as written to actual filesystem entries.
      // For robustness, attempt to find the actual target path for the import.
      const desiredAbs = currentTarget;
      const desiredRel = getRelImport(filePath, desiredAbs);

      // If spec already matches correct case, then no rewrite needed.
      // We can't easily compare segment-by-segment without walking filesystem entries.
      // We'll do a strict check by resolving again from the spec string to a real file with exact same path string.
      // On Windows, existsSync is case-insensitive, so we rely on a path-string comparison to real directory entries.
      // We'll conservatively rewrite only when the spec contains any segment with different casing than filesystem.
      // That is done by checking each path segment against actual directory entries.

      const fromDir = path.dirname(filePath);
      const specResolved = path.resolve(fromDir, spec);
      const specParts = path.relative(fromDir, specResolved).split(path.sep);

      // Determine actual path for desired target.
      const actualParts = path.relative(fromDir, desiredAbs).split(path.sep);

      let differsByCase = specParts.length === actualParts.length;
      if (specParts.length !== actualParts.length) {
        differsByCase = true;
      }
      if (!differsByCase) continue;

      // Compare each segment string
      const minLen = Math.min(specParts.length, actualParts.length);
      let mismatch = false;
      for (let i = 0; i < minLen; i++) {
        if (specParts[i] !== actualParts[i]) {
          mismatch = true;
          break;
        }
      }

      if (
        !mismatch &&
        !spec.endsWith(path.extname(spec)) &&
        specParts.join("/") === actualParts.join("/")
      ) {
        continue;
      }
      // If mismatch or extension/index differences exist, we rewrite to a canonical correct spec.
      const newSpec = adjustSpecPreservingExtension(spec, desiredAbs);
      if (newSpec !== spec) {
        newContent = newContent.split(spec).join(newSpec);
        changed = true;
      }
    } else {
      // Broken: attempt to locate candidate based on resolvedAbs by trying common extensions and index.
      const candidate = findCandidate(resolvedAbs);
      if (candidate) {
        const newSpec = adjustSpecPreservingExtension(spec, candidate);
        newContent = newContent.split(spec).join(newSpec);
        changed = true;
      } else {
        // Also try to correct folder/file name by searching within src for matching basename.
        // Only as fallback to avoid incorrect rewrites.
        const origBase = path.basename(spec);
        if (!origBase || origBase === "." || origBase === "..") continue;

        // If spec ends with filename without extension, search for that base in dir tree.
        const wantName = origBase;
        const regex = new RegExp(
          "^" + escapeRegExp(wantName) + "\\.(jsx?|tsx?)$",
        );
        const candidates = walk(SRC_DIR).filter((p) =>
          regex.test(path.basename(p)),
        );
        if (candidates.length === 1) {
          const newSpec = adjustSpecPreservingExtension(spec, candidates[0]);
          newContent = newContent.split(spec).join(newSpec);
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(
      "UPDATED",
      normalizeToPosix(path.relative(WORKSPACE, filePath)),
    );
  }
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
}

let currentFile = "";

function main() {
  const files = listSrcFiles();
  // Start with App.jsx then pages then components as requested.
  const ordered = [];
  const addIf = (p) => {
    if (files.includes(p) && !ordered.includes(p)) ordered.push(p);
  };
  const appPath = path.join(SRC_DIR, "App.jsx");
  addIf(appPath);

  for (const f of files)
    if (f.includes(path.join(SRC_DIR, "pages"))) ordered.push(f);
  for (const f of files)
    if (f.includes(path.join(SRC_DIR, "components"))) ordered.push(f);

  const seen = new Set();
  const finalOrder = ordered.filter((f) =>
    seen.has(f) ? false : (seen.add(f), true),
  );

  for (const filePath of finalOrder) {
    currentFile = filePath;
    rewriteFileImports(filePath);
  }
}

main();
