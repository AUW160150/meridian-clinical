export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
  painLevel?: number;
}

export interface Medication {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  status: 'active' | 'discontinued' | 'prn';
}

export interface ClinicalFinding {
  category: string;
  finding: string;
  severity: 'mild' | 'moderate' | 'severe' | 'resolved';
  date: string;
}

export type DecisionStatus = 'action-required' | 'caution' | 'proceed' | 'monitor';

export interface DecisionCriterion {
  name: string;
  met: boolean;
  value?: string;
  threshold?: string;
  details: string;
}

export interface ClinicalDecision {
  type: 'acah' | 'readmission' | 'icu-floor' | 'sepsis' | 'surgical';
  status: DecisionStatus;
  recommendation: string;
  score?: number;
  scoreMax?: number;
  scoreLabel?: string;
  confidence: number;
  criteria: DecisionCriterion[];
  reasoning: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  mrn: string;
  age: number;
  sex: string;
  admissionDate: string;
  room: string;
  attendingPhysician: string;
  primaryDiagnosis: string;
  rawNote: string;
  vitals: VitalSigns;
  medications: Medication[];
  clinicalFindings: ClinicalFinding[];
  decisions: ClinicalDecision[];
  stabilityScore: number;
}

export const syntheticPatients: PatientRecord[] = [
  {
    id: 'pt-001',
    name: 'Eleanor Mitchell',
    mrn: 'MRN-2024-0891',
    age: 72,
    sex: 'Female',
    admissionDate: '2024-11-25',
    room: '4B-102',
    attendingPhysician: 'Dr. Sarah Chen',
    primaryDiagnosis: 'Community-Acquired Pneumonia with COPD Exacerbation',
    rawNote: `PROGRESS NOTE — Day 5 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Community-acquired pneumonia with COPD exacerbation

SUBJECTIVE:
Patient reports improved breathing overnight. Cough productive but less frequent. Denies chest pain or haemoptysis. Able to ambulate to bathroom with minimal assistance. Appetite improving — ate 75% of breakfast. Reports sleeping better, no orthopnea. Family states patient seems more herself today.

OBJECTIVE:
Vital Signs: BP 128/78 mmHg, HR 82 bpm, RR 18 breaths/min, Temp 37.0°C (98.4°F), SpO2 94% on 2L nasal cannula
General: Alert, oriented x4, in no acute distress, cooperative
Respiratory: Decreased breath sounds bilateral bases, scattered expiratory wheezes, improved from yesterday. No use of accessory muscles.
Cardiac: Regular rate and rhythm, no murmurs, gallops, or rubs
Abdomen: Soft, non-tender, non-distended, bowel sounds present
Extremities: Trace bilateral ankle oedema, improved from 2+ on admission. No calf tenderness.
Skin: No rashes or lesions

RESULTS:
WBC: 9.2 x10^9/L (down from 14.5 on admission)
BMP: Within normal limits; Cr 1.1 mg/dL (baseline)
CRP: 18 mg/L (down from 124 on admission)
Procalcitonin: 0.3 ng/mL (down from 1.8)
Blood cultures: No growth at 48 hours
Chest X-Ray: Bilateral lower zone infiltrates, reduced in extent compared with admission film

CURRENT MEDICATIONS:
1. Azithromycin 500mg IV once daily (Day 3 of 5-day course)
2. Prednisolone 40mg PO once daily (Day 4 of 5-day course, then taper)
3. Salbutamol/Ipratropium nebuliser Q4H
4. Enoxaparin 40mg SC once daily (VTE prophylaxis)
5. Lisinopril 10mg PO once daily (home medication, continued)
6. Metoprolol Succinate 25mg PO twice daily (home medication, continued)

ASSESSMENT:
72-year-old female with community-acquired pneumonia superimposed on moderate COPD (GOLD II), presenting Day 5 of admission with clear clinical improvement. Inflammatory markers normalising. Supplemental oxygen requirements decreasing. Sputum culture pending; empirical cover appropriate.

PLAN:
1. Transition Azithromycin IV to oral Doxycycline 100mg BD tomorrow, contingent on ongoing improvement
2. Continue Prednisolone taper per COPD exacerbation protocol
3. Wean supplemental oxygen — trial room air this afternoon
4. Physiotherapy input — formal discharge planning assessment
5. Target discharge within 24–48 hours if maintains oxygenation on room air
6. Discuss ACAH placement versus home with community services
7. Ensure inhaler technique reviewed by respiratory nurse before discharge
8. Arrange community follow-up within 7 days of discharge

CLINICAL STABILITY ASSESSMENT:
Patient demonstrates clinical stability with an improving trajectory across all parameters. Inflammatory markers, oxygenation, and functional status are all trending toward discharge readiness. Meeting criteria for step-down care consideration pending completion of IV antibiotic course.`,
    vitals: {
      bloodPressure: '128/78',
      heartRate: 82,
      respiratoryRate: 18,
      temperature: 37.0,
      oxygenSaturation: 94,
      painLevel: 2,
    },
    medications: [
      { name: 'Azithromycin', dose: '500mg', route: 'IV', frequency: 'Once daily', status: 'active' },
      { name: 'Prednisolone', dose: '40mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Salbutamol/Ipratropium', dose: 'Standard dose', route: 'Nebuliser', frequency: 'Q4H', status: 'active' },
      { name: 'Enoxaparin', dose: '40mg', route: 'SC', frequency: 'Once daily', status: 'active' },
      { name: 'Lisinopril', dose: '10mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Metoprolol Succinate', dose: '25mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Respiratory', finding: 'CAP with COPD exacerbation — bilateral lower zone infiltrates, improving', severity: 'moderate', date: '2024-11-29' },
      { category: 'Inflammatory Markers', finding: 'WBC 9.2 (from 14.5), Procalcitonin 0.3 (from 1.8) — normalising', severity: 'resolved', date: '2024-11-29' },
      { category: 'Oxygenation', finding: 'SpO2 94% on 2L NC — weaning oxygen successfully', severity: 'mild', date: '2024-11-29' },
      { category: 'Mobility', finding: 'Ambulating independently to bathroom with minimal assistance', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'caution',
        recommendation: 'ACAH eligibility anticipated within 24 hours. IV antibiotic course completing; transition to oral agents planned for tomorrow. Review eligibility following successful PO transition and room air trial.',
        score: 78,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 82,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Vital signs stable, clinical trajectory improving, no acute deterioration in past 24 hours' },
          { name: 'IV Medication Independence', met: false, value: 'IV antibiotic required', threshold: 'No IV medications', details: 'Azithromycin IV completing; oral transition planned for Day 6. Will meet criterion within 24 hours.' },
          { name: 'Functional Mobility', met: true, value: 'Ambulatory', details: 'Ambulating to bathroom with minimal assistance; appropriate for ACAH level of support' },
          { name: 'Cognitive Status', met: true, value: 'A&O x4', details: 'Alert and oriented, engaged and able to manage self-care activities' },
          { name: 'Care Needs Complexity', met: true, value: 'Manageable', details: 'Nebuliser therapy, oxygen monitoring, and medication administration within ACAH scope of practice' },
        ],
        reasoning: 'Patient meets 4 of 5 ACAH admission criteria. The sole outstanding criterion — IV medication independence — will be resolved within 24 hours upon transition to oral antibiotics. Once this transition is confirmed and tolerated, the patient is appropriate for ACAH admission with daily nursing review, pulse oximetry monitoring, and nebuliser therapy. Social circumstances support home-based care.',
      },
      {
        type: 'readmission',
        status: 'caution',
        recommendation: 'Moderate 30-day readmission risk (LACE+ score 9). Enhanced care transition protocol recommended: GP follow-up within 72 hours, medication reconciliation at discharge, community respiratory nurse referral.',
        score: 9,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 78,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '5 days = 3 pts', threshold: '≥1 day', details: 'LOS 5 days contributes 3 points (1-3 days: 1pt, 4-6 days: 3pts, ≥7 days: 5pts)' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', threshold: 'Emergent admission', details: 'Admitted via emergency department with acute respiratory distress; +3 points' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI score 2 = 2 pts', threshold: '≥1 comorbidity', details: 'COPD (1 point) + hypertension (1 point) = CCI 2, contributing 2 points to LACE+' },
          { name: 'ED Visits Prior 6 Months (E)', met: false, value: '1 visit = 1 pt', threshold: '0 visits preferred', details: 'One prior ED attendance in past 6 months for COPD; contributes 1 point' },
        ],
        reasoning: 'LACE+ score of 9 places this patient at the upper boundary of moderate risk (≥10 = high risk). The primary drivers are the emergent admission acuity, moderate Charlson comorbidity burden from COPD and hypertension, and prior ED utilisation. Enhanced discharge planning with structured follow-up within 72 hours and respiratory nurse input is strongly indicated.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 4 — low-medium range. Current ward-level care appropriate. Maintain scheduled observations every 4 hours. Escalate immediately if NEWS2 rises to 5 or above.',
        score: 4,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 88,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '18/min = 0 pts', threshold: '≤20/min', details: 'RR 18 is within normal range; score 0' },
          { name: 'SpO2 Scale 1', met: true, value: '94% on O2 = 2 pts', threshold: '≥96% ideal', details: 'SpO2 94% on supplemental oxygen scores 2 points on Scale 1 — most significant contributor' },
          { name: 'Supplemental Oxygen', met: true, value: 'Yes = 2 pts', threshold: 'No supplemental O2', details: 'Receiving 2L nasal cannula; +2 points' },
          { name: 'Systolic Blood Pressure', met: false, value: '128 mmHg = 0 pts', threshold: '≥100 mmHg', details: 'SBP 128 within normal range; score 0' },
          { name: 'Heart Rate', met: false, value: '82 bpm = 0 pts', threshold: '51-90 bpm', details: 'HR 82 within normal range; score 0' },
          { name: 'Temperature', met: false, value: '37.0°C = 0 pts', threshold: '36.1-38.0°C', details: 'Temperature normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', threshold: 'Alert', details: 'Patient alert and oriented; score 0' },
        ],
        reasoning: 'NEWS2 score of 4 indicates low-medium clinical acuity, appropriate for ward-level care with routine monitoring. The score is entirely driven by supplemental oxygen requirement and mild hypoxaemia. No single parameter flags for urgent review. Nursing staff should perform 4-hourly observations with escalation protocol at NEWS2 ≥5.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 — sepsis protocol activation not indicated. Infection markers are trending down with appropriate antibiotic coverage. Continue current management and routine monitoring.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 94,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15 — Alert', threshold: 'GCS <15', details: 'Patient alert and oriented x4; GCS 15; criterion not met' },
          { name: 'Respiratory Rate ≥22', met: false, value: 'RR 18/min', threshold: '≥22/min', details: 'Respiratory rate 18 — below qSOFA threshold; criterion not met' },
          { name: 'Systolic BP ≤100 mmHg', met: false, value: 'SBP 128 mmHg', threshold: '≤100 mmHg', details: 'Blood pressure 128/78 — well above threshold; criterion not met' },
        ],
        reasoning: 'No qSOFA criteria are met. Procalcitonin trending down from 1.8 to 0.3 ng/mL suggests adequate antibiotic response with resolving infection. Blood cultures show no growth at 48 hours. Current CAP management with Azithromycin is appropriate. No indication for sepsis bundle activation at this time.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No active surgical pathology identified. Surgical candidacy assessment low priority for current admission. If future elective procedure required, risk stratification as moderate surgical risk given COPD and age.',
        confidence: 71,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None identified', details: 'No surgical pathology requiring operative intervention in current admission' },
          { name: 'Functional Status', met: true, value: 'Independent baseline', details: 'Baseline ADL independence; ECOG performance status 1' },
          { name: 'ASA Classification', met: true, value: 'ASA III', details: 'COPD, hypertension — ASA physical status class III (severe systemic disease)' },
          { name: 'Cardiopulmonary Reserve', met: false, value: 'Moderate COPD limitation', details: 'GOLD II COPD limits cardiopulmonary reserve; relevant to any future surgical planning' },
          { name: 'Comorbidity Burden', met: false, value: 'Moderate', details: 'CCI 2 — moderate comorbidity burden increases perioperative risk if surgery required' },
        ],
        reasoning: 'No surgical intervention is indicated or required for this admission. For completeness of risk stratification: should elective surgery be required in future, this patient carries moderate perioperative risk due to COPD (GOLD II), hypertension, and age 72. ACS NSQIP would estimate approximately 15–25% 30-day complication rate for major intra-abdominal procedures.',
      },
    ],
    stabilityScore: 85,
  },

  {
    id: 'pt-002',
    name: 'Robert Harrison',
    mrn: 'MRN-2024-1142',
    age: 65,
    sex: 'Male',
    admissionDate: '2024-11-27',
    room: '3A-205',
    attendingPhysician: 'Dr. Michael Torres',
    primaryDiagnosis: 'Acute Decompensated Heart Failure (EF 35%)',
    rawNote: `PROGRESS NOTE — Day 3 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Acute exacerbation of chronic systolic heart failure

SUBJECTIVE:
Patient reports significant improvement in dyspnoea since admission. Able to sleep flat last night without orthopnoea for the first time in two weeks. Still notices mild bilateral leg swelling but substantially better. Denies chest pain or palpitations. Reports improved energy levels but fatigues on exertion after approximately 20 metres. Appetite returning.

OBJECTIVE:
Vital Signs: BP 118/72 mmHg, HR 76 bpm, RR 16 breaths/min, Temp 37.1°C (98.2°F), SpO2 97% RA
Weight: 83.9 kg (down 3.6 kg from admission — excellent diuretic response)
General: Comfortable appearance, mild fatigue evident, no acute distress
Cardiac: Regular rate and rhythm; S3 gallop resolved; JVD 6 cm at 45° (improved from 12 cm on admission)
Respiratory: Clear to auscultation bilaterally, no pulmonary crackles
Abdomen: Soft, mild hepatomegaly, no ascites
Extremities: 1+ bilateral pitting oedema to mid-shin (improved from 3+ pitting to knee on admission)

RESULTS:
BNP: 580 pg/mL (down from 2,400 on admission — 76% reduction)
Creatinine: 1.3 mg/dL (above baseline 1.1; monitoring closely — diuresis-related)
Potassium: 4.2 mmol/L
Sodium: 138 mmol/L
ECG: NSR, no ischaemic changes
Echocardiogram (admission): LVEF 35%, moderate mitral regurgitation (MR), dilated LV, no pericardial effusion, diastolic dysfunction grade II

CURRENT MEDICATIONS:
1. Furosemide 80mg IV twice daily (will transition to oral today)
2. Lisinopril 5mg PO once daily (uptitrating; target 10mg)
3. Carvedilol 6.25mg PO twice daily (uptitrating slowly; target 25mg BD)
4. Spironolactone 25mg PO once daily
5. Metolazone 2.5mg PO once daily PRN (used on Day 1 only)
6. Apixaban 5mg PO twice daily (AF in background; currently NSR)

ASSESSMENT:
65-year-old male with NYHA Class III-IV acute decompensation of established systolic heart failure (LVEF 35%, known since 2021). Excellent response to IV diuresis — 3.6 kg weight loss in 72 hours, BNP 76% reduced, symptom resolution. Transitioning to oral diuretics today. Optimising guideline-directed medical therapy.

PLAN:
1. Transition to Furosemide 60mg PO twice daily — monitor daily weight and renal function
2. Continue ACE inhibitor and beta-blocker uptitration as renal function allows
3. Daily weights, strict fluid balance — target net negative 500–1000 mL/day until euvolaemia
4. Heart failure specialist nurse education session this afternoon
5. Discharge target tomorrow if euvolaemic and tolerating oral diuretics
6. Outpatient cardiology follow-up within 2 weeks
7. Arrange GP letter with heart failure management plan

CLINICAL STABILITY ASSESSMENT:
Achieving euvolaemia with excellent response to therapy. Meeting criteria for lower acuity care setting pending oral diuretic tolerance.`,
    vitals: {
      bloodPressure: '118/72',
      heartRate: 76,
      respiratoryRate: 16,
      temperature: 37.1,
      oxygenSaturation: 97,
      painLevel: 0,
    },
    medications: [
      { name: 'Furosemide', dose: '80mg', route: 'IV', frequency: 'Twice daily', status: 'active' },
      { name: 'Lisinopril', dose: '5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Carvedilol', dose: '6.25mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Spironolactone', dose: '25mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Metolazone', dose: '2.5mg', route: 'PO', frequency: 'Once daily PRN', status: 'prn' },
      { name: 'Apixaban', dose: '5mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Cardiac', finding: 'Acute decompensated HF — excellent response to IV diuresis, BNP 76% reduction', severity: 'moderate', date: '2024-11-29' },
      { category: 'Volume Status', finding: 'Weight loss 3.6 kg in 72h; oedema improved from 3+ to 1+; JVD normalising', severity: 'mild', date: '2024-11-29' },
      { category: 'Biomarkers', finding: 'BNP 580 pg/mL (from 2,400) — trend confirms haemodynamic improvement', severity: 'moderate', date: '2024-11-29' },
      { category: 'Renal Function', finding: 'Cr 1.3 (baseline 1.1) — mild acute kidney injury, diuresis-related', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'caution',
        recommendation: 'Borderline ACAH eligibility. Patient approaching criteria as IV diuresis transitions to oral. Recommend reassessment in 24 hours following oral furosemide tolerance and confirmation of euvolaemia. ACAH with daily weight monitoring and telemonitoring is a viable option.',
        score: 72,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 74,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Haemodynamically stable; excellent diuretic response; no acute deterioration' },
          { name: 'IV Medication Independence', met: false, value: 'IV Furosemide active', threshold: 'No IV medications', details: 'Transitioning to oral Furosemide 60mg BD today; will meet criterion within 12–24 hours' },
          { name: 'Functional Mobility', met: true, value: 'Independent', details: 'Mobilising independently on the ward, 20m before fatigue — within ACAH support threshold' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert, oriented, engaged in HF education — able to self-monitor with remote nurse support' },
          { name: 'Care Needs Complexity', met: true, value: 'Manageable with telemonitoring', details: 'Daily weight, medication compliance, fluid restriction, BP monitoring — all within ACAH virtual ward scope' },
        ],
        reasoning: 'Borderline ACAH status driven solely by the IV diuretic requirement, which resolves today. On successful oral transition, this patient is an ideal ACAH candidate: clinically improving, cognitively intact, motivated, and has management needs compatible with virtual ward protocols. Remote BNP monitoring and daily weight telemonitoring would provide appropriate safety netting.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High 30-day readmission risk — LACE+ score 12. Immediate activation of heart failure enhanced care transitions protocol: specialist HF nurse follow-up within 72 hours, structured medication reconciliation, community heart failure service referral.',
        score: 12,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 85,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '3 days = 1 pt', threshold: '≥1 day', details: '3-day LOS contributes 1 point; likely extending to 4 days increasing to 3 points at discharge' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', threshold: 'Emergent admission', details: 'Emergency department admission for acute decompensation; +3 points' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI score 5 = 5 pts', threshold: '≥1 comorbidity', details: 'Heart failure (2pts) + AF (1pt) + mild CKD (1pt) + hypertension (1pt) = CCI 5; +5 points' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '2 visits = 3 pts', threshold: '0 visits preferred', details: 'Two prior ED attendances in 6 months (ADHF, one for AF); +3 points — significant readmission driver' },
        ],
        reasoning: 'LACE+ score of 12 places this patient firmly in the high-risk bracket (≥10). Heart failure is the highest-volume readmission diagnosis nationally. The combination of high CCI (5), two prior ED visits, and emergent acuity of this admission all indicate a very high likelihood of 30-day readmission without structured care transitions. HF nurse specialist-led follow-up within 72 hours is the single most effective intervention at this risk level.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 2 — low range. Ward-level care appropriate. Routine observations every 4–6 hours. No escalation criteria met. Patient may progress to discharge planning.',
        score: 2,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 91,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '16/min = 0 pts', threshold: '≤20/min', details: 'Normal respiratory rate; score 0' },
          { name: 'SpO2', met: false, value: '97% RA = 0 pts', threshold: '≥96%', details: 'SpO2 97% on room air — normal range; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', threshold: 'No supplemental O2', details: 'Room air; score 0' },
          { name: 'Systolic Blood Pressure', met: false, value: '118 mmHg = 0 pts', threshold: '≥100 mmHg', details: 'SBP 118 — within normal range; score 0' },
          { name: 'Heart Rate', met: false, value: '76 bpm = 0 pts', threshold: '51-90 bpm', details: 'HR 76 — normal sinus; score 0' },
          { name: 'Temperature', met: true, value: '37.1°C = 0 pts', threshold: '36.1-38.0°C', details: 'Temperature normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', threshold: 'Alert', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 score 2 reflects a clinically stable patient. The mild elevation from baseline is attributable to the resting state of a deconditioned heart failure patient — not a sign of acute deterioration. Current haemodynamic status and trajectory support discharge planning from a ward environment.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 — no sepsis risk indicators present. Admission was for cardiac decompensation, not infective cause. No indication for sepsis protocol activation.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 96,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15 — Alert', threshold: 'GCS <15', details: 'Alert and oriented throughout admission; criterion not met' },
          { name: 'Respiratory Rate ≥22', met: false, value: 'RR 16/min', threshold: '≥22/min', details: 'RR 16 — below threshold; criterion not met' },
          { name: 'Systolic BP ≤100 mmHg', met: false, value: 'SBP 118 mmHg', threshold: '≤100 mmHg', details: 'BP 118/72 — well above threshold; criterion not met' },
        ],
        reasoning: 'No qSOFA criteria met. The admission is for non-infective acute decompensated heart failure. Temperature, white cell count, and inflammatory markers are not suggestive of infection. Sepsis protocol activation is not clinically indicated.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No acute surgical indication. For future procedural planning: high perioperative cardiac risk. Any elective surgery requires cardiology optimisation and must follow ACC/AHA perioperative cardiac risk guidelines.',
        confidence: 68,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No surgical pathology requiring operative intervention' },
          { name: 'Cardiac Function', met: false, value: 'LVEF 35%', details: 'Reduced ejection fraction is a major perioperative risk factor (Revised Cardiac Risk Index: 1 point)' },
          { name: 'Functional Status', met: false, value: '<4 METs estimated', details: 'Unable to climb one flight of stairs without fatigue — poor functional capacity increases perioperative risk' },
          { name: 'ASA Classification', met: false, value: 'ASA IV', details: 'Systolic heart failure with LVEF 35%, AF, CKD — ASA IV classification' },
          { name: 'NSQIP Risk Category', met: false, value: 'High-risk', details: 'ACS NSQIP would classify as high surgical risk; 30-day cardiac event rate >5% for intermediate-risk procedures' },
        ],
        reasoning: 'No surgical intervention required for this admission. If future elective surgery is contemplated, this patient requires formal cardiology preoperative risk assessment. LVEF 35%, NYHA Class III symptoms, and AF place him in the high perioperative risk category. Guideline-directed optimisation of heart failure therapy should precede any non-urgent surgical consideration.',
      },
    ],
    stabilityScore: 78,
  },

  {
    id: 'pt-003',
    name: 'Margaret Chen',
    mrn: 'MRN-2024-0756',
    age: 58,
    sex: 'Female',
    admissionDate: '2024-11-26',
    room: '5C-301',
    attendingPhysician: 'Dr. James Wilson',
    primaryDiagnosis: 'Right Lower Extremity Cellulitis with Abscess (post-I&D)',
    rawNote: `PROGRESS NOTE — Day 4 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Right lower leg cellulitis with abscess, Day 3 post incision and drainage

SUBJECTIVE:
Patient reports wound pain improving significantly — now 3–4/10 (was 8/10 on admission). No fevers or rigors overnight. Sleeping well. Tolerating oral intake without nausea. Wound dressing remained intact overnight per nursing notes. Patient is keen to go home and has confirmed family support available. Denies new symptoms.

OBJECTIVE:
Vital Signs: BP 134/82 mmHg, HR 78 bpm, RR 14 breaths/min, Temp 37.0°C (98.6°F), SpO2 99% RA
Wound Assessment: Right lower leg — I&D site with packing in place, minimal serosanguinous drainage on gauze, no purulence, no malodour. Surrounding erythema perimeter has decreased from 15 cm to 5.5 cm diameter (marked serially). Wound margins healthy, no tracking or lymphangitis.
Lymph Nodes: No inguinal lymphadenopathy
Distal Circulation: Dorsalis pedis and posterior tibial pulses 2+ bilaterally; capillary refill <2 seconds

RESULTS:
WBC: 8.4 x10^9/L (normalised from 16.2 on admission)
CRP: 22 mg/L (from 188 on admission)
Wound culture (Day 1): Methicillin-sensitive Staphylococcus aureus (MSSA) — sensitivities confirm coverage with Cephalexin
Blood cultures: No growth

CURRENT MEDICATIONS:
1. Vancomycin IV (completing course — LAST DOSE GIVEN — discontinuing)
2. Cephalexin 500mg PO four times daily (commenced today — 7-day course)
3. Paracetamol 1000mg PO every 6 hours PRN pain
4. Ibuprofen 400mg PO three times daily with food (anti-inflammatory)

ASSESSMENT:
58-year-old female with right lower extremity cellulitis and abscess, post-I&D Day 3. Showing excellent clinical response: erythema reduced by 63%, WBC and CRP normalising, afebrile for 48 hours. Wound culture confirms MSSA sensitive to oral Cephalexin. Transitioning to oral antibiotics. Ready for discharge.

PLAN:
1. Discontinue Vancomycin IV — complete step-down to oral Cephalexin 500mg QID
2. Comprehensive wound care education for patient and partner
3. Discharge today with outpatient home health for wound packing changes
4. Wound clinic review in 5 days (04 December 2024)
5. Advise patient to return to ED if: erythema expansion >2 cm, temperature >38°C, increased pain, wound dehiscence, or systemic symptoms
6. GP follow-up arranged for Day 10 post-discharge

CLINICAL STATUS: Stable for discharge with appropriate wound care and follow-up support.`,
    vitals: {
      bloodPressure: '134/82',
      heartRate: 78,
      respiratoryRate: 14,
      temperature: 37.0,
      oxygenSaturation: 99,
      painLevel: 3,
    },
    medications: [
      { name: 'Vancomycin', dose: 'Weight-based', route: 'IV', frequency: 'Per pharmacy (last dose)', status: 'discontinued' },
      { name: 'Cephalexin', dose: '500mg', route: 'PO', frequency: 'Four times daily', status: 'active' },
      { name: 'Paracetamol', dose: '1000mg', route: 'PO', frequency: 'Q6H PRN', status: 'prn' },
      { name: 'Ibuprofen', dose: '400mg', route: 'PO', frequency: 'Three times daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Infection', finding: 'Right leg cellulitis resolving — erythema perimeter 5.5 cm (from 15 cm on admission)', severity: 'mild', date: '2024-11-29' },
      { category: 'Wound', finding: 'I&D site healing well — minimal serosanguinous drainage, no purulence', severity: 'mild', date: '2024-11-29' },
      { category: 'Inflammatory Markers', finding: 'WBC 8.4 (from 16.2), CRP 22 (from 188) — returning to normal', severity: 'resolved', date: '2024-11-29' },
      { category: 'Microbiology', finding: 'MSSA confirmed — sensitive to Cephalexin; appropriate oral antibiotic in place', severity: 'resolved', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'proceed',
        recommendation: 'Patient does not require ACAH level of care. Clinical stability and wound care complexity are consistent with direct home discharge with home health services. ACAH resources are not indicated.',
        score: 94,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 93,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Afebrile 48h, vital signs normal, infection clinically resolving with normalising inflammatory markers' },
          { name: 'IV Medication Independence', met: true, value: 'Oral antibiotics only', details: 'Successfully stepped down to oral Cephalexin; no IV medications required' },
          { name: 'Functional Mobility', met: true, value: 'Independent', details: 'Mobilising independently; no functional limitation beyond wound discomfort' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert, oriented, able to perform wound care self-management with education' },
          { name: 'Care Needs Complexity', met: true, value: 'Home health appropriate', details: 'Wound packing changes once daily — within scope of community home health; does not require ACAH intensity' },
        ],
        reasoning: 'This patient meets all ACAH clinical criteria but does not require ACAH-level support. Wound care complexity (daily packing change) is manageable by a community home health nurse visiting once daily. Direct home discharge is the most appropriate and efficient disposition. ACAH should be reserved for patients requiring nurse-led clinical monitoring beyond basic wound care.',
      },
      {
        type: 'readmission',
        status: 'proceed',
        recommendation: 'Low 30-day readmission risk — LACE+ score 5. Standard discharge planning with wound clinic follow-up at day 5 and GP review at day 10. No enhanced care transitions required.',
        score: 5,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 88,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '4 days = 3 pts', threshold: '≥1 day', details: '4-day LOS contributes 3 points' },
          { name: 'Acuity of Admission (A)', met: false, value: 'Elective/non-emergent = 0 pts', threshold: 'Emergent admission', details: 'Admitted via GP referral (non-emergent pathway); 0 points' },
          { name: 'Charlson Comorbidity (C)', met: false, value: 'CCI 1 = 1 pt', threshold: '≥1 comorbidity', details: 'Mild hypertension (1 point); minimal comorbidity burden' },
          { name: 'ED Visits Prior 6 Months (E)', met: false, value: '0 visits = 1 pt', threshold: '0 visits preferred', details: 'No prior ED attendances in past 6 months; minimal risk contribution' },
        ],
        reasoning: 'LACE+ score of 5 is in the low-risk range (≤9 = low-moderate risk). Young age, single uncomplicated diagnosis, minimal comorbidity, and planned follow-up with home health and wound clinic make readmission unlikely. Standard discharge planning is sufficient.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 0 — all parameters within normal limits. Discharge appropriate from physiological standpoint. No further inpatient monitoring requirement identified.',
        score: 0,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 98,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '14/min = 0 pts', threshold: '≤20/min', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '99% RA = 0 pts', threshold: '≥96%', details: 'Normal on room air; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', threshold: 'No supplemental O2', details: 'Room air; score 0' },
          { name: 'Systolic Blood Pressure', met: false, value: '134 mmHg = 0 pts', threshold: '≥100 mmHg', details: 'Within acceptable range; score 0' },
          { name: 'Heart Rate', met: false, value: '78 bpm = 0 pts', threshold: '51-90 bpm', details: 'Normal sinus; score 0' },
          { name: 'Temperature', met: false, value: '37.0°C = 0 pts', threshold: '36.1-38.0°C', details: 'Afebrile; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', threshold: 'Alert', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 score 0 — physiologically ideal for discharge. No early warning indicators across any domain. Wound infection has been adequately treated and controlled. No grounds for continued inpatient monitoring from a clinical acuity perspective.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 — no sepsis risk indicators. MSSA bacteraemia excluded (blood cultures negative). Infection responding appropriately to antibiotic therapy. No protocol activation required.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 97,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15 — Alert', threshold: 'GCS <15', details: 'Alert and oriented throughout; criterion not met' },
          { name: 'Respiratory Rate ≥22', met: false, value: 'RR 14/min', threshold: '≥22/min', details: 'RR well below threshold; criterion not met' },
          { name: 'Systolic BP ≤100 mmHg', met: false, value: 'SBP 134 mmHg', threshold: '≤100 mmHg', details: 'BP well above threshold; criterion not met' },
        ],
        reasoning: 'No qSOFA criteria met and no clinical indicators of sepsis. Blood cultures negative, infection is localised (skin and soft tissue), patient has been afebrile for 48 hours, and inflammatory markers are normalising. The original MSSA infection is being adequately treated with appropriate oral step-down therapy.',
      },
      {
        type: 'surgical',
        status: 'proceed',
        recommendation: 'Surgical intervention complete (I&D performed on admission). No further operative intervention required. Wound healing progressing appropriately with conservative outpatient management.',
        confidence: 91,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'I&D completed', details: 'Incision and drainage performed on Day 1 — definitive surgical treatment complete' },
          { name: 'Wound Healing Trajectory', met: true, value: 'Healing as expected', details: 'Serial measurement confirms 63% reduction in erythema, no complications identified' },
          { name: 'Operative Risk', met: true, value: 'Low — ASA II', details: 'Young, healthy patient with single medical comorbidity; low perioperative risk if re-intervention required' },
          { name: 'Further Intervention Required', met: false, value: 'Not indicated', details: 'No signs of necrotising fasciitis, spreading infection, or failure to respond — no further surgery required' },
          { name: 'Functional Outcome', met: true, value: 'Expected full recovery', details: 'Prognosis excellent; full functional recovery anticipated within 4–6 weeks' },
        ],
        reasoning: 'Surgical treatment (I&D) was appropriately performed on admission and was technically successful. Current wound healing trajectory supports a good outcome. No indication for re-exploration, further debridement, or any additional operative procedure. Outpatient wound care with home health is the correct management pathway.',
      },
    ],
    stabilityScore: 93,
  },

  {
    id: 'pt-004',
    name: 'Thomas Williams',
    mrn: 'MRN-2024-1287',
    age: 81,
    sex: 'Male',
    admissionDate: '2024-11-24',
    room: '2D-118',
    attendingPhysician: 'Dr. Patricia Brown',
    primaryDiagnosis: 'Right Hip Fracture, post-ORIF (Day 6), with Delirium',
    rawNote: `PROGRESS NOTE — Day 6 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Right hip fracture, status post ORIF Day 5, with delirium and functional decline

SUBJECTIVE:
Patient reports incisional pain 5/10 at rest, improving. Participated in physiotherapy this morning but fatigued quickly after 5 minutes. Some confusion apparent in early morning (0300–0600), resolved by morning round. Family present — daughter acting as primary carer. Patient verbalises wish to return home but accepts he "isn't quite ready." Reports poor sleep overnight.

OBJECTIVE:
Vital Signs: BP 142/88 mmHg, HR 92 bpm, RR 18 breaths/min, Temp 37.3°C (99.1°F), SpO2 93% RA
Mental Status: Alert, oriented x3 (disoriented to date); CAM score negative currently; intermittent confusion documented in nursing notes (3 of last 6 shifts)
Surgical Site: Right hip incision clean, dry, intact. Mild surrounding ecchymosis, no erythema or discharge. Staples in situ.
Mobility: Weight bearing as tolerated with rollator frame; requires moderate assist x2 for all bed-to-chair transfers; max assist x1 for ambulation
Nutrition: Taking 50% of meals; dietitian input requested

RESULTS:
Haemoglobin: 9.8 g/dL (stable, down from 13.2 pre-op — operative blood loss)
Creatinine: 1.4 mg/dL (up from baseline 1.0; diuretic-related AKI — improving)
CRP: 42 mg/L (post-operative inflammatory response — expected)
Vitamin D: 28 nmol/L (deficient — supplementation commenced)
Urinalysis: Negative for infection

CURRENT MEDICATIONS:
1. Oxycodone 5mg PO Q4H PRN pain (use reducing)
2. Paracetamol 1000mg PO every 6 hours scheduled (multimodal analgesia)
3. Enoxaparin 40mg SC daily (VTE prophylaxis — continuing until mobile)
4. Colace 100mg PO twice daily (constipation prophylaxis with opioids)
5. Vitamin D3 800IU PO once daily (deficiency)
6. Amlodipine 5mg PO once daily (home medication, hypertension)
7. Metformin 500mg PO twice daily (home medication — held perioperatively, restarting today)

ASSESSMENT:
81-year-old male Day 5 post right hip ORIF. Pain controlled with multimodal regimen, use of PRN opioids decreasing. Intermittent delirium episodes (hyperactive type, worse nocturnal) — likely multifactorial: post-operative cognitive dysfunction, opioid effect, pain, disrupted sleep, unfamiliar environment, mild anaemia. Mild AKI improving. Nutritional intake suboptimal.

PLAN:
1. Continue multimodal pain management; reduce opioid reliance — switch to scheduled Paracetamol as primary
2. Aggressive non-pharmacological delirium prevention: daytime mobilisation, sleep hygiene, orientation aids, family presence in evenings
3. Increase physiotherapy to three sessions daily — gait training, transfer technique
4. OT assessment for home environment feasibility and equipment needs
5. Monitor Cr daily — aim for return to baseline
6. Dietitian review for nutritional supplementation
7. Disposition: SNF placement required — not meeting criteria for home or ACAH discharge. Social worker referral placed today.
8. Family meeting scheduled for tomorrow to discuss SNF expectations and timeline

CLINICAL STABILITY: Medically stable but functionally limited. Not a candidate for ACAH or home discharge at this time. SNF-level rehabilitation intensity required.`,
    vitals: {
      bloodPressure: '142/88',
      heartRate: 92,
      respiratoryRate: 18,
      temperature: 37.3,
      oxygenSaturation: 93,
      painLevel: 5,
    },
    medications: [
      { name: 'Oxycodone', dose: '5mg', route: 'PO', frequency: 'Q4H PRN', status: 'prn' },
      { name: 'Paracetamol', dose: '1000mg', route: 'PO', frequency: 'Every 6 hours', status: 'active' },
      { name: 'Enoxaparin', dose: '40mg', route: 'SC', frequency: 'Once daily', status: 'active' },
      { name: 'Colace', dose: '100mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Vitamin D3', dose: '800IU', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Amlodipine', dose: '5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Metformin', dose: '500mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Post-Operative', finding: 'Hip ORIF Day 5 — incision clean, healing appropriately, VTE prophylaxis in place', severity: 'moderate', date: '2024-11-29' },
      { category: 'Neurological', finding: 'Intermittent delirium (hyperactive, nocturnal) — 3 of 6 recent nursing shifts', severity: 'moderate', date: '2024-11-29' },
      { category: 'Mobility', finding: 'Requires moderate assist x2 for transfers; WBAT with rollator — SNF-level rehabilitation intensity needed', severity: 'moderate', date: '2024-11-29' },
      { category: 'Renal Function', finding: 'AKI (Cr 1.4, baseline 1.0) — improving; perioperative cause', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate. Patient requires SNF-level physiotherapy intensity (3x daily sessions) and 24-hour supervised monitoring for intermittent delirium. Home or ACAH discharge poses a patient safety risk at this time.',
        score: 42,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 91,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Vital signs acceptable; surgical site healing; AKI improving — medically stable post-operatively' },
          { name: 'IV Medication Independence', met: true, value: 'All oral', details: 'All medications oral/subcutaneous — no IV requirement' },
          { name: 'Functional Mobility', met: false, value: 'Moderate assist x2', details: 'Requires two-person moderate assistance for all transfers; insufficient independence for ACAH setting' },
          { name: 'Cognitive Status', met: false, value: 'Intermittent delirium', details: 'CAM positive on 3 of 6 nursing shifts; safety risk in unsupervised environment' },
          { name: 'Care Needs Complexity', met: false, value: 'SNF-level intensity required', details: 'Three daily PT/OT sessions, delirium monitoring, and overnight nursing observation required — beyond ACAH scope' },
        ],
        reasoning: 'Three ACAH criteria are not met, with functional mobility, cognitive safety, and care complexity all presenting absolute barriers. The delirium risk in an unfamiliar or unsupervised environment, combined with the intensive rehabilitation requirement (3x daily PT/OT), mandates SNF placement. ACAH would not provide the monitoring intensity required for safe recovery.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High 30-day readmission risk — LACE+ score 14. Following SNF placement, ensure structured discharge-to-SNF communication, medication reconciliation, and geriatric follow-up within 14 days of SNF admission.',
        score: 14,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 87,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '6+ days = 5 pts', threshold: '≥1 day', details: 'LOS ≥7 days contributes maximum 5 points; current trajectory to 8 days' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', threshold: 'Emergent admission', details: 'Emergency admission following mechanical fall; +3 points' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI score 3 = 3 pts', threshold: '≥1 comorbidity', details: 'Hypertension (1pt) + T2DM (1pt) + age 81 gives additional weight; CCI 3; +3 points' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 3 pts', threshold: '0 visits preferred', details: 'One prior ED attendance in 6 months; +3 points' },
        ],
        reasoning: 'LACE+ score 14 — very high readmission risk. Hip fracture patients admitted from SNF carry the highest 30-day readmission rates of any diagnostic group. The combination of extended LOS, emergency admission, moderate CCI, and age 81 makes structured care transitions from SNF back to community critical.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 5 — medium risk range. Maintain 4-hourly observations minimum. The SpO2 of 93% warrants close monitoring given age and post-operative status. Escalate immediately if single NEWS2 parameter scores 3.',
        score: 5,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 79,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '18/min = 0 pts', threshold: '≤20/min', details: 'Normal; score 0' },
          { name: 'SpO2', met: true, value: '93% RA = 3 pts', threshold: '≥96%', details: 'SpO2 93% on room air contributes 3 points — the most significant individual risk indicator' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', threshold: 'No supplemental O2', details: 'Room air currently; score 0' },
          { name: 'Systolic Blood Pressure', met: false, value: '142 mmHg = 0 pts', threshold: '≥100 mmHg', details: 'SBP above threshold; score 0' },
          { name: 'Heart Rate', met: true, value: '92 bpm = 1 pt', threshold: '51-90 bpm', details: 'HR 92 is mildly elevated — post-operative inflammatory state; +1 point' },
          { name: 'Temperature', met: false, value: '37.3°C = 0 pts', threshold: '36.1-38.0°C', details: 'Temperature normal; score 0' },
          { name: 'Consciousness', met: true, value: 'Intermittent confusion = 1 pt', threshold: 'Alert', details: 'Episodes of delirium documented; confusion scores 1 point on consciousness domain' },
        ],
        reasoning: 'NEWS2 score 5 (medium risk) driven by mild hypoxaemia, borderline tachycardia, and intermittent confusion. In a post-operative 81-year-old, this pattern requires structured escalation monitoring. Clinical concern is sufficient to maintain 4-hourly observations with a clear escalation pathway should any single parameter deteriorate.',
      },
      {
        type: 'sepsis',
        status: 'monitor',
        recommendation: 'qSOFA score 1 — below activation threshold, but the presence of delirium in a post-operative patient warrants monitoring for surgical site infection or occult sepsis. Recheck in 12 hours.',
        score: 1,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 76,
        criteria: [
          { name: 'Altered Mentation', met: true, value: 'Intermittent confusion = 1', threshold: 'GCS <15 or acute confusion', details: 'Documented intermittent delirium (3 of 6 shifts) — criterion met; +1 point. Delirium may represent occult infection in elderly.' },
          { name: 'Respiratory Rate ≥22', met: false, value: 'RR 18/min', threshold: '≥22/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP ≤100 mmHg', met: false, value: 'SBP 142 mmHg', threshold: '≤100 mmHg', details: 'Well above threshold; criterion not met' },
        ],
        reasoning: 'qSOFA score 1 — protocol activation threshold not reached (requires ≥2). However, in an 81-year-old post-surgical patient, delirium as the single positive criterion warrants close surveillance. Surgical site infection typically manifests Days 3–7 post-operatively. Wound inspection and temperature trending should be performed 12-hourly with re-scoring of qSOFA at each nursing assessment.',
      },
      {
        type: 'surgical',
        status: 'proceed',
        recommendation: 'ORIF procedure complete. No re-operative indication identified. Continue conservative post-operative management. Wound healing progressing. Future elective procedures carry very high perioperative risk.',
        confidence: 84,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'ORIF complete', details: 'Right hip ORIF performed Day 0 — definitive operative treatment complete; no re-operation indicated' },
          { name: 'Wound Healing', met: true, value: 'Healing appropriately', details: 'Clean, dry, intact incision — no signs of dehiscence or surgical site infection' },
          { name: 'Implant Stability', met: true, value: 'Confirmed on imaging', details: 'Post-operative X-ray confirms satisfactory implant position; no hardware complications' },
          { name: 'VTE Prophylaxis', met: true, value: 'Enoxaparin in place', details: 'VTE prophylaxis continued as per orthopaedic protocol' },
          { name: 'Future Surgical Risk', met: false, value: 'Very high — ASA IV', details: 'Age 81, delirium, post-operative state, T2DM — ASA IV; any future surgery carries very high perioperative risk' },
        ],
        reasoning: 'No indication for return to theatre. Post-operative course is progressing as expected for a complex, frail 81-year-old. For any future surgical consideration, this patient would require comprehensive geriatric assessment, frailty scoring, and multidisciplinary preoperative planning given his ASA IV status and cognitive fragility.',
      },
    ],
    stabilityScore: 61,
  },

  {
    id: 'pt-005',
    name: 'Priya Nair',
    mrn: 'MRN-2024-1534',
    age: 67,
    sex: 'Female',
    admissionDate: '2024-11-28',
    room: '6B-412',
    attendingPhysician: 'Dr. Ananya Patel',
    primaryDiagnosis: 'Hyperosmolar Hyperglycaemic State (HHS) with newly diagnosed Type 2 Diabetes Mellitus',
    rawNote: `PROGRESS NOTE — Day 2 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Hyperosmolar hyperglycaemic state (HHS), newly diagnosed Type 2 Diabetes Mellitus

SUBJECTIVE:
Patient reports improved level of consciousness and orientation since admission. Thirst markedly reduced. Nausea resolving; tolerating clear fluids then light solid diet from this morning. Fatigue persists but improving. Denies chest pain, dyspnoea, or focal neurological symptoms. Reports polyuria and polydipsia for approximately 3 weeks prior to admission. No prior diagnosis of diabetes. Lives alone; daughter lives locally and is present today.

OBJECTIVE:
Vital Signs: BP 108/68 mmHg (improving from 94/60 on admission), HR 96 bpm (improving from 112), RR 16 breaths/min, Temp 37.2°C, SpO2 97% RA
Weight: 74 kg (BMI 28.6)
Mental Status: Alert, oriented x3 (slight disorientation to date); improving GCS — was 12/15 on admission, now 14/15
General: Less unwell appearance compared to admission; mild dry mucous membranes improving; skin turgor normal
Cardiovascular: Tachycardia improving, no signs of cardiac failure
Peripheral: No oedema

RESULTS (Admission):
Blood glucose: 48.2 mmol/L
Serum osmolality: 358 mOsm/kg (normal 275–295)
Na: 148 mmol/L (corrected for hyperglycaemia: 144 mmol/L)
K: 3.1 mmol/L (on replacement — now 3.8 mmol/L)
Creatinine: 168 μmol/L (likely pre-renal; improving)
HbA1c: 118 mmol/mol (13.1%) — consistent with 3+ months of sustained hyperglycaemia
pH: 7.38 (no significant acidosis; consistent with HHS rather than DKA)
Ketones: 1.4 mmol/L (mildly elevated; subthreshold for DKA)
CRP: 68 mg/L (possible trigger infection?)
Urine dipstick: Glucose ++++, Protein ++, Ketones + (urine culture sent)

Results (today 0800):
Blood glucose: 18.4 mmol/L (significant improvement)
Na: 141 mmol/L (normalising)
K: 3.8 mmol/L (repleted)
Cr: 132 μmol/L (improving)
Serum osmolality: 302 mOsm/kg (near-normal)

CURRENT MEDICATIONS:
1. IV 0.9% NaCl (currently 125 mL/hr — weaning as oral intake improves)
2. Variable rate insulin infusion (VRII) — currently running; transitioning to basal-bolus today
3. Potassium chloride infusion (completed; oral replacement continuing)
4. Metformin 500mg PO twice daily (commencing today as renal function recovering)
5. Insulin Glargine 10 units SC at night (commencing today — new T2DM basal insulin)
6. Insulin Aspart 4 units SC before meals (new T2DM bolus insulin)
7. Lisinopril 5mg PO once daily (new — diabetic nephroprotection, given proteinuria)
8. Aspirin 75mg PO once daily (new — cardiovascular primary prevention; given ASCVD risk)
9. Atorvastatin 40mg PO once daily (new — cardiovascular risk reduction; commenced today)

ASSESSMENT:
67-year-old female with HHS (serum osmolality 358 mOsm/kg, glucose 48.2 mmol/L on admission) likely precipitated by undiagnosed Type 2 Diabetes Mellitus (HbA1c 118 mmol/mol). Responding well to IV fluid resuscitation and insulin infusion. Electrolytes and renal function recovering. Transitioning to subcutaneous insulin and oral hypoglycaemics today. Complex medication education needs: new insulin regimen, new T2DM oral agents, new cardiometabolic protective medications.

PLAN:
1. Transition off VRII to Glargine 10 units nocte and pre-meal Aspart
2. Commence Metformin 500mg BD with food; uptitrate to 1g BD in 4 weeks pending renal function
3. Continue oral fluid supplementation — target 2.5L/day; discontinue IV fluids when adequate oral intake established
4. Urgent diabetes specialist nurse input for insulin education and self-management skills
5. Dietitian referral for T2DM dietary education
6. New medications counselling: Lisinopril, Aspirin, Atorvastatin
7. Ophthalmology and podiatry baseline screening before discharge
8. HbA1c target: <53 mmol/mol at 3-month review
9. Plan for 3-month GP review with repeat HbA1c, renal function, and blood pressure assessment
10. Discharge target: 48–72 hours once glucose consistently <12 mmol/L, oral intake adequate, insulin technique confirmed, and patient confident with self-monitoring

CLINICAL STABILITY: Improving but complex medication initiation and education needs make early discharge premature. Anticipated discharge Day 4–5.`,
    vitals: {
      bloodPressure: '108/68',
      heartRate: 96,
      respiratoryRate: 16,
      temperature: 37.2,
      oxygenSaturation: 97,
      painLevel: 1,
    },
    medications: [
      { name: '0.9% NaCl IV', dose: '125 mL/hr', route: 'IV', frequency: 'Continuous infusion', status: 'active' },
      { name: 'Variable Rate Insulin Infusion', dose: 'Per protocol', route: 'IV', frequency: 'Continuous — transitioning off', status: 'active' },
      { name: 'Insulin Glargine', dose: '10 units', route: 'SC', frequency: 'Nocte', status: 'active' },
      { name: 'Insulin Aspart', dose: '4 units', route: 'SC', frequency: 'Before meals', status: 'active' },
      { name: 'Metformin', dose: '500mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Lisinopril', dose: '5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Aspirin', dose: '75mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Atorvastatin', dose: '40mg', route: 'PO', frequency: 'Once daily (nocte)', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Metabolic', finding: 'HHS resolved — glucose 18.4 mmol/L (from 48.2); osmolality near-normal (302 from 358 mOsm/kg)', severity: 'moderate', date: '2024-11-29' },
      { category: 'Diabetes', finding: 'New T2DM diagnosis — HbA1c 118 mmol/mol (13.1%); insulin and oral agent regimen initiated', severity: 'severe', date: '2024-11-29' },
      { category: 'Renal Function', finding: 'Pre-renal AKI improving — Cr 132 μmol/L (from 168); proteinuria noted on dipstick', severity: 'moderate', date: '2024-11-29' },
      { category: 'Cardiovascular Risk', finding: 'ASCVD risk significant — new T2DM at age 67; statin and ACE inhibitor initiated for primary prevention', severity: 'moderate', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate at this time. Complex new medication regimen including two insulin formulations requires inpatient diabetes specialist nurse education. IV insulin infusion and IV fluid management must be completed under inpatient supervision.',
        score: 31,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 88,
        criteria: [
          { name: 'Medical Stability', met: false, value: 'Improving but not stable', details: 'BP 108/68 — still below optimum; glycaemic trajectory requires supervised monitoring during insulin transition' },
          { name: 'IV Medication Independence', met: false, value: 'IV insulin + IV fluids active', details: 'VRII and IV fluids ongoing; SC insulin transition not yet established and validated' },
          { name: 'Functional Mobility', met: true, value: 'Ambulatory', details: 'Mobilising independently with supervision; functional status will be normal once acute illness resolves' },
          { name: 'Cognitive Status', met: false, value: 'GCS 14 — mild confusion', details: 'Mild confusion persisting; GCS 14/15 — below threshold for safe insulin self-administration without direct supervision' },
          { name: 'Care Needs Complexity', met: false, value: 'Complex — new insulin regimen', details: 'Initiation of basal-bolus insulin in a newly diagnosed diabetic requires diabetes nurse specialist supervision; not ACAH-appropriate' },
        ],
        reasoning: 'ACAH admission is inappropriate at this stage. The patient is in the acute phase of HHS recovery with active IV treatments and an evolving, complex medication regimen. Crucially, initiation of insulin therapy in a newly diagnosed diabetic who is still mildly confused requires structured inpatient diabetes education and supervised injection technique. Reassess for ACAH or early discharge at Day 4 once glucose stable <12 mmol/L and oral intake established.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High 30-day readmission risk — LACE+ score 13. New T2DM diagnosis with complex insulin regimen is a high-risk discharge context. Structured diabetes care transition essential: diabetes nurse specialist follow-up within 48 hours of discharge, community diabetic nurse referral.',
        score: 13,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 86,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '4–5 days projected = 3 pts', threshold: '≥1 day', details: 'Anticipated LOS 4–5 days contributes 3 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', threshold: 'Emergent admission', details: 'Emergency admission via ambulance with reduced consciousness; +3 points' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI score 3 = 4 pts', threshold: '≥1 comorbidity', details: 'New T2DM (1pt) + CKD stage 2 (1pt) + hypertension (1pt) + proteinuria = CCI 3; +4 points' },
          { name: 'ED Visits Prior 6 Months (E)', met: false, value: '0 visits = 0 pts', threshold: '0 visits preferred', details: 'No prior ED attendances — index presentation; 0 additional points' },
        ],
        reasoning: 'LACE+ score 13 — high risk. The primary concern is newly initiated insulin therapy: insulin-related hypoglycaemia is the leading cause of diabetes-related emergency readmission. A patient new to insulin requiring basal-bolus regimen, still learning injection technique, and living alone has a very high readmission vulnerability. Community diabetic nurse (CDN) follow-up within 48–72 hours of discharge is mandatory.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 4 — low-medium range. Adequate for ward care with 4-hourly observations. Blood pressure and tachycardia require monitoring during rehydration. Escalate if SBP falls below 90 mmHg or HR rises above 120 bpm.',
        score: 4,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 80,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '16/min = 0 pts', threshold: '≤20/min', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '97% RA = 0 pts', threshold: '≥96%', details: 'Normal on room air; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', threshold: 'No supplemental O2', details: 'Room air; score 0' },
          { name: 'Systolic Blood Pressure', met: true, value: '108 mmHg = 2 pts', threshold: '≥110 mmHg', details: 'SBP 108 — borderline low; +2 points. Improving from admission (94 mmHg). Continue IV fluids.' },
          { name: 'Heart Rate', met: true, value: '96 bpm = 1 pt', threshold: '51-90 bpm', details: 'HR mildly elevated due to dehydration; +1 point. Improving from admission (112 bpm).' },
          { name: 'Temperature', met: false, value: '37.2°C = 0 pts', threshold: '36.1-38.0°C', details: 'Normal; score 0' },
          { name: 'Consciousness', met: true, value: 'Mild confusion = 1 pt', threshold: 'Alert', details: 'Mild residual confusion from HHS; GCS 14; +1 point' },
        ],
        reasoning: 'NEWS2 score 4 reflects the ongoing physiological recovery from severe hyperglycaemic dehydration. Blood pressure remains marginally low, tachycardia persists, and mild confusion continues. These are expected in the resolution phase of HHS. Ward-level care with 4-hourly observations is appropriate; ICU criteria are not met but close monitoring is warranted.',
      },
      {
        type: 'sepsis',
        status: 'caution',
        recommendation: 'qSOFA score 1 — below activation threshold. However, CRP of 68 mg/L suggests a possible infective precipitant for HHS. Urine culture result pending. Reassess qSOFA at 12-hour intervals.',
        score: 1,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 72,
        criteria: [
          { name: 'Altered Mentation', met: true, value: 'GCS 14 = 1', threshold: 'GCS <15', details: 'GCS 14/15 from HHS encephalopathy — criterion met; +1. Caution: altered mentation in HHS is metabolic, but sepsis must be excluded.' },
          { name: 'Respiratory Rate ≥22', met: false, value: 'RR 16/min', threshold: '≥22/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP ≤100 mmHg', met: false, value: 'SBP 108 mmHg', threshold: '≤100 mmHg', details: 'Above threshold; criterion not met — noting marginal improvement required' },
        ],
        reasoning: 'qSOFA 1 — threshold not met (≥2 required for protocol activation). However, the elevated CRP (68 mg/L) in a patient presenting with HHS is a recognised pattern: infection is a common precipitant of HHS in the elderly (urinary tract infection, pneumonia). Urine culture is pending. If qSOFA increases to 2 or any criterion deteriorates, Sepsis Six bundle should be initiated immediately.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No surgical indication present. Metabolic emergency managed medically. For future consideration: any elective surgery would require glycaemic optimisation to HbA1c <69 mmol/mol pre-operatively per AAGBI guidelines.',
        confidence: 78,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No surgical pathology — HHS is a medical emergency managed entirely non-operatively' },
          { name: 'Glycaemic Optimisation', met: false, value: 'HbA1c 118 mmol/mol', details: 'HbA1c must be <69 mmol/mol before elective surgery (AAGBI perioperative guidelines); currently severely suboptimal' },
          { name: 'Renal Function', met: false, value: 'Cr 132 (improving)', details: 'Active AKI; renal function must normalise before any anaesthetic exposure' },
          { name: 'Cardiovascular Risk', met: false, value: 'Moderate-high (new T2DM)', details: 'Unoptimised T2DM, hypertension, and new proteinuria contribute moderate-high cardiovascular surgical risk' },
          { name: 'Functional Status', met: true, value: 'Expected full recovery', details: 'Pre-morbid functional status was independent; full recovery anticipated once glycaemic control established' },
        ],
        reasoning: 'No surgical intervention is required or appropriate for this admission. If future elective surgery is contemplated, glycaemic optimisation to HbA1c <69 mmol/mol is a prerequisite under AAGBI and NHS England guidelines. Current HbA1c of 118 mmol/mol renders elective surgery inadvisable until adequate diabetes management is achieved, typically 3–6 months.',
      },
    ],
    stabilityScore: 45,
  },
];

export default syntheticPatients;
