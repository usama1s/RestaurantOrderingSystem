import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { db } from "../../../../config/@firebase";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { doc, deleteDoc } from "firebase/firestore";
import { useCtx } from "../../../../context/Ctx";
import { ManagerEditItem } from "./edit-items";
import { Loading } from "../../../../components/loading";
const { food_items } = COLLECTIONS;
export function ManagerItemsListingItems({
  title,
  imageURL,
  price,
  slug,
  description,
  category,
}) {
  const { updateItemValue, updateModalStatus, modalStatus } = useCtx();
  const deleteItemHandler = async (id) => {
    try {
      await deleteDoc(doc(db, food_items, id));
    } catch (error) {
      // console.log(error)
    }
  };
  const updateItemHandler = async () => {
    updateModalStatus(true, <ManagerEditItem />);
    updateItemValue({ title, slug, imageURL, description, price, category });
  };
  return (
    <div className="flex  bg-[#FBFBFB] shadow-md w-[80%]  rounded-md my-2 relative">
      <img className="w-48 h-48 rounded-md mr-4 flex-[0.3]" src={imageURL} />
      <div className="flex-1">
        <div className="flex items-center flex-1 justify-between w-full">
          <h3 className="font-bold text-xl p-1">{title}</h3>
          <div className="flex ">
            <TrashIcon
              onClick={async () => await deleteItemHandler(slug)}
              className="h-4 w-4 mr-2 text-black cursor-pointer"
            />
            <PencilIcon
              onClick={updateItemHandler}
              className="h-4 w-4 mr-2 text-black cursor-pointer"
            />
          </div>
        </div>
        <p className="p-1 text-sm">
          <span className="font-bold text-base mr-1"> Price:</span>${price}
        </p>
        <p className="p-1 text-sm truncate break-words">
          <span className="font-bold text-base mr-1"> Description:</span>
          {description}
        </p>
        <p className="p-1 text-sm truncate break-words">
          <span className="font-bold text-base mr-1"> Category:</span>
          {category}
        </p>
      </div>
    </div>
  );
}
