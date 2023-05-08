import { useFormik } from "formik";
import { validation_schema_dinein } from "../../../../utils/validation_schema";
import { useCartCtx } from "../../../../context/CartCtx";
import { useCtx } from "../../../../context/Ctx";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../config/@firebase";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatCollectionData } from "../../../../utils/formatData";
import { Loading } from "../../../../components/loading";
export function PlaceOrderDinein() {
  const [lobbySnap, lobbyLoading, lobbyError] = useCollection(
    collection(db, COLLECTIONS.lobbies),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const data = formatCollectionData(lobbySnap);

  const formik = useFormik({
    initialValues: {
      name: "",
      tableNo: 0,
      lobby: "",
    },
    validationSchema: validation_schema_dinein,
    onSubmit: onSubmit,
  });
  const type = "Dine in";
  const [status, setStatus] = React.useState({ loading: false, error: null });
  const [tables, setTables] = React.useState(null);
  const { itemsOfCart, resetCart, cartTotalPrice, updateCartStatus } =
    useCartCtx();
  const { updateModalStatus } = useCtx();
  console.log(tables, formik.values.tableNo);
  //t
  React.useEffect(() => {
    if (!formik.values.lobby) {
      setTables("");
      return;
    }
    const getTables = async () => {
      setStatus({ ...status, error: null });

      try {
        const data = await getDocs(
          query(
            collection(db, COLLECTIONS.lobbies),
            where("title", "==", formik.values.lobby)
          )
        );
        const formattedData = formatCollectionData(data);
        setTables(formattedData[0].noOfTables);
        setStatus({ ...status, error: null });
      } catch (e) {
        setTables(null);
        setStatus({ ...status, error: "No Lobby with such name exists." });
      }
    };
    getTables();
  }, [formik.values.lobby]);

  //t
  async function onSubmit(values) {
    if (itemsOfCart.length === 0) {
      setStatus({ loading: false, error: "Select some items to proceed." });
      return;
    }
    const payload = {
      ...values,
      status: "PENDING",
      itemsOfCart,
      price: cartTotalPrice,
      type,
    };
    setStatus({ loading: true, error: null });
    try {
      await addDoc(collection(db, COLLECTIONS.dinein), payload);
      setStatus({ loading: false, error: null });
      updateModalStatus(false, null);
      updateCartStatus(false);
      resetCart();
    } catch (e) {
      setStatus({ loading: false, error: "Error placing order." });
    }
  }
  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">Place your order.</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></input>
              {formik.touched.name && formik.errors.name ? (
                <p className="my-2">{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Lobby
            </label>
            <div className="mt-2.5">
              <select
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Lobby"
                name="lobby"
                onChange={formik.handleChange}
                value={formik.values.lobby}
              >
                {data?.length > 0 &&
                  data?.map(({ slug, title }) => (
                    <option key={slug}>{title}</option>
                  ))}
              </select>
              {formik.touched.lobby && formik.errors.lobby ? (
                <p className="my-2">{formik.errors.lobby}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          {tables && (
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-xl font-medium text-gray-900">
                  Table Number
                </label>
              </div>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                  //   type="password"
                  type="number"
                  placeholder="Table Number"
                  name="tableNo"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                ></input>

                {formik.touched.tableNo && formik.errors.tableNo ? (
                  <p className="my-2">{formik.errors.tableNo}</p>
                ) : (
                  ""
                )}
                {formik.values.tableNo > tables && (
                  <p className="my-2">Table doesnot exists.</p>
                )}
                {formik.values.tableNo <= 0 && (
                  <p className="my-2">Table doesnot exists.</p>
                )}
              </div>
            </div>
          )}
          {status.error && (
            <p className="text-base font-normal py-2">{status.error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={
                status.loading ||
                formik.values.tableNo <= 0 ||
                formik.values.tableNo > tables
              }
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  font-regular leading-7 text-white  text-xl"
            >
              {status.loading ? "Wait..." : "Place an order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  if (lobbyLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (lobbyError) return <h1>Error</h1>;
  return formJSX;
}
