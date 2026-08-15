# Contributing

Start with `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/AI_BEHAVIOR.md`, and `docs/COLLABORATION.md`.

## Local setup

1. Install Node.js.
2. Run `npm install`.
3. Copy your local Gemini key into `.env.local` as `GEMINI_API_KEY` for prototype-only AI calls.
4. Run `npm run dev`.
5. Run `npm run build` before opening a pull request.

Never commit `.env.local` or any learner content. The current browser-side key injection is prototype-only; do not deploy it publicly.

## Workflow

1. Start from an accepted, implementation-ready issue.
2. Create a branch using the convention in `docs/COLLABORATION.md`.
3. Implement the smallest vertical slice that satisfies the acceptance criteria.
4. Add appropriate verification and self-review the complete diff.
5. Open a pull request using the template and link the issue.

Changes to product contracts, domain boundaries, prompts, data retention, dependencies, or provider credentials must be highlighted explicitly in the PR.
