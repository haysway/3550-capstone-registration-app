import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {tokenLoader, checkInstructorLoader, checkStudentLoader} from "./utils/auth-utils.js"
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage.jsx';
import AuthenticationPage, {action as authenticationAction} from './pages/AuthenticationPage.jsx';
import {action as logoutAction} from "./pages/Logout.jsx";
import './App.css';
import CourseCatalog from './components/CourseCatalog.jsx';
import CourseForm from "./pages/CourseForm.jsx";
import InstructorDashboard from './components/InstructorDashboard.jsx';
import { useState } from 'react';
import StudentDashboard from './components/StudentDashboard';
import SiteHeader from './components/SiteHeader.jsx';
import { sampleCourses } from './data/sampleCourses';

function StudentDashboardPage() {
  const [courses, setCourses] = useState(sampleCourses);

  function dropCourse(id) {
    setCourses((current) =>
      current.filter((course) => course.id !== id)
    );
  }

   return (
    <>
      <SiteHeader studentName="Alex Student"/>
      <StudentDashboard courses={courses} onDropCourse={dropCourse}/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage/> },
      { path: "courses", element: <CourseCatalog/>},
      { path: "student", loader: checkStudentLoader, element: <StudentDashboardPage/>},
      { path: "instructor", 
        element: <InstructorDashboard/>,
        loader: checkInstructorLoader,
        children: [
          {
            path: "new",
            element: <CourseForm />,
          },
          {
            path: "edit/:courseId",
            element: <CourseForm />,
          },
        ],
      },
      { path: "authentication", element: <AuthenticationPage />, action: authenticationAction },
      { path: "logout", action: logoutAction },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}