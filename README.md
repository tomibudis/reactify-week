# Next.js + TypeScript + Tailwind CSS + shadcn/ui Starter

This project is bootstrapped with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui for modern UI components. It also includes commit message linting with Commitlint and Husky.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## UI Components

- [shadcn/ui](https://ui.shadcn.com/) is set up. Example component: `src/components/ui/button.tsx`.

## Commit Message Linting

- Commit messages are checked using Commitlint and Husky.
- To make a commit, use:

```bash
git commit -m "type(scope): message"
```

Messages must follow [Conventional Commits](https://www.conventionalcommits.org/).

## Project Structure

- `src/app/` - App Router pages and layout
- `src/components/` - UI components (shadcn/ui)
- `src/lib/` - Utilities

## Customization

- Tailwind CSS is configured in `src/app/globals.css`.
- shadcn/ui config: `components.json`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
