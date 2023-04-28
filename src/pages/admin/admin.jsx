import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ROUTES} from '../../utils/routes'
import { auth } from '../../config/@firebase'
import { signOut } from 'firebase/auth'
import { AddItem} from './components/add-item'
export function Admin() {
  const navigate=useNavigate()
  const logout_user=async()=>{
    await signOut(auth)
    navigate(ROUTES.login_admin)
  }
  return (
    <div className='px-6'>
     <div className='flex justify-between items-center'> <h2>Admin</h2>
      <button onClick={logout_user}>Logout</button></div>
      <div className='m-2'/>
      <AddItem/>
    </div>
    
  )
}
