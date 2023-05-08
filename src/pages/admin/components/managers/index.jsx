import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { formatCollectionData } from "../../../../utils/formatData";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AdminAddManagers } from "./add-managers";
import { useCtx } from "../../../../context/Ctx";
import { Loading } from "../../../../components/loading";
import { auth, db } from "../../../../config/@firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, query, where } from "@firebase/firestore";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { deleteUser } from "@firebase/auth";

export function AdminManagerSection() {
  const { updateModalStatus } = useCtx();
  const [value, loading, error] = useCollection(
    query(collection(db, COLLECTIONS.users), where("role", "==", "MANAGER")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const formattedData = formatCollectionData(value);
  if (error)
    return (
      <h1 className="text-xl font-semibold">Error fetching menu items..</h1>
    );
  if (loading)
    return (
      <div className="h-[40vh]">
        <Loading />
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Branches</h1>
        <PlusIcon
          onClick={() => updateModalStatus(true, <AdminAddManagers />)}
          className="h-8 w-8 text-black"
        />
      </div>
      <h2>Braches listing..</h2>
      <div className="w-full">
        {formattedData?.length <= 0 && (
          <h1 className="font-bold text-xl">No Branches right now.</h1>
        )}
        {formattedData?.length > 0 &&
          formattedData.map((data) => (
            <div
              key={data.slug}
              className="flex bg-[#FBFBFB]  shadow-md rounded-md relative my-2 w-full"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{data.email}</h2>
                  <p className="text-base font-normal">
                    <span className="font-bold">Branch:</span> {data.branchName}
                  </p>
                </div>
                <div className="flex mr-1">
                  <TrashIcon
                    onClick={() =>
                      updateModalStatus(
                        true,
                        <DeleteItemJSX
                          updateModalStatus={updateModalStatus}
                          slug={data.slug}
                        />
                      )
                    }
                    className="h-6 w-6 mr-4 text-black cursor-pointer"
                  />
                  <PencilIcon
                    onClick={() => {}}
                    className="h-6 w-6 mr-2 text-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
function DeleteItemJSX({ slug, updateModalStatus }) {
  const [status, setStatus] = useState({ loading: false, error: null });
  return (
    <div>
      <h1 className="text-xl font-bold py-2">Confirm to delete item.</h1>
      {status.loading ? (
        <button className="bg-black text-base font-semibold text-white rounded-md py-2 px-4  mr-2">
          Deleting...
        </button>
      ) : (
        <div className="flex">
          <button
            className="bg-black text-base font-semibold text-white rounded-md py-2 px-4  mr-2"
            onClick={async () => {
              setStatus({ loading: true, error: null });
              // await deleteUser(auth);
              await deleteDoc(doc(db, COLLECTIONS.users, slug));

              updateModalStatus(false, null);
              setStatus({
                loading: false,
                error: null,
              });
            }}
            disabled={status.loading}
          >
            Yes
          </button>
          <button
            className="bg-black text-base font-semibold text-white rounded-md py-2 px-4  mr-2"
            onClick={() => updateModalStatus(false, null)}
            disabled={status.loading}
          >
            No
          </button>
        </div>
      )}
      {status.error && <h1>{status.error}</h1>}
    </div>
  );
}
