import { Form, Link, useSearchParams, redirect, useActionData, useNavigation } from "react-router-dom";
import { API_KEY, DATABASE_URL } from "../utils/firebase";
import styles from "./AuthenticationPage.module.css"
import { useState } from "react";

export default function AuthenticationPage() {
    const navigation = useNavigation();
    const data = useActionData();

    const [password, setPassword] = useState("");

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("mode") !== "signup";
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formHeader}>{isLogin ? "Log In" : "Create New User"}</h1>
            <div className={styles.formControl}>

                {data?.errors && (
                    <ul>
                        {Object.values(data.errors).map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                )}

                {data?.error?.message && <p className={styles.error}>{data.error.message}</p>}

                <Form method="POST">

                    {!isLogin && (
                        <>
                            <div className={styles.formField}>
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" type="text" name="firstName" required/>
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" type="text" name="lastName" required/>
                            </div>
                        </>
                    )}


                    <div className={styles.formField}>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email" required />
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                     {!isLogin && (
                        <p>Password must be at least 6 characters. Current length: {password.length}</p>
                    )}

                    {!isLogin && (
                        <div>

                            <label>Account Type</label>

                            <div>
                                <input type="radio" id="Student" defaultChecked name="role" value="Student"/>
                                <label htmlFor="Student">Student</label>
                            </div>

                            <div>
                                <input type="radio" id="Instructor" name="role"value="Instructor"/>
                                <label htmlFor="Instructor">Instructor</label>
                            </div>

                        </div>
                    )}

                    <div className={styles.buttonContainer}>

                        <Link className={styles.switchLink} to={`?mode=${isSubmitting ? "Submitting..." : isLogin ? "signup" : "login"}`}>
                            {isLogin ? "Need an account? Sign up." :
                                "Already have an account? Log in."}
                        </Link>

                        <button type="submit" disabled={!isLogin && password.length < 6 || isSubmitting}>{isLogin ? "Log In" : "Sign Up"}</button>

                    </div>

                </Form>
            </div>
        </div>
    );
}

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") === "signup" ? "signUp" : "signInWithPassword";

    const data = await request.formData();
    const role = data.get("role");

    // Get authorization data in object
    const authData = {
        email: data.get("email"),
        password: data.get("password"),
        returnSecureToken: true
    }

    // Pass object into database
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
    });

    // Authentication errors
    if (response.status === 401 || response.status === 422 || response.status === 500 || response.status === 400)
        return response;

    // Unexpected server error
    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: "Could not authenticate user." }),
            { status: 500 }
        );
    }


    // Valid response, save token, userId, and role
    const responseData = await response.json();
    const token = responseData.idToken;
    const userId = responseData.localId;
    let userRole = role;

    // Save user to database on signup
    if (searchParams.get("mode") === "signup") {
        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: responseData.email,
            role: role,
        };

        // Connect user authentication ID to user information as PK
        const databaseResponse = await fetch(`${DATABASE_URL}/users/${userId}.json?auth=${token}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        if (!databaseResponse.ok) {
            throw new Response(
                "Saving user Data to database failed",
                { status: 500 }
            );
        }
    }

    // Get user role on login
    else {
        const userResponse = await fetch(`${DATABASE_URL}/users/${userId}.json?auth=${token}`);

        if (!userResponse.ok) {
            throw new Response("Could not retrieve user profile.", {
                status: 500
            });
        }

        const userData = await userResponse.json();
        userRole = userData.role;
    }

    // Save data into local storage
    localStorage.setItem("role", userRole);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    const expiration = new Date();
    const expiresInSeconds = parseInt(responseData.expiresIn, 10) || 3600;
    expiration.setSeconds(expiration.getSeconds() + expiresInSeconds);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
}