import { createContext, useContext, useState, } from "react";
const AdminCtx=createContext()
export function AdminCtxProvider({children}){
    const [modalStatus,setModalStatus]=useState({status:false,jsx:null})
    const [activeTab,setActiveTab]=useState('Categories')
    const updateActiveTab=(tab)=>{setActiveTab(tab)}
    const updateModalStatus=(status,jsx)=>{
        console.log(status,jsx)
        setModalStatus({...status,jsx,status})}
    return <AdminCtx.Provider value={{activeTab,updateActiveTab,modalStatus,updateModalStatus}}>{children}</AdminCtx.Provider>
}
export function useAdminCtx(){
    return useContext(AdminCtx)
}