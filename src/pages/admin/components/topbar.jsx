import {
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/solid";
import {ROUTES} from '../../../utils/routes'
import {auth} from '../../../config/@firebase'
import { signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
export default function TopBar({ showNav, setShowNav }) {
  const navigate=useNavigate()
  const logout_user=async()=>{
    await signOut(auth)
    navigate(ROUTES.login_admin)
  }
  
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <button
      onClick={logout_user}
      className="rounded-md mr-6 text-xl bg-indigo-600 px-3.5 py-1.5  font-regular leading-7 text-white hover:bg-indigo-500">
         Logout
      </button>
    </div>
  );
}