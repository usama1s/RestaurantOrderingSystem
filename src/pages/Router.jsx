import { Routes, Route, Navigate } from "react-router-dom";

//utils
import { ROUTES } from "../utils/routes";
import { auth } from "../config/@firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useCtx } from "../context/Ctx";
//Manager
import { Manager } from "./manager";
//Waiter
import { Waiter } from "./waiter";
export function Router() {
  return (
    <Routes>
      {/* <Route element={<Manager />} path={ROUTES.all} /> */}
      <Route element={<Waiter />} path={ROUTES.all} />
    </Routes>
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
