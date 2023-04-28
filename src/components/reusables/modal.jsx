import React from 'react'
import { useAdminCtx } from '../../context/AdminCtx'
import { XMarkIcon } from '@heroicons/react/24/solid'
export function Modal({}) {
    const {updateModalStatus,modalStatus:{jsx}}=useAdminCtx()
  return (
    <>
          <div className="flex justify-center  bg-[rgba(0,0,0,0.5)] items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 p-4 mx-auto w-[80%] h-[80vh] bg-white rounded-md">
              <div className='  flex items-center justify-between'>
               <XMarkIcon className='h-6 w-6' onClick={()=>updateModalStatus(false,null)}/>
              </div>
              {jsx}
            </div>
          </div>
        </>
  )
}
