import React from 'react'
import { Card } from './components/Card';
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
  console.log(formattedData)
  if(error) return <h1>Error fetching items..</h1>
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>Food Listings...</h1>
    </div>
  )
}
