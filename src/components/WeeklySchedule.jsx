export default function WeeklySchedule({ courses }) {
  if (courses.length === 0) return (<p>No courses registered.</p>)

  return (
    <section className="schedule-section" aria-labelledby="schedule-title">
      <h2 id="schedule-title">Weekly schedule overview</h2>
      <div className="table-scroll" role="region" aria-label="Registered course schedule" tabIndex={0}>
        <table>
          <caption className="sr-only">
            Registered courses and meeting details
          </caption>
          <thead>
            <tr>
              {['Course', 'Instructor', 'Schedule', 'Room', 'Status'].map((label) =>
                <th key={label} scope="col">
                  {label}</th>)}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) =>
              <tr key={course.id}>
                <td>
                  <strong>{course.title}</strong>
                  <span className="table-code">
                    {course.code}
                  </span>
                </td>
                <td>
                  {course.instructor}
                </td>
                <td>
                  {course.schedule}
                </td>
                <td>
                  {course.room}
                </td>
                <td>
                  <span className="enrolled">Enrolled</span>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  )
}
