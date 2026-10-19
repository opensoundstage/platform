# OpenSoundstage Hosted API & Console

**Create locally. Save to the cloud. Keep control of your work.**

OpenSoundstage gives creators a simple way to work with two kinds of files: **BUILD** files, which contain instructions, and **GRAIN** files, which hold reusable results. The free **SANDBOX** runs in your browser. **Hosted** adds online file storage, so you can save files and come back to them later.

You do **not** need to understand databases, servers, or programming tools to use the Hosted Console.

> **Project status (October 2026):** The live Hosted API and key-protected file storage have been tested. The Hosted Console is available at the address below. An **Execute BUILD** update has been prepared, but its live deployment and end-to-end operation still need to be confirmed. This is an early testing version, not a finished public signup service.

## 1. Where to go

| What you want | Where to go |
| --- | --- |
| Open the OpenSoundstage website and SANDBOX | https://opensoundstage.com/ |
| Manage files in the Hosted Console | https://opensoundstage.com/console/ |
| Check whether the Hosted API is responding | https://opensoundstage.com/api/health |

**SANDBOX** is for working with BUILD instructions in your browser. **Hosted Console** is for working with files stored online. The Console's **Execute BUILD** feature uses the same browser-based SANDBOX engine; it does not run instructions on the database server.

## 2. What is a BUILD file?

A `.build` file is a plain-text set of instructions written in OpenSoundstage's BUILD language. You can write one, save it, open it later, and execute it using the interpreter.

A `.build` file is **not** a program that gets unrestricted access to your computer or the internet. The interpreter is intentionally limited to the BUILD language and its workspace.

### The complete BUILD command set

There are **four commands and seven supported methods**. This is the existing core, not a proposal for new commands.

| Command | Form | What it does in the current interpreter |
| --- | --- | --- |
| `GET` | `GET ONE` | Reads a named grain; it can also import a `.grain` file when given its filename. |
| `GET` | `GET ALL` | Reads the grains linked from a named grain. |
| `PUT` | `PUT NEW` | Creates a named grain. |
| `PUT` | `PUT SET` | Renames an existing grain, updating its links. |
| `LINK` | `LINK ADD` | Creates a link between two existing grains. |
| `LINK` | `LINK CUT` | Removes an existing link. |
| `DO` | `DO` | Runs another named `.build` file from the workspace. |

**Important:** **Execute BUILD** is the name of a **button in the Console**. It is **not** an additional BUILD command. The `DO` instruction remains part of the language and is used *inside* BUILD files.

### A small example

Create a file named `FIRST.build` with the following contents:

```text
PUT NEW "START"
PUT NEW "FINISH"
LINK ADD "START" "FINISH"
GET ALL "START"
```

These are real instructions supported by the current interpreter. Running the BUILD creates two grains, links them, and reads the grain linked from `START`.

## 3. What is a GRAIN file?

A `.grain` file stores the grains and links produced by a BUILD. It is a reusable result, not another set of BUILD instructions.

For example, the BUILD above produces a result named `FIRST.grain` containing records like:

```text
GRAIN "START"
GRAIN "FINISH"
LINK "START" "FINISH"
```

`GRAIN` and the two-argument `LINK` shown here are **saved record formats inside a `.grain` file**. They are **not new BUILD commands**.

You can save a generated `.grain` file to Hosted and use it again in a later BUILD. To import a saved grain file, the interpreter supports a statement such as `GET ONE "FIRST.grain"` when that file is available in the workspace.

## 4. Getting started with the live Hosted Console

**What you need:** A browser, the Console address, and an OpenSoundstage Hosted API key that has already been issued to you. There is **no public account-registration or key-generation page** in this early version.

1. Visit **https://opensoundstage.com/console/**.
2. Find the field labeled **Your Hosted API key**.
3. Paste your own key. It starts with `oss_`.
4. Click **Connect / Refresh files**.
5. Look for a connected message and your list of saved files.

If the list is empty, that's fine: you may simply have no saved files yet.

**Your key is your access credential.** Anyone who has it may be able to access the files belonging to that key's account. Do not post it in Discord channels, screenshots, public issues, or GitHub. Never include a real key in a bug report.

### Save a new BUILD file

1. In **File editor**, type a filename ending in `.build`, such as `FIRST.build`.
2. Enter BUILD instructions in **Contents**. You can use the example in section 2.
3. Click **Save to cloud**.
4. Look for the success message and the file in **Cloud files**.

**Save to cloud stores the text. It does not execute the BUILD.**

### Open a saved file

1. Select its name in **Cloud files**.
2. Click **Open selected**.
3. Its filename and contents should appear in the editor.

You can edit the contents and click **Save to cloud** again. Saving under the same name updates that stored file.

### Start a fresh file

Click **New file** to clear the filename and editor. **New file does not delete a previously saved cloud file.** Save the new file when you're ready.

### Delete a cloud file

1. Select the file in **Cloud files**.
2. Click **Delete selected**.
3. Read the confirmation carefully before approving deletion.

Deletion is permanent from the Console's point of view. There is no built-in trash or restore feature described for this early version, so keep a copy of anything important.

### Disconnect

Click **Disconnect** to clear the key and current editor from the Console page. The Console is designed not to save the key in browser local storage, cookies, or a server-side session. For extra care, close the tab when you're finished, particularly on a shared computer.

## 5. Execute a BUILD in the Console

**This feature is part of the latest Console update; verify that the update has been deployed before expecting the button to appear on the live site.**

Once the updated Console is live:

1. Connect using your Hosted API key.
2. Open a saved `.build` file, or enter a valid `.build` filename and instructions in the editor.
3. Click **Execute BUILD**.
4. Read the **Execution output** panel. It shows the generated `.grain` filename, execution steps, grain and link counts, any reads, and the generated grain content.
5. If you want to keep the result online, click **Save Output as .grain**.

**Execution does not automatically save the output.** You choose whether to save it.

### When a BUILD uses other files

Some BUILD files depend on other saved files. For example, `DO "SECOND"` looks for `SECOND.build`; a grain import looks for the named `.grain` file. The updated Console is designed to load cloud files into the browser workspace before executing so these references can be resolved.

If a required file is missing, execution should report an error instead of silently making up a result.

### If you don't see Execute BUILD

The updated `console/index.html` may not yet be deployed. The Console also needs the existing `/sandbox-engine.js` interpreter file to be available on the live site. Do not add new language commands to work around a missing button or interpreter file.

## 6. What the Hosted API does

Think of the **API** as the connection between the Console and your online file cabinet. The Console asks the API to list, save, open, or delete a file. The API checks your key and accesses the files belonging to that account.

The live API lives under:

**https://opensoundstage.com/api**

The available operations are:

| Address | Purpose | Requires a key? |
| --- | --- | --- |
| `/api/health` | Check that the API is responding | No |
| `/api/projects` | List the account's files | Yes |
| `/api/projects` | Save or update a file | Yes |
| `/api/file` | Read one saved file | Yes |
| `/api/file` | Delete one saved file | Yes |

The same address can support different actions. You do not need to type special requests yourself: **the Console handles them when you click its buttons.**

If you open `/api/projects` directly in a normal browser tab without a key, an error such as **“Valid user API key required”** is expected. That means the API is protecting the files, not that the site is broken.

## 7. What happens to your files?

- Files are stored online in a **Neon PostgreSQL** database connected to the Hosted API.
- The API uses the supplied key to identify the account whose files may be accessed.
- Different account keys should only access the files belonging to their respective accounts.
- Files are plain text with `.build` or `.grain` filenames.
- The Hosted API **stores files**; it does **not execute BUILD instructions on the server**.
- The browser-based SANDBOX engine checks instructions before running them.

### Current limits

| Limit | Current allowance |
| --- | --- |
| Size of one file | 16 KiB (16,384 bytes) |
| Number of stored files per account | 64 |
| Total stored file contents per account | 256 KiB (262,144 bytes) |
| Accepted file types | `.build` and `.grain` |

There are also safety limits within the interpreter, including limits on line length, instruction count, nesting, and how much data can be processed. These limits help keep mistakes from overwhelming the browser. They do not guarantee that every file or action is safe or valid.

## 8. A practical test checklist

If you're helping test OpenSoundstage, try these in order:

- [ ] Open the live Console and connect with your own key.
- [ ] Check that the file list appears, even if empty.
- [ ] Create and save a small `.build` file.
- [ ] Open it again and confirm the contents match.
- [ ] Change one line, save again, and reopen it.
- [ ] If deployed, click **Execute BUILD** and inspect the result.
- [ ] If deployed, save the generated `.grain` file.
- [ ] Open the `.grain` file and check that it contains the expected records.
- [ ] Refresh the page, reconnect, and confirm your files remain.
- [ ] Create a second file with a different name.
- [ ] Delete a disposable test file and confirm it disappears.
- [ ] Try a mistake (such as a missing referenced file) and see whether the error message is understandable.
- [ ] Check whether the layout and buttons are easy to use on a phone or smaller screen.

### Reporting a bug or confusing workflow

A useful report answers four questions:

1. **What were you trying to do?**
2. **What did you click or enter?**
3. **What did you expect?**
4. **What actually happened?**

Include the filename, an error message, and a screenshot if helpful. **Hide your API key and any private file contents before sharing screenshots.**

A **flow issue** is something confusing, slow, or awkward even if it technically works. A **bug** is something that behaves incorrectly. Both are valuable feedback.

## 9. Common problems and what to do

**“Valid user API key required”**

Your request is missing a working key, or the key isn't being accepted. In the Console, check that you entered the right key and click **Connect / Refresh files**. Do not share the key while troubleshooting.

**The health page works, but other API pages show a server error**

The health check doesn't prove the database is available. The site owner should check Netlify's production environment settings and function logs, especially whether `DATABASE_URL` is configured correctly. Never post the connection string.

**My files aren't showing up**

Click **Connect / Refresh files**. Confirm you're using the correct account's key. A file saved under one account is not automatically visible under another account.

**My BUILD won't execute**

Check that the file ends in `.build`, that its instructions follow the existing BUILD language, and that any files referenced by `DO` or a grain import are available. Read the specific error shown in the execution panel.

**The Execute BUILD button is missing**

The live Console may still be running the earlier version. Confirm the updated Console has been deployed before treating this as a BUILD language problem.

**The Console says the interpreter is unavailable**

The live website may not be serving `/sandbox-engine.js`. This is a deployment/file-path issue, not a reason to invent a replacement language.

**A save fails**

Check that the filename ends in `.build` or `.grain`, that the file isn't too large, and that the account hasn't reached its storage limit. Read the displayed error for the exact reason.

**I closed the tab and my key disappeared**

That's intentional: the Console is designed not to remember your key in browser storage. Retrieve it from your own secure records and reconnect.

## 10. Security and privacy: important rules

- **Never publish an `oss_` API key.** Treat it like a password.
- **Never publish `DATABASE_URL`.** It contains database access credentials.
- **Never put real keys in README examples, GitHub commits, public Discord posts, or screenshots.**
- Use a **separate testing key/account** when possible, so testers don't share access to important work.
- If a key has been exposed, the owner should **revoke it and issue a replacement**. Merely hiding or deleting a message does not make the old key safe.
- A **Neon user UUID is an identifier, not a password**, but there is no reason to hard-code a personal test-user ID into a public page.
- The private key-generation utility is **not part of the public Console** and should not be deployed as a public endpoint.
- The public Console accepts an existing key; it should not generate new ones or bypass account checks.

**Security status:** The current setup is suitable for controlled development and testing, not an assurance of production-grade security for unrestricted public signup. Before a wider launch, the project still needs stronger user login and key management, rate limiting, monitoring, automated testing, and better protection around simultaneous storage-limit checks.

## 11. For the person maintaining the live website

*This section is for site maintenance. Ordinary creators and testers can skip it.*

### What powers Hosted?

- **Netlify** hosts the live site and its API functions.
- **Neon PostgreSQL** stores account records, key hashes, and file contents.
- **GitHub → Netlify** is the deployment workflow used for the live site.
- The existing **SANDBOX interpreter** runs BUILD instructions in the browser.

### Production setup, in plain English

1. The Neon database needs the tables defined in `database/schema.sql`.
2. Netlify needs a secret environment variable named `DATABASE_URL`, containing the Neon connection string.
3. Deploy the website and API functions to Netlify.
4. Verify `https://opensoundstage.com/api/health` responds.
5. Verify `https://opensoundstage.com/api/projects` rejects a request that has no key.
6. Use a valid test key **through the Console** to verify listing, saving, opening, and deleting files.
7. Once the Execute BUILD update is deployed, confirm the Console can load `/sandbox-engine.js`, execute a known valid BUILD, and save its `.grain` result.

A working health page **alone** does not prove that authentication, database access, or BUILD execution works. Test each of those separately.

### API reference (for integrations and maintenance)

All addresses below are relative to `https://opensoundstage.com`.

| Request | Address | What it does |
| --- | --- | --- |
| `GET` | `/api/health` | Returns the public API status. |
| `GET` | `/api/projects` | Lists files for the authenticated account. |
| `PUT` | `/api/projects` | Saves or updates a file, using JSON fields `filename` and `content`. |
| `GET` | `/api/file?name=FIRST.build` | Retrieves one file. |
| `DELETE` | `/api/file?name=FIRST.build` | Deletes one file. |

All but health require an HTTP authorization header containing **Bearer** followed by the user's own API key. For example, the header has the shape `Authorization: Bearer oss_YOUR_OWN_KEY_HERE`. **That text is a placeholder, not a working key.**

The API stores a **hash** of each key rather than the readable key itself. Keep the original key private and securely stored by its owner.

### Local-only setup tools

During development, a local setup page and utility were used to issue test keys. They are deliberately separate from the public Hosted Console. Keep `hosted-setup.html` and `netlify/functions/local-setup.mjs` excluded from Git and production deployments. Keep `.env` excluded too.

The live Console is at `/console/`; **you do not need to run a local setup server to use it**.

### Known gaps before a broad public launch

- No public self-service signup or billing is implemented.
- API keys are currently a testing/development access method, not a finished consumer login experience.
- No subscription, payment, or entitlement verification is implemented.
- Better safeguards are needed against repeated requests, abusive usage, and overlapping saves that could race against total-storage limits.
- Live deployment and end-to-end testing of the new Execute BUILD Console feature still need confirmation.

## 12. The OpenSoundstage approach

**Keep the core small.** BUILD uses only `GET`, `PUT`, `LINK`, and `DO`, with their existing methods. The Console adds understandable buttons for people; it does **not** change the language.

**Keep creation accessible.** SANDBOX remains free and browser-based. Hosted is an optional way to store and retrieve work online.

**Keep the creator in control.** Write a BUILD, execute it, inspect the output, and decide whether to save the resulting GRAIN.

**BUILD. CREATE. OWN.**
