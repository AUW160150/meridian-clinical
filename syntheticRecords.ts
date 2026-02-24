export interface PatientMetadata {
  id: string;
  name: string;
  mrn: string;
  age: number;
  admissionDate: string;
  room?: string;
  attendingPhysician?: string;
}

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

export interface DispositionInfo {
  currentStatus: string;
  recommendedLevel: string;
  estimatedLOS: string;
  barriers: string[];
  nextSteps: string[];
}

export interface ACAHEligibility {
  eligible: boolean;
  status: 'eligible' | 'borderline' | 'not-eligible';
  score: number;
  criteria: {
    name: string;
    met: boolean;
    details: string;
  }[];
  reasoning: string;
}

export interface ExtractedData {
  vitals: VitalSigns;
  medications: Medication[];
  clinicalFindings: ClinicalFinding[];
  disposition: DispositionInfo;
  stabilityScore: number;
  acahEligibility: ACAHEligibility;
}

export interface PatientRecord {
  metadata: PatientMetadata;
  rawNote: string;
  extractedData?: ExtractedData;
  processedAt?: string;
}

export const syntheticRecords: PatientRecord[] = [
  {
    metadata: {
      id: "pt-001",
      name: "Eleanor Mitchell",
      mrn: "MRN-2024-0891",
      age: 72,
      admissionDate: "2024-11-25",
      room: "4B-102",
      attendingPhysician: "Dr. Sarah Chen"
    },
    rawNote: `PROGRESS NOTE - Day 5 of Admission

Chief Complaint: Community-acquired pneumonia with COPD exacerbation

Subjective:
Patient reports improved breathing overnight. Cough productive but less frequent. Denies chest pain or hemoptysis. Able to ambulate to bathroom with minimal assistance. Appetite improving - ate 75% of breakfast.

Objective:
Vital Signs: BP 128/78, HR 82, RR 18, Temp 98.4°F, SpO2 94% on 2L NC
General: Alert, oriented x4, in no acute distress
Lungs: Decreased breath sounds bilateral bases, scattered expiratory wheezes, improved from yesterday
Cardiac: Regular rate and rhythm, no murmurs
Extremities: Trace bilateral ankle edema, improved from 2+ on admission

Labs (today):
- WBC: 9.2 (down from 14.5 on admission)
- BMP: Within normal limits, Cr 1.1
- Procalcitonin: 0.3 (down from 1.8)

Current Medications:
1. Azithromycin 500mg IV daily (Day 3 of 5)
2. Prednisone 40mg PO daily (Day 4 of 5, then taper)
3. Albuterol/Ipratropium nebulizer Q4H
4. Enoxaparin 40mg SQ daily
5. Home medications continued: Lisinopril 10mg, Metoprolol 25mg BID

Assessment:
72-year-old female with CAP and COPD exacerbation showing clinical improvement. Inflammatory markers trending down. Weaning oxygen successfully.

Plan:
1. Continue current antibiotic course - transition to PO tomorrow if stable
2. Continue steroid taper per protocol
3. Physical therapy eval for discharge planning
4. Target discharge in 24-48 hours if maintains stability on room air
5. Discuss ACAH placement vs home with services

Stability Assessment: Patient demonstrates clinical stability with improving trajectory. Meeting criteria for step-down care consideration.`,
    extractedData: {
      vitals: {
        bloodPressure: "128/78",
        heartRate: 82,
        respiratoryRate: 18,
        temperature: 98.4,
        oxygenSaturation: 94,
        painLevel: 2
      },
      medications: [
        { name: "Azithromycin", dose: "500mg", route: "IV", frequency: "Daily", status: "active" },
        { name: "Prednisone", dose: "40mg", route: "PO", frequency: "Daily", status: "active" },
        { name: "Albuterol/Ipratropium", dose: "Standard", route: "Nebulizer", frequency: "Q4H", status: "active" },
        { name: "Enoxaparin", dose: "40mg", route: "SQ", frequency: "Daily", status: "active" },
        { name: "Lisinopril", dose: "10mg", route: "PO", frequency: "Daily", status: "active" },
        { name: "Metoprolol", dose: "25mg", route: "PO", frequency: "BID", status: "active" }
      ],
      clinicalFindings: [
        { category: "Respiratory", finding: "CAP with COPD exacerbation - improving", severity: "moderate", date: "2024-11-29" },
        { category: "Inflammatory", finding: "WBC normalized (9.2 from 14.5)", severity: "resolved", date: "2024-11-29" },
        { category: "Oxygenation", finding: "Weaning from supplemental O2 successfully", severity: "mild", date: "2024-11-29" },
        { category: "Mobility", finding: "Ambulating with minimal assistance", severity: "mild", date: "2024-11-29" }
      ],
      disposition: {
        currentStatus: "Acute Inpatient",
        recommendedLevel: "ACAH or Skilled Nursing",
        estimatedLOS: "24-48 hours",
        barriers: ["Requires oxygen weaning completion", "PT evaluation pending"],
        nextSteps: ["Transition IV to PO antibiotics", "PT evaluation", "Discharge planning meeting"]
      },
      stabilityScore: 85,
      acahEligibility: {
        eligible: true,
        status: "eligible",
        score: 85,
        criteria: [
          { name: "Medical Stability", met: true, details: "Vital signs stable, trending toward normal" },
          { name: "No IV Medications Required", met: false, details: "Transitioning to PO tomorrow" },
          { name: "Functional Mobility", met: true, details: "Ambulating with minimal assistance" },
          { name: "Cognitive Status", met: true, details: "Alert and oriented x4" },
          { name: "Care Needs Manageable", met: true, details: "Nursing needs within ACAH scope" }
        ],
        reasoning: "Patient demonstrates clinical improvement and stability. Primary remaining barrier is IV antibiotic course completion. Expected to meet all ACAH criteria within 24 hours pending successful PO antibiotic transition."
      }
    },
    processedAt: "2024-11-29T10:30:00Z"
  },
  {
    metadata: {
      id: "pt-002",
      name: "Robert Harrison",
      mrn: "MRN-2024-1142",
      age: 65,
      admissionDate: "2024-11-27",
      room: "3A-205",
      attendingPhysician: "Dr. Michael Torres"
    },
    rawNote: `PROGRESS NOTE - Day 3 of Admission

Chief Complaint: Acute CHF exacerbation

Subjective:
Patient reports significant improvement in dyspnea. Able to sleep flat last night without orthopnea. Still has mild bilateral leg swelling. Denies chest pain. Reports improved energy levels but still fatiguing easily.

Objective:
Vital Signs: BP 118/72, HR 76, RR 16, Temp 98.2°F, SpO2 97% RA
Weight: 185 lbs (down 8 lbs from admission - good diuresis)
General: Comfortable, mild fatigue
Cardiac: Regular rhythm, S3 gallop resolved, JVD 6cm (improved from 12cm)
Lungs: Clear to auscultation, no crackles
Extremities: 1+ bilateral pitting edema (improved from 3+)

Labs:
- BNP: 580 (down from 2,400 on admission)
- Cr: 1.3 (baseline 1.1), K: 4.2
- Daily weights trending down appropriately

Echo (admission): EF 35%, moderate mitral regurgitation, no pericardial effusion

Current Medications:
1. Furosemide 80mg IV BID (will transition to PO)
2. Lisinopril 5mg PO daily (uptitrating)
3. Carvedilol 6.25mg PO BID (uptitrating)
4. Spironolactone 25mg PO daily
5. Metolazone 2.5mg PO daily PRN

Assessment:
65-year-old male with acute on chronic systolic heart failure, responding well to IV diuresis. Volume status improving significantly.

Plan:
1. Transition to PO diuretics today - Furosemide 60mg PO BID
2. Continue neurohormonal blockade uptitration as tolerated
3. Strict I/O and daily weights
4. Heart failure education and dietary counseling
5. Consider discharge tomorrow if stable on PO diuretics
6. Schedule outpatient cardiology follow-up

Clinical Stability: Patient achieving euvolemia with good response to therapy. Meeting criteria for lower acuity care setting.`,
    extractedData: {
      vitals: {
        bloodPressure: "118/72",
        heartRate: 76,
        respiratoryRate: 16,
        temperature: 98.2,
        oxygenSaturation: 97,
        painLevel: 0
      },
      medications: [
        { name: "Furosemide", dose: "80mg", route: "IV", frequency: "BID", status: "active" },
        { name: "Lisinopril", dose: "5mg", route: "PO", frequency: "Daily", status: "active" },
        { name: "Carvedilol", dose: "6.25mg", route: "PO", frequency: "BID", status: "active" },
        { name: "Spironolactone", dose: "25mg", route: "PO", frequency: "Daily", status: "active" },
        { name: "Metolazone", dose: "2.5mg", route: "PO", frequency: "Daily PRN", status: "prn" }
      ],
      clinicalFindings: [
        { category: "Cardiac", finding: "CHF exacerbation - responding to diuresis", severity: "moderate", date: "2024-11-29" },
        { category: "Volume Status", finding: "Lost 8 lbs, edema improving", severity: "mild", date: "2024-11-29" },
        { category: "Biomarkers", finding: "BNP decreasing (580 from 2400)", severity: "moderate", date: "2024-11-29" },
        { category: "Renal", finding: "Mild AKI (Cr 1.3, baseline 1.1)", severity: "mild", date: "2024-11-29" }
      ],
      disposition: {
        currentStatus: "Acute Inpatient",
        recommendedLevel: "Home with Services or ACAH",
        estimatedLOS: "24 hours",
        barriers: ["Transition to oral diuretics pending", "Heart failure education needed"],
        nextSteps: ["PO diuretic transition", "HF education completion", "Arrange follow-up"]
      },
      stabilityScore: 78,
      acahEligibility: {
        eligible: true,
        status: "borderline",
        score: 78,
        criteria: [
          { name: "Medical Stability", met: true, details: "Hemodynamically stable, good diuretic response" },
          { name: "No IV Medications Required", met: false, details: "Transitioning to PO today" },
          { name: "Functional Mobility", met: true, details: "Independent ambulation" },
          { name: "Cognitive Status", met: true, details: "Intact, engaged in education" },
          { name: "Care Needs Manageable", met: true, details: "Daily weight, medication compliance monitoring" }
        ],
        reasoning: "Patient showing excellent response to heart failure treatment. Borderline for ACAH due to ongoing IV-to-PO diuretic transition. If tolerates oral diuretics with continued weight loss, excellent candidate for ACAH with telemonitoring."
      }
    },
    processedAt: "2024-11-29T11:15:00Z"
  },
  {
    metadata: {
      id: "pt-003",
      name: "Margaret Chen",
      mrn: "MRN-2024-0756",
      age: 58,
      admissionDate: "2024-11-26",
      room: "5C-301",
      attendingPhysician: "Dr. James Wilson"
    },
    rawNote: `PROGRESS NOTE - Day 4 of Admission

Chief Complaint: Cellulitis with abscess, s/p I&D

Subjective:
Patient reports wound pain improving, now 4/10 (was 8/10 on admission). No fevers or chills at home. Wound dressing intact. Tolerating oral intake well.

Objective:
Vital Signs: BP 134/82, HR 78, RR 14, Temp 98.6°F, SpO2 99% RA
Wound: Right lower leg, I&D site with packing in place, minimal serosanguinous drainage, no purulence, surrounding erythema decreased from 15cm to 6cm diameter
Labs: WBC 8.4 (normalized from 16.2), Wound culture: MSSA

Current Medications:
1. Vancomycin IV (completing course, will narrow)
2. Acetaminophen 1000mg PO Q6H PRN pain
3. Ibuprofen 600mg PO TID with food

Assessment:
58-year-old female with right LE cellulitis and abscess, post-I&D Day 3, showing good clinical response. Can transition to oral antibiotics.

Plan:
1. Discontinue Vancomycin, start Cephalexin 500mg PO QID for 7 more days
2. Wound care teaching for patient and family
3. Discharge today with home health for wound packing changes
4. Follow-up in wound clinic in 5 days

Clinical Status: Stable for discharge with appropriate wound care support.`,
    extractedData: {
      vitals: {
        bloodPressure: "134/82",
        heartRate: 78,
        respiratoryRate: 14,
        temperature: 98.6,
        oxygenSaturation: 99,
        painLevel: 4
      },
      medications: [
        { name: "Vancomycin", dose: "Weight-based", route: "IV", frequency: "Per pharmacy", status: "discontinued" },
        { name: "Cephalexin", dose: "500mg", route: "PO", frequency: "QID", status: "active" },
        { name: "Acetaminophen", dose: "1000mg", route: "PO", frequency: "Q6H PRN", status: "prn" },
        { name: "Ibuprofen", dose: "600mg", route: "PO", frequency: "TID", status: "active" }
      ],
      clinicalFindings: [
        { category: "Infection", finding: "Cellulitis resolving, erythema decreased 15cm to 6cm", severity: "mild", date: "2024-11-29" },
        { category: "Wound", finding: "I&D site healing appropriately, minimal drainage", severity: "mild", date: "2024-11-29" },
        { category: "Inflammatory", finding: "WBC normalized (8.4 from 16.2)", severity: "resolved", date: "2024-11-29" },
        { category: "Pain", finding: "Pain controlled (4/10 from 8/10)", severity: "mild", date: "2024-11-29" }
      ],
      disposition: {
        currentStatus: "Ready for Discharge",
        recommendedLevel: "Home with Home Health",
        estimatedLOS: "0 days - discharge today",
        barriers: [],
        nextSteps: ["Wound care education", "Home health arrangement", "Wound clinic follow-up"]
      },
      stabilityScore: 92,
      acahEligibility: {
        eligible: false,
        status: "not-eligible",
        score: 92,
        criteria: [
          { name: "Medical Stability", met: true, details: "Clinically stable, infection resolving" },
          { name: "No IV Medications Required", met: true, details: "Transitioned to oral antibiotics" },
          { name: "Functional Mobility", met: true, details: "Independent" },
          { name: "Cognitive Status", met: true, details: "Intact" },
          { name: "Care Needs Manageable", met: true, details: "Requires wound packing changes" }
        ],
        reasoning: "Patient does not require ACAH level of care. Clinically stable with manageable wound care needs. Appropriate for discharge home with home health services for wound care. Higher stability score indicates readiness for lower level of care than ACAH."
      }
    },
    processedAt: "2024-11-29T09:45:00Z"
  },
  {
    metadata: {
      id: "pt-004",
      name: "Thomas Williams",
      mrn: "MRN-2024-1287",
      age: 81,
      admissionDate: "2024-11-24",
      room: "2D-118",
      attendingPhysician: "Dr. Patricia Brown"
    },
    rawNote: `PROGRESS NOTE - Day 6 of Admission

Chief Complaint: Hip fracture s/p ORIF

Subjective:
Patient reports incisional pain 5/10, improved with medication. Participated in physical therapy today but fatigued quickly. Some confusion in early morning that resolved. Family present and supportive.

Objective:
Vital Signs: BP 142/88, HR 92, RR 18, Temp 99.1°F, SpO2 93% RA
Mental Status: A&O x3 (intermittently confused to date), CAM negative currently
Surgical Site: Right hip incision clean, dry, intact, mild surrounding ecchymosis, no signs of infection
Mobility: Weight bearing as tolerated with walker, requires moderate assist x2 for transfers

Labs: Hgb 9.8 (stable), Cr 1.4 (from baseline 1.0)

Current Medications:
1. Oxycodone 5mg PO Q4H PRN pain
2. Acetaminophen 1000mg PO Q6H scheduled
3. Enoxaparin 40mg SQ daily (DVT prophylaxis)
4. Colace 100mg PO BID
5. Home meds: Amlodipine 5mg, Metformin 500mg BID

Assessment:
81-year-old male Day 5 post right hip ORIF. Pain controlled, mobility improving slowly. Episodes of delirium likely multifactorial (pain, unfamiliar environment, age). Mild AKI improving.

Plan:
1. Continue multimodal pain management
2. Aggressive PT/OT - goal 3x daily sessions
3. Monitor for delirium, maintain sleep hygiene
4. Check Cr tomorrow, maintain hydration
5. Disposition planning - likely needs SNF given functional needs and intermittent confusion
6. Continue DVT prophylaxis until mobile

Clinical Stability: Medically stable but functionally limited. Not candidate for ACAH due to rehabilitation needs and delirium risk.`,
    extractedData: {
      vitals: {
        bloodPressure: "142/88",
        heartRate: 92,
        respiratoryRate: 18,
        temperature: 99.1,
        oxygenSaturation: 93,
        painLevel: 5
      },
      medications: [
        { name: "Oxycodone", dose: "5mg", route: "PO", frequency: "Q4H PRN", status: "prn" },
        { name: "Acetaminophen", dose: "1000mg", route: "PO", frequency: "Q6H", status: "active" },
        { name: "Enoxaparin", dose: "40mg", route: "SQ", frequency: "Daily", status: "active" },
        { name: "Colace", dose: "100mg", route: "PO", frequency: "BID", status: "active" },
        { name: "Amlodipine", dose: "5mg", route: "PO", frequency: "Daily", status: "active" },
        { name: "Metformin", dose: "500mg", route: "PO", frequency: "BID", status: "active" }
      ],
      clinicalFindings: [
        { category: "Post-Operative", finding: "Hip ORIF Day 5 - healing appropriately", severity: "moderate", date: "2024-11-29" },
        { category: "Neurological", finding: "Intermittent confusion/delirium", severity: "moderate", date: "2024-11-29" },
        { category: "Mobility", finding: "WBAT with walker, moderate assist x2", severity: "moderate", date: "2024-11-29" },
        { category: "Renal", finding: "AKI (Cr 1.4, baseline 1.0) - improving", severity: "mild", date: "2024-11-29" }
      ],
      disposition: {
        currentStatus: "Acute Inpatient",
        recommendedLevel: "Skilled Nursing Facility",
        estimatedLOS: "2-3 days",
        barriers: ["Functional mobility limitations", "Intermittent delirium", "Intensive PT needs"],
        nextSteps: ["Maximize PT/OT", "SNF referral", "Monitor cognition", "Delirium prevention"]
      },
      stabilityScore: 62,
      acahEligibility: {
        eligible: false,
        status: "not-eligible",
        score: 62,
        criteria: [
          { name: "Medical Stability", met: true, details: "Vital signs acceptable, post-op day 5" },
          { name: "No IV Medications Required", met: true, details: "All medications oral" },
          { name: "Functional Mobility", met: false, details: "Requires mod assist x2, intensive PT needed" },
          { name: "Cognitive Status", met: false, details: "Intermittent confusion, delirium risk" },
          { name: "Care Needs Manageable", met: false, details: "Needs 24/7 monitoring, intensive rehab" }
        ],
        reasoning: "Patient not appropriate for ACAH due to significant rehabilitation needs requiring SNF-level therapy intensity (3x daily PT/OT), intermittent cognitive changes, and need for moderate assistance with transfers. Skilled nursing facility is the appropriate disposition to optimize functional recovery and provide necessary monitoring."
      }
    },
    processedAt: "2024-11-29T14:20:00Z"
  }
];

export default syntheticRecords;
