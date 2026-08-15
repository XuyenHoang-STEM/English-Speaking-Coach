# Product direction

## Product promise

English Speaking Coach helps Vietnamese A2–B1 learners prepare for a real, upcoming English-speaking situation. It turns the learner's own materials and intentions into focused practice, then guides them back into speaking after brief, supportive feedback.

This is not a general English curriculum. The unit of value is a **Project**: a meeting, presentation, school visit, interview, or other event the learner wants to feel ready for.

## Core loop

`Project → Materials → AI plan → Scenarios and personas → Speak → Gentle feedback → Speak again → Project readiness`

Every product decision should strengthen this loop. In particular, feedback should normally end with a concrete retry, not a passive report.

## Target learner

- Vietnamese speaker at A2–B1 level.
- Has a concrete event or communication goal.
- May know the subject matter well but cannot yet express it comfortably in English.
- Benefits from familiar vocabulary, short explanations, and psychologically safe repetition.

## Product principles

1. **Project is the center.** Practice, materials, vocabulary, attempts, and readiness belong to a project.
2. **Use the learner's reality.** Prefer their documents, people, vocabulary, and likely situations over generic lessons.
3. **Simplify before translating.** Turn complex Vietnamese into a clear, speakable idea before producing natural English.
4. **Keep the learner speaking.** Correct only what matters now and make “Speak again” the default next action.
5. **AI drafts; the learner decides.** Plans, scenarios, scripts, and rewrites are editable.
6. **Readiness is evidence, not a grade.** Show preparation coverage and recent practice, not false precision about language ability.

## MVP scope

### M0 — Foundation

- Shared product, architecture, and AI behavior contracts.
- Project-centered domain model and repository conventions.
- Safe development workflow and decision ownership.
- Existing prototype remains buildable.

### M1 — Project spine

- Create, rename, archive, and open a project.
- Capture target event, date, goal, learner level, and optional context.
- Add and review source materials; pasted text is sufficient initially.
- Generate an editable preparation plan with scenarios and personas.
- Enter a scenario and complete the first speak–feedback–speak-again loop.
- Show an explainable project-readiness summary.

## M1 primary journey

1. Learner creates “Singapore Partner Meeting”.
2. Learner enters the meeting date and desired outcome.
3. Learner pastes notes or a briefing document.
4. AI proposes an editable plan, scenarios, personas, and useful vocabulary.
5. Learner chooses a scenario and speaks.
6. Coach returns at most a few high-impact improvements and a speakable model.
7. Learner retries immediately.
8. Project readiness updates from observable preparation activity.

## Readiness definition

M1 readiness is a transparent summary of plan coverage, scenario coverage, recent retry completion, and learner confidence check-ins. It must not imply a validated CEFR score or pronunciation accuracy. The UI must let the learner see why readiness changed.

## Out of scope for M1

- Full curriculum, classroom/LMS features, social learning, or teacher dashboards.
- High-stakes CEFR certification.
- Native mobile apps or automatic ingestion of every file format.
- Detailed phoneme scoring without a suitable speech-analysis provider.
- Large rewrite of the current prototype before the project spine is validated.

## Success signals

- A new learner can reach a first speaking attempt from an empty state.
- Most feedback views lead to a retry in the same scenario.
- Learners edit AI-generated plans or scripts without losing provenance.
- Returning learners can tell what to practice next and why.

## Product decisions still to validate

- The minimum material-ingestion formats after pasted text.
- Readiness weights and whether users find them motivating.
- When Vietnamese support should fade as confidence increases.
- Whether browser speech recognition is reliable enough for the first target cohort.
