# OpenSoundstage — BUILD, SANDBOX & Hosted

**Create freely. Build simply. Keep control of your work.**

OpenSoundstage is a creative platform built around a small, easy-to-understand language called **BUILD**. You write instructions in a `.build` file, run them in the browser, and get a reusable `.grain` file as the result.

The goal is to make creating and experimenting feel approachable, without requiring people to install programming tools or learn a complicated language.

There are two main ways to work:

- **SANDBOX:** A free workspace in your browser. It can run offline once the page and its files are available. Its working files are temporary unless you download them.
- **Hosted Console:** A place to save and manage files online using the OpenSoundstage Hosted API. You need an API key to access your files.

> **Project status (October 2026):** The browser SANDBOX interpreter exists and the live Hosted API has passed basic health and authentication checks. The Hosted Console has been built for cloud file management. An **Execute BUILD** Console update has been prepared, but its live deployment and complete operation still need confirmation. OpenSoundstage is under active development, not a finished public signup service.

## 1. Where to start

| What you want to do | Where to go |
| --- | --- |
| Visit OpenSoundstage and use SANDBOX | https://opensoundstage.com/ |
| Open the Hosted Console | https://opensoundstage.com/console/ |
| Check whether the live API is responding | https://opensoundstage.com/api/health |

If you're new, start with **SANDBOX**. You don't need a cloud account or API key just to try BUILD instructions in your browser.

If you already have an OpenSoundstage Hosted API key, the **Hosted Console** lets you work with your saved cloud files.

## 2. The big idea: BUILD and GRAIN

OpenSoundstage uses two simple file types:

| File | What it is | What you do with it |
| --- | --- | --- |
| `.build` | Instructions written in the BUILD language | Open it and execute it |
| `.grain` | Saved grains and links, often produced by executing a BUILD | Keep it, reuse it, or import it into another BUILD |

Think of a **BUILD** as a set of directions and a **GRAIN** as the reusable collection those directions produce.

Both are ordinary text files. You can open them, read them, and move them between workspaces.

### A simple BUILD example

Create a file named `FIRST.build` and enter:

```text
PUT NEW "START"
PUT NEW "FINISH"
LINK ADD "START" "FINISH"
GET ALL "START"
```

This example uses **only commands supported by the existing interpreter**.

When you execute it, the interpreter:

1. Creates a grain named `START`.
2. Creates a grain named `FINISH`.
3. Links `START` to `FINISH`.
4. Reads the grains linked from `START`.

The generated result is named `FIRST.grain`. Its contents look like this:

```text
GRAIN "START"
GRAIN "FINISH"
LINK "START" "FINISH"
```

A grain is a named item in the working collection. A link connects one grain to another. Links have a direction: `START` linked to `FINISH` does not automatically mean `FINISH` links back to `START`.

## 3. The complete BUILD language

**Four commands. Seven supported methods. No extra commands.**

| Command | Supported form | Plain-English meaning |
| --- | --- | --- |
| `GET` | `GET ONE "name"` | Read one existing grain |
| `GET` | `GET ALL "name"` | Read the grains directly linked from an existing grain |
| `PUT` | `PUT NEW "name"` | Create a new grain |
| `PUT` | `PUT SET "old" "new"` | Rename a grain and update its links |
| `LINK` | `LINK ADD "a" "b"` | Link two existing grains |
| `LINK` | `LINK CUT "a" "b"` | Remove a link between two existing grains |
| `DO` | `DO "NAME"` | Execute `NAME.build` from the same workspace |

There are a couple of useful details:

- `GET ONE "NAME.grain"` can also **import a saved `.grain` collection** into the current run.
- `DO "NAME"` looks for a file called `NAME.build`. You write the name **without** `.build` inside the `DO` instruction.
- `GET ALL` looks at **direct outgoing links**, not every possible connection.
- `PUT SET` changes a grain's name; it does not assign an arbitrary text value to a variable.
- Grain names must be unique within a run. Creating a duplicate produces an error.

**Execute BUILD** is a button in the interface, **not a command in the language**. Clicking that button runs the currently selected BUILD. The `DO` command remains an instruction *inside* a BUILD file.

### Writing rules

- Put **one instruction on each line**.
- Put names and other arguments inside **double quotation marks**.
- Blank lines are allowed.
- Lines beginning with `#` are treated as comments.
- The interpreter does not support escape sequences inside quoted arguments.
- The interpreter checks your instructions and reports errors instead of guessing what you meant.

The language is intentionally small. It does **not** currently provide conditionals, loops, general-purpose scripting, audio playback, or unrestricted access to your computer.

## 4. How to use the free SANDBOX

SANDBOX runs BUILD instructions in your browser. You do not need a database or an API key.

### Create your first BUILD

1. Open https://opensoundstage.com/ and go to **SANDBOX**.
2. Enter `FIRST.build` as the filename.
3. Paste the example from Section 2 into the editor.
4. Click **Save in memory**.
5. Click **Run BUILD** to execute the file.
6. Look at the result and the generated `FIRST.grain` file.

The SANDBOX button is labeled **Run BUILD** in the original browser interface. The Hosted Console's planned execution button is labeled **Execute BUILD**. These are interface labels, not new language instructions.

### Work with files in SANDBOX

The original SANDBOX provides controls to:

- **Save in memory:** Keep a file in the current browser workspace.
- **Open selected:** Load a saved file into the editor.
- **Download selected:** Save a copy to your computer.
- **Import:** Bring a file from your computer into the workspace.
- **Run BUILD:** Execute a saved `.build` file.

**Important:** Files saved only in SANDBOX memory are **temporary**. Refreshing the page clears that workspace. Download anything you want to keep, or save it through Hosted separately.

### Reuse another BUILD

If your workspace contains `SECOND.build`, another BUILD can include:

```text
DO "SECOND"
```

The interpreter runs `SECOND.build` as part of the current execution. Both BUILDs use the same working grain collection.

### Reuse a GRAIN file

If the workspace contains `FIRST.grain`, another BUILD can include:

```text
GET ONE "FIRST.grain"
```

This imports the saved grains and links into the current run. It does not create a new BUILD command.

## 5. What is OpenSoundstage Hosted?

**Hosted** is the online storage side of OpenSoundstage. Instead of keeping files only in your current browser session, you can save them to your account through the Hosted API.

The Hosted API handles file storage and access. It **does not execute BUILD instructions on the server**. BUILD execution belongs in the browser interpreter.

This separation matters:

- **SANDBOX** is where BUILD instructions run.
- **Hosted** is where cloud files are saved and retrieved.
- **The Hosted Console** brings cloud file management into a simple website interface.

The current Hosted system is for invited testing with existing API keys. It does not yet provide public self-service signup or billing.

## 6. How to use the Hosted Console

Open **https://opensoundstage.com/console/**.

### Connect

1. Find the **Your Hosted API key** field.
2. Enter the `oss_` key supplied for your account.
3. Click **Connect / Refresh files**.
4. The console should display the cloud files available to that account.

Your API key is like a password for your Hosted files. **Do not post it in Discord channels, screenshots, GitHub, or public messages.**

The original Console keeps the key in the current page while you are using it; it does not intentionally save it in browser storage. Disconnect or close the page when finished, especially on a shared computer.

### Save a file

1. Enter a filename ending in `.build` or `.grain`.
2. Type or paste the file contents.
3. Click **Save to cloud**.
4. Refresh the file list if needed and confirm that the file appears.

Saving a file with an existing filename may replace its stored contents. Check the name before saving important work.

### Open and edit a file

1. Select the file in the **Cloud files** list.
2. Click **Open selected**.
3. Make your changes in the editor.
4. Click **Save to cloud** to keep those changes online.

### Delete a file

1. Select the file you want to remove.
2. Click **Delete selected**.
3. Read the confirmation carefully before proceeding.

Deleting a cloud file removes that stored copy. Keep a downloaded backup of anything important.

### Execute BUILD in the Hosted Console

An update has been prepared to add **Execute BUILD** and an output panel to the Hosted Console. **Its live behavior still needs testing after deployment.**

The intended flow is:

1. Open a `.build` file in the Console editor.
2. Click **Execute BUILD**.
3. The browser runs it using the existing SANDBOX interpreter.
4. Review the execution output and any errors.
5. Choose **Save Output as .grain** if you want to keep the generated result in the cloud.

Execution and saving are separate steps. **Running a BUILD should not silently overwrite your cloud files.**

If a BUILD uses `DO` or imports a `.grain` file, the required files must be available to the interpreter in that execution workspace.

## 7. SANDBOX versus Hosted: which should I use?

| Situation | Best place to start |
| --- | --- |
| I just want to try BUILD | SANDBOX |
| I want to experiment without an API key | SANDBOX |
| I want to keep a file on my computer | Download it from SANDBOX |
| I want to save files online | Hosted Console |
| I want to reopen cloud files later | Hosted Console |
| I want to execute a BUILD | SANDBOX; Console execution once the update is deployed and verified |

You can use both. The BUILD language itself is the same; cloud storage does not add extra BUILD commands.

## 8. File limits and why they exist

OpenSoundstage has limits to keep the experimental interpreter responsive and prevent files from growing out of control.

| Limit | Current maximum |
| --- | --- |
| Size of one file | 16,384 bytes (16 KiB) |
| Total SANDBOX workspace | 262,144 bytes (256 KiB) |
| Files in the interpreter workspace | 64 |
| Lines in one file | 300 |
| Characters in one line | 1,024 |
| Characters in one quoted value | 160 |
| Grains in a run | 256 |
| Links in a run | 512 |
| Execution steps | 1,000 |
| Nested `DO` levels | 8 |
| Reads in a run | 120 |

The Hosted API starter also has a **64-file account limit**, a **16 KiB limit per file**, and a **256 KiB total account limit**.

A **byte** is a measure of file size. Some characters take more than one byte, so a text file can reach its size limit before reaching a particular character count.

These limits are enforced by the software, not written inside each BUILD file. A BUILD cannot raise its own limits.

## 9. Privacy and safety

OpenSoundstage's interpreter is designed to understand **only the supported BUILD instructions**. It does not treat a BUILD file as arbitrary JavaScript, a web page, or a command-line script.

The current interpreter does not use `eval` or `Function`, and it does not make network requests as part of executing BUILD instructions. The Hosted API stores files rather than executing them on the server.

Even so, this is an experimental project. The limits and checks reduce ordinary mistakes and misuse, but they are not a guarantee against every possible security problem.

### Protect your Hosted account

- Keep your API key private. Anyone with a working key may be able to access files under that account.
- Never add API keys or the Neon database connection string to a public GitHub repository.
- Do not include secrets in `.build` or `.grain` files.
- Use separate testing keys when possible and revoke them when testing is complete.
- Treat the local API key generator as a **private setup utility**, not a public website feature.

The Neon user ID is an account identifier, **not** an API key or password. It does not need to be hard-coded into a public page.

## 10. Testing OpenSoundstage and reporting problems

OpenSoundstage is being tested with real users. Finding confusing steps is just as valuable as finding broken code.

When testing, try these tasks:

1. Create a simple `.build` file in SANDBOX.
2. Run it and check the generated `.grain` file.
3. Download a file and import it again.
4. Connect to the Hosted Console with your own key.
5. Save, reopen, edit, and delete a **test** file.
6. Refresh the browser, reconnect, and confirm that your cloud files remain available.
7. Once Console execution is deployed, run a BUILD there and check its output.

When you find a problem, report:

- **What you were trying to do.**
- **What you expected to happen.**
- **What actually happened.**
- **Any error message or screenshot**, with API keys and other secrets hidden.

Also report **flow issues**: confusing wording, too many clicks, unclear buttons, or places where you get stuck. The goal is to keep OpenSoundstage useful without making it complicated.

## 11. Troubleshooting

| Problem | What to check |
| --- | --- |
| My SANDBOX file disappeared after refresh | SANDBOX memory is temporary. Download important files before leaving or refreshing. |
| My BUILD says a grain is unknown | Create or import that grain before referring to it. |
| My BUILD says a grain already exists | Each grain name must be unique within the run. |
| `DO` says a BUILD is missing | Check that the matching `.build` file is in the execution workspace and that its name matches. |
| A `.grain` import fails | Check that the file is available and contains valid GRAIN and LINK records. |
| My file is too large | Reduce the file size or split the work into smaller files. |
| The Hosted Console rejects my key | Check that you entered the full valid key for the account. Do not share it while troubleshooting. |
| The Console shows no files | Check whether you're using the intended account and whether files have been saved there. |
| The Hosted API reports a server error | The production service may have a configuration or database problem; check the deployment and function logs. |
| I don't see Execute BUILD in the Console | The updated Console may not have been deployed yet. |

For a quick public service check, open https://opensoundstage.com/api/health. A healthy response shows the API is responding; it does **not** by itself prove that every database or account operation is working.

## 12. What's working, and what's still being built?

### Existing foundations

- A browser-based BUILD interpreter with the established core commands.
- Temporary SANDBOX file management and generated `.grain` results.
- A live Hosted API with key-protected file operations.
- A Hosted Console interface for cloud file management.

### Still being tested or planned

- Confirming **Execute BUILD** and **Save Output as .grain** on the live Console after deployment.
- Improving the Console's workflow based on tester feedback.
- Public account signup and safer everyday sign-in.
- Production hardening such as rate limiting, monitoring, and stronger safeguards around simultaneous file saves.
- Billing, subscriptions, and paid-app features, if and when those are introduced.

Do not assume a planned feature is available until it has actually been deployed and tested.

## 13. Notes for people maintaining the project

This section is for maintainers. **Ordinary SANDBOX and Hosted Console users do not need to follow these steps.**

The main website is static. The browser interpreter lives in `sandbox-engine.js`. It runs BUILD instructions locally and does not require a server to interpret them.

The Hosted API uses Netlify Functions and Neon PostgreSQL. Its database connection string is provided through the private `DATABASE_URL` environment variable in Netlify. Do not place that value in public website files or commit it to GitHub.

The Hosted API provides these routes:

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Check whether the API responds; no key required |
| `GET /api/projects` | List cloud files for the authenticated account |
| `PUT /api/projects` | Save a `.build` or `.grain` file |
| `GET /api/file?name=FILENAME.build` | Open a stored file |
| `DELETE /api/file?name=FILENAME.build` | Delete a stored file |

All routes except `/api/health` require a valid account API key. The key is sent as a Bearer token in the request's `Authorization` header. **Never place a real key in source code or documentation.**

The original Hosted setup utility is intended to run locally and must not be published as an unauthenticated key-generation service. The `.env` file and local setup files should remain outside the public Git repository and production deployment.

The original SANDBOX can be opened from its static site files, while Hosted API operations require a deployed service and configured database. The Hosted Console uses the live `/api` routes on its own site.

For detailed Hosted setup, limits, testing, and operational notes, see **[README-HOSTED-API.md](README-HOSTED-API.md)**.

## 14. The guiding principle

**Keep it simple.**

OpenSoundstage is built around **four commands and seven supported methods**. The interface can become easier and the cloud can become more useful without inventing new BUILD commands or changing the core language every time a feature is added.

**Write a BUILD. Execute it. Keep the GRAIN. Reuse your work.**
