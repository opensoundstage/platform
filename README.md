# OpenSoundstage — Live SANDBOX

Static website with a real, minimal browser-based BUILD interpreter. No build tools or server runtime required; deploy the folder contents to Netlify (publish directory `.`) or open `index.html` in a modern browser. The website does not execute arbitrary JavaScript from BUILD files.

## Use

1. Open the SANDBOX section.
2. Paste a `.build` program or `.grain` records, enter its filename, and click **Save in memory**.
3. To run a `.build`, click **Run BUILD**. Its result is saved as `<name>.grain`.
4. Use **Open selected**, **Download selected**, or **Import** to manage session-memory files. Refreshing the page clears memory; download files you want to keep.
5. `DO "NAME"` executes `NAME.build` from memory; `GET ONE "NAME.grain"` imports a saved collection.

## Syntax

`.build`: `GET ONE "name"`, `GET ALL "name"`, `PUT NEW "name"`, `PUT SET "old" "new"`, `LINK ADD "a" "b"`, `LINK CUT "a" "b"`, `DO "NAME"`.

`.grain`: `GRAIN "name"`, `LINK "a" "b"`.

One statement per line. Blank lines and lines beginning `#` are ignored. Quoted arguments do not support escaping. Grain names must be unique within a run. Links are directional. `GET ALL` returns direct outgoing neighbors. `PUT SET` renames a grain and updates its links. Nested DO runs in the same working collection. A failed run does not save partial results.

## Hard limits and safety

Enforced by `sandbox-engine.js`: 16,384 UTF-8 bytes per file (including generated files); 262,144 UTF-8 bytes total workspace; 64 files; 300 lines/file; 1,024 characters/line; 160 characters/value; 256 grains; 512 links; 1,000 execution steps; 8 nested DO levels; 120 reads. Strict allowlisted instructions and syntax; no `eval`, `Function`, dynamic HTML insertion of user text, network requests, or script execution. User input is displayed using `textContent`.

Limits mitigate memory and execution exhaustion, but they are not a substitute for browser security. These limits are engine-enforced constants, **not embedded into or editable within each file**; per-file embedded limits would be attacker-editable. The browser itself still has resource overhead.

## Known scope

The interpreter handles the seven methods and reusable GRAIN data. It does not implement audio playback, conditionals, stable IDs for duplicate names, persistent storage, or a server backend. Generated results currently serialize the full working collection, not references. This is an experimental interpreter, not a security boundary for hostile extensions.
