  {
    id: 'pt-006',
    name: 'James O\'Brien',
    mrn: 'MRN-2024-1621',
    age: 58,
    sex: 'Male',
    admissionDate: '2024-11-27',
    room: '3B-208',
    attendingPhysician: 'Dr. Fiona Wallace',
    primaryDiagnosis: 'Non-ST Elevation Myocardial Infarction (NSTEMI), post-PCI',
    rawNote: `PROGRESS NOTE - Day 3 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: NSTEMI, Day 1 post-percutaneous coronary intervention

SUBJECTIVE:
Patient reports chest pain fully resolved since PCI. No dyspnoea at rest. Mild exertional fatigue on walking to bathroom. Denies palpitations or pre-syncope. Tolerating cardiac diet well.

OBJECTIVE:
Vital Signs: BP 118/74, HR 88 bpm, RR 16, Temp 37.1C, SpO2 98% RA
ECG: NSR, no new ST changes, resolving T-wave inversions V2-V4
Troponin trend: 8.4 -> 3.2 -> 1.1 (ng/L, downtrending)
Cardiac: Regular rate, no murmurs, no new S3 or S4
Chest: Clear bilaterally
Groin access site (right femoral): Clean, no haematoma, soft

RESULTS:
Echo post-PCI: EF 52%, mild anterior wall hypokinesis, no significant MR
Angiogram: Single vessel disease, LAD mid-segment 95% stenosis, drug-eluting stent deployed successfully

CURRENT MEDICATIONS:
1. Aspirin 75mg PO daily (dual antiplatelet - lifelong)
2. Ticagrelor 90mg PO BD (DAPT - 12 months)
3. Atorvastatin 80mg PO nocte (high-intensity statin)
4. Ramipril 2.5mg PO daily (commenced post-PCI, uptitrating)
5. Bisoprolol 2.5mg PO daily (heart rate control, uptitrating)
6. GTN spray PRN

ASSESSMENT:
58-year-old male with NSTEMI secondary to LAD disease, successfully revascularised with DES. Post-PCI Day 1, haemodynamically stable, troponin downtrending, EF preserved. Commencing secondary prevention medications.

PLAN:
1. Continue dual antiplatelet therapy - counsel on compliance importance
2. Uptitrate ACE inhibitor and beta-blocker as tolerated
3. Cardiac rehabilitation referral
4. Discharge planning for Day 4 if remains stable
5. GP letter with 12-month DAPT plan`,
    vitals: {
      bloodPressure: '118/74',
      heartRate: 88,
      respiratoryRate: 16,
      temperature: 37.1,
      oxygenSaturation: 98,
      painLevel: 2,
    },
    medications: [
      { name: 'Aspirin', dose: '75mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Ticagrelor', dose: '90mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Atorvastatin', dose: '80mg', route: 'PO', frequency: 'Nocte', status: 'active' },
      { name: 'Ramipril', dose: '2.5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Bisoprolol', dose: '2.5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'GTN Spray', dose: '400mcg', route: 'SL', frequency: 'PRN', status: 'prn' },
    ],
    clinicalFindings: [
      { category: 'Cardiac', finding: 'NSTEMI - LAD DES deployed, EF 52%, troponin downtrending', severity: 'moderate', date: '2024-11-29' },
      { category: 'Access Site', finding: 'Right femoral access site clean, no haematoma', severity: 'resolved', date: '2024-11-29' },
      { category: 'Secondary Prevention', finding: 'DAPT, high-dose statin, ACEi commenced', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'caution',
        recommendation: 'ACAH borderline. Patient clinically stable post-PCI with preserved EF. Requires 24-hour cardiac monitoring before discharge consideration. Review eligibility on Day 4.',
        score: 70,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 76,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Haemodynamically stable post-PCI, troponin downtrending, no arrhythmia' },
          { name: 'IV Medication Independence', met: true, value: 'All oral', details: 'IV heparin ceased post-PCI; all medications now oral' },
          { name: 'Functional Mobility', met: true, value: 'Independent', details: 'Mobilising independently, exertional symptoms resolving' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert, oriented, engaged in secondary prevention counselling' },
          { name: 'Care Needs Complexity', met: false, value: 'Monitoring required', details: 'Post-PCI 24-hour telemetry monitoring standard; not yet safely reducible to ACAH' },
        ],
        reasoning: 'Post-PCI Day 1, the patient is approaching ACAH eligibility but standard post-PCI protocols require minimum 24-hour continuous cardiac monitoring. If no arrhythmia or ischaemic events on Day 2, ACAH with remote telemonitoring is appropriate.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High 30-day readmission risk - LACE+ score 11. Cardiac rehabilitation referral, DAPT education, and cardiology outpatient review within 2 weeks are mandatory.',
        score: 11,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 83,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '3 days = 1 pt', details: '3-day LOS contributes 1 point' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission via ambulance with chest pain and troponin rise' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 4 = 4 pts', details: 'CAD (2pts), hypertension (1pt), hyperlipidaemia (1pt) = CCI 4' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 3 pts', details: 'One prior ED attendance for chest pain 3 months ago' },
        ],
        reasoning: 'LACE+ 11 indicates high readmission risk. Post-ACS patients are among the highest-risk groups for 30-day readmission. DAPT non-compliance and delayed secondary prevention optimisation are the primary preventable causes.',
      },
      {
        type: 'icu-floor',
        status: 'proceed',
        recommendation: 'NEWS2 score 2 - low risk. Ward-level cardiac monitoring appropriate. Routine 4-hourly observations.',
        score: 2,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 90,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '16/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: false, value: '98% RA = 0 pts', details: 'Normal; score 0' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: false, value: '118 mmHg = 0 pts', details: 'Normal; score 0' },
          { name: 'Heart Rate', met: true, value: '88 bpm = 1 pt', details: 'Mild resting tachycardia post-ACS; +1 point' },
          { name: 'Temperature', met: false, value: '37.1C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 2 - stable post-PCI patient. Ward-level telemetry monitoring is appropriate. No escalation criteria met.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis indicators. Admission is cardiac in aetiology. No infective process identified.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 97,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert and oriented; criterion not met' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 16/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 118 mmHg', details: 'Above threshold; criterion not met' },
        ],
        reasoning: 'No sepsis criteria met. Admission is for NSTEMI - a non-infective cardiac emergency. No fever, normal inflammatory markers. Sepsis protocol not indicated.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'PCI complete - no surgical intervention required. If CABG had been indicated, high-dose DAPT would need a 5-day washout pre-operatively.',
        confidence: 88,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'PCI complete', details: 'Percutaneous revascularisation performed; surgical revascularisation not required' },
          { name: 'Cardiac Surgical Risk', met: false, value: 'Moderate', details: 'EF 52% acceptable; however recent PCI and DAPT makes any urgent surgery hazardous' },
          { name: 'ASA Classification', met: false, value: 'ASA III', details: 'Established CAD, hypertension - ASA III' },
          { name: 'DAPT Consideration', met: false, value: 'Dual antiplatelet active', details: 'Any elective surgery must be deferred minimum 6 months post-DES stent deployment' },
          { name: 'Functional Status', met: true, value: 'Good baseline', details: 'Pre-morbid functional capacity good; full recovery expected' },
        ],
        reasoning: 'No surgical intervention required. PCI was successful. If future elective surgery is needed, must defer minimum 6 months post-DES stent due to DAPT requirement. Emergency surgery within 6 months carries significant in-stent thrombosis risk.',
      },
    ],
    stabilityScore: 74,
  },

  {
    id: 'pt-007',
    name: 'Helen Fraser',
    mrn: 'MRN-2024-1789',
    age: 83,
    sex: 'Female',
    admissionDate: '2024-11-24',
    room: '7A-304',
    attendingPhysician: 'Dr. Arun Mehta',
    primaryDiagnosis: 'Urinary Tract Infection with Urosepsis',
    rawNote: `PROGRESS NOTE - Day 6 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Urosepsis secondary to E. coli urinary tract infection

SUBJECTIVE:
Patient reports feeling generally much improved. No longer confused - family confirms back to her baseline. Urine output adequate. Still fatigued but eating approximately 60% of meals. Denies further rigors or chills.

OBJECTIVE:
Vital Signs: BP 108/66, HR 96, RR 18, Temp 37.6C, SpO2 95% RA
General: Frail elderly female, improved from admission. Alert and cooperative.
Cardiovascular: Tachycardia persisting, improving from 118 on admission
Urinary: Catheter in situ, urine now clear and yellow (was cloudy with offensive odour on admission)

RESULTS:
WBC: 11.2 (down from 22.4 on admission)
CRP: 68 mg/L (down from 280)
Blood culture (Day 1): E. coli, ESBL-negative, sensitive to Cephalosporins
Urine culture: E. coli >10^8 CFU/mL
Creatinine: 124 umol/L (down from 198 on admission)

CURRENT MEDICATIONS:
1. Ceftriaxone 2g IV daily (Day 5 of 7 - transitioning to oral tomorrow)
2. Paracetamol 1000mg PO QDS
3. IV 0.9% NaCl 500mL QDS (rehydration - weaning)
4. Lactulose 15mL BD (constipation)
5. Home medications: Amlodipine 5mg, Bisoprolol 2.5mg, Warfarin (AF)

ASSESSMENT:
83-year-old female with urosepsis secondary to ESBL-negative E. coli UTI, responding well to IV Ceftriaxone. Renal function recovering. Frailty and deconditioning remain significant concerns for discharge planning.

PLAN:
1. Step down to oral Cefalexin 500mg QDS tomorrow (Day 7 total course)
2. Remove urinary catheter tomorrow if tolerating voiding
3. Physiotherapy for deconditioning - falls risk assessment
4. Occupational therapy for home environment assessment
5. Discharge planning with social worker - may require interim care package`,
    vitals: {
      bloodPressure: '108/66',
      heartRate: 96,
      respiratoryRate: 18,
      temperature: 37.6,
      oxygenSaturation: 95,
      painLevel: 3,
    },
    medications: [
      { name: 'Ceftriaxone', dose: '2g', route: 'IV', frequency: 'Daily', status: 'active' },
      { name: 'Paracetamol', dose: '1000mg', route: 'PO', frequency: 'Four times daily', status: 'active' },
      { name: '0.9% NaCl', dose: '500mL', route: 'IV', frequency: 'Four times daily', status: 'active' },
      { name: 'Warfarin', dose: 'Per INR', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Amlodipine', dose: '5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
      { name: 'Bisoprolol', dose: '2.5mg', route: 'PO', frequency: 'Once daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Infection', finding: 'Urosepsis - E. coli ESBL-negative, responding to Ceftriaxone', severity: 'moderate', date: '2024-11-29' },
      { category: 'Renal Function', finding: 'AKI resolving - Cr 124 from 198 on admission', severity: 'mild', date: '2024-11-29' },
      { category: 'Frailty', finding: 'Significant deconditioning post-sepsis, falls risk, frailty score high', severity: 'moderate', date: '2024-11-29' },
      { category: 'Haematology', finding: 'Warfarin held during acute illness - INR subtherapeutic, restarting', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate. Active IV antibiotics and IV fluids ongoing. Significant frailty with falls risk and deconditioning require supervised rehabilitation setting.',
        score: 28,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 89,
        criteria: [
          { name: 'Medical Stability', met: false, value: 'Improving but not stable', details: 'Temperature 37.6C, tachycardia persisting - not yet meeting stability threshold' },
          { name: 'IV Medication Independence', met: false, value: 'IV antibiotics + IV fluids', details: 'Ceftriaxone IV and rehydration fluids ongoing; oral step-down planned for Day 7' },
          { name: 'Functional Mobility', met: false, value: 'High falls risk', details: 'Significant deconditioning post-sepsis; requires supervised physiotherapy and falls assessment' },
          { name: 'Cognitive Status', met: true, value: 'Returned to baseline', details: 'Confusion resolved; back to pre-morbid cognitive function' },
          { name: 'Care Needs Complexity', met: false, value: 'Requires supervised care', details: 'Frailty, deconditioning, Warfarin management, catheter care - exceeds ACAH scope' },
        ],
        reasoning: 'Multiple ACAH barriers present: active IV therapy, frailty-related falls risk, and deconditioning requiring physiotherapy input. Reassess following completion of IV antibiotics and physiotherapy assessment.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'Very high 30-day readmission risk - LACE+ score 14. Frail elderly post-sepsis patients have the highest recurrence rates. Enhanced discharge package and GP review within 48 hours mandatory.',
        score: 14,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 88,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '6 days = 5 pts', details: 'LOS 6 days contributes 5 points (maximum)' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Ambulance admission with reduced consciousness and sepsis' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 5 = 4 pts', details: 'AF (1pt), hypertension (1pt), CKD (1pt), age 83 adds significant weight; CCI 5' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '1 visit = 2 pts', details: 'One prior ED attendance (fall with minor injury) in past 6 months' },
        ],
        reasoning: 'LACE+ 14 - very high risk. Frail elderly post-sepsis discharge is among the highest-risk scenarios for 30-day readmission. Recurrent UTI prevention, Warfarin monitoring, and enhanced community support are the priority interventions.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 5 - medium risk. Maintain 4-hourly observations. Tachycardia and mild hypoxaemia require monitoring. Escalate if HR exceeds 110 or SpO2 falls below 93%.',
        score: 5,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 81,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '18/min = 0 pts', details: 'Normal; score 0' },
          { name: 'SpO2', met: true, value: '95% RA = 1 pt', details: 'Mild hypoxaemia; +1 point' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Room air; score 0' },
          { name: 'Systolic BP', met: true, value: '108 mmHg = 2 pts', details: 'Borderline low BP post-sepsis; +2 points' },
          { name: 'Heart Rate', met: true, value: '96 bpm = 1 pt', details: 'Persistent tachycardia; +1 point' },
          { name: 'Temperature', met: true, value: '37.6C = 1 pt', details: 'Low-grade fever; +1 point' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 5 reflects residual sepsis physiology. The patient is improving but not yet at a low-risk threshold. Ward-level care with 4-hourly observations and early escalation criteria are appropriate.',
      },
      {
        type: 'sepsis',
        status: 'caution',
        recommendation: 'qSOFA score 1 - below activation threshold but under active treatment for confirmed sepsis. Sepsis Six bundle was initiated on admission. Continue current antibiotic therapy and monitor for clinical deterioration.',
        score: 1,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 85,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15 - Alert', details: 'Confusion resolved; criterion not met at this assessment' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 18/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP <=100', met: true, value: 'SBP 108 mmHg = 1', details: 'BP 108 - above the <=100 threshold but note patient is post-sepsis; borderline' },
        ],
        reasoning: 'qSOFA 1 - formally below activation threshold. However, this patient has confirmed urosepsis and is under active treatment. The Sepsis Six bundle was appropriately initiated on Day 1. Current management is correct; monitoring for secondary infection or treatment failure is warranted.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No surgical indication. UTI managed medically. Any future surgery in this frail elderly patient carries very high perioperative risk and requires comprehensive geriatric assessment.',
        confidence: 82,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No urological or other surgical pathology requiring operative management' },
          { name: 'Frailty Score', met: false, value: 'High frailty', details: 'Clinical Frailty Scale 6-7 - frailty markedly increases perioperative risk' },
          { name: 'ASA Classification', met: false, value: 'ASA IV', details: 'Age 83, AF, CKD, frailty - ASA IV classification' },
          { name: 'Anticoagulation', met: false, value: 'Warfarin active', details: 'Warfarin requires bridging protocol for any surgical procedure' },
          { name: 'Functional Reserve', met: false, value: 'Limited', details: 'Post-sepsis deconditioning limits functional reserve for surgical stress response' },
        ],
        reasoning: 'No surgical intervention required. For completeness: any future surgery in an ASA IV frail 83-year-old requires comprehensive geriatric assessment, frailty scoring, and family-inclusive shared decision making regarding operative risk versus benefit.',
      },
    ],
    stabilityScore: 42,
  },

  {
    id: 'pt-008',
    name: 'Fatima Hussain',
    mrn: 'MRN-2024-1834',
    age: 52,
    sex: 'Female',
    admissionDate: '2024-11-26',
    room: '5A-114',
    attendingPhysician: 'Dr. Benjamin Clarke',
    primaryDiagnosis: 'Acute Pulmonary Embolism (high-intermediate risk)',
    rawNote: `PROGRESS NOTE - Day 4 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Pulmonary embolism - high intermediate risk, Day 4

SUBJECTIVE:
Patient reports significant improvement in dyspnoea. No pleuritic chest pain at rest. Mild exertional breathlessness on walking 30 metres. No haemoptysis. Anxious about going home but agrees with discharge plan. Tolerating oral anticoagulation.

OBJECTIVE:
Vital Signs: BP 116/72, HR 94, RR 20, Temp 37.1C, SpO2 95% RA
General: Alert, slightly anxious, no acute distress at rest
Respiratory: Reduced air entry right lower zone, no pleural rub today
Cardiac: Mild tachycardia, no right heart strain murmur, JVP normal
Legs: No bilateral leg asymmetry, no calf tenderness

RESULTS:
CTPA: Bilateral PE, right main pulmonary artery and left lower lobe arteries
Echo: Mildly dilated RV, TAPSE 18mm (borderline), no right heart thrombus
Troponin: 0.04 ng/mL (mildly elevated on admission, now normalising)
BNP: 210 pg/mL (mildly elevated, downtrending)
sPESI score: 2 (high-intermediate risk)
Heparin infusion: Ceased. Transitioned to Apixaban 10mg BD.

CURRENT MEDICATIONS:
1. Apixaban 10mg PO BD (first 7 days loading dose)
2. Paracetamol 1000mg PO QDS PRN
3. Enoxaparin: ceased on Apixaban initiation

ASSESSMENT:
52-year-old female with bilateral PE, high-intermediate risk (sPESI 2). Haemodynamically stable throughout. Transitioning to oral anticoagulation. Good candidate for early supported discharge.

PLAN:
1. Discharge tomorrow on Apixaban - transition to 5mg BD after day 7
2. Thrombophilia screen - not commenced (defer 3 months post-acute)
3. PE follow-up clinic in 3 months - echo and CT to assess resolution
4. Investigate underlying precipitant - CT thorax for occult malignancy`,
    vitals: {
      bloodPressure: '116/72',
      heartRate: 94,
      respiratoryRate: 20,
      temperature: 37.1,
      oxygenSaturation: 95,
      painLevel: 3,
    },
    medications: [
      { name: 'Apixaban', dose: '10mg', route: 'PO', frequency: 'Twice daily (loading)', status: 'active' },
      { name: 'Paracetamol', dose: '1000mg', route: 'PO', frequency: 'QDS PRN', status: 'prn' },
    ],
    clinicalFindings: [
      { category: 'Respiratory', finding: 'Bilateral PE - right main PA and left lower lobe arteries. Improving on anticoagulation.', severity: 'moderate', date: '2024-11-29' },
      { category: 'Cardiac', finding: 'Mildly dilated RV on echo, TAPSE 18mm - high-intermediate risk classification', severity: 'moderate', date: '2024-11-29' },
      { category: 'Anticoagulation', finding: 'Transitioned from IV heparin to oral Apixaban loading dose; therapeutically anticoagulated', severity: 'mild', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'caution',
        recommendation: 'ACAH borderline following oral anticoagulation establishment. Haemodynamically stable with improving symptoms. Recommend early supported discharge with PE clinic follow-up rather than full ACAH pathway.',
        score: 74,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 77,
        criteria: [
          { name: 'Medical Stability', met: true, value: 'Stable', details: 'Haemodynamically stable, no right heart failure, oral anticoagulation established' },
          { name: 'IV Medication Independence', met: true, value: 'All oral', details: 'Heparin infusion ceased; Apixaban loading dose commenced' },
          { name: 'Functional Mobility', met: true, value: 'Ambulatory', details: 'Walking 30m on ward; appropriate for home discharge with activity restrictions' },
          { name: 'Cognitive Status', met: true, value: 'Intact', details: 'Alert, oriented, able to self-manage anticoagulation with education' },
          { name: 'Care Needs Complexity', met: false, value: 'Monitoring needed', details: 'SpO2 monitoring, anticoagulation compliance, and symptom surveillance required for first 72h post-discharge' },
        ],
        reasoning: 'Patient meets most ACAH criteria following IV-to-oral anticoagulation transition. The residual SpO2 requirement of 95% and need for close symptom monitoring make standard home discharge with virtual ward follow-up the appropriate model.',
      },
      {
        type: 'readmission',
        status: 'caution',
        recommendation: 'Moderate readmission risk - LACE+ score 9. Anticoagulation education, VTE clinic follow-up at 1 week, and PE red flag symptom card at discharge recommended.',
        score: 9,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 79,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '4 days = 3 pts', details: '4-day LOS contributes 3 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission with acute haemodynamic compromise concern' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 2 = 2 pts', details: 'Mild CCI 2 - limited prior comorbidity' },
          { name: 'ED Visits Prior 6 Months (E)', met: false, value: '0 visits = 1 pt', details: 'No prior ED attendance; minimal contribution' },
        ],
        reasoning: 'LACE+ 9 at the boundary of moderate-high risk. Anticoagulation-related readmissions (bleeding, recurrent VTE) are the primary risks. Patient education and early outpatient follow-up are the key interventions.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 4 - low-medium range. Ward-level care appropriate. Monitor SpO2 and HR closely given PE diagnosis. Escalate immediately if SpO2 falls below 92% or HR rises above 110.',
        score: 4,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 82,
        criteria: [
          { name: 'Respiratory Rate', met: false, value: '20/min = 1 pt', details: 'RR at upper limit of normal; +1 point' },
          { name: 'SpO2', met: true, value: '95% RA = 1 pt', details: 'Mild hypoxaemia in context of PE; +1 point' },
          { name: 'Supplemental Oxygen', met: false, value: 'None = 0 pts', details: 'Maintaining SpO2 on room air; score 0' },
          { name: 'Systolic BP', met: false, value: '116 mmHg = 0 pts', details: 'Normal; score 0' },
          { name: 'Heart Rate', met: true, value: '94 bpm = 1 pt', details: 'Mild tachycardia, PE-related; +1 point' },
          { name: 'Temperature', met: false, value: '37.1C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 4 reflects residual cardiorespiratory compromise from bilateral PE. The patient is improving but requires close monitoring given potential for right heart decompensation.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis indicators. PE is a non-infective thromboembolic emergency. No fever, no infective source identified.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 95,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert; criterion not met' },
          { name: 'Respiratory Rate >=22', met: false, value: 'RR 20/min', details: 'Below threshold; criterion not met' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 116 mmHg', details: 'Above threshold; criterion not met' },
        ],
        reasoning: 'No qSOFA criteria met. Pulmonary embolism is a thromboembolic, not infective, emergency. CRP mildly elevated due to PE inflammatory response. No sepsis workup indicated.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No surgical intervention required. Medical anticoagulation is the definitive treatment for this PE risk category. Catheter-directed thrombolysis was considered and deferred given haemodynamic stability.',
        confidence: 91,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'Haemodynamically stable PE managed medically; catheter-directed therapy deferred' },
          { name: 'Thrombolysis Considered', met: false, value: 'Deferred', details: 'sPESI 2 but haemodynamically stable - systemic thrombolysis not indicated at this stage' },
          { name: 'ASA Classification', met: true, value: 'ASA II', details: 'Young patient, minimal comorbidities - low perioperative risk if needed' },
          { name: 'Anticoagulation Status', met: false, value: 'Therapeutically anticoagulated', details: 'Apixaban loading dose active - surgical intervention would require reversal' },
          { name: 'Monitoring for Deterioration', met: false, value: 'Required', details: 'If haemodynamic instability develops, escalation to catheter-directed therapy should be activated urgently' },
        ],
        reasoning: 'Medical anticoagulation is first-line treatment for this high-intermediate risk PE with haemodynamic stability. No surgical or interventional procedure required at this time. Escalation pathway for haemodynamic compromise should be clearly documented.',
      },
    ],
    stabilityScore: 76,
  },

  {
    id: 'pt-009',
    name: 'David Okonkwo',
    mrn: 'MRN-2024-1902',
    age: 71,
    sex: 'Male',
    admissionDate: '2024-11-25',
    room: '4C-206',
    attendingPhysician: 'Dr. Claire Brennan',
    primaryDiagnosis: 'Acute COPD Exacerbation (GOLD III), Type 2 Respiratory Failure',
    rawNote: `PROGRESS NOTE - Day 5 of Admission
Date: 29 November 2024

CHIEF COMPLAINT: Acute COPD exacerbation with type 2 respiratory failure

SUBJECTIVE:
Patient reports improved breathing compared to admission. No longer using accessory muscles. Sputum now white and reduced in volume (was green and copious). Still requires 28% Venturi mask to maintain SpO2 above 88%. Anxious about breathing but reassured by nursing staff. Appetite poor.

OBJECTIVE:
Vital Signs: BP 132/84, HR 86, RR 22, Temp 37.2C, SpO2 90% on 28% Venturi
General: Alert, comfortable on controlled oxygen. No pursed lip breathing now.
Respiratory: Bilaterally reduced air entry, wheeze throughout, improved from admission
ABG on 28% O2: pH 7.38, pCO2 6.1 kPa, pO2 8.4 kPa, HCO3 28 (compensated type 2)
COPD: Known GOLD III (FEV1 38% predicted, last spirometry 2022)

RESULTS:
CRP: 44 mg/L (down from 112 on admission)
WBC: 9.8 (down from 13.6)
Sputum culture: Haemophilus influenzae, fully sensitive

CURRENT MEDICATIONS:
1. Prednisolone 30mg PO daily (Day 4 of 5)
2. Doxycycline 100mg PO BD (Day 4 of 5 - H. influenzae cover)
3. Salbutamol 2.5mg nebulised QDS + PRN
4. Ipratropium 500mcg nebulised QDS
5. Aminophylline IV (commenced Day 2, discontinuing today)
6. Enoxaparin 40mg SC daily (VTE prophylaxis)
7. Home inhalers: Tiotropium, Fluticasone/Salmeterol

ASSESSMENT:
71-year-old with severe COPD (GOLD III) presenting with acute exacerbation secondary to H. influenzae. Type 2 respiratory failure improving with controlled oxygen, steroids, and antibiotics. Aminophylline to be discontinued today.

PLAN:
1. Discontinue aminophylline IV
2. Continue controlled oxygen - target SpO2 88-92%
3. Step down nebulisers to home inhaler regimen tomorrow
4. Pulmonary rehabilitation referral
5. Smoking cessation counselling`,
    vitals: {
      bloodPressure: '132/84',
      heartRate: 86,
      respiratoryRate: 22,
      temperature: 37.2,
      oxygenSaturation: 90,
      painLevel: 1,
    },
    medications: [
      { name: 'Prednisolone', dose: '30mg', route: 'PO', frequency: 'Daily', status: 'active' },
      { name: 'Doxycycline', dose: '100mg', route: 'PO', frequency: 'Twice daily', status: 'active' },
      { name: 'Salbutamol', dose: '2.5mg', route: 'Nebuliser', frequency: 'QDS + PRN', status: 'active' },
      { name: 'Ipratropium', dose: '500mcg', route: 'Nebuliser', frequency: 'QDS', status: 'active' },
      { name: 'Aminophylline', dose: 'Per protocol', route: 'IV', frequency: 'Continuous', status: 'discontinued' },
      { name: 'Enoxaparin', dose: '40mg', route: 'SC', frequency: 'Daily', status: 'active' },
    ],
    clinicalFindings: [
      { category: 'Respiratory', finding: 'COPD exacerbation GOLD III - type 2 respiratory failure improving on controlled oxygen', severity: 'moderate', date: '2024-11-29' },
      { category: 'Microbiology', finding: 'H. influenzae sputum culture - sensitive, covered by Doxycycline', severity: 'moderate', date: '2024-11-29' },
      { category: 'Gas Exchange', finding: 'ABG compensated type 2 failure - pH 7.38, pCO2 6.1 kPa improving', severity: 'moderate', date: '2024-11-29' },
    ],
    decisions: [
      {
        type: 'acah',
        status: 'action-required',
        recommendation: 'ACAH not appropriate. Requires controlled oxygen titration, regular ABG monitoring, and nebuliser therapy at a frequency exceeding ACAH capability.',
        score: 35,
        scoreMax: 100,
        scoreLabel: 'Eligibility Score',
        confidence: 87,
        criteria: [
          { name: 'Medical Stability', met: false, value: 'Not yet stable', details: 'SpO2 90% on supplemental oxygen; type 2 respiratory failure not yet resolved' },
          { name: 'IV Medication Independence', met: false, value: 'Aminophylline IV active', details: 'IV aminophylline being discontinued today; will meet criterion tomorrow' },
          { name: 'Functional Mobility', met: true, value: 'Limited but ambulatory', details: 'Mobilising short distances on ward with controlled oxygen' },
          { name: 'Cognitive Status', met: true, value: 'Alert', details: 'Alert, oriented, communicating well' },
          { name: 'Care Needs Complexity', met: false, value: 'High O2 dependency', details: 'Controlled oxygen titration and QDS nebulisers exceed ACAH staffing capacity' },
        ],
        reasoning: 'Active type 2 respiratory failure with supplemental oxygen dependency and IV therapy makes ACAH unsafe at this stage. Reassess in 48h following aminophylline cessation and nebuliser step-down.',
      },
      {
        type: 'readmission',
        status: 'action-required',
        recommendation: 'High readmission risk - LACE+ score 12. COPD patients have the second-highest 30-day readmission rate nationally. Pulmonary rehabilitation referral and COPD nurse specialist follow-up within 72 hours of discharge are mandatory.',
        score: 12,
        scoreMax: 19,
        scoreLabel: 'LACE+ Score',
        confidence: 86,
        criteria: [
          { name: 'Length of Stay (L)', met: true, value: '5 days = 3 pts', details: '5-day LOS contributes 3 points' },
          { name: 'Acuity of Admission (A)', met: true, value: 'Emergent = 3 pts', details: 'Emergency admission with acute respiratory failure' },
          { name: 'Charlson Comorbidity (C)', met: true, value: 'CCI 4 = 4 pts', details: 'COPD (1pt), hypertension (1pt), prior exacerbation history (1pt), peripheral vascular disease (1pt) = CCI 4' },
          { name: 'ED Visits Prior 6 Months (E)', met: true, value: '2 visits = 2 pts', details: 'Two prior COPD-related ED attendances in 6 months' },
        ],
        reasoning: 'LACE+ 12 - high risk. COPD exacerbation is the second commonest cause of emergency readmission in the UK. Frequency of prior ED attendances indicates poor community support and inhaler compliance issues requiring intensive intervention.',
      },
      {
        type: 'icu-floor',
        status: 'caution',
        recommendation: 'NEWS2 score 6 - medium risk. Close monitoring required. If RR increases above 24 or SpO2 falls below 88% on current oxygen, urgent review and consider NIV initiation.',
        score: 6,
        scoreMax: 20,
        scoreLabel: 'NEWS2 Score',
        confidence: 80,
        criteria: [
          { name: 'Respiratory Rate', met: true, value: '22/min = 2 pts', details: 'RR 22 at NEWS2 threshold; +2 points' },
          { name: 'SpO2 (Scale 2 - COPD)', met: true, value: '90% on O2 = 2 pts', details: 'SpO2 90% using COPD Scale 2 (target 88-92%); +2 points' },
          { name: 'Supplemental Oxygen', met: true, value: 'Yes = 2 pts', details: 'Receiving 28% Venturi oxygen; +2 points' },
          { name: 'Systolic BP', met: false, value: '132 mmHg = 0 pts', details: 'Normal; score 0' },
          { name: 'Heart Rate', met: false, value: '86 bpm = 0 pts', details: 'Normal; score 0' },
          { name: 'Temperature', met: false, value: '37.2C = 0 pts', details: 'Normal; score 0' },
          { name: 'Consciousness', met: false, value: 'Alert = 0 pts', details: 'Alert; score 0' },
        ],
        reasoning: 'NEWS2 6 - medium risk. Score driven by respiratory parameters. COPD Scale 2 applied appropriately. Any further deterioration warrants urgent review and NIV consideration.',
      },
      {
        type: 'sepsis',
        status: 'proceed',
        recommendation: 'qSOFA score 0 - no sepsis activation criteria met. Exacerbation is bacterial (H. influenzae) and receiving appropriate antibiotic treatment. No sepsis bundle required.',
        score: 0,
        scoreMax: 3,
        scoreLabel: 'qSOFA Score',
        confidence: 88,
        criteria: [
          { name: 'Altered Mentation', met: false, value: 'GCS 15', details: 'Alert; criterion not met' },
          { name: 'Respiratory Rate >=22', met: true, value: 'RR 22/min = borderline', details: 'RR exactly at threshold; criterion met marginally. Note: RR elevation in COPD is expected and does not indicate sepsis in isolation.' },
          { name: 'Systolic BP <=100', met: false, value: 'SBP 132 mmHg', details: 'Well above threshold; criterion not met' },
        ],
        reasoning: 'qSOFA 1 (RR 22) but this reflects COPD physiology rather than sepsis. Clinical picture is of a bacterial COPD exacerbation, not systemic sepsis. Inflammatory markers are downtrending. No sepsis bundle activation required.',
      },
      {
        type: 'surgical',
        status: 'monitor',
        recommendation: 'No surgical indication. Medical management of COPD exacerbation is appropriate. Any future surgery carries high risk due to GOLD III COPD.',
        confidence: 84,
        criteria: [
          { name: 'Active Surgical Indication', met: false, value: 'None', details: 'No surgical pathology identified' },
          { name: 'Pulmonary Function', met: false, value: 'FEV1 38% predicted', details: 'GOLD III COPD severely limits cardiopulmonary surgical reserve' },
          { name: 'ASA Classification', met: false, value: 'ASA III-IV', details: 'Severe COPD, type 2 respiratory failure history - ASA III-IV depending on baseline' },
          { name: 'Perioperative Respiratory Risk', met: false, value: 'Very high', details: 'Post-operative respiratory failure risk high; NIV/ICU support likely required post any major surgery' },
          { name: 'Functional Status', met: true, value: 'MRC 3 baseline', details: 'Limited but ambulatory baseline; acceptable for low-risk procedures' },
        ],
        reasoning: 'No surgical intervention required. If future elective surgery is considered, formal respiratory risk assessment including full pulmonary function testing and cardiopulmonary exercise testing (CPET) should precede anaesthetic review.',
      },
    ],
    stabilityScore: 58,
  },
