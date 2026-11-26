import { Link, useRouteLoaderData } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
    const token = useRouteLoaderData("root");
    const isLoggedIn = Boolean(token && token !== "EXPIRED");
    const role = localStorage.getItem("role");

    return (
        <main className={styles.landingPage}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>
                    CLASS REGISTRATION PORTAL
                </span>

                {!isLoggedIn ? (
                    <>
                        <h1>Find your next class.</h1>
                        <p>
                            Explore available courses, discover
                            new subjects, and plan your next semester.
                        </p>

                        <div className={styles.heroActions}>
                            <Link to="/courses" className={styles.primaryButton}>
                                Browse Classes
                            </Link>

                            <Link
                                to="/authentication?mode=login"
                                className={styles.secondaryButton}
                            >
                                Log In
                            </Link>
                        </div>
                    </>
                ) : role === "Student" ? (
                    <>
                        <h1>Welcome Back!</h1>
                        <p>
                            Find courses, manage your schedule, and keep track
                            of your classes for the semester.
                        </p>

                        <div className={styles.heroActions}>
                            <Link to="/courses" className={styles.primaryButton}>
                                Browse Classes
                            </Link>

                            <Link to="/student" className={styles.secondaryButton}>
                                Student Dashboard
                            </Link>
                        </div>
                    </>
                ) : role === "Instructor" ? (
                    <>
                        <h1>Welcome back, Professor.</h1>
                        <p>
                            Manage your courses, create new classes, and
                            keep your students up to date.
                        </p>

                        <div className={styles.heroActions}>
                            <Link to="/courses" className={styles.primaryButton}>
                                Browse Classes
                            </Link>
                            <Link to="/instructor" className={styles.secondaryButton}>
                                Instructor Dashboard
                            </Link>
                        </div>
                    </>
                ): (
                    <>
                        <h1>Welcome back.</h1>
                        <p>Browse the available classes.</p>
                        <Link to="/courses" className={styles.primaryButton}>
                            Browse Classes
                        </Link>
                    </>
                )}
            </section>
        </main>
    );
}