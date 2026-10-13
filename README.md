# Pattes du Sud

Website for an animal-protection association in Mirleft, Morocco.
Built with Next.js, React, TypeScript, Tailwind CSS and SQLite.

## Development

```bash
npm ci
cp example.env .env.local
npm run dev
```

Open http://localhost:3000.

## Editor and storage

The editor is at `/en/admin`. Set `ADMIN_PASSWORD_HASH` in `.env.local` before signing in. Generate it with `npm run admin:hash` and provide a password of at least 16 characters on standard input. Example: `npm run admin:hash < password.txt`.

Animal records, uploaded photos, contact messages, translated text, settings and anonymous activity counts live in the SQLite file at `DATABASE_PATH`. The default is `data/site.sqlite`. Keep this file on a persistent disk when deploying; serverless ephemeral storage is unsuitable. The database is created and seeded on first use. Never commit it.

Run `npm run db:backup` to create a consistent backup in `data/backups/`. To restore, stop the server, replace `data/site.sqlite` with the backup, then start the server. Back up the database before deployments and on a regular schedule.

Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for canonical metadata and the sitemap. In editor Settings, enter verified contact details, the public map URL, bank information and PayPal-hosted donation links. The donation page only shows payment routes that are configured.

## Checks

```bash
npm run lint
npm run build
```

## Project structure

- `app/`: routes, layouts and global styles
- `components/header/`: shared header and interactive navigation controls
- `content/`: typed default content and image references
- `lib/db.ts`: SQLite schema and data access
- `app/[locale]/admin/`: editor
- `messages/`: English, French, German and Arabic translations
- `i18n/` and `proxy.ts`: language routes and automatic language detection
- `public/brand/`: association brand assets
- `AGENTS.md`: development guidelines
- `specifications.md`: website requirements
