import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { db } from "../../../config/@firebase";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import { doc, deleteDoc } from "firebase/firestore";
import { EditCategory } from "./edit-category";
import { useCtx } from "../../../context/Ctx";
const { categories } = COLLECTIONS;
export function AdminCategoriesListingsItems({ slug, title }) {
  const { updateModalStatus, updateCategoryValue } = useCtx();
  const deleteItemHandler = async (id) => {
    try {
      await deleteDoc(doc(db, categories, id));
    } catch (error) {
      // console.log(error)
    }
  };
  const updateItemHandler = async () => {
    updateCategoryValue({ slug, title });
    updateModalStatus(true, <EditCategory />);
  };
  return (
    <div className="flex items-center bg-gray-200 w-[80%] p-2 rounded-md my-2 relative">
      <div>
        <h3 className="font-bold text-2xl">{title}</h3>
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
