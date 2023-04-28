import { formatCollectionData } from "../../../utils/formatData"
import { db } from "../../../config/@firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { AdminFoodlistingsItem } from "./admin-foodlistings-item"
import { COLLECTIONS } from "../../../utils/firestore-collections"
import { PlusIcon,MinusIcon } from '@heroicons/react/24/solid'
import { useAdminCtx } from "../../../context/AdminCtx"
import {AddItem} from '../components/add-item'
const {food_items}=COLLECTIONS
export function AdminFoodlistings(){
    const [value, loading, error] = useCollection(
        collection(db, food_items),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
      const formattedData=formatCollectionData(value)
      const {updateModalStatus}=useAdminCtx()
      if(error) return <h1>Error fetching items..</h1>
      if(loading) return <h1 className='text-bold text-center text-2xl' >Loading...</h1>
    return <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <PlusIcon onClick={()=>updateModalStatus(true,<AddItem/>)}  className='h-8 w-8 text-black'/>
        
      </div>
       <h1 classNName="text-2xl py-2">
       {formattedData?.length>0 && formattedData?.map(data=> <AdminFoodlistingsItem key={data.slug} {...data}/>)}
       {formattedData?.length===0 &&  <div> <h1 className="text-2xl font-normal">List is empty..</h1></div>}
       </h1>
       
    </div>
}