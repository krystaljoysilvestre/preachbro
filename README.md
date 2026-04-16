# PreachBro

PreachBro is an AI sermon prep companion built for pastors.

It helps you move from a blank page to a clear, biblical message faster by guiding your prep in a conversational workflow.

## Why PreachBro

- Turn sermon ideas into structured outlines in minutes
- Stay focused with guided prompts for key sermon steps
- Refine language, tone, and clarity through follow-up chat
- Keep momentum during weekly message preparation

## Product Highlights

- Chat-first sermon workspace in a distraction-light dashboard
- Outline mode for structured sermon responses
- General mode for brainstorming and refining ideas
- Friendly prompt presets to quickly start common prep tasks
- Mobile-friendly, modern interface for desktop and laptop workflows

## Who It Is For

- Lead pastors preparing weekly sermons
- Teaching pastors building series messages
- Ministry leaders crafting devotionals or short talks
- Bi-vocational pastors who need faster prep cycles

## Real-World Use Cases

- Build a 3-point sermon outline from a passage
- Generate possible sermon titles from your theme
- Rewrite transitions between points for stronger flow
- Draft practical application sections for different audiences
- Brainstorm illustration ideas that reinforce biblical truth

## Screenshots (Optional)

This project currently does not include screenshots.

If you add them later, a good convention is to place them in `public/screenshots/` and reference them in this section.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Core Routes

- `/` marketing homepage
- `/dashboard` sermon assistant chat UI
- `/signin` sign-in page UI
- `/register` registration page UI
- `/api/assistant` assistant API endpoint

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- OpenAI Node SDK

## Available Scripts

- `npm run dev` start local development server
- `npm run build` build for production
- `npm run start` run production build
- `npm run lint` run ESLint

## Deployment

Deploy on Vercel or any Node-compatible platform that supports Next.js App Router.

For Vercel:

1. Import this repository
2. Set `OPENAI_API_KEY` in project environment variables
3. Deploy
