export default function SiteHeader({ studentName }) {
  return (
    <header className="site-header">
      <span className="brand">Register</span>
      <span className="user-label">Student preview · {studentName}</span>
    </header>
  )
}
