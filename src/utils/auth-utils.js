import { redirect } from "react-router-dom";

// Gets the duration of the token from local storage
export function getTokenDuration(){
    const storedExpiration = localStorage.getItem("expiration");

    if (!storedExpiration)
        return 0;

    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
}

// Gets the auth token from local storage
export function getAuthToken(){
    const token = localStorage.getItem("token");

    if(!token)
        return null;

    const tokenDuration = getTokenDuration();

    if  (tokenDuration <= 0)
        return "EXPIRED";

    return token;
}

// Uses getAuthToken as Loader function
export function tokenLoader(){
    return getAuthToken();
}

// Uses getAuthToken to check expiration
export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token || token === "EXPIRED"){
        return redirect("/authentication?mode=login");
    }

    return null;
}

// Validates Instructor Authorization
export function checkInstructorLoader() {
    const authResult = checkAuthLoader();

    if (authResult) {
        return authResult;
    }

    const role = localStorage.getItem("role");

    if (role !== "Instructor") {
        return redirect("/");
    }

    return null;
}

// Validates Student Authorization
export function checkStudentLoader() {
    const authResult = checkAuthLoader();

    if (authResult) {
        return authResult;
    }

    const role = localStorage.getItem("role");

    if (role !== "Student") {
        return redirect("/");
    }

    return null;
}