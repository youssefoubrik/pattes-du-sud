# Content and data principles

- Keep editable copy in typed content and translation data, not page JSX. Structure it so a CMS can replace the source without rewriting the UI.
- Support English, French, German, and Arabic. Arabic should read naturally. Keep proper animal names shared across locales and use English animal stories when a translation is blank.
- Base public claims on verifiable information. Do not invent association history, registration details, or impact claims.
- Keep editable image references in the content/data layer. Use meaningful alt text and captions; keep asset-management notes out of visitor-facing copy.
- Keep association settings and uploaded media in the existing persistent SQLite-backed data layer. Store the Mirleft map URL with editable settings/content.
- Keep meaningful metadata on public pages and maintain semantic HTML, canonical/social metadata, `robots.ts`, and `sitemap.ts`.
- Preserve the existing public and admin route structure. Do not add news pages or news administration.
