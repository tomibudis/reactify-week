# Next.js + TypeScript + Tailwind CSS + shadcn/ui Starter

This project is a modern web app starter built with the latest Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui for beautiful, accessible UI components. It features a clean codebase, commit message linting, and a scalable structure for rapid development.

## Key Features

- **Next.js 15+ (App Router)**: Fast, flexible, and SEO-friendly React framework.
- **TypeScript**: Type-safe code for reliability and maintainability.
- **Tailwind CSS**: Utility-first CSS for rapid, responsive design.
- **shadcn/ui**: Accessible, customizable UI components.
- **TanStack Query**: Powerful data fetching and caching.
- **Lodash**: Utility functions for data manipulation (e.g., grouping).
- **Commitlint + Husky + lint-staged**: Enforced commit message format and pre-commit code linting.
- **Prettier**: Consistent code formatting.
- **Heuristic AI Smart Tags**: Auto-tagging and smart suggestions for activities (see `src/lib/ai.ts`).
- **Auto Recommendation**: Personalized activity recommendations based on user selections and history.
- **Persistent State**: Save favorite characters/activities to localStorage with custom hooks.

## What's Inside

- `src/app/` – App Router pages, layout, and global styles
- `src/components/` – UI and feature components (e.g., CharacterCard, WeeklyCardDisplay)
- `src/hooks/` – Custom React hooks for data fetching and state management
- `src/lib/` – Utilities, AI/heuristics, and helpers
- `src/constants/` – App-wide constants (e.g., filter days)
- `src/context/` – React context providers

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

## Commit Message Linting

- Commit messages are checked using Commitlint and Husky.
- To make a commit, use:

```bash
git commit -m "type(scope): message"
```

Messages must follow [Conventional Commits](https://www.conventionalcommits.org/).

## Resource data

This project fetches character data from the [Rick and Morty API](https://rickandmortyapi.com/documentation/#get-all-characters). The API provides paginated endpoints for retrieving all characters, including their names, images, status, species, and more. Data is fetched using TanStack Query for efficient caching and state management. See `src/hooks/useCharacters.ts` for the implementation.

## Deploy on Vercel

This project is deployed live at [reactify-week-git-main-tomi-budis-projects.vercel.app](https://reactify-week-git-main-tomi-budis-projects.vercel.app).
