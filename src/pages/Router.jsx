import { Routes, Route, Navigate } from "react-router-dom";

//utils
import { ROUTES } from "../utils/routes";

import { useAuthState } from "react-firebase-hooks/auth";

import { useCtx, LOCAL_STORAGE_BASE } from "../context/Ctx";
//Manager
import { Manager } from "./manager";
//Waiter
import { Waiter } from "./waiter";
//admin
import { Admin } from "./admin";
import { Login } from "../components/login";
import { RequireAuth } from "../components/protectedroute";
import { ROLES } from "../utils/roles";
import RolesComponent from "../components/roles";
export function Router() {
  const { authStatus, authenticatedUser } = useCtx();
  console.log(ROUTES.waiter);
  return (
    <>
      {authStatus && (
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  !authenticatedUser && !authenticatedUser?.role
                    ? `/select_role`
                    : `/${authenticatedUser?.role?.toLowerCase()}`
                }
              />
            }
          />
          <Route
            element={
              !authenticatedUser && !authenticatedUser?.role ? (
                <Login url={ROUTES.admin} type={"Admin"} />
              ) : (
                <Navigate to={ROUTES.admin} />
              )
            }
            path={ROUTES.login_admin}
          />

          <Route
            element={
              !authenticatedUser && !authenticatedUser?.role ? (
                <Login url={ROUTES.manager} type={"Manager"} />
              ) : (
                <Navigate to={ROUTES.manager} />
              )
            }
            path={ROUTES.login_manager}
          />
          <Route
            element={
              !authenticatedUser && !authenticatedUser?.role ? (
                <Login url={ROUTES.waiter} type={"Waiter"} />
              ) : (
                <Navigate to={ROUTES.waiter} />
              )
            }
            path={ROUTES.login_waiter}
          />
          <Route element={<h1>Unauthorized</h1>} path="/unauthorized" />
          <Route
            element={
              !authenticatedUser && !authenticatedUser?.role ? (
                <RolesComponent />
              ) : (
                <Navigate to={`/${authenticatedUser?.role?.toLowerCase()}`} />
              )
            }
            path="/select_role"
          />

          <Route element={<RequireAuth roles={[ROLES.ADMIN]} />}>
            <Route element={<Admin />} path={ROUTES.admin}></Route>
          </Route>
          <Route element={<RequireAuth roles={[ROLES.MANAGER]} />}>
            <Route element={<Manager />} path={ROUTES.manager} />
          </Route>
          <Route element={<RequireAuth roles={[ROLES.WAITER]} />}>
            <Route element={<Waiter />} path={ROUTES.waiter} />
          </Route>
        </Routes>
      )}
    </>
  );
}
