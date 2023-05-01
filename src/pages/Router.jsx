import { Routes, Route, Navigate } from "react-router-dom";
//importing components
import { Admin } from "./admin/admin";
import { LoginAdmin } from "./admin/login-admin";
import { FoodListings } from "./food-listings/food-listings";
//utils
import { ROUTES } from "../utils/routes";
import { auth } from "../config/@firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ProtectedRoute } from "../components/reusables/protected_route";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { COLLECTIONS } from "../utils/firestore-collections";
import { db } from "../config/@firebase";
import { ROLES } from "../utils/roles";
import { useCtx } from "../context/Ctx";
export function Router() {
  const [user, loading, error] = useAuthState(auth);
  const { authenticatedUser, authStatus } = useCtx();
  console.log(authenticatedUser);

  return (
    <div>
      {authStatus && (
        <div>
          <Routes>
            <Route
              path={ROUTES.default}
              element={<Navigate to={ROUTES.foodListings} />}
            />
            <Route path={ROUTES.foodListings} element={<FoodListings />} />
            <Route
              path={ROUTES.admin}
              element={
                loading ? (
                  <h1>Loading..</h1>
                ) : (
                  <ProtectedRoute>
                    {user?.uid ? (
                      <Admin />
                    ) : (
                      <Navigate to={ROUTES.login_admin} />
                    )}
                  </ProtectedRoute>
                )
              }
            />

            <Route
              path={ROUTES.login_admin}
              element={
                <ProtectedRoute loading={loading} error={error}>
                  {!user?.uid ? (
                    <LoginAdmin />
                  ) : (
                    <Navigate to={ROUTES.admin} replace />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.all}
              element={<Navigate to={ROUTES.foodListings} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
}
