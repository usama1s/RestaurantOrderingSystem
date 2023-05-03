import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { db } from "../../../../config/@firebase";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { doc, deleteDoc } from "firebase/firestore";
import { ManagerEditCategory } from "./edit-categories";
import { useCtx } from "../../../../context/Ctx";
const { categories } = COLLECTIONS;
export function ManagerCategoriesListingsItems({ slug, title }) {
  const { updateModalStatus, updateCategoryValue } = useCtx();
  const [status, setStatus] = useState({ loading: false, error: null });
  const deleteItemJSX = (slug) => {
    return (
      <div>
        <h1>Confirm to delete item.</h1>
        <div>
          <button
            className="bg-black text-white rounded-md py-2 px-1  mr-2"
            onClick={async () => {
              try {
                setStatus({ loading: true, error: null });
                await deleteDoc(doc(db, categories, slug));
                updateModalStatus(false, null);
                setStatus({
                  loading: false,
                  error: null,
                });
              } catch (e) {
                setStatus({
                  loading: false,
                  error: "Error deleting the item.",
                });
              }
            }}
            disabled={status.loading}
          >
            Yes
          </button>
          <button
            className="bg-black text-white rounded-md py-2 px-1  mr-2"
            onClick={() => updateModalStatus(false, null)}
            disabled={status.loading}
          >
            No
          </button>
        </div>
        {status.error && <h1>{status.error}</h1>}
      </div>
    );
  };
  const updateItemHandler = async () => {
    updateCategoryValue({ slug, title });
    updateModalStatus(true, <ManagerEditCategory />);
  };
  return (
    <div className="flex items-center  bg-[#FBFBFB] shadow-md w-[90%] p-2 rounded-md my-4 relative">
      <div>
        <h3 className="font-bold text-2xl">{title}</h3>
      </div>
      <div className="absolute right-4 top-4 flex">
        <TrashIcon
          onClick={async () => updateModalStatus(true, deleteItemJSX(slug))}
          className="h-6 w-6 mr-4 text-black cursor-pointer"
        />
        <PencilIcon
          onClick={updateItemHandler}
          className="h-6 w-6 mr-4 text-black cursor-pointer"
        />
      </div>
    </div>
  );
}
