import { formatCollectionData } from "../../../utils/formatData"
import { db } from "../../../config/@firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { AdminFoodlistingsItem } from "./admin-foodlistings-item"
import { COLLECTIONS } from "../../../utils/firestore-collections"
const {food_items}=COLLECTIONS
export function AdminFoodlistings(){
    const [value, loading, error] = useCollection(
        collection(db, food_items),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
      const formattedData=formatCollectionData(value)
      if(error) return <h1>Error fetching items..</h1>
      if(loading) return <h1>Loading...</h1>
    return <div>
       <h1 className="text-2xl py-2">
       {formattedData?.length>0 && formattedData?.map(data=> <AdminFoodlistingsItem key={data.slug} {...data}/>)}
       {formattedData?.length===0 &&  <div> <h1>List is empty..</h1></div>}
       </h1>
       
    </div>
}