import React from 'react'
import Layout from './components/adminlayout'
import { AdminFoodlistings } from './components/admin-foodlistings-list'
import { useAdminCtx } from '../../context/AdminCtx'
import { Modal } from '../../components/reusables/modal'
import {AdminCategoryListings} from './components/admin-categories-listings'

export function Admin() {
  const value=useAdminCtx()
  const {modalStatus}=value
  const renderChildren=(activeTab)=>{
    switch(activeTab){
      case "Categories": return <AdminCategoryListings/>
      case "Menu Items": return <AdminFoodlistings/>
      default: return ""
    }
  }
  console.log(modalStatus.status)
  return (
   <Layout>
   {renderChildren(value.activeTab)}
   {modalStatus.status && <Modal/>}
   </Layout>
  )
}

