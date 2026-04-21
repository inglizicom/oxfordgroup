import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts'

const COL = {
  primary: '#1d4ed8',
  gold: '#d97706',
  emerald: '#059669',
  slate: '#64748b',
}

function hoursFromTimeRange(s) {
  if (!s || typeof s !== 'string') return 0
  const times = s.match(/\d{1,2}:\d{2}/g)
  if (!times || times.length < 2) return 2.5
  const toMin = (x) => {
    const [h, min] = x.split(':').map(Number)
    return h * 60 + min
  }
  return Math.max(0, (toMin(times[1]) - toMin(times[0])) / 60)
}

export default function TeacherProfileCharts({ t }) {
  const cap = (v, max) => Math.min(100, Math.round((v / max) * 100))

  const radarData = [
    { subject: 'Learner score', A: Math.round((t.rating / 5) * 100), fullMark: 100 },
    { subject: 'Load', A: cap(t.currentStudents, 40), fullMark: 100 },
    { subject: 'Career reach', A: cap(t.totalStudentsTaught, 1500), fullMark: 100 },
    { subject: 'Hours depth', A: cap(t.totalHoursTaught, 15000), fullMark: 100 },
  ]

  const loadComparison = [
    { name: 'Roster (now)', value: t.currentStudents, display: t.currentStudents.toLocaleString() },
    {
      name: 'Career students',
      value: Math.log10(t.totalStudentsTaught + 1) * 25,
      display: `${t.totalStudentsTaught.toLocaleString()}+`,
    },
    {
      name: 'Contact hours (÷1000)',
      value: Math.log10(t.totalHoursTaught + 1) * 22,
      display: `${t.totalHoursTaught.toLocaleString()}+ h`,
    },
  ]

  const weekLine = (t.weeklySchedule || []).map((row) => ({
    name: row.day?.replace(/ال.+?\s*\/\s*/, '').split('/')[0]?.trim() || row.day,
    hours: Math.round(hoursFromTimeRange(row.time) * 10) / 10,
  }))

  const pieLike = [
    { name: 'This cohort (active)', value: t.currentStudents, fill: COL.primary },
    {
      name: 'Alumni & past learners',
      value: Math.max(0, t.totalStudentsTaught - t.currentStudents),
      fill: '#93c5fd',
    },
  ]
  const pieTotal = pieLike.reduce((a, b) => a + b.value, 0) || 1

  const insight = (() => {
    const o = []
    if (t.rating >= 4.85) o.push('Learner feedback scores in the top tier for the network.')
    if (t.currentStudents >= 22) o.push('Currently carries a full roster — high demand for this profile.')
    else if (t.currentStudents < 16) o.push('Smaller active groups — more individual attention in class.')
    if (t.totalHoursTaught >= 8000) o.push('Very high lifetime teaching hours; strong depth of classroom experience.')
    if (o.length < 2) o.push('Curriculum and methodology align with Oxford Group’s CEFR-based progression.')
    return o.slice(0, 3)
  })()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-oxford-50/30 p-4 sm:p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-oxford-800 flex items-center gap-2">
          Snapshot analysis
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed">
          {insight.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-oxford-500 font-bold">·</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Profile balance</h3>
          <p className="text-xs text-slate-500 mb-2">Relative emphasis (0–100 index)</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar
                  name="Index"
                  dataKey="A"
                  stroke={COL.primary}
                  fill={COL.primary}
                  fillOpacity={0.35}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12 }}
                  formatter={(v) => [`${v}`, 'index']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Load comparison</h3>
          <p className="text-xs text-slate-500 mb-2">Log-scaled bars (see labels for true values)</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={loadComparison}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={130}
                  tick={{ fontSize: 11, fill: '#334155' }}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const p = payload[0].payload
                    return (
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-oxford-600 tabular-nums">{p.display}</p>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {loadComparison.map((_, i) => (
                    <Cell key={i} fill={[COL.primary, COL.gold, COL.emerald][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {weekLine.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Weekly schedule intensity</h3>
          <p className="text-xs text-slate-500 mb-2">Hours per published slot (from typical week)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekLine} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} label={{ value: 'h', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12 }}
                  formatter={(v) => [`${v} h`, 'Approx.']}
                />
                <Line type="monotone" dataKey="hours" stroke={COL.primary} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-1">Learner mix</h3>
        <p className="text-xs text-slate-500 mb-3">Current cohort vs career reach (illustrative split)</p>
        <div className="h-8 w-full flex rounded-lg overflow-hidden">
          {pieLike.map((s) => (
            <div
              key={s.name}
              className="h-full first:rounded-l-lg last:rounded-r-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
              style={{
                width: `${(s.value / pieTotal) * 100}%`,
                backgroundColor: s.fill,
                minWidth: s.value > 0 ? '2rem' : 0,
              }}
              title={`${s.name}: ${s.value}`}
            >
              {s.value > 0 && (s.value / pieTotal) * 100 > 12 && (
                <span className="truncate px-1">{Math.round((s.value / pieTotal) * 100)}%</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          {pieLike.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: s.fill }} />
              {s.name} ({s.value.toLocaleString()})
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
