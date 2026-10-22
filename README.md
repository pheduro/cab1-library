# Cabancalan I ES Library Website

Static website (plain HTML, CSS and JavaScript) for the Cabancalan I Elementary School Library, Mandaue City. No build step is needed.

## Pages
`index.html` (Home) · `about.html` · `programs.html` · `calendar.html` · `resources.html` · `gallery.html` · `contact.html`

## Edit the content
Almost everything you may want to change lives in **`js/data.js`**:
- `PROGRAMS` – the ten reading programs
- `CALENDAR` – month-by-month activities
- `RESOURCES` – document links (Google Drive)
- `HERO_IDS` / `GALLERY_IDS` – photos (Google Drive file IDs)
- `QUOTES` – the scrolling quotes on the home page

Contact details, the library rules and the "About" text are in the `.html` files.

## Photos
Photos currently load from the shared Google Drive folder, so the folder must stay shared as "Anyone with the link – Viewer".
For a faster and more reliable site, download the photos into an `images/` folder and change `DRIVE_IMG` in `js/data.js` to return local paths.

## Publish with GitHub + Vercel
1. Create a new repository on GitHub (for example `cab1-library`).
2. Upload all files in this folder to the repository (keep the folder structure).
3. In Vercel, click **Add New → Project**, import the repository, leave **Framework Preset = Other**, leave the build command and output directory empty, and click **Deploy**.
4. Every time you commit a change to GitHub, Vercel updates the site automatically.
