# Collaboration model

## Roles

### ChatGPT — product and technical lead

- Maintains product intent, scope, architecture, and AI behavior contracts.
- Breaks milestones into acceptance-testable issues.
- Reviews cross-cutting decisions, user experience, safety, and integration quality.
- Integrates or explicitly approves changes that alter contracts.

### Claude Code — implementation agent

- Implements one assigned issue at a time on a short-lived branch.
- Adds or updates tests and documentation with the code.
- Reports assumptions, trade-offs, commands run, and unresolved risks in the PR.
- Does not silently broaden scope or rewrite adjacent areas.

### Human repository owner

- Owns final product decisions, credentials, billing, access, and protected settings.
- Approves risky changes and merges when required by repository policy.

Names describe responsibilities, not exclusive tools. Any contributor follows the same workflow.

## Issue handoff contract

An implementation-ready issue includes the user outcome, context, scope boundaries, observable acceptance criteria, relevant contracts, expected verification, dependencies, and open decisions.

If an assumption would change the domain model, user journey, privacy posture, or scope, the implementation agent pauses and asks on the issue. Small reversible implementation choices may be documented in the PR.

## Branches

- `feat/<issue>-<slug>` — product capability
- `fix/<issue>-<slug>` — defect
- `docs/<issue>-<slug>` — documentation only
- `chore/<issue>-<slug>` — tooling or maintenance
- `spike/<issue>-<slug>` — time-boxed investigation; not production code by default

Use lowercase kebab-case, for example `feat/42-project-create`. Branch from an updated `main`. Do not commit directly to `main` once protection is enabled.

## Commits

Use an imperative Conventional Commit subject: `type(scope): concise outcome`.

Examples: `feat(projects): add project creation flow`, `docs(ai): define feedback contract`.

Keep commits reviewable. Do not mix formatting or generated-file churn with behavior changes unless unavoidable.

## Pull requests

- One primary issue per PR; use `Closes #123` when complete.
- Draft early if feedback is needed.
- Stay within the issue contract and call out deviations.
- Never include secrets, raw learner recordings, transcripts, or private materials.
- The author/agent self-reviews the diff and completes the PR checklist.
- Contract changes require lead review; protected settings remain human-owned.

## Review order

1. Product outcome and acceptance criteria.
2. Privacy, safety, and AI behavior.
3. Domain/architecture boundaries.
4. Tests, failure behavior, accessibility, and maintainability.
5. Visual polish.

## Labels

Type: `type:feature`, `type:bug`, `type:docs`, `type:chore`, `type:spike`.

Area: `area:projects`, `area:materials`, `area:planning`, `area:practice`, `area:ai`, `area:platform`.

Workflow: `status:ready`, `status:blocked`, `needs:decision`, `good-first-slice`.

Priority: `priority:p0`, `priority:p1`, `priority:p2`.

Milestones use `M0 — Foundation` and `M1 — Project spine`.
