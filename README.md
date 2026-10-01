# Austin Westphal Music

Christian music artist website. This repository is the GitHub Pages version.

## Publishing

GitHub Settings → Pages → Deploy from a branch → main → / (root).
Every commit to main automatically publishes the updated website.

## Content

Edit site-config.json to add artist text, booking email, HTTPS streaming/social links, songs and events. Blank links are hidden. Put audio files in a music folder and set audioFile to music/your-song.mp3. The native audio players appear automatically. The current version has no songs or contact email configured. Artist story copy is a proposed draft; replace as desired. The landscape is AI-generated decorative artwork.

## Domain

Set the custom domain in Settings → Pages, then add GitHub Pages DNS records at your domain's DNS provider. Keep your existing email records. Owning a Squarespace domain does not require hosting the site on Squarespace.

## Local preview

Use any static HTTP server in this repository folder. The original PC-hosting ZIP includes a Node server; GitHub Pages hosts these static files directly and does not run Node.

## Artist admin panel

Open `admin.html` through the Admin link in the footer. The editor manages homepage and story text, booking email, social and streaming links, songs, lyrics documents, chord charts, and live events. Resources support PDF uploads or plain text. Text preserves line breaks, and chord charts preserve spacing. Audio supports uploads or an existing URL.

To publish, generate a **fine-grained personal access token** in GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens. Select only `Whoops-Lambo/austinwestphalmusic`, give **Contents: Read and write**, and set an expiration. Paste it directly into the admin page. The token is kept only in memory, sent only to GitHub's API, and cleared on disconnect/closing the page. Never commit or send your token in chat. Repository permissions enforce publishing; there is no password embedded in the public site.

You can explore the editor without a token and save a draft on that browser. Drafts contain content and pending uploads, never the token. Browser storage capacity limits large drafts. Connect to GitHub, then Restore draft to publish a preview draft. PDF uploads are capped at 5 MB per file, audio at 20 MB, and pending uploads at 30 MB per publish. Uploads and configuration are committed together. Publishing refuses to overwrite a repository version that changed after connection. Reconnect and review the latest content if that happens. GitHub Pages deployment usually takes a short while after the commit.

Removing an entry hides it from the corresponding page. Uploaded files and older versions remain in GitHub and may still be accessible through direct links. All published content is public.
