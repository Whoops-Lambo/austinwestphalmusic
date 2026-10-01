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
