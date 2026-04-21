/**
 * Five branches → languages → levels. Teachers filter by (branch, language, level).
 * Photos: Unsplash portrait crops (face-focused).
 */
export const BRANCHES = [
  {
    id: 'oxford',
    name: 'Oxford',
    tagline: 'The original flagship',
    color: 'from-blue-600 to-oxford-800',
    ring: 'ring-blue-200',
    description: 'Full English & French programs, IELTS, and business courses.',
    languages: [
      { code: 'en', label: 'English', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
      { code: 'fr', label: 'French', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    ],
  },
  {
    id: 'oxford-academy',
    name: 'Oxford Academy',
    tagline: 'Excellence elevated',
    color: 'from-violet-600 to-purple-700',
    ring: 'ring-violet-200',
    description: 'Intensive academic English, SAT, and advanced certifications.',
    languages: [
      { code: 'en', label: 'English', levels: ['A2', 'B1', 'B2', 'C1', 'C2'] },
      { code: 'fr', label: 'French', levels: ['B1', 'B2', 'C1', 'C2'] },
    ],
  },
  {
    id: 'smart-generations',
    name: 'Smart Generations',
    tagline: 'Young minds first',
    color: 'from-amber-500 to-orange-600',
    ring: 'ring-amber-200',
    description: 'Kids and teens, gamified learning, safe classrooms.',
    languages: [
      { code: 'en', label: 'English', levels: ['A1', 'A2', 'B1', 'B2'] },
      { code: 'fr', label: 'French', levels: ['A1', 'A2', 'B1', 'B2'] },
    ],
  },
  {
    id: 'bridge',
    name: 'Bridge',
    tagline: 'Your bridge to the world',
    color: 'from-teal-500 to-cyan-600',
    ring: 'ring-teal-200',
    description: 'English, French, and Spanish for Arabic speakers.',
    languages: [
      { code: 'en', label: 'English', levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
      { code: 'fr', label: 'French', levels: ['A2', 'B1', 'B2', 'C1'] },
      { code: 'es', label: 'Spanish', levels: ['A1', 'A2', 'B1', 'B2'] },
    ],
  },
  {
    id: 'englishy',
    name: 'Englishy',
    tagline: 'English, made fun',
    color: 'from-pink-500 to-rose-600',
    ring: 'ring-pink-200',
    description: 'Conversational English, online cohorts, and corporate programs.',
    languages: [
      { code: 'en', label: 'English', levels: ['A1', 'A2', 'B1', 'B2', 'B2+', 'C1'] },
      { code: 'fr', label: 'French', levels: ['A1', 'A2', 'B1', 'B2'] },
    ],
  },
]

/**
 * @typedef {{ branchId: string, language: string, level: string }} TeachSlot
 */
export const TEACHERS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Senior English Instructor',
    specialty: 'IELTS & business English',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    teaches: [
      { branchId: 'oxford', language: 'en', level: 'B1' },
      { branchId: 'oxford', language: 'en', level: 'B2' },
      { branchId: 'oxford', language: 'en', level: 'C1' },
      { branchId: 'oxford', language: 'en', level: 'C2' },
    ],
  },
  {
    id: 2,
    name: 'Jean-Pierre Moreau',
    role: 'French & prépa',
    specialty: 'DELF / DALF',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    teaches: [
      { branchId: 'oxford', language: 'fr', level: 'A1' },
      { branchId: 'oxford', language: 'fr', level: 'A2' },
      { branchId: 'oxford', language: 'fr', level: 'B1' },
      { branchId: 'oxford', language: 'fr', level: 'B2' },
      { branchId: 'oxford', language: 'fr', level: 'C1' },
      { branchId: 'oxford', language: 'fr', level: 'C2' },
      { branchId: 'oxford-academy', language: 'fr', level: 'C1' },
      { branchId: 'oxford-academy', language: 'fr', level: 'C2' },
    ],
  },
  {
    id: 3,
    name: 'Amina Benali',
    role: 'Young learners lead',
    specialty: 'Kids & teens (5–17)',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    rating: 5.0,
    teaches: [
      { branchId: 'smart-generations', language: 'en', level: 'A1' },
      { branchId: 'smart-generations', language: 'en', level: 'A2' },
      { branchId: 'smart-generations', language: 'en', level: 'B1' },
      { branchId: 'smart-generations', language: 'en', level: 'B2' },
      { branchId: 'smart-generations', language: 'fr', level: 'A1' },
      { branchId: 'smart-generations', language: 'fr', level: 'A2' },
    ],
  },
  {
    id: 4,
    name: 'Youssef El Amrani',
    role: 'Fluency coach',
    specialty: 'Spoken & pronunciation',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    teaches: [
      { branchId: 'bridge', language: 'en', level: 'A1' },
      { branchId: 'bridge', language: 'en', level: 'A2' },
      { branchId: 'bridge', language: 'en', level: 'B1' },
      { branchId: 'bridge', language: 'en', level: 'B2' },
      { branchId: 'bridge', language: 'en', level: 'C1' },
      { branchId: 'bridge', language: 'fr', level: 'A2' },
      { branchId: 'bridge', language: 'fr', level: 'B1' },
      { branchId: 'bridge', language: 'fr', level: 'B2' },
      { branchId: 'bridge', language: 'fr', level: 'C1' },
      { branchId: 'englishy', language: 'en', level: 'B2' },
    ],
  },
  {
    id: 5,
    name: 'Laura Fernández',
    role: 'Spanish & multicultural',
    specialty: 'Beginner to intermediate',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    teaches: [
      { branchId: 'bridge', language: 'es', level: 'A1' },
      { branchId: 'bridge', language: 'es', level: 'A2' },
      { branchId: 'bridge', language: 'es', level: 'B1' },
      { branchId: 'bridge', language: 'es', level: 'B2' },
    ],
  },
  {
    id: 6,
    name: 'David Okonkwo',
    role: 'Academic English',
    specialty: 'B2+ and university prep',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    teaches: [
      { branchId: 'oxford-academy', language: 'en', level: 'B2' },
      { branchId: 'oxford-academy', language: 'en', level: 'C1' },
      { branchId: 'oxford-academy', language: 'en', level: 'C2' },
    ],
  },
  {
    id: 7,
    name: 'Nadia Alami',
    role: 'Online & blended',
    specialty: 'Evening cohorts, adults',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    teaches: [
      { branchId: 'englishy', language: 'en', level: 'A1' },
      { branchId: 'englishy', language: 'en', level: 'A2' },
      { branchId: 'englishy', language: 'en', level: 'B1' },
      { branchId: 'englishy', language: 'fr', level: 'A2' },
      { branchId: 'englishy', language: 'fr', level: 'B1' },
      { branchId: 'englishy', language: 'fr', level: 'B2' },
    ],
  },
  {
    id: 8,
    name: 'Hakim Idrissi',
    role: 'Foundation English',
    specialty: 'First steps, confidence',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    teaches: [
      { branchId: 'oxford', language: 'en', level: 'A1' },
      { branchId: 'oxford', language: 'en', level: 'A2' },
      { branchId: 'oxford', language: 'fr', level: 'A2' },
      { branchId: 'bridge', language: 'fr', level: 'A1' },
    ],
  },
  {
    id: 9,
    name: 'Emily Roberts',
    role: 'All-level French',
    specialty: 'Conversation & grammar',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    teaches: [
      { branchId: 'smart-generations', language: 'fr', level: 'A2' },
      { branchId: 'smart-generations', language: 'fr', level: 'B1' },
      { branchId: 'smart-generations', language: 'fr', level: 'B2' },
      { branchId: 'oxford', language: 'fr', level: 'A1' },
    ],
  },
  {
    id: 10,
    name: 'Omar Tazi',
    role: 'Business & CEFR C1+',
    specialty: 'Corporate, presentations',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    teaches: [
      { branchId: 'englishy', language: 'en', level: 'B2' },
      { branchId: 'englishy', language: 'en', level: 'B2+' },
      { branchId: 'englishy', language: 'en', level: 'C1' },
    ],
  },
]

/** True if this teacher offers (language, level) at the selected center. */
export function teacherAtCenterForLevel(teacher, branchId, language, level) {
  return teacher.teaches.some(
    s => s.branchId === branchId && s.language === language && s.level === level
  )
}

/**
 * All teachers who teach this language + CEFR level at any Oxford Group brand,
 * sorted with the selected center’s team first, then by rating.
 * Gives learners several profiles to compare, not just one match.
 */
export function getTeachersForSelection(branchId, language, level) {
  const matches = TEACHERS.filter(t =>
    t.teaches.some(s => s.language === language && s.level === level)
  )
  const seen = new Set()
  return matches
    .filter((t) => {
      if (seen.has(t.id)) return false
      seen.add(t.id)
      return true
    })
    .sort((a, b) => {
      const aHere = teacherAtCenterForLevel(a, branchId, language, level)
      const bHere = teacherAtCenterForLevel(b, branchId, language, level)
      if (aHere !== bHere) return aHere ? -1 : 1
      return (b.rating ?? 0) - (a.rating ?? 0)
    })
}
