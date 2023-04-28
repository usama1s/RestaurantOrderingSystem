import { Routes,Route ,Navigate} from "react-router-dom"
//importing components
import { Admin } from "./admin/admin"
import {LoginAdmin} from "./admin/login-admin"
import { FoodListings } from "./food-listings/food-listings"
//utils
import {ROUTES} from '../utils/routes'
import { auth } from "../config/@firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { ProtectedRoute } from "../components/reusables/protected_route"
import { Test } from "./admin/test"
import { AdminCtxProvider } from "../context/AdminCtx"
export function Router() {
  const [user,loading,error]=useAuthState(auth)
  return (
    <div>
        <Routes>
        <Route path={ROUTES.default} element={ <Navigate to={ROUTES.foodListings}/>}/>
        <Route path={ROUTES.foodListings} element={<FoodListings/>}/>
        <Route path={ROUTES.admin} element={<ProtectedRoute loading={loading} error={error}>{user?.uid && !loading?<AdminCtxProvider><Admin/></AdminCtxProvider>:<Navigate to={ROUTES.login_admin} replace/>}</ProtectedRoute>}/>
        <Route path={ROUTES.login_admin} element={<ProtectedRoute loading={loading} error={error}>{!user?.uid?<LoginAdmin/>:<Navigate to={ROUTES.admin} replace/>}</ProtectedRoute>}/>
        <Route path={ROUTES.all} element={<Navigate to={ROUTES.foodListings}/>}/>
       </Routes>
    </div>
  )
}


