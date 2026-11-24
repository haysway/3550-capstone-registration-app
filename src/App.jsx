import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {tokenLoader, checkInstructorLoader} from "./utils/auth-utils.js"
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage.jsx';
import AuthenticationPage, {action as authenticationAction} from './pages/AuthenticationPage.jsx';
import {action as logoutAction} from "./pages/Logout.jsx";
import './App.css';
import CourseCatalog from './components/CourseCatalog.jsx';
import CourseForm from "./pages/CourseForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage/> },
      { path: "courses", 
        element: <CourseCatalog/>,
        children: [
          {
            path: "new",
            element: <CourseForm />,
            loader: checkInstructorLoader,
          },
          {
            path: "edit",
            element: <CourseForm />,
            loader: checkInstructorLoader,
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