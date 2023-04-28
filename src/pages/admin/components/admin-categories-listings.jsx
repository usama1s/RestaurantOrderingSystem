import React from 'react'
import { AddCategories } from './add-categories'
import { PlusIcon,MinusIcon } from '@heroicons/react/24/solid'
import { useAdminCtx } from '../../../context/AdminCtx'
import { formatCollectionData } from "../../../utils/formatData"
import { db } from "../../../config/@firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { COLLECTIONS } from "../../../utils/firestore-collections"
import { AdminCategoriesListingsItems } from './admin-categories-listings-items'
const {categories}=COLLECTIONS
export function AdminCategoryListings() {
    const {updateModalStatus}=useAdminCtx()
    const [value, loading, error] = useCollection(
      collection(db, categories),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
    const formattedData=formatCollectionData(value)
    console.log(formattedData)
    if(error) return <h1>Error fetching items..</h1>
    if(loading) return <h1 className='text-bold text-center text-2xl'>Loading...</h1>
  return (
    <div>
         <div className="flex items-center justify-between py-4 ">
        <h1 className='font-bold text-2xl'>Categories</h1>
        <PlusIcon onClick={()=>updateModalStatus(true, <AddCategories/>)}  className='h-8 w-8 font-bold text-black'/>
      </div>
      <h1 classNName="text-2xl py-2">
       {formattedData?.length>0 && formattedData?.map(data=> <AdminCategoriesListingsItems key={data.slug} {...data}/>)}
       {formattedData?.length===0 &&  <div> <h1 className="text-2xl font-normal">List is empty..</h1></div>}
       </h1>
    </div>
  )
}

