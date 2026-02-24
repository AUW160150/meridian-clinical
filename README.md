# MedAI Extract

**Clinical Decision Support Intelligence Platform**

> **Live demo:** [meridian-clinical.vercel.app](https://meridian-clinical.vercel.app)

---

A demonstration application for AI-assisted clinical decision support, built for healthcare and institutional audiences. MedAI Extract presents five validated clinical decision modules applied to a synthetic inpatient population, designed to illustrate how structured AI reasoning can augment clinical workflows in NHS-grade and academic medical centre environments.

---

## What's in the app

- **5 synthetic patients** across different clinical scenarios, each with a full inpatient progress note, vitals, medications, and clinical findings
- **5 validated decision modules per patient** — ACAH eligibility, LACE+ 30-day readmission risk, NEWS2 acuity level, qSOFA sepsis alert, and ACS NSQIP surgical candidacy
- **TRL 7 sliding panel** — for every module, a full evidence panel with validation steps, data requirements, integration architecture, and published references
- **AI explanation modal** — clinical reasoning behind each recommendation, with criteria breakdown and evidence base
- **Analytics dashboard** — population-level decision status distribution, patient matrix, and summary statistics
- **Institutional design** — Libre Baskerville headings, DM Sans body, navy and amber colour system; no gradients, no emoji

---

## Overview

MedAI Extract processes patient clinical records and surfaces structured recommendations across five decision domains. Each module is grounded in a published clinical framework, validated against real-world evidence, and rated at Technology Readiness Level 7 — meaning it has been demonstrated in operationally realistic conditions with sufficient evidence for institutional deployment consideration.

The application is built as a pitch-ready clinical intelligence demonstration. It does not connect to live patient data.

---

## Clinical Decision Modules

| Module | Framework | Key Metric |
|---|---|---|
| Acute Care at Home (ACAH) Eligibility | NHS Virtual Ward Clinical Stability Criteria | Eligibility score 0–100 |
| 30-Day Readmission Risk | LACE+ Index (van Walraven et al., CMAJ 2010) | Score 0–19; high risk ≥10 |
| ICU vs Floor Admission | NEWS2 — Royal College of Physicians 2017 | Score 0–20; high ≥7 |
| Sepsis Protocol Activation | qSOFA — Sepsis-3 (Singer et al., JAMA 2016) | Score 0–3; activate ≥2 |
| Surgical Candidacy | ACS NSQIP Surgical Risk Calculator | Risk category: low / moderate / high / very high |

Each decision card displays the recommendation, confidence level, scored criteria checklist, a **"Why this recommendation"** modal with full clinical reasoning, and a **TRL 7** panel with validation evidence, data requirements, integration architecture, and published references.

---

## Synthetic Patient Cohort

Five synthetic patients representing distinct clinical narratives:

- **Eleanor Mitchell, 72** — Community-acquired pneumonia with COPD exacerbation, Day 5, improving
- **Robert Harrison, 65** — Acute decompensated heart failure (EF 35%), Day 3, responding to diuresis
- **Margaret Chen, 58** — Post-operative cellulitis abscess I&D, Day 4, ready for discharge
- **Thomas Williams, 81** — Hip ORIF Day 6, intermittent delirium, SNF placement required
- **Priya Nair, 67** — Hyperosmolar hyperglycaemic state with newly diagnosed T2DM, Day 2, complex medication needs

All patient data is entirely synthetic. No real patient information is used.

---

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS 3 with a custom institutional design system
- **UI Primitives:** Radix UI (Dialog, Tabs, Scroll Area, Tooltip)
- **Charts:** Recharts
- **Typography:** Libre Baskerville (headings) + DM Sans (body)
- **State:** React useState — no external state library required
- **Routing:** React Router v7

---

## Design System

The interface is intentionally styled to feel like a serious NHS-grade or academic medical centre tool — not a consumer product.

- **Background:** Warm off-white `hsl(38, 18%, 97%)`
- **Primary:** Institutional navy `hsl(220, 48%, 20%)`
- **Accent:** Warm amber `hsl(28, 62%, 46%)`
- **Sidebar:** Deep navy `hsl(220, 40%, 14%)` with amber highlights
- **Typography:** Libre Baskerville for all headings; DM Sans for all body, labels, and UI elements
- **Shape language:** 0.25rem border radius — sharp, institutional
- No gradients, no glow effects, no emoji

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/AUW160150/meridian-clinical.git
cd meridian-clinical

# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs at `http://localhost:5173` by default.

**Minimum viewport width:** 1280px

---

## Project Structure

```
src/
  data/
    syntheticPatients.ts       Patient records with all 5 decision modules
    decisionDefinitions.ts     TRL7 content and AI explanation templates
  components/
    layout/
      AppShell.tsx             Three-column application shell
      Sidebar.tsx              Navigation sidebar
      Header.tsx               Top bar
    patients/
      PatientList.tsx          Scrollable patient list with stability indicators
      PatientDetail.tsx        Tabbed patient detail view
      ClinicalNote.tsx         Raw clinical note display
    decisions/
      DecisionPanel.tsx        All 5 decision modules for a patient
      DecisionCard.tsx         Individual decision module card
      TRL7Panel.tsx            Sliding TRL7 evidence panel
      AIExplanationModal.tsx   Clinical validation rationale modal
    analytics/
      AnalyticsDashboard.tsx   Population-level decision summary
    shared/
      ScoreRing.tsx            Circular score visualisation
      StatusBadge.tsx          Colour-coded status pill and dot
  pages/
    Index.tsx
```

---

## Deployment

The application is deployed via Vercel at **https://meridian-clinical.vercel.app**

Automatic deploys on every push to `main`.

---

## Disclaimer

This application is a demonstration tool for institutional and research purposes only. All patient data is entirely synthetic. Recommendations generated by this system are illustrative of structured rule-based clinical decision support and are not validated for clinical use. They must not be used to inform real patient care decisions.
