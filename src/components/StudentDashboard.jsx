import { useRef, useState } from 'react'
import DashboardHeading from './DashboardHeading'
import RegisteredCourses from './RegisteredCourses'
import WeeklySchedule from './WeeklySchedule'
import DropCourseDialog from './DropCourseDialog'

// The parent supplies registered courses and handles the eventual database update.
export default function StudentDashboard({ courses, onDropCourse }) {
  const dialogRef = useRef(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isDropping, setIsDropping] = useState(false)
  const totalCredits = courses.reduce((total, course) => total + course.credits, 0)

  function requestDrop(course) {
    setSelectedCourse(course)
    setError('')
    dialogRef.current.showModal()
  }

  async function confirmDrop() {
    setIsDropping(true)
    setError('')
    try {
      await onDropCourse(selectedCourse.id)
      setMessage(`${selectedCourse.title} was dropped from your schedule.`)
      dialogRef.current.close()
    } catch {
      setError('We couldn’t drop this course. Please try again.')
    } finally {
      setIsDropping(false)
    }
  }

  return <main className="dashboard">
    <DashboardHeading totalCredits={totalCredits} />
    <p className="preview-note">Sample data preview. Changes last until you refresh. Account and catalog integration will be added later.</p>
    <p className="status-message" role="status">{message}</p>
    <RegisteredCourses courses={courses} onRequestDrop={requestDrop} />
    <WeeklySchedule courses={courses} />
    <DropCourseDialog
      dialogRef={dialogRef}
      course={selectedCourse}
      error={error}
      isDropping={isDropping}
      onConfirm={confirmDrop}
      onCancel={() => dialogRef.current.close()}
    />
  </main>
}
