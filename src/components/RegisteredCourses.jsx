import CourseCard from './CourseCard'

export default function RegisteredCourses({ courses, onRequestDrop }) {
  return (
    <section aria-labelledby="registrations-title">
      <h2 id="registrations-title">Active registrations <span className="count">{courses.length}</span></h2>
      {courses.length ?
        <div className="course-grid">{
          courses.map((course) =>
            <CourseCard
              key={course.id}
              course={course}
              onRequestDrop={onRequestDrop}
            />)}
        </div> : <div className="empty-state">
          <h3>Your schedule is open.</h3>
          <p>You aren’t registered for any courses yet.</p>
        </div>
      }
    </section>
  )
}
