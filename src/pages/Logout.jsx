import { redirect } from "react-router-dom";

// Clears all Local Storage
export function action(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    return redirect("/authentication?mode=login");
}