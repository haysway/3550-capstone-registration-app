import { Outlet } from "react-router-dom";

export default function InstructorDashboard() {

    return (
        <main className="container">
            <header>
                <h1>[ Instructor Dashboard ]</h1>
                <p>[ Browse, search, and filter through your published classes]</p>
                <a className="nav-button" href="/instructor/new">Add Course</a>
            </header>
            <Outlet/>
            
        </main>
    );
}