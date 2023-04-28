import React from 'react'
import { Card } from './components/card';
import {db} from '../../config/@firebase'
import { collection } from 'firebase/firestore';
import { formatCollectionData } from '../../utils/formatData';
import { COLLECTIONS} from '../../utils/firestore-collections'
import { useCollection } from 'react-firebase-hooks/firestore';

const {food_items}=COLLECTIONS
export function FoodListings() {
  const [value, loading, error] = useCollection(
    collection(db, food_items),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const formattedData=formatCollectionData(value)
  if(error) return <h1>Error fetching items..</h1>
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>Items</h1>
      <div className='grid grid-cols-fluid gap-2 p-4'>
      {formattedData?.length>0? formattedData?.map(data=> <Card key={data.slug} {...data}/>) :<h1>List is empty..</h1>}
      </div>
     
    </div>
  )
}
