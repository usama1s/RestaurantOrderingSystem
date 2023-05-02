import { formatCollectionData } from "../../../../utils/formatData";
import { db } from "../../../../config/@firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../../../../context/Ctx";
import { ManagerAddItem } from "./add-items";
import { ManagerItemsListingItems } from "./manager-items-listings-items";
import { Loading } from "../../../../components/loading";
const { food_items } = COLLECTIONS;
export function ManagerItems() {
  const [value, loading, error] = useCollection(collection(db, food_items), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const formattedData = formatCollectionData(value);
  // console.table(formattedData);
  const { updateModalStatus } = useCtx();
  if (error) return <h1>Error fetching items..</h1>;
  if (loading)
    return (
      <div className="h-[40vh]">
        <Loading />
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <PlusIcon
          onClick={() => updateModalStatus(true, <ManagerAddItem />)}
          className="h-8 w-8 text-black"
        />
      </div>
      <h1 className="text-2xl py-2">
        {formattedData?.length > 0 &&
          formattedData?.map((data) => (
            <ManagerItemsListingItems key={data.slug} {...data} />
          ))}
        {formattedData?.length === 0 && (
          <div>
            <h1 className="text-2xl font-normal">List is empty..</h1>
          </div>
        )}
      </h1>
    </div>
  );
}
