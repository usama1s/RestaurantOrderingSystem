import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ROUTES} from '../../utils/routes'
import { auth } from '../../config/@firebase'
import { signOut } from 'firebase/auth'
import { Tabs } from '../../components/reusables/tabs'
import { AddItem} from './components/add-item'
import { AdminFoodlistings } from './components/admin-foodlistings-list'
export function Admin() {
  const [tabs,setTabs]=React.useState([{name:"Items",active:true},{name:"test",active:false}])
  const activeTab=tabs.find(tab=>tab.active).name
  const navigate=useNavigate()
  const logout_user=async()=>{
    await signOut(auth)
    navigate(ROUTES.login_admin)
  }
  const renderActiveTab=(tab)=>{
    switch(tab){
      case "Items": return <AdminFoodlistings/>; break;
      case "test": return <h1>test</h1>; break;
      default : return ""
    }
  }
  return (
    <div className='px-6'>
     <div className='flex justify-between items-center'> <h2>Admin</h2>
      <button onClick={logout_user}>Logout</button></div>
      <div className='m-2'/>
      <AddItem/>
      <div className='my-2'></div>
      <Tabs tabs={tabs} setTabs={setTabs}/>
      {renderActiveTab(activeTab)}
    </div>
    
  )
}
