  {
    id: 'pt-010',
    name: 'Brian McCarthy',
    mrn: 'MRN-2024-2011',
    age: 74,
    sex: 'Male',
    admissionDate: '2024-11-24',
    room: '6C-309',
    attendingPhysician: 'Dr. Sanjay Patel',
    primaryDiagnosis: 'Acute Pancreatitis (moderately severe, Ranson score 3)',
    rawNote: `PROGRESS NOTE - Day 6 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Acute pancreatitis - moderately severe, gallstone aetiology

SUBJECTIVE:
Patient reports abdominal pain reducing - now 4/10 (was 9/10 on admission). Tolerating sips of clear fluid today - first oral intake since admission. Bowel sounds returned. No fevers overnight. Still nauseated but improved.

OBJECTIVE:
Vital Signs: BP 122/76, HR 92, RR 18, Temp 38.2C, SpO2 96% RA
Abdomen: Soft, diffuse epigastric tenderness, reducing from admission. No rigidity. No peritoneal signs. Bowel sounds present.
Nutrition: NG feeds continuing (started Day 3), tolerating 80% of target rate

RESULTS:
Amylase Day 1: 2,840 U/L. Today: 380 U/L (normalising)
CRP: 142 mg/L (peak 284 on Day 3, now downtrending)
WBC: 12.8 (peak 16.4 on Day 2)
LFTs: Bilirubin 32 umol/L (mildly elevated, settling)
CT Abdomen Day 3: Peripancreatic fat stranding, no organised necrosis, no abscess. CTSI score 4 (moderate).
USS: Gallstones confirmed as aetiology. Common bile duct 7mm (borderline).

CURRENT MEDICATIONS:
1. IV Piperacillin-Tazobactam 4.5g TDS (prophylaxis - Day 4)
2. IV Morphine PCA (weaning, low use now)
3. IV 0.9% NaCl (maintenance)
4. Thiamine 100mg IV TDS (alcohol screen negative but nutritional support)
5. Omeprazole 40mg PO daily
6. Metoclopramide 10mg IV TDS (nausea)

ASSESSMENT:
74-year-old male with moderately severe acute gallstone pancreatitis. CT confirms no necrosis. Improving clinically and biochemically. Commencing oral diet cautiously.

PLAN:
1. Advance to low-fat soft diet tomorrow if tolerates clear fluids
2. Stop NG feeds when tolerating 50% of nutritional requirements orally
3. Plan ERCP if CBD dilation progresses on repeat USS
4. Surgical referral for elective laparoscopic cholecystectomy 4-6 weeks post-discharge
5. Step down IV antibiotics to oral Co-amoxiclav when tolerating oral intake`,
    vitals: {
      bloodPressure: '122/76',
      heartRate: 92,
      respiratoryRate: 18,
      temperature: 38.2,
      oxygenSaturation: 96,
      painLevel: 4,
    },
    medications: [
      { name: 'Piperacillin-Tazobactam', dose: '4.5g', route: 'IV', frequency: 'Three times daily', status: 'active' },
      { name: 'Morphine PCA', dose: 'Variable', route: 'IV', frequency: 'PRN', status: 'prn' },
      { name: '0.9% NaCl', dose: '1L', route: 'IV', frequency: 'As prescribed', status: 'active' },
      { name: 'Omeprazole', dose: '40mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Metoclopramide', dose: '10mg', route: 'IV', frequency: 'Three times daily', status: 'active' },
      { name: 'Thiamine', dose: '100mg', route: 'IV', frequency: 'Three times daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'GI', finding: 'Acute pancreatitis CTSI 4 - no necrosis, peripancreatic fat stranding, improving', severity: 'moderate', date: '2024-11-29' },
      { category: 'Biliary', finding: 'Gallstone aetiology confirmed - CBD 7mm borderline, ERCP under consideration', severity: 'moderate', date: '2024-11-29' },
      { category: 'Nutrition', finding: 'Enteral feeding via NG - tolerating 80% target rate; commencing oral refeeding', severity: 'moderate', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate. Active IV antibiotics, IV analgesia (PCA), and IV nutrition support ongoing. Clinical monitoring of pancreatitis resolution requires inpatient care.',
        score: 25,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 91,
        criteria: [
          { name: 'Medical Stability', met: false, value: 'Improving, not stable', details: 'Low-grade fever 38.2C, CRP still elevated, oral intake only just commenced' },
          { name: 'IV Medication Independence', met: false, value: 'Multiple IV therapies', details: 'IV antibiotics, IV analgesia, IV fluids all active - not suitable for community setting' },
          { name: 'Functional Mobility', met: true, value: 'Limited', details: 'Mobilising to chair with assistance; appropriate given abdominal condition' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert and oriented' },
          { name: 'Care Needs Complexity', met: false, value: 'High complexity', details: 'Pancreatitis monitoring, nutritional support, and potential ERCP requirement exceed ACAH scope' },
        ],
        reasoning: 'Pancreatitis requires close inpatient monitoring for complications including pseudocyst formation, infection, and biliary obstruction. Active IV requirements and ongoing pain management make ACAH inappropriate at this stage.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High 30-day readmission risk - LACE+ score 12. Recurrent pancreatitis and delayed cholecystectomy are the principal risks. Surgery should be scheduled within 4 weeks of discharge.',
        score: 12,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 84,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '6 days = 5 pts', details: '6-day LOS contributes maximum 5 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission with acute abdominal pain and severe biochemical disturbance' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 2 = 2 pts', details: 'Hypertension, previous peptic ulcer disease = CCI 2' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 2 pts', details: 'Prior ED attendance for biliary colic 8 weeks ago - missed opportunity for cholecystectomy' },
        ],
        reasoning: 'LACE+ 12. The primary modifiable readmission risk is recurrent gallstone pancreatitis. Early cholecystectomy (within 4 weeks of discharge per BSG guidelines) is the definitive preventive intervention.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 4 - low-medium risk. Low-grade fever and mild tachycardia warrant 4-hourly monitoring. Escalate if temperature exceeds 38.5C or signs of peritonism develop.',
        score: 4,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 83,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '18/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '96% RA = 0 pts', details: 'Normal; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: false, value: '122 mmHg = 0 pts', details: 'Normal; score 0' },
          { name: 'Heart Rate', met: true, value: '92 bpm = 1 pt', details: 'Mild tachycardia; +1 point' },
          { name: 'Temperature', met: true, value: '38.2C = 2 pts', details: 'Low-grade fever; +2 points - monitoring for septic complication' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 4 driven by fever and mild tachycardia. In pancreatitis, temperature elevation may represent systemic inflammatory response (SIRS) or early infected pancreatic necrosis. Requires close monitoring.',
      },
      {
        type: 'sepsis',
        status: 'monitor',
        recommendation: 'qSOFA score 0 - sepsis protocol not activated. However, in moderately severe pancreatitis, infected necrosis is a potential complication from Day 7 onwards. Maintain vigilance.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 78,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert; criterion not met' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 18/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 122 mmHg', details: 'Above threshold; criterion not met' },
        ],
        reasoning: 'qSOFA 0 - no immediate sepsis concern. Prophylactic antibiotics are in place. However, infected pancreatic necrosis typically develops at Days 7-14. Temperature monitoring and repeat CT if clinical deterioration occurs.',
      },
      {
        type: 'surgical',
        status: 'caution',
        recommendation: 'Elective laparoscopic cholecystectomy planned 4-6 weeks post-discharge. ERCP may be required if CBD dilation progresses. Surgical risk is moderate-high given age and comorbidities.',
        confidence: 79,
        criteria: [
          { name: 'Active Surgical Indication', met: true, value: 'Planned - cholecystectomy', details: 'Gallstone pancreatitis mandates cholecystectomy within 4 weeks of discharge per BSG guidelines' },
          { name: 'ERCP Consideration', met: true, value: 'CBD 7mm - monitoring', details: 'Borderline CBD dilation - repeat USS in 48 hours; ERCP if progresses' },
          { name: 'ASA Classification', met: false, value: 'ASA III', details: 'Age 74, hypertension, post-pancreatitis state - ASA III' },
          { name: 'Perioperative Risk', met: false, value: 'Moderate-high', details: 'Post-acute pancreatitis, nutritional depletion, and age 74 increase laparoscopic cholecystectomy risk' },
          { name: 'Timing Optimisation', met: true, value: '4-6 weeks post-discharge', details: 'BSG guideline: interval cholecystectomy 4-6 weeks after acute episode; peripancreatic inflammation needs to settle' },
        ],
        reasoning: 'Surgery is definitively indicated to prevent recurrence. Optimal timing is 4-6 weeks post-discharge. NSQIP risk for laparoscopic cholecystectomy at this age and ASA class is approximately 3-5% major complication rate - acceptable given the alternative of recurrent pancreatitis.',
      },
    ],
    stabilityScore: 55,
  },

  {
    id: 'pt-011',
    name: 'Patricia Keane',
    mrn: 'MRN-2024-2156',
    age: 77,
    sex: 'Female',
    admissionDate: '2024-11-22',
    room: '8B-101',
    attendingPhysician: 'Dr. Michael Chen',
    primaryDiagnosis: 'Left Middle Cerebral Artery Ischaemic Stroke (NIHSS 8)',
    rawNote: `PROGRESS NOTE - Day 8 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Left MCA ischaemic stroke, Day 8, rehabilitation phase

SUBJECTIVE:
Patient communicates with some expressive dysphasia - improved from global aphasia on admission. Right-sided weakness improving but right arm remains weaker than left. Swallowing reviewed by SALT today - progressed to soft pureed diet. Family supportive and present daily.

OBJECTIVE:
Vital Signs: BP 152/94, HR 78, RR 16, Temp 37.0C, SpO2 96% RA
Neurology: Expressive dysphasia (improved), right facial droop (mild), right arm power 3/5, right leg power 4/5. NIHSS 6 (from 8 on admission).
Swallowing: SALT cleared for soft pureed diet and thickened fluids
Continence: Urinary catheter in situ, planned removal tomorrow
Mobility: Transferring with 2-person assist. Physiotherapy daily.

RESULTS:
MRI Brain Day 1: Left MCA territory infarct, no haemorrhage
ECG: Atrial fibrillation (new diagnosis - probable cardioembolic source)
Echo: No intracardiac thrombus, mild LA dilatation
INR: 1.2 (Apixaban commenced Day 3)

CURRENT MEDICATIONS:
1. Apixaban 5mg PO BD (anticoagulation for AF - cardioembolic stroke prevention)
2. Atorvastatin 80mg PO nocte
3. Ramipril 5mg PO daily (BP control)
4. Aspirin 300mg PO daily (first 2 weeks post-stroke, then discontinue)
5. Thickened fluids and soft diet (SALT recommendation)

ASSESSMENT:
77-year-old with cardioembolic ischaemic stroke secondary to newly diagnosed AF. NIHSS improving from 8 to 6. Entering rehabilitation phase. Discharge planning commenced - unlikely to return to previous independent living without significant recovery.

PLAN:
1. Continue daily physiotherapy and occupational therapy
2. Speech and language therapy - aim for normal diet by Day 14
3. Stroke rehabilitation unit transfer when medically stable
4. BP target <130/80 once acute phase passed (currently permissive hypertension)
5. Community stroke team referral for home rehabilitation`,
    vitals: {
      bloodPressure: '152/94',
      heartRate: 78,
      respiratoryRate: 16,
      temperature: 37.0,
      oxygenSaturation: 96,
      painLevel: 2,
    },
    medications: [
      { name: 'Apixaban', dose: '5mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Atorvastatin', dose: '80mg', route: 'PO', frequency: 'Nocte', status: 'active' },
      { name: 'Ramipril', dose: '5mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Aspirin', dose: '300mg', route: 'PO', frequency: 'Daily (first 2 weeks)', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Neurological', finding: 'Left MCA infarct - NIHSS improved 8 to 6, expressive dysphasia persisting', severity: 'moderate', date: '2024-11-29' },
      { category: 'Cardiac', finding: 'New AF diagnosis - cardioembolic source. Apixaban commenced for secondary prevention.', severity: 'moderate', date: '2024-11-29' },
      { category: 'Rehabilitation', finding: 'Right hemiparesis improving, swallowing progressed to soft pureed diet', severity: 'moderate', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate. Requires inpatient stroke rehabilitation unit placement for intensive physiotherapy, OT, and SALT - levels of therapy not achievable in community setting.',
        score: 32,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 92,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Medically stable', details: 'Haemodynamically stable, no acute medical complications, anticoagulation established' },
          { name: 'IV Medication Independence', met: true, value: 'All oral', details: 'All medications oral; no IV therapy required' },
          { name: 'Functional Mobility', met: false, value: '2-person assist required', details: 'Requires 2-person assistance for all transfers - exceeds ACAH safe staffing ratio' },
          { name: 'Cognitive Status', met: false, value: 'Expressive dysphasia', details: 'Communication impairment limits self-management and remote monitoring; safety concern' },
          { name: 'Care Needs Complexity', met: false, value: 'Rehabilitation intensity required', details: 'Daily PT, OT, SALT, and nursing 24/7 required - stroke rehabilitation unit is appropriate placement' },
        ],
        reasoning: 'Stroke rehabilitation requires multidisciplinary intensity not achievable through ACAH. Transfer to stroke rehabilitation unit is the evidence-based pathway for this level of impairment.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High readmission risk - LACE+ score 13. Post-stroke patients with AF have the highest 30-day readmission rates. Anticoagulation optimisation and community stroke team follow-up are mandatory.',
        score: 13,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 87,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '8 days = 5 pts', details: '8-day LOS contributes maximum 5 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency ambulance admission with acute neurological deficit' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 4 = 3 pts', details: 'Stroke (2pts), AF (1pt), hypertension (1pt) = CCI 4' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 2 pts', details: 'One prior ED attendance (TIA 4 months ago - missed opportunity for intervention)' },
        ],
        reasoning: 'LACE+ 13. Prior TIA attendance represents a missed prevention opportunity. Post-stroke AF anticoagulation non-compliance and blood pressure control are the primary modifiable readmission drivers.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 2 - low risk. Ward-level care appropriate for this stage of stroke rehabilitation. Routine 4-hourly observations.',
        score: 2,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 88,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '16/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '96% RA = 0 pts', details: 'Normal; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: false, value: '152 mmHg = 0 pts', details: 'Elevated but permissive hypertension in acute stroke phase is intentional; not scored' },
          { name: 'Heart Rate', met: false, value: '78 bpm = 0 pts', details: 'Rate-controlled AF; normal' },
          { name: 'Temperature', met: false, value: '37.0C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: true, value: 'Dysphasia = 1 pt', details: 'Expressive dysphasia constitutes altered communication; +1 point by clinical interpretation' },
        ],
        reasoning: 'NEWS2 2 - medically stable for ward-level care. Elevated BP is intentional post-stroke permissive hypertension. Dysphasia is noted in consciousness domain.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis indicators. Monitor for post-stroke aspiration pneumonia (common complication) given dysphagia history. Early SALT review has mitigated this risk.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 91,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 13 (dysphasia)', details: 'Expressive dysphasia present but patient alert and following commands; not scoring altered consciousness' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 16/min', details: 'Normal; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 152 mmHg', details: 'Well above threshold; criterion not met' },
        ],
        reasoning: 'No qSOFA criteria met. Post-stroke aspiration pneumonia is a concern given prior dysphagia but SALT has cleared for modified diet. Monitor temperature and respiratory rate for early aspiration signs.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No acute surgical indication. Stroke is managed medically. Any future elective surgery requires careful anticoagulation bridging planning and perioperative stroke risk assessment.',
        confidence: 86,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No surgical pathology requiring operative intervention' },
          { name: 'Anticoagulation Management', met: false, value: 'Apixaban active', details: 'Apixaban requires 48-hour hold pre-operatively; bridging with LMWH for high-thrombotic-risk patients' },
          { name: 'ASA Classification', met: false, value: 'ASA IV', details: 'Recent stroke, AF, age 77 - ASA IV' },
          { name: 'Neurological Status', met: false, value: 'Recent stroke', details: 'Recent stroke within 3 months is a contraindication to elective surgery under general anaesthesia' },
          { name: 'Functional Reserve', met: false, value: 'Reduced by stroke', details: 'Current functional impairment limits tolerance of major surgical stress response' },
        ],
        reasoning: 'No surgery required or appropriate. Recent stroke within 3 months is a recognised contraindication to elective general anaesthesia due to risk of perioperative secondary stroke and haemodynamic instability.',
      },
    ],
    stabilityScore: 56,
  },

  {
    id: 'pt-012',
    name: 'Christopher Lee',
    mrn: 'MRN-2024-2234',
    age: 55,
    sex: 'Male',
    admissionDate: '2024-11-27',
    room: '2A-408',
    attendingPhysician: 'Dr. Aoife Murphy',
    primaryDiagnosis: 'Right-sided Spontaneous Pneumothorax (large), post chest drain removal',
    rawNote: `PROGRESS NOTE - Day 3 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Spontaneous pneumothorax, Day 2 post chest drain removal

SUBJECTIVE:
Patient reports breathing comfortable at rest. No pleuritic chest pain. Mild sharp pain at drain site on deep inspiration - improving. No dyspnoea on light exertion. Keen for discharge today.

OBJECTIVE:
Vital Signs: BP 126/80, HR 82, RR 18, Temp 37.0C, SpO2 97% RA
Respiratory: Good bilateral air entry. Drain site healing - small dressing. No subcutaneous emphysema. No tracheal deviation.
Post-drain CXR (this morning): Lung fully re-expanded. No residual pneumothorax. No effusion.

RESULTS:
CXR Day 1: Large right pneumothorax, >50% lung collapse
CXR post-drain: Full re-expansion
Spirometry (pre-existing): Normal - no underlying lung disease
CT Thorax Day 2: Confirmed simple pneumothorax, small apical blebs (bilateral)

CURRENT MEDICATIONS:
1. Paracetamol 1000mg PO QDS PRN (drain site pain)
2. Ibuprofen 400mg PO TDS (anti-inflammatory)
3. Codeine 30mg PO PRN (pain backup - rarely used)

ASSESSMENT:
55-year-old male with large spontaneous primary pneumothorax, fully resolved with intercostal drain. Ready for discharge.

PLAN:
1. Discharge today
2. Avoid air travel for 6 weeks
3. Avoid diving permanently until surgical pleurodesis or bleb resection considered
4. Respiratory outpatient follow-up in 4 weeks
5. Counsel on recurrence risk (30% within 5 years) and symptoms requiring emergency return`,
    vitals: {
      bloodPressure: '126/80',
      heartRate: 82,
      respiratoryRate: 18,
      temperature: 37.0,
      oxygenSaturation: 97,
      painLevel: 2,
    },
    medications: [
      { name: 'Paracetamol', dose: '1000mg', route: 'PO', frequency: 'QDS PRN', status: 'prn' },
      { name: 'Ibuprofen', dose: '400mg', route: 'PO', frequency: 'Three times daily', status: 'active' },
      { name: 'Codeine', dose: '30mg', route: 'PO', frequency: 'PRN', status: 'prn' },
    ],
    clinicalFindings: [
      { category: 'Respiratory', finding: 'Large spontaneous pneumothorax - fully resolved post chest drain. CXR clear.', severity: 'resolved', date: '2024-11-29' },
      { category: 'Imaging', finding: 'CT thorax: bilateral apical blebs identified - outpatient surgical review recommended', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'proceed',
        recommendation: 'Patient suitable for direct home discharge. Does not require ACAH level of care. Lung fully re-expanded, all oral medications only, independent. Discharge today.',
        score: 94,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 96,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Fully stable', details: 'CXR confirmed full re-expansion, no residual pneumothorax, symptoms resolved' },
          { name: 'IV Medication Independence', met: true, value: 'All oral/PRN only', details: 'No IV medications; PRN oral analgesia only' },
          { name: 'Functional Mobility', met: true, value: 'Fully independent', details: 'No functional limitation' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert and oriented' },
          { name: 'Care Needs Complexity', met: true, value: 'Minimal', details: 'Self-limiting condition; patient educated on return criteria' },
        ],
        reasoning: 'This patient does not require ACAH or any enhanced support. Home discharge with outpatient respiratory follow-up is the appropriate disposition.',
      },
      {
        type: 'readmission',
        status: 'proceed',
        recommendation: 'Low 30-day readmission risk - LACE+ score 4. Young, healthy patient with resolved primary pneumothorax. Standard discharge with clear return instructions.',
        score: 4,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 91,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '3 days = 1 pt', details: '3-day LOS contributes 1 point' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission with acute chest pain and dyspnoea' },
          { name: 'Charlson Comorbidity (C)', met: false, value: 'CCI 0 = 0 pts', details: 'No comorbidities; minimal CCI contribution' },
          { name: 'ED Visits Prior 6 Months (E)', met: false, value: '0 visits = 0 pts', details: 'No prior ED attendances' },
        ],
        reasoning: 'LACE+ 4 - low risk. Young, healthy patient with no comorbidities and a resolved primary pneumothorax. Recurrence (30% at 5 years) is the primary long-term risk but is not a 30-day readmission driver.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 0 - physiologically perfect. No inpatient monitoring required. Discharge appropriate.',
        score: 0,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 98,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '18/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '97% RA = 0 pts', details: 'Normal; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: false, value: '126 mmHg = 0 pts', details: 'Normal; score 0' },
          { name: 'Heart Rate', met: false, value: '82 bpm = 0 pts', details: 'Normal; score 0' },
          { name: 'Temperature', met: false, value: '37.0C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 0 - optimal physiological status. No clinical grounds for continued inpatient monitoring.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis indicators. Pneumothorax is mechanical, not infective. No antibiotic therapy required.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 99,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert; criterion not met' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 18/min', details: 'Normal; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 126 mmHg', details: 'Normal; criterion not met' },
        ],
        reasoning: 'No infection indicators. Pneumothorax is a mechanical event. No infective process identified. Sepsis not applicable.',
      },
      {
        type: 'surgical',
        status: 'caution',
        recommendation: 'Chest drain procedure completed. Bilateral apical blebs on CT indicate long-term recurrence risk. Outpatient thoracic surgical assessment for Video-Assisted Thoracoscopic Surgery (VATS) pleurodesis recommended.',
        confidence: 87,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'Drain procedure complete', details: 'Intercostal drain insertion was the required intervention; now removed' },
          { name: 'Bleb Disease', met: true, value: 'Bilateral blebs on CT', details: 'Bilateral apical blebs identified - risk factor for recurrent and contralateral pneumothorax' },
          { name: 'VATS Candidacy', met: true, value: 'Good candidate', details: 'Age 55, no comorbidities, good functional status - excellent VATS candidate if recurrence occurs' },
          { name: 'ASA Classification', met: true, value: 'ASA I', details: 'Healthy, no comorbidities - ASA I; minimal surgical risk' },
          { name: 'Timing', met: false, value: 'Elective - defer', details: 'First episode managed conservatively. VATS recommended after second episode per BTS guidelines.' },
        ],
        reasoning: 'Per BTS guidelines, VATS pleurodesis is recommended after second ipsilateral pneumothorax or with bilateral blebs showing high recurrence risk. Outpatient thoracic surgical review should be arranged.',
      },
    ],
    stabilityScore: 91,
  },

  {
    id: 'pt-013',
    name: 'Sandra Williams',
    mrn: 'MRN-2024-2378',
    age: 66,
    sex: 'Female',
    admissionDate: '2024-11-26',
    room: '5B-207',
    attendingPhysician: 'Dr. Rachel Kim',
    primaryDiagnosis: 'Hypertensive Emergency with Acute Kidney Injury (Stage 2)',
    rawNote: `PROGRESS NOTE - Day 4 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Hypertensive emergency, BP 224/128 on admission, with AKI and early hypertensive retinopathy

SUBJECTIVE:
Patient reports headache fully resolved since Day 2. No visual disturbance today (had blurred vision on admission). No chest pain or dyspnoea. Tolerating oral antihypertensives. Reports good medication adherence but ran out of Amlodipine 2 weeks ago.

OBJECTIVE:
Vital Signs: BP 158/96 (down from 224/128 on admission), HR 82, RR 16, Temp 37.0C, SpO2 97% RA
Fundoscopy: Resolved papilloedema (confirmed by ophthalmology today). No haemorrhages on current exam.
CNS: No focal neurology. No encephalopathy signs.
Cardiac: Regular rhythm, mild LVH on ECG (chronic)

RESULTS:
Creatinine: 168 umol/L (down from 248 on admission, baseline 95 - AKI Stage 2 resolving)
BNP: 280 pg/mL (mildly elevated)
Urinalysis: 2+ protein, trace blood (hypertensive nephropathy pattern)
Renal USS: Both kidneys normal size and echogenicity

CURRENT MEDICATIONS:
1. Amlodipine 10mg PO daily (uptitrated)
2. Ramipril 5mg PO daily (nephroprotective - restarted as Cr improving)
3. Bisoprolol 5mg PO daily (new - added for additional BP control)
4. IV Labetalol: ceased Day 2 on successful oral BP control

ASSESSMENT:
66-year-old female with hypertensive emergency secondary to medication interruption. BP controlled on oral regimen. AKI Stage 2 resolving. Ophthalmology confirm resolving papilloedema.

PLAN:
1. Discharge tomorrow if BP consistently <160/95
2. Renew all prescriptions - emphasise medication adherence
3. Renal clinic follow-up in 6 weeks (proteinuria workup)
4. Cardiology outpatient for LVH monitoring
5. 48-hour GP review post-discharge`,
    vitals: {
      bloodPressure: '158/96',
      heartRate: 82,
      respiratoryRate: 16,
      temperature: 37.0,
      oxygenSaturation: 97,
      painLevel: 1,
    },
    medications: [
      { name: 'Amlodipine', dose: '10mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Ramipril', dose: '5mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Bisoprolol', dose: '5mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'IV Labetalol', dose: 'Per protocol', route: 'IV', frequency: 'Ceased Day 2', status: 'discontinued' },
    ],
    clinicalFindings: [
      { category: 'Cardiovascular', finding: 'Hypertensive emergency - BP 224/128 on admission, now 158/96 on oral therapy', severity: 'moderate', date: '2024-11-29' },
      { category: 'Renal', finding: 'AKI Stage 2 resolving - Cr 168 (from 248), proteinuria suggesting hypertensive nephropathy', severity: 'moderate', date: '2024-11-29' },
      { category: 'Ophthalmology', finding: 'Papilloedema resolved on fundoscopy - no haemorrhages on today exam', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'caution',
        recommendation: 'ACAH borderline. BP controlled on oral therapy, IV antihypertensives ceased. Pending BP target consistently <160/95 for 24 hours before discharge consideration.',
        score: 69,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 75,
        criteria: [
          { name: 'Medical Stability', met: false, value: 'BP 158/96 - target not yet met', details: 'BP improving but not yet at discharge target of <160/95 consistently over 24 hours' },
          { name: 'IV Medication Independence', met: true, value: 'All oral', details: 'IV Labetalol ceased Day 2; all oral regimen established' },
          { name: 'Functional Mobility', met: true, value: 'Independent', details: 'Mobilising independently without limitation' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Hypertensive encephalopathy resolved; alert and oriented' },
          { name: 'Care Needs Complexity', met: true, value: 'Manageable', details: 'Blood pressure monitoring twice daily and medication compliance - within ACAH scope' },
        ],
        reasoning: 'Patient approaching ACAH eligibility. Primary remaining criterion is consistent BP control at target over 24 hours. If BP <160/95 on morning review tomorrow, home discharge with ACAH BP monitoring visits is appropriate.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High readmission risk - LACE+ score 11. Medication non-adherence was the direct precipitant of this emergency. Structured medicines management, repeat prescription facilitation, and GP follow-up at 48 hours are essential.',
        score: 11,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 84,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '4 days = 3 pts', details: '4-day LOS contributes 3 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission with hypertensive emergency and end-organ damage' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 3 = 3 pts', details: 'Hypertension (1pt), CKD (1pt), LVH (1pt) = CCI 3' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 2 pts', details: 'One ED attendance for hypertensive urgency 4 months ago' },
        ],
        reasoning: 'LACE+ 11. The modifiable readmission risk is clear: medication non-adherence due to prescription lapse. Ensuring automatic prescription renewal, electronic prescribing with community pharmacy, and a 48-hour GP safety-netting review are the key interventions.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 1 - low risk. Ward-level care appropriate. BP monitoring every 4 hours. No escalation criteria met.',
        score: 1,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 90,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '16/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '97% RA = 0 pts', details: 'Normal; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: false, value: '158 mmHg = 0 pts', details: 'Elevated but improving; NEWS2 scoring thresholds for hypertension are above 219 or below 90 systolic' },
          { name: 'Heart Rate', met: false, value: '82 bpm = 0 pts', details: 'Normal; score 0' },
          { name: 'Temperature', met: false, value: '37.0C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 1 - clinically stable. The residual BP elevation is being addressed with oral therapy. No physiological criteria for escalation.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis indicators. Hypertensive emergency is non-infective. No workup required.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 97,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert; criterion not met' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 16/min', details: 'Normal; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 158 mmHg', details: 'Above threshold; criterion not met' },
        ],
        reasoning: 'Hypertensive emergency is a non-infective vascular event. No fever, no elevated inflammatory markers beyond mild AKI response. Sepsis protocol not indicated.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No surgical indication. Hypertensive emergency managed medically. Renal artery stenosis should be excluded as secondary cause via outpatient renal Doppler ultrasound.',
        confidence: 82,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No surgical pathology requiring operative management' },
          { name: 'Renal Artery Stenosis', met: false, value: 'To be excluded', details: 'Bilateral renal artery stenosis is a secondary cause of resistant hypertension - outpatient Doppler required' },
          { name: 'ASA Classification', met: false, value: 'ASA III', details: 'Hypertension, CKD, LVH - ASA III; moderate surgical risk' },
          { name: 'Renal Function', met: false, value: 'AKI resolving', details: 'Active AKI contraindicates elective surgery until renal function returns to baseline' },
          { name: 'BP Control', met: false, value: 'Target not yet met', details: 'Any elective surgery requires BP <160/90 pre-operatively; not yet achieved' },
        ],
        reasoning: 'No acute surgical need. Any elective surgery deferred until BP consistently controlled and AKI fully resolved. Renal artery stenosis exclusion is the priority diagnostic step.',
      },
    ],
    stabilityScore: 64,
  },
