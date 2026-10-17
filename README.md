# OpenSoundstage — SANDBOX website rebuild

Static Netlify-ready website featuring the proposed BUILD language and two file types.

## Deploy
Upload this folder or ZIP to Netlify, or copy its contents to the existing GitHub repository and deploy the production branch. No build step is required.

## Proposed design
- `.build`: executable instructions
- `.grain`: saved information and links
- GET ONE / GET ALL / PUT NEW / PUT SET / LINK ADD / LINK CUT / DO
- DO executes a saved BUILD; the proposed persistence rule saves a corresponding `.grain` file.
- GET ONE on a `.grain` filename is proposed import syntax.

**Important:** The interactive walkthrough is a simulation. The site does not contain a working BUILD interpreter. Identity, import semantics, and persistence remain to be implemented. The `.grain` examples are illustrative rather than a finalized serialization specification.
