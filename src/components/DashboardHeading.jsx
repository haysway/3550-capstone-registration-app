export default function DashboardHeading({ totalCredits }) {
  return <>
    <p className="eyebrow">STUDENT DASHBOARD</p>
    <div className="dashboard-heading"><div>
      <h1>My registered courses</h1>
      <p>
        View your classes and make room for what’s next.
      </p>
    </div>
      <div className="credit-total">
        {totalCredits}
        <span>total credits</span>
      </div>
    </div>
  </>
}
