# Architecture

## Current state audit

The repository is a small React 19, TypeScript, and Vite prototype. It demonstrates useful primitives: browser speech recognition, task generation, structured Gemini responses, feedback, vocabulary, and a practice-history chart.

Current constraints:

- `App.tsx` owns settings, practice, feedback, vocabulary, and history state.
- UI is organized around topic/task selection rather than projects.
- Gemini is called from the browser and the API key is compiled into the client bundle. This is acceptable only for a disposable local prototype.
- Generated JSON is trusted after `JSON.parse`; there is no runtime schema validation.
- History is in memory and scoring is placeholder logic.
- AI requests fire from UI lifecycle events and do not have cancellation, retry, or durable job state.
- Several source strings appear to have an encoding problem and should be repaired separately.

## What we retain

- React + TypeScript + Vite for M0/M1.
- Speech-recognition and speech-synthesis experiments as replaceable adapters.
- Structured AI response pattern.
- The principle of limited, high-impact feedback.
- Existing prototype as a reference while vertical slices replace it.

## Target boundaries

```text
app shell / routes
        ↓
feature workflows
        ↓
domain contracts
        ↓
ports (repository, AI coach, speech)
        ↓
adapters (local storage/API, Gemini, browser speech)
```

Dependencies point inward. Domain types must not import React, Gemini, browser APIs, or persistence details.

## Incremental folder direction

```text
domain/                 # framework-independent entities and contracts
features/
  projects/             # list, create, settings, readiness
  materials/            # capture and review source material
  planning/             # editable AI-generated plan
  practice/             # scenario, attempt, feedback, retry
services/               # temporary adapters; migrate behind ports
components/             # shared presentational components
docs/                   # product and engineering contracts
```

This is a migration target, not permission for a bulk move. New M1 work should arrive as small vertical slices.

## Domain model

- **Project** is the aggregate root for the learner's preparation goal.
- **Material** records learner-provided context and its processing state.
- **PreparationPlan** is an editable AI draft with revision metadata.
- **Scenario** defines a likely interaction and optional Persona.
- **PracticeAttempt** records transcript and self-confidence for one try.
- **CoachFeedback** contains prioritized observations and the next retry prompt.
- **ReadinessSnapshot** stores explainable component signals, never an opaque score alone.

Initial TypeScript contracts live in `domain/types.ts`. They intentionally contain no storage or UI implementation.

## State and persistence

M1 can begin with a repository interface and local persistence, provided IDs and timestamps are portable. Do not spread `localStorage` calls through components. A later remote backend should replace the adapter without changing domain or feature APIs.

Persist AI artifacts with the model/provider identifier, prompt contract version, generation timestamp, source material IDs, and learner edits or revision number.

## AI boundary

UI code calls an `AiCoach` port rather than an SDK. The adapter must keep provider prompts in one place, validate structured responses at runtime, return typed results or explicit errors, support abort/timeouts, and avoid logging source materials or transcripts by default.

Before any public deployment, move provider credentials and AI calls behind a server-controlled boundary. Never ship a production secret in Vite `define` configuration.

## Readiness calculation

Readiness is derived deterministically from named signals. The calculation belongs in domain/application code, not in an AI prompt. AI may suggest scenario importance, but it must not silently set the final readiness value.

## Testing strategy

- Domain: unit tests for readiness and state transitions.
- AI adapter: fixtures and schema-contract tests; no live model required in CI.
- Features: component/integration tests for create project and speak-again flow.
- End-to-end: one happy path from project creation through retry.
- Build and type-check are required on every PR; add lint/test gates as the scripts land.

## Migration sequence

1. Add domain contracts and repository/AI ports.
2. Build project list and project creation as a vertical slice.
3. Add material capture and editable plan generation.
4. Extract speech recognition from `AudioInput` behind a hook/adapter.
5. Rebuild practice around scenario and attempt IDs.
6. Retire old topic/task panels only when their replacement path works.

## Architecture decision rule

Material changes to domain boundaries, persistence, AI provider, or security posture require a short ADR under `docs/decisions/`. The PR may propose the ADR; the product lead accepts it.
