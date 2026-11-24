import { useState } from 'react'
import StudentDashboard from './components/StudentDashboard'
import SiteHeader from './components/SiteHeader'
import { sampleCourses } from './data/sampleCourses'
import './App.css'

export default function App() {
  const [courses, setCourses] = useState(sampleCourses)
  function dropCourse(id) {
    setCourses((current) => current.filter((course) => course.id !== id))
  }
  return <div className="app-shell">
    <SiteHeader studentName="Alex Student" />
    <StudentDashboard courses={courses} onDropCourse={dropCourse} />
  </div>
}
