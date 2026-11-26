import { Link, useRouteLoaderData } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
    const token = useRouteLoaderData("root");
    const isLoggedIn = Boolean(token && token !== "EXPIRED");

    return (
        <main className={styles.landingPage}>
            <section className={styles.hero}>
                <span className={styles.eyebrow}>
                    CLASS REGISTRATION PORTAL
                </span>

                {isLoggedIn ? (
                    <>
                        <h1>Welcome Back!</h1>
                        <p>
                            Ready to plan your next semester?
                            Browse available classes and manage
                            your registration.
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
                ) : (
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
                )}
            </section>
        </main>
    );
}