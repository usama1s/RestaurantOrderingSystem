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
        </Routes>
      )}
    </>
  );
}
// {authStatus && (
//   <div>
//     <Routes>
//       <Route
//         path={ROUTES.default}
//         element={<Navigate to={ROUTES.foodListings} />}
//       />
//       <Route path={ROUTES.foodListings} element={<FoodListings />} />
//       <Route
//         path={ROUTES.admin}
//         element={
//           loading ? (
//             <h1>Loading..</h1>
//           ) : (
//             <ProtectedRoute>
//               {user?.uid ? (
//                 <Admin />
//               ) : (
//                 <Navigate to={ROUTES.login_admin} />
//               )}
//             </ProtectedRoute>
//           )
//         }
//       />

//       <Route
//         path={ROUTES.login_admin}
//         element={
//           <ProtectedRoute loading={loading} error={error}>
//             {!user?.uid ? (
//               <LoginAdmin />
//             ) : (
//               <Navigate to={ROUTES.admin} replace />
//             )}
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path={ROUTES.all}
//         element={<Navigate to={ROUTES.foodListings} />}
//       />
//     </Routes>
//   </div>
// )}
