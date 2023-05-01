import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { db } from "../../../config/@firebase";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import { doc, deleteDoc } from "firebase/firestore";
import { useCtx } from "../../../context/Ctx";
import { EditItem } from "./edit-item";
const { food_items } = COLLECTIONS;
export function AdminFoodlistingsItem({
  title,
  imageURL,
  price,
  slug,
  description,
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
    updateModalStatus(true, <EditItem />);
    updateItemValue({ title, slug, imageURL, description, price });
  };
  return (
    <div className="flex items-center bg-gray-200 w-[80%] p-2 rounded-md my-2 relative">
      <img className="w-48 h-48 rounded-md mr-4" src={imageURL} />
      <div>
        <h3 className="font-bold text-2xl">{title}</h3>
        <p>{price}</p>
      </div>
      <div className="absolute right-4 top-4 flex">
        <TrashIcon
          onClick={async () => await deleteItemHandler(slug)}
          className="h-6 w-6 mr-4 text-indigo-600 cursor-pointer"
        />
        <PencilIcon
          onClick={updateItemHandler}
          className="h-6 w-6 mr-4 text-indigo-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
