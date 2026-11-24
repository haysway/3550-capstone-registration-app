export default function CourseCard({ course, onRequestDrop }) {
  return (
    <article className="course-card">
      <div className="card-top">
        <span className="category">CS</span>
        <span>{course.schedule}</span>
      </div>
      <h3>{course.title}</h3>
      <p className="course-meta">
        {course.code} · {course.room} · {course.credits} credits
      </p>
      <p className="description">
        {course.description}
      </p>
      <div className="card-bottom">
        <span>{course.instructor}</span>
        <button className="button drop-button" onClick={() => onRequestDrop(course)}>
          Drop course
          <span className="sr-only">: {course.title}</span>
        </button>
      </div>
    </article>
  )
}

