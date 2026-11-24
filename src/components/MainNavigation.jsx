import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import styles from "./MainNavigation.module.css"
export default function MainNavigation() {
    const token = useRouteLoaderData("root");
    const role = localStorage.getItem("role");

    return (
        <header>
            <nav className={styles.navMenu}>

                <div className={styles.defaultNav}>
                    <NavLink className={`${styles.navButton}`} to="/">Home</NavLink>
                    <NavLink className={`${styles.navButton}`} to="/Courses">Course Catalog</NavLink>
                    {token && (
                        <>
                            {role == "Student" &&
                                <NavLink className={`${styles.navButton}`} to="/student">My Courses</NavLink>
                            }
                            {role == "Instructor" &&
                                <NavLink className={`${styles.navButton}`} to="/instructor">My Courses</NavLink>
                            }
                        </>
                    )}
                </div>

                {!token && <>
                    <NavLink className={`${styles.navButton} ${styles.login}`} to="/authentication?mode=login">Login</NavLink>
                    <NavLink className={`${styles.navButton} ${styles.signup}`} to="/authentication?mode=signup">Sign Up</NavLink>
                </>
                }

                {token && (
                    <>
                        <h3>Logged in as: {role}</h3>
                        <Form action="/logout" method="POST">
                            <button className={styles.navButton} type="submit">Log Out</button>
                        </Form>
                    </>
                )}
                
            </nav>
        </header>
    );
}

