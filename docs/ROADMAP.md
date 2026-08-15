# Roadmap

Milestones describe outcomes, not deadlines. GitHub issues should reference one milestone and be small enough for one focused pull request whenever possible.

## M0 — Foundation

Exit criteria:

- Product, architecture, and AI behavior contracts are reviewed.
- Contribution workflow, ownership, issue templates, and PR checklist exist.
- Project-centered domain contracts compile without changing prototype behavior.
- Main branch builds from a clean checkout.
- GitHub labels and branch protection are configured when repository permissions allow.

Suggested issues:

1. Repair mojibake/UTF-8 strings without changing behavior.
2. Add formatting, lint, and test scripts with CI.
3. Introduce runtime schemas for AI responses.
4. Define repository and AI coach ports.
5. Record production API-key boundary decision as an ADR.

## M1 — Project spine

Exit criteria:

- A learner can create and reopen a project.
- A project stores goal, event date, learner level, and context.
- A learner can paste material and generate an editable plan.
- The plan includes scenarios/personas tied to source context.
- One scenario supports speak → feedback → speak again.
- Readiness is explainable and updates from real activity.

Suggested delivery slices:

1. Project repository plus list/create/open UI.
2. Project overview and editable settings.
3. Material text capture and review.
4. Versioned plan-generation contract and adapter.
5. Editable plan with scenarios and personas.
6. Practice attempt and feedback contracts.
7. Speak-again loop using the existing browser speech primitive.
8. Deterministic readiness summary.
9. M1 end-to-end test and accessibility pass.

## Later candidates

- File ingestion and citations back to source materials.
- Durable cloud sync and authentication.
- Better audio capture and evidence-based pronunciation analysis.
- Project templates and sharing.
- Longitudinal learning insights across projects.

These are not M1 commitments.
