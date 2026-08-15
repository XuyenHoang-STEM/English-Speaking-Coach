<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# English Speaking Coach

An early prototype for project-based English speaking preparation for Vietnamese A2–B1 learners.

The current UI is a retained prototype. M0/M1 development is moving the product toward a Project-centered flow without a large rewrite. Start with:

- [Product direction](docs/PRODUCT.md)
- [Architecture and current-state audit](docs/ARCHITECTURE.md)
- [AI coach behavior](docs/AI_BEHAVIOR.md)
- [Roadmap](docs/ROADMAP.md)
- [Collaboration model](docs/COLLABORATION.md)
- [Contributing](CONTRIBUTING.md)

View your app in AI Studio: https://ai.studio/apps/drive/1jDGaEqhbrzhpz83NG6efnZ_GwnKRU94N

## Run locally

**Prerequisite:** Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Do not deploy the current client-side Gemini key integration publicly. See the security boundary in [Architecture](docs/ARCHITECTURE.md#ai-boundary).
