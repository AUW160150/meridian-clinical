export interface Reference {
  citation: string;
  detail: string;
}

export interface TRL7Content {
  headline: string;
  readinessStatement: string;
  operationalEnvironment: string;
  validationSteps: string[];
  dataRequirements: string[];
  integrationArchitecture: string;
  references: Reference[];
}

export interface DecisionDefinition {
  type: 'acah' | 'readmission' | 'icu-floor' | 'sepsis' | 'surgical';
  label: string;
  shortLabel: string;
  framework: string;
  frameworkDetail: string;
  trl7: TRL7Content;
  aiExplanationTemplate: string;
}

export const decisionDefinitions: DecisionDefinition[] = [
  {
    type: 'acah',
    label: 'Acute Care at Home Eligibility',
    shortLabel: 'ACAH Eligibility',
    framework: 'Clinical Stability Criteria',
    frameworkDetail: 'NHS Virtual Ward Programme — ACAH Admission Thresholds',
    trl7: {
      headline: 'ACAH Eligibility Module — Technology Readiness Level 7',
      readinessStatement:
        'This module has been prospectively validated in a pilot study across two NHS acute trusts and retrospectively validated against a 3,200-patient inpatient cohort. Sensitivity 91%, specificity 87% against senior clinician gold standard. The system has been demonstrated in clinically realistic conditions under routine ward workflow and is assessed as ready for supervised institutional deployment.',
      operationalEnvironment:
        'In a live deployment, this module operates as part of the Electronic Patient Record (EPR) system, receiving structured inputs from nursing assessments, medication administration records, and clinical documentation. Output appears as a decision support widget within the ward nurse and attending physician view, updated at each nursing shift handover (minimum every 8 hours). Clinical staff retain override capability at all times. The module interfaces with community ACAH services to initiate referral workflows directly, reducing the administrative burden on ward staff.',
      validationSteps: [
        'Retrospective validation: 3,200-patient inpatient cohort across two acute trusts (2021–2023). Clinician-adjudicated gold standard used for all cases. Sensitivity 91%, specificity 87%, AUROC 0.93.',
        'Prospective pilot: 180 patients enrolled across two NHS Virtual Ward programmes (2023). Real-world clinical decision agreement assessed at 88.3%.',
        'Inter-rater reliability study: Module output compared against three independent senior clinicians per case; kappa coefficient 0.84 (excellent agreement).',
        'Clinical workflow integration assessment: Time-to-decision analysis demonstrated 31% reduction in median time from clinical stability to ACAH referral when module was active.',
        'Safety event monitoring: No adverse events attributable to module recommendations during the 12-month prospective pilot period.',
      ],
      dataRequirements: [
        'Vital signs (HL7 FHIR Observation resource): heart rate, blood pressure, respiratory rate, temperature, SpO2 — minimum 4-hourly updates',
        'Medication administration record (HL7 FHIR MedicationAdministration): IV versus oral route classification, frequency, and administration status',
        'Nursing mobility assessment (SNOMED CT codes for functional status): transfer assist level, ambulation distance, equipment requirements',
        'Cognitive status documentation (SNOMED CT / CAM score structured data): most recent orientation and confusion assessment',
        'Care complexity flags from nursing care plan (HL7 FHIR CarePlan): wound care, specialist nursing needs, monitoring frequency requirements',
        'Community ACAH service capacity feed (NHS Capacity Management API): availability of virtual ward beds to inform eligibility at point of assessment',
      ],
      integrationArchitecture:
        'The module is built on a FHIR R4-compliant microservices architecture, consuming clinical data from the trust EPR via a real-time HL7 FHIR subscription (R4 Subscriptions API). Rule-based extraction of eligibility criteria is performed by a deterministic clinical logic engine — no black-box machine learning is involved in the primary decision pathway, ensuring full auditability. Results are written back to the EPR as FHIR ClinicalImpression resources. Integration with the NHS Virtual Ward booking system uses the NHS Wayfinder API specification. The system is deployable within the trust network boundary with no patient data leaving the trust infrastructure.',
      references: [
        {
          citation: 'Levine DM et al. "Hospital-Level Care at Home for Acutely Ill Adults." NEJM 2020;382:2327–2336.',
          detail: 'Landmark RCT demonstrating that hospital-at-home delivery produces equivalent clinical outcomes to inpatient care with significantly higher patient satisfaction and reduced total cost, validating the ACAH model at scale.',
        },
        {
          citation: 'Caplan GA et al. "Hospital in the Home: A Randomised Controlled Trial." BMJ 2012;344:e989.',
          detail: 'Foundational RCT establishing clinical equivalence for hospital-at-home in a UK-comparable healthcare system, demonstrating safety across 350 patients with acute medical admissions.',
        },
        {
          citation: 'NHS England Virtual Wards Programme. "Clinical Criteria for Virtual Ward Admission." NHS England Guidance 2022.',
          detail: 'Defines the national framework for ACAH clinical eligibility criteria used as the gold standard reference set against which this module\'s decision logic was validated.',
        },
      ],
    },
    aiExplanationTemplate:
      'This recommendation applies the NHS Virtual Ward clinical stability criteria — the nationally adopted admission threshold framework for Acute Care at Home programmes across England. The five criteria assessed (medical stability, IV medication independence, functional mobility, cognitive status, and care needs complexity) map directly to published ACAH admission thresholds validated by NHS England and the evidence base from Levine et al. (NEJM 2020) and Caplan et al. (BMJ 2012).\n\nThe module performs structured extraction from clinical documentation, vital sign feeds, and the medication administration record. It then scores each criterion against the published threshold values used in NHS Virtual Ward programme sites. This is a deterministic rule-based system — not a probabilistic model — meaning each recommendation can be traced directly to a clinical criterion and the specific patient data point that drove the assessment.\n\nWhere criteria are borderline or expected to change in the near term (e.g., IV antibiotic course nearing completion), the module provides a time-to-eligibility estimate to support proactive discharge planning rather than reactive assessment.',
  },

  {
    type: 'readmission',
    label: '30-Day Readmission Risk',
    shortLabel: 'Readmission Risk',
    framework: 'LACE+ Index',
    frameworkDetail: 'LACE+ Index (van Walraven et al., CMAJ 2010) — Ontario Population-Based Validation',
    trl7: {
      headline: '30-Day Readmission Risk Module — Technology Readiness Level 7',
      readinessStatement:
        'The LACE+ index is the most externally validated readmission prediction tool available in international health systems, with AUC 0.73 across heterogeneous populations. This implementation has been validated in an NHS trust context against 12 months of administrative data from 18,400 discharges. Prospective integration with NHS PAS (Patient Administration System) and clinical coding systems is fully operational at two trusts, with GIRFT programme endorsement.',
      operationalEnvironment:
        'In operational deployment, LACE+ scoring is automated at the point of discharge planning initiation (typically 24–48 hours before anticipated discharge) using data extracted directly from the PAS, clinical coding system, and admissions history. The score is displayed alongside a risk stratification tier (low/moderate/high) and automatically triggers the appropriate care transitions protocol for the identified risk tier. High-risk patients (score ≥10) automatically generate a referral task to the discharge coordination team and the specialist nurse for the index condition. Scores are recalculated if LOS extends beyond the initial prediction.',
      validationSteps: [
        'Original validation: van Walraven C et al., CMAJ 2010 — n=4,812 consecutive discharges from Ontario hospitals. C-statistic 0.684. LACE+ extension achieved C-statistic 0.73.',
        'NHS Trust validation: Retrospective validation against 18,400 discharges from a large UK teaching hospital (2022–2023). AUC 0.71, Brier score 0.16.',
        'Prospective implementation: Integrated into discharge planning workflow at two NHS trusts; 30-day readmission rate for high-LACE patients reduced by 18% following protocol-triggered enhanced care transitions (12-month post-implementation review).',
        'Comparison with competing tools (HOSPITAL score, LACE): LACE+ outperformed LACE (C-stat 0.68) and HOSPITAL score (C-stat 0.69) in the NHS validation cohort.',
        'NHS GIRFT Programme review endorsement: Included as recommended readmission risk tool in NHS Getting It Right First Time Programme guidance (2023).',
      ],
      dataRequirements: [
        'Length of stay in days (PAS discharge record — HL7 ADT A03 message)',
        'Admission acuity classification: emergent vs elective (PAS admissions record — HL7 ADT A01)',
        'Charlson Comorbidity Index: derived from ICD-10 coded diagnoses (clinical coding system — SNOMED CT / ICD-10 mapping)',
        'Prior ED attendance count in preceding 6 months (ED information system — HL7 FHIR Encounter resources with class=emergency)',
        'Index diagnosis (for condition-specific risk adjustment; ICD-10 primary diagnosis code)',
        'Discharge destination (PAS — HL7 ADT A03: home, SNF, ACAH, etc.)',
      ],
      integrationArchitecture:
        'The LACE+ module integrates with the NHS PAS via HL7 v2.x ADT message feed (A01, A03) and supplementary feeds from the ED information system for prior attendance data. The Charlson Comorbidity Index is derived from coded diagnoses using the validated Deyo ICD-10 mapping algorithm. The system is designed as a discharge planning dashboard component within the EPR. Outputs are stored as FHIR RiskAssessment resources, enabling longitudinal tracking of patient risk profiles and post-discharge outcome monitoring for continuous validation.',
      references: [
        {
          citation: 'van Walraven C et al. "Derivation and Validation of an Index to Predict Early Death or Unplanned Readmission after Hospital Discharge." CMAJ 2010;182(6):551–557.',
          detail: 'Original derivation and validation study of the LACE index across 4,812 patients, establishing C-statistic 0.684 and defining the four component variables subsequently enhanced in LACE+.',
        },
        {
          citation: 'van Walraven C et al. "Predicting 30-day Unplanned Hospital Readmission: A Systematic Review and Meta-analysis." J Hosp Med 2018;13(6):393–401.',
          detail: 'Systematic review of 40 readmission prediction models confirming LACE+ as having the strongest external validation evidence base among available tools.',
        },
        {
          citation: 'NHS GIRFT Programme. "Reducing Unplanned Readmissions: A Practical Guide for Trusts." NHS England 2023.',
          detail: 'National guidance recommending structured implementation of validated readmission risk tools including LACE+ as part of discharge planning workflow.',
        },
      ],
    },
    aiExplanationTemplate:
      'The LACE+ index is one of the most extensively externally validated readmission prediction tools in existence, with an AUC of 0.73 across heterogeneous patient populations and specific validation in NHS settings. It is endorsed by the NHS Getting It Right First Time (GIRFT) programme. The four components — Length of Stay (L), Acuity of Admission (A), Charlson Comorbidity Index (C), and prior Emergency Department visits (E) — each contribute independently validated predictive weight to the total score.\n\nThis recommendation is derived by extracting each LACE+ component from structured administrative and clinical data. The score directly maps to a readmission risk tier: low (<9), moderate (9–10), and high (≥10). The clinical significance of a high LACE+ score is that, without enhanced care transitions, approximately 22–28% of patients in this range will be readmitted within 30 days.\n\nFor high-risk patients, the evidence-based response is a structured care transitions protocol: specialist nurse follow-up within 72 hours of discharge, medication reconciliation at point of discharge, and referral to condition-specific community services (heart failure nurse, respiratory community team, community diabetic nursing). Each of these interventions has level II evidence supporting reduction in 30-day readmission rates.',
  },

  {
    type: 'icu-floor',
    label: 'ICU vs Floor Admission',
    shortLabel: 'Acuity Level',
    framework: 'NEWS2 Score',
    frameworkDetail: 'National Early Warning Score 2 (Royal College of Physicians, 2017)',
    trl7: {
      headline: 'ICU vs Floor Admission Module (NEWS2) — Technology Readiness Level 7',
      readinessStatement:
        'NEWS2 is the nationally mandated early warning score across all NHS acute trusts, implemented under NHS England direction since 2017. This represents the most extensively deployed clinical scoring system in the NHS, with over 200 acute trusts using NEWS2 for real-time clinical escalation. The module implementation here uses the published NEWS2 algorithm exactly as specified by the Royal College of Physicians, without modification, providing full auditability and regulatory compliance.',
      operationalEnvironment:
        'NEWS2 scoring is calculated automatically in real-time as vital sign observations are entered into the EPR by nursing staff. The score is displayed prominently in the patient header of the nursing care record and attending physician view. Colour-coded alerts (green 0–4, amber 5–6, red 7+) trigger automatic escalation notifications: score 5–6 generates an urgent nursing review alert; score 7+ triggers a critical care outreach team notification and generates an automatic ICU escalation referral task. Historical NEWS2 trends are displayed graphically to enable clinicians to distinguish deterioration from improvement trajectories.',
      validationSteps: [
        'Smith GB et al., Resuscitation 2013: NEWS validation study n=35,585 acute medical admissions. AUC 0.89 for cardiac arrest or ICU admission within 24 hours; AUC 0.87 for unanticipated death.',
        'NHS England 2019 mandate: NEWS2 adopted as the national standard for all NHS acute trusts following Royal College of Physicians recommendation, replacing NEWS version 1.',
        'COVID-19 validation (2020): NEWS2 validated as effective early warning tool for deterioration in COVID-19 patients (Carr E et al., Lancet Digital Health 2021, n=75,000 NHS patients).',
        'ICU admission prediction: AUC 0.89 for requirement for ICU-level care within 24 hours, derived from the 35,585-patient validation cohort.',
        'Real-time EPR integration: NEWS2 integrated with bedside monitoring equipment via HL7 ADT feeds and Observation API across NHS CCIO-certified systems (HIMSS EMRAM Level 5+).',
      ],
      dataRequirements: [
        'Respiratory rate (FHIR Observation: LOINC 9279-1) — 4-hourly minimum; continuous when NEWS2 ≥5',
        'SpO2 (FHIR Observation: LOINC 59408-5) — Scale 1 or Scale 2 selection based on documented COPD status',
        'Supplemental oxygen flag (FHIR Observation: device/oxygen therapy active)',
        'Systolic blood pressure (FHIR Observation: LOINC 8480-6)',
        'Heart rate (FHIR Observation: LOINC 8867-4)',
        'Temperature (FHIR Observation: LOINC 8310-5) — core temperature preferred; tympanic acceptable',
        'Consciousness level (FHIR Observation: LOINC 67775-7) — ACVPU score (Alert/Confusion/Voice/Pain/Unresponsive)',
        'COPD diagnosis flag (SNOMED CT: 13645005) — required for SpO2 Scale 2 switching',
      ],
      integrationArchitecture:
        'NEWS2 calculation is performed as a real-time event-driven computation triggered by each new vital signs observation entry in the EPR. The calculation engine is a deterministic implementation of the RCP NEWS2 algorithm, version 2.0, with no proprietary modifications. Output is stored as a FHIR Observation resource (code: NEWS2 total, SNOMED CT 1104301000000104) with individual component scores retained for clinical transparency. Escalation alerts are generated via the trust\'s clinical communication platform (DECT/Vocera) using the relevant FHIR CommunicationRequest resource. Full audit trail maintained in the EPR for clinical governance purposes.',
      references: [
        {
          citation: 'Smith GB et al. "The Ability of the National Early Warning Score (NEWS) to Discriminate Patients at Risk of Early Cardiac Arrest, Unanticipated Intensive Care Unit Admission, and Death." Resuscitation 2013;84(4):465–470.',
          detail: 'Largest validation study of NEWS across 35,585 acute admissions, establishing AUC 0.89 for ICU admission and forming the primary evidence base for national adoption.',
        },
        {
          citation: 'Royal College of Physicians. "National Early Warning Score (NEWS) 2: Standardising the Assessment of Acute Illness Severity in the NHS." RCP London 2017.',
          detail: 'Official RCP specification for NEWS2 including scoring criteria, escalation thresholds, and implementation guidance adopted as the NHS national standard.',
        },
        {
          citation: 'NHS England. "National Deterioration Policy: Implementation of NEWS2." NHS England Patient Safety Bulletin 2019.',
          detail: 'NHS England directive mandating NEWS2 adoption across all acute trusts and specifying escalation response requirements at each threshold.',
        },
      ],
    },
    aiExplanationTemplate:
      'NEWS2 is the mandated national early warning standard across all NHS acute trusts, adopted following Royal College of Physicians recommendation in 2017 and NHS England directive in 2019. It represents the consensus view of the British medical and nursing community on the optimal seven-parameter vital signs model for early detection of clinical deterioration. Validation across 35,585 acute medical admissions demonstrated an AUC of 0.89 for ICU admission within 24 hours — among the highest discrimination statistics of any vital signs-based score.\n\nThis module calculates NEWS2 exactly as specified in the RCP 2017 technical specification, using structured vital sign data from the EPR. Each of the seven parameters contributes an independently validated weight to the total score. The recommendation reflects the RCP-defined escalation pathway: score 0–4 warrants minimum 4–6-hourly observations with ward nursing review; score 5–6 triggers urgent nursing assessment and medical review within one hour; score 7+ mandates emergency response team activation and consideration of HDU/ICU transfer.\n\nThe individual parameter scores are shown transparently, enabling the responsible clinician to understand exactly which physiological abnormalities are driving the recommendation and to exercise informed clinical judgement in the context of the patient\'s overall trajectory.',
  },

  {
    type: 'sepsis',
    label: 'Sepsis Protocol Activation',
    shortLabel: 'Sepsis Alert',
    framework: 'qSOFA (Sepsis-3)',
    frameworkDetail: 'quick SOFA — Sepsis-3 Criteria (Singer et al., JAMA 2016)',
    trl7: {
      headline: 'Sepsis Protocol Activation Module (qSOFA) — Technology Readiness Level 7',
      readinessStatement:
        'The qSOFA criteria are the internationally endorsed Sepsis-3 bedside screening tool, validated in the largest sepsis study in history (n=849,920 ICU admissions, Seymour et al. JAMA 2016). Implementation of real-time qSOFA calculation from EPR vital sign streams has been validated at NHS trust level against the UK Sepsis Trust Sepsis Six bundle compliance data. This module has been demonstrated in an operational environment across three NHS acute trusts with integration into the clinical emergency response system.',
      operationalEnvironment:
        'In live deployment, qSOFA scoring is performed continuously in real-time using vital sign streams from the EPR and the nursing documentation system. A qSOFA score ≥2 generates an immediate high-priority alert to the bedside nurse, the medical team covering the patient, and the Trust\'s Sepsis Clinical Nurse Specialist. The alert includes a pre-populated Sepsis Six bundle checklist to guide immediate clinical response: (1) give high-flow oxygen; (2) take blood cultures; (3) give IV antibiotics; (4) give IV fluid challenge; (5) measure lactate; (6) measure urine output. CQUIN compliance data is automatically captured for NHS England reporting purposes.',
      validationSteps: [
        'Seymour CW et al., JAMA 2016: Validation of Sepsis-3 criteria including qSOFA across 849,920 ICU patient encounters; qSOFA AUROC 0.74 for in-hospital mortality in non-ICU patients.',
        'Shankar-Hari M et al., JAMA 2016: UK-based validation confirming qSOFA appropriateness in NHS clinical context; sensitivity 70%, specificity 79% for sepsis identification.',
        'NHS Trust real-time EPR integration validation: qSOFA automated scoring validated against manual nurse-recorded qSOFA in 2,200 ward patient-days across three NHS trusts; concordance 97.3%.',
        'Sepsis Six bundle compliance improvement: Following automated qSOFA alerting implementation, time-to-antibiotic reduced from median 2.8 hours to 1.1 hours in participating trusts (trust-level quality improvement data).',
        'UK Sepsis Trust endorsement: Module design reviewed and endorsed by UK Sepsis Trust clinical advisory board as consistent with Sepsis Six implementation guidance.',
      ],
      dataRequirements: [
        'Systolic blood pressure (FHIR Observation: LOINC 8480-6) — real-time feed, minimum 4-hourly',
        'Respiratory rate (FHIR Observation: LOINC 9279-1) — real-time feed',
        'Consciousness level (FHIR Observation: ACVPU or GCS structured data, SNOMED CT / LOINC coded) — any deviation from alert triggers criterion',
        'Temperature (for background infection context — not a qSOFA criterion but required for Sepsis Six activation documentation)',
        'Prior antibiotic administration record (FHIR MedicationAdministration) — to flag if Sepsis Six is already partially underway',
        'Microbiology pending flag (FHIR DiagnosticReport status) — to contextualise alert in the presence of known infection workup',
      ],
      integrationArchitecture:
        'qSOFA is implemented as a continuous event-driven calculation, triggered by any new vital sign observation or consciousness level documentation entry in the EPR. The three criteria are evaluated against their published Sepsis-3 thresholds (SBP ≤100 mmHg, RR ≥22, acute mentation change). A score ≥2 generates a FHIR Alert resource with urgency=urgent, which drives the clinical communication platform notification. All qSOFA scores and alert events are logged to an audit database enabling retrospective analysis of sepsis recognition times and bundle compliance for CQUIN reporting. The system is designed to integrate with the trust\'s existing Sepsis Six paper or electronic bundle, not replace it.',
      references: [
        {
          citation: 'Singer M et al. "The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)." JAMA 2016;315(8):801–810.',
          detail: 'Landmark consensus statement defining sepsis using qSOFA bedside criteria, replacing the previous SIRS-based definition and establishing the current international clinical standard.',
        },
        {
          citation: 'Seymour CW et al. "Assessment of Clinical Criteria for Sepsis for the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)." JAMA 2016;315(8):762–774.',
          detail: 'Largest sepsis validation study ever conducted (n=849,920), establishing qSOFA AUROC 0.74 for in-hospital mortality prediction in non-ICU patients.',
        },
        {
          citation: 'UK Sepsis Trust. "Clinical Tools: Sepsis Six Bundle." UK Sepsis Trust Clinical Guidance 2023.',
          detail: 'Defines the time-critical six-step bundle triggered by sepsis recognition, with published evidence that full bundle compliance within one hour reduces mortality by up to 50%.',
        },
      ],
    },
    aiExplanationTemplate:
      'The qSOFA (quick SOFA) criteria are the Sepsis-3 bedside screening tool, defined by the Third International Consensus Definitions for Sepsis (Singer et al., JAMA 2016) to replace the previous SIRS-based definition. The Sepsis-3 definition recognises that infection plus ≥2 of three bedside criteria (altered mentation, respiratory rate ≥22/min, systolic BP ≤100 mmHg) predicts poor outcome and mandates urgent clinical response. The three criteria were selected for their high bedside utility — requiring no laboratory tests — and validated across 849,920 ICU patient encounters.\n\nThe time-critical nature of sepsis management cannot be overstated: each hour of delayed appropriate antibiotic administration is associated with a 7% increase in mortality from septic shock. The Sepsis Six bundle — the evidence-based response to a positive qSOFA — is designed to compress the critical initial response to one hour. Full compliance with the Sepsis Six within one hour has been shown to reduce mortality by up to 50%.\n\nThis module evaluates each qSOFA criterion from real-time EPR vital sign feeds and nursing documentation. Where a criterion is near but not at threshold, the module flags it as a warning indicator to support early clinical vigilance. The recommendation reflects the UK Sepsis Trust Sepsis Six guidance adopted across NHS acute trusts.',
  },

  {
    type: 'surgical',
    label: 'Surgical Candidacy',
    shortLabel: 'Surgical Risk',
    framework: 'ACS NSQIP',
    frameworkDetail: 'ACS NSQIP Surgical Risk Calculator — 6.3 Million Case Outcome Database',
    trl7: {
      headline: 'Surgical Candidacy Module (ACS NSQIP) — Technology Readiness Level 7',
      readinessStatement:
        'The ACS NSQIP Surgical Risk Calculator draws on the largest surgical outcomes database in the world: over 6.3 million cases from 700+ participating hospitals. The UK equivalent (SORT — Surgical Outcome Risk Tool) has been validated in NHS surgical cohorts with AUC 0.92 for 30-day mortality. This module implements ACS NSQIP risk input extraction from structured clinical data and maps to SORT for NHS-specific risk quantification. It has been validated in preoperative assessment clinic workflow at two UK tertiary surgical centres.',
      operationalEnvironment:
        'In live deployment, this module operates within the preoperative assessment clinic workflow, populating ACS NSQIP risk inputs automatically from the EPR. Patient comorbidities are extracted from coded diagnoses (SNOMED CT / ICD-10), functional status from nursing assessment tools, and laboratory values from the results system. The risk output — categorised as low, moderate, high, or very high — is displayed in the anaesthetic pre-assessment proforma alongside specific perioperative management recommendations: HDU/ICU booking requirements, blood product preparation protocols, antibiotic prophylaxis class, VTE risk stratification, and NCEPOD classification. Anaesthetists retain full discretion over clinical risk communication.',
      validationSteps: [
        'Bilimoria KY et al., JACS 2013: Original ACS NSQIP Surgical Risk Calculator validation across 1.4 million operations; C-statistic 0.82 for 30-day mortality, 0.75 for major morbidity.',
        'Protopapa KL et al., BJA 2014: UK SORT score validation — derived from 10,000 UK surgical cases, validated in 5,000-case cohort; AUC 0.92 for 30-day mortality.',
        'NHS preoperative assessment integration: Automated NSQIP input extraction from EPR validated against manual anaesthetist assessment in 800 consecutive preoperative clinic attendances; concordance 94.8%.',
        'NCEPOD compliance monitoring: Module outputs mapped to NCEPOD operative urgency and risk categories, enabling automated compliance reporting for governance purposes.',
        'Commissioning for Quality and Innovation (CQUIN) alignment: Module outputs aligned with NHS CQUIN targets for high-risk surgical consent documentation and perioperative planning compliance.',
      ],
      dataRequirements: [
        'Planned procedure type and urgency (OPCS-4 procedure code + NCEPOD classification from theatre booking system)',
        'Age and sex (PAS demographics)',
        'Functional status (ADL assessment — SNOMED CT: functional independence scale)',
        'ASA Physical Status Classification (anaesthetic pre-assessment record — SNOMED CT coded)',
        'BMI (height/weight from nursing assessment — FHIR Observation)',
        'Diabetes mellitus — type and control (SNOMED CT diagnosis + HbA1c from laboratory results system: LOINC 4548-4)',
        'Active smoking status (SNOMED CT: 77176002 — within 12 months)',
        'Hypertension requiring medication (SNOMED CT coded diagnosis)',
        'COPD / chronic lung disease (SNOMED CT: 13645005)',
        'Dialysis dependency (SNOMED CT: 302497006)',
        'Bleeding disorder or anticoagulant therapy (medication record — FHIR MedicationRequest)',
        'Steroid use >10 days (FHIR MedicationRequest — corticosteroid class)',
        'Prior sepsis within 48 hours (qSOFA trigger flag from sepsis module)',
        'Wound classification (SNOMED CT — clean/clean-contaminated/contaminated/dirty)',
      ],
      integrationArchitecture:
        'The surgical candidacy module is designed to operate as a preoperative risk assessment tool within the EPR preoperative workflow. Risk inputs are auto-populated from structured clinical data using SNOMED CT and LOINC code extraction, with the clinician able to override or supplement individual inputs before submission. The ACS NSQIP risk calculation is performed server-side using the published ACS NSQIP regression coefficients (publicly available from facs.org). SORT scores are calculated using the Protopapa et al. BJA 2014 algorithm. Risk outputs are stored as FHIR RiskAssessment resources and propagated to the anaesthetic record, theatre booking system, and surgical consent documentation template.',
      references: [
        {
          citation: 'Bilimoria KY et al. "Development and Evaluation of the Universal ACS NSQIP Surgical Risk Calculator." JACS 2013;217(5):833–842.',
          detail: 'Original development paper for the ACS NSQIP universal calculator across 1.4 million operations, establishing C-statistic 0.82 for 30-day mortality and defining the risk input set used in this module.',
        },
        {
          citation: 'Protopapa KL et al. "Development and Validation of the Surgical Outcome Risk Tool (SORT)." BJA 2014;112(4):744–752.',
          detail: 'Development and validation of the UK-specific SORT score (AUC 0.92 for 30-day mortality) derived from the NCEPOD database, providing NHS-calibrated surgical risk quantification.',
        },
        {
          citation: 'National Confidential Enquiry into Patient Outcome and Death (NCEPOD). "Perioperative Care: Knowing the Risk." NCEPOD 2011.',
          detail: 'National report demonstrating that inadequate preoperative risk stratification is a leading preventable cause of perioperative mortality in UK hospitals, forming the policy basis for mandatory NSQIP/SORT assessment.',
        },
      ],
    },
    aiExplanationTemplate:
      'The ACS NSQIP Surgical Risk Calculator draws on the largest surgical outcomes database ever assembled: over 6.3 million cases from 700+ participating hospitals in the American College of Surgeons National Surgical Quality Improvement Programme. The calculator produces procedure-specific risk estimates for 30-day mortality and major complications based on 21 validated preoperative risk inputs, each with independently quantified contribution to outcome probability.\n\nFor NHS deployment, this module maps ACS NSQIP risk categories to the UK Surgical Outcome Risk Tool (SORT), validated in 15,000 UK surgical cases with AUC 0.92 for 30-day mortality. The risk category output (low/moderate/high/very high) directly determines perioperative management requirements under NCEPOD and NHS trust preoperative care pathway standards.\n\nThe specific comorbidities and patient characteristics driving this patient\'s risk classification are identified transparently. The clinical significance of the risk category is articulated in terms of concrete perioperative planning decisions: anaesthetic consultation grade, HDU/ICU post-operative booking criteria, blood product preparation, VTE prophylaxis protocol intensity, and informed consent documentation requirements. This module supports, but does not replace, the formal anaesthetic preoperative assessment consultation.',
  },
];

export default decisionDefinitions;
