import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth-utils.js";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  // Checks the token expiration and logsout if expired
  useEffect(() => {
    if (!token)
      return;

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration();

    const timer = setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);

    return () => clearTimeout(timer);

  }, [token, submit])

  // Loads Main navbar and child elements
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  )
}

export default RootLayout;