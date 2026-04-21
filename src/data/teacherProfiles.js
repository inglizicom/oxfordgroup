import { TEACHERS } from './branchesAndTeachers.js'

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'B2+', 'C1', 'C2']

/**
 * Merged display fields + curriculum. Prices in MAD; sessions are private / small-group.
 */
/** Teaching stats, schedule, and context for profile + school flow */
const TEACHER_STATS = {
  1: {
    totalStudentsTaught: 820,
    totalHoursTaught: 12400,
    currentStudents: 24,
    currentLesson: 'IELTS B2+ evening cohort · business writing clinic',
    introWork: 'Over ten years guiding Moroccan and international learners toward IELTS 7+ and clear workplace English.',
    weeklySchedule: [
      { day: 'الاثنين / Mon', time: '17:00–20:00' },
      { day: 'الأربعاء / Wed', time: '17:00–20:00' },
      { day: 'السبت / Sat', time: '10:00–13:00' },
    ],
  },
  2: {
    totalStudentsTaught: 640,
    totalHoursTaught: 11200,
    currentStudents: 18,
    currentLesson: 'DELF B2 / Classes prépa oral French',
    introWork: 'Prépa and DALF specialist with a calm, exam-focused path for students aiming at grandes écoles and French-medium careers.',
    weeklySchedule: [
      { day: 'الثلاثاء / Tue', time: '16:00–20:00' },
      { day: 'الخميس / Thu', time: '16:00–20:00' },
    ],
  },
  3: {
    totalStudentsTaught: 1200,
    totalHoursTaught: 9600,
    currentStudents: 32,
    currentLesson: 'Young learners A2 English · songs & story arc',
    introWork: 'Creates safe, joyful classes for children and families in line with our values: respect, growth, and clear parent communication.',
    weeklySchedule: [
      { day: 'الأحد / Sun', time: '14:00–18:00' },
      { day: 'السبت / Sat', time: '09:00–13:00' },
    ],
  },
  4: {
    totalStudentsTaught: 710,
    totalHoursTaught: 8900,
    currentStudents: 20,
    currentLesson: 'Fluency lab · pronunciation for Darija speakers',
    introWork: 'Helps students speak with confidence, with culturally aware feedback for Moroccan Arabic-background learners.',
    weeklySchedule: [
      { day: 'الاثنين / Mon', time: '18:00–21:00' },
      { day: 'الخميس / Thu', time: '18:00–21:00' },
    ],
  },
  5: {
    totalStudentsTaught: 430,
    totalHoursTaught: 5200,
    currentStudents: 12,
    currentLesson: 'Spanish A2 travel & conversation',
    introWork: 'Bridges Spanish to everyday goals—travel, family, and work—with patience and real listening practice.',
    weeklySchedule: [
      { day: 'الثلاثاء / Tue', time: '17:00–20:00' },
      { day: 'السبت / Sat', time: '10:00–12:00' },
    ],
  },
  6: {
    totalStudentsTaught: 560,
    totalHoursTaught: 7800,
    currentStudents: 16,
    currentLesson: 'Academic writing & SAT / IELTS C1+',
    introWork: 'Prepares students for university-level writing and high-stakes tests with structured feedback loops.',
    weeklySchedule: [
      { day: 'الأربعاء / Wed', time: '15:00–19:00' },
      { day: 'الجمعة / Fri', time: '10:00–14:00' },
    ],
  },
  7: {
    totalStudentsTaught: 950,
    totalHoursTaught: 6600,
    currentStudents: 28,
    currentLesson: 'Blended B1 English · working adults cohort',
    introWork: 'Evening-friendly online and hybrid classes for professionals balancing family, faith, and career.',
    weeklySchedule: [
      { day: 'الاثنين / Mon', time: '19:30–22:00' },
      { day: 'الأربعاء / Wed', time: '19:30–22:00' },
    ],
  },
  8: {
    totalStudentsTaught: 680,
    totalHoursTaught: 4200,
    currentStudents: 22,
    currentLesson: 'Foundation English A1–A2 · confidence first',
    introWork: 'Patient, structured starts for true beginners, including first-language support in Arabic and French when useful.',
    weeklySchedule: [
      { day: 'الثلاثاء / Tue', time: '16:00–19:00' },
      { day: 'الخميس / Thu', time: '16:00–19:00' },
    ],
  },
  9: {
    totalStudentsTaught: 1100,
    totalHoursTaught: 10100,
    currentStudents: 30,
    currentLesson: 'Teen French B1 · project weeks',
    introWork: 'Steady progression for teens, with small groups and a culture of respect, punctuality, and clear goals.',
    weeklySchedule: [
      { day: 'الأحد / Sun', time: '10:00–14:00' },
      { day: 'الخميس / Thu', time: '17:00–20:00' },
    ],
  },
  10: {
    totalStudentsTaught: 490,
    totalHoursTaught: 13200,
    currentStudents: 14,
    currentLesson: 'Corporate C1+ · client calls & email clinic',
    introWork: 'Trains teams and individuals for international clients; scenarios respect local business culture and global etiquette.',
    weeklySchedule: [
      { day: 'الاثنين / Mon', time: '12:00–15:00' },
      { day: 'الأربعاء / Wed', time: '12:00–15:00' },
    ],
  },
}

const EXTRAS = {
  1: {
    sessionDuration: '50 min',
    pricePerHourMad: 180,
  },
  2: {
    sessionDuration: '55 min',
    pricePerHourMad: 200,
  },
  3: {
    sessionDuration: '45 min',
    pricePerHourMad: 150,
  },
  4: {
    sessionDuration: '50 min',
    pricePerHourMad: 160,
  },
  5: {
    sessionDuration: '50 min',
    pricePerHourMad: 170,
  },
  6: {
    sessionDuration: '60 min',
    pricePerHourMad: 190,
  },
  7: {
    sessionDuration: '50 min',
    pricePerHourMad: 165,
  },
  8: {
    sessionDuration: '45 min',
    pricePerHourMad: 140,
  },
  9: {
    sessionDuration: '50 min',
    pricePerHourMad: 155,
  },
  10: {
    sessionDuration: '60 min',
    pricePerHourMad: 220,
  },
}

const CURRICULUM = {
  1: {
    languagesSpoken: ['English (native)', 'French (C1)', 'Arabic (conversational)'],
    education: [
      { degree: 'M.A. TESOL', school: 'University of Leeds', year: '2012' },
      { degree: 'B.A. English Literature', school: "King's College London", year: '2010' },
    ],
    certifications: ['Cambridge CELTA', 'IELTS Examiner (former)', 'Business English TKT'],
    experience: [
      { title: 'Senior English Instructor', org: 'Oxford Group', years: '2014 – present' },
      { title: 'IELTS Coordinator', org: 'International House Casablanca', years: '2011 – 2014' },
    ],
    longBio: 'Sarah has spent over a decade preparing Moroccan learners for IELTS and the workplace. Her classes balance exam technique with real communication, using industry case studies and frequent speaking practice. She has trained corporate groups in finance and logistics, and still teaches weekly intensive groups at our flagship center.',
    methodology: 'Task-based learning, data-driven error correction, and weekly progress checkpoints aligned to CEFR descriptors.',
  },
  2: {
    languagesSpoken: ['French (native)', 'English (C2)', 'Spanish (B2)'],
    education: [
      { degree: 'Agrégation de grammaire', school: 'Sorbonne Université', year: '2008' },
    ],
    certifications: ['DELF / DALF Examiner', 'Chargé d’enseignement (CPGE)'],
    experience: [
      { title: 'Lead French & prépa', org: 'Oxford Group', years: '2012 – present' },
      { title: 'Language department', org: 'Lycée Français', years: '2005 – 2012' },
    ],
    longBio: 'Jean-Pierre brings grandes écoles and DELF / DALF depth into every lesson. He structures long-term preparation with mock orals, timed writing, and clear rubrics so students know exactly what “excellence” means at B2 and C1.',
    methodology: 'Explicit grammar architecture, text-deconstruction, and high-frequency exam tasks.',
  },
  3: {
    languagesSpoken: ['Arabic (native)', 'English (C2)', 'French (C1)'],
    education: [
      { degree: 'B.A. English Education', school: 'Université Mohammed V', year: '2014' },
    ],
    certifications: ['Cambridge TKT (Young Learners)', 'Child safeguarding (renewed 2024)'],
    experience: [
      { title: 'Young learners lead', org: 'Smart Generations & Oxford Group', years: '2016 – present' },
    ],
    longBio: 'Amina designs playful, low-anxiety classes for children and teens. She integrates short games, story arcs, and parent-friendly progress reports so families see clear growth on A1–B2 trajectories.',
    methodology: 'Total Physical Response, story-based projects, and spaced repetition for core vocabulary.',
  },
  4: {
    languagesSpoken: ['Arabic (native)', 'English (C2)'],
    education: [
      { degree: 'B.A. Communications', school: 'Al Akhawayn', year: '2015' },
    ],
    certifications: ['CELTA', 'Pronunciation in ELT (NILE)'],
    experience: [
      { title: 'Fluency & pronunciation', org: 'Bridge / Englishy', years: '2017 – present' },
    ],
    longBio: 'Youssef helps learners move from “correct on paper” to confident speech. He focuses on rhythm, intonation, and high-frequency collocations, using short recordings and same-day feedback.',
    methodology: 'Shadowing, chunk practice, and role-plays with real video prompts.',
  },
  5: {
    languagesSpoken: ['Spanish (native)', 'English (C1)', 'French (B2)'],
    education: [
      { degree: 'M.A. Spanish Linguistics', school: 'Universidad de Granada', year: '2013' },
    ],
    certifications: ['DELE examiner preparation', 'SIELE center trainer'],
    experience: [
      { title: 'Spanish & multicultural', org: 'Bridge', years: '2014 – present' },
    ],
    longBio: 'Laura links Spanish to Moroccan learners’ world: travel, work in Spain, and pop culture. She builds a solid A1–B2 path with can-do statements and real listening from Iberian media.',
    methodology: 'Communicative approach with metalinguistic contrast (ES–FR–DARIJA where helpful).',
  },
  6: {
    languagesSpoken: ['English (native)', 'Yoruba'],
    education: [
      { degree: 'M.Ed. Applied Linguistics', school: 'University of Nottingham', year: '2011' },
    ],
    certifications: ['Delta Module 1', 'Academic IELTS training (British Council)'],
    experience: [
      { title: 'Academic English', org: 'Oxford Academy', years: '2013 – present' },
    ],
    longBio: 'David specializes in the jump from B2 to academic writing that universities expect. He teaches synthesis, source use, and timed essays for SAT, IELTS, and foundation-year programs.',
    methodology: 'Genre-based writing cycles with peer review and one-to-one conferencing.',
  },
  7: {
    languagesSpoken: ['French (native)', 'English (C2)', 'Arabic (native)'],
    education: [
      { degree: 'B.S. Business', school: 'ESCA', year: '2016' },
    ],
    certifications: ['BULATS trainer', 'Digital teaching certificate (AOU)'],
    experience: [
      { title: 'Blended & online lead', org: 'Englishy', years: '2018 – present' },
    ],
    longBio: 'Nadia makes online classes as structured as in-person ones: clear agendas, exit tickets, and recordings indexed by language point. She supports evening cohorts for working professionals.',
    methodology: 'Flipped input, live negotiation of meaning, and portfolio assessment.',
  },
  8: {
    languagesSpoken: ['Arabic (native)', 'English (C1)', 'French (B2)'],
    education: [
      { degree: 'B.A. English Studies', school: 'Université Cadi Ayyad', year: '2017' },
    ],
    certifications: ['CELTA', 'K12 literacy workshop (British Council)'],
    experience: [
      { title: 'Foundation & confidence', org: 'Oxford & Bridge', years: '2018 – present' },
    ],
    longBio: 'Hakim focuses on the first 100 hours of English: clear routines, heavy recycling, and confidence-building in dialogues. His French support helps beginners map French sounds to English.',
    methodology: 'PPP with extensive guided practice; literacy-first for false beginners.',
  },
  9: {
    languagesSpoken: ['English (native)', 'French (C1)'],
    education: [
      { degree: 'B.Ed. (Primary French)', school: 'University of Bath', year: '2013' },
    ],
    certifications: ['DELF junior preparation', 'Cambridge TKT (CLIL)'],
    experience: [
      { title: 'All-level French', org: 'Smart Generations & Oxford', years: '2015 – present' },
    ],
    longBio: 'Emily makes French “usable Monday morning”: situational role-play, short texts, and gentle correction. She is especially strong with teens moving from A2 to B1.',
    methodology: 'Form-focused tasks embedded in storylines; oral priority.',
  },
  10: {
    languagesSpoken: ['Arabic (native)', 'English (C2)', 'French (B2)'],
    education: [
      { degree: 'MBA', school: 'ESCA', year: '2014' },
    ],
    certifications: ['Business English (Trinity)', 'Coaching for performance'],
    experience: [
      { title: 'Corporate & C1+', org: 'Englishy', years: '2015 – present' },
    ],
    longBio: 'Omar works with teams and individuals who need English for client calls, email negotiation, and leadership. His sessions are scenario-heavy: simulations, red-teaming, and feedback rubrics.',
    methodology: 'Needs analysis each quarter; 60-minute deep dives; optional micro-coaching add-ons.',
  },
}

function levelsFromTeaches(teacher) {
  const set = new Set(teacher.teaches.map(s => s.level))
  const arr = [...set].sort((a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b))
  if (arr.length === 0) return '—'
  if (arr.length === 1) return arr[0]
  return `${arr[0]} – ${arr[arr.length - 1]}`
}

export function getTeacherById(id) {
  const n = Number(id)
  const base = TEACHERS.find(t => t.id === n)
  if (!base) return null
  const extra = EXTRAS[n] || { sessionDuration: '50 min', pricePerHourMad: 150 }
  const cur = CURRICULUM[n] || {
    longBio: base.specialty,
    education: [],
    certifications: [],
    experience: [],
    languagesSpoken: [],
    methodology: 'Student-centered communicative language teaching.',
  }
  const stats = TEACHER_STATS[n] || {
    totalStudentsTaught: 0,
    totalHoursTaught: 0,
    currentStudents: 0,
    currentLesson: '—',
    introWork: base.specialty,
    weeklySchedule: [],
  }
  return {
    ...base,
    ...extra,
    ...stats,
    levelsTaught: levelsFromTeaches(base),
    curriculum: cur,
  }
}

export function getAllTeacherIds() {
  return TEACHERS.map(t => t.id)
}
