/**
 * Sample certificates for demo verification. Real systems use a secure API + database.
 * Codes are matched case-insensitively (normalized to uppercase).
 */
export const SAMPLE_CERTIFICATES = [
  {
    code: 'OXF-2024-IELTS-001',
    schoolName: 'Oxford Group — Casablanca (flagship)',
    teacherName: 'Sarah Mitchell',
    issueDate: '15 March 2024',
    program: 'IELTS preparation — B2+ cohort',
    level: 'B2+ / C1',
  },
  {
    code: 'OG-FR-DALF-2044',
    schoolName: 'Oxford Academy — Rabat',
    teacherName: 'Jean-Pierre Moreau',
    issueDate: '2 November 2024',
    program: 'DELF / DALF preparation',
    level: 'C1',
  },
  {
    code: 'SG-EN-KIDS-7781',
    schoolName: 'Smart Generations — Fès',
    teacherName: 'Amina Benali',
    issueDate: '8 June 2024',
    program: 'Young learners English',
    level: 'A2',
  },
  {
    code: 'BRIDGE-ES-2025-01',
    schoolName: 'Bridge — Marrakech',
    teacherName: 'Laura Fernández',
    issueDate: '22 January 2025',
    program: 'Spanish general',
    level: 'B1',
  },
]

/**
 * @param {string} raw - user input
 * @returns {typeof SAMPLE_CERTIFICATES[0] | null}
 */
export function findCertificateByCode(raw) {
  if (!raw || typeof raw !== 'string') return null
  const normalized = raw.trim().toUpperCase().replace(/\s+/g, '-')
  return SAMPLE_CERTIFICATES.find((c) => c.code === normalized) ?? null
}
