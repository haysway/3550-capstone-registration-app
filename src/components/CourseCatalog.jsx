import { Outlet } from "react-router-dom";

export default function CourseCatalog() {
    const role = localStorage.getItem("role");

    return (
        <main className="container">
            <header>
                <h1>[ Course Catalog ]</h1>
                <p>[ Browse, search, and filter through all available classes]</p>
                {role == "Instructor" && 
                <>
                    <a className="nav-button" href="/courses/new">Add Course</a>
                    <Outlet/>
                </>
            }
            </header>
            
        </main>
    );
}