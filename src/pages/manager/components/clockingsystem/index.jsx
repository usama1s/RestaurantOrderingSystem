import moment from "moment";
import { db } from "../../../../config/@firebase";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCtx } from "../../../../context/Ctx";
import { useDocument } from "react-firebase-hooks/firestore";
import React from "react";
// import
export function ClockingSystem() {
  const { authenticatedUser } = useCtx();
  const [value, loading, error] = useDocument(
    doc(db, "branches", authenticatedUser.branchId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [status, setStatus] = React.useState({ loading: false, error: null });
  const clockIn = async () => {
    const clockInTime = moment().format("MMMM Do YYYY, h:mm:ss a").split(", ");
    const date = clockInTime[0];
    setStatus({ loading: true, error: null });
    try {
      await updateDoc(doc(db, `branches`, authenticatedUser.branchId), {
        clockInTime: serverTimestamp(),
        clockInDate: date,
      });
      await setDoc(doc(db, "orders", `${authenticatedUser.branchId}-${date}`), {
        dineInOrders: [],
        takeAwayOrders: [],
      });
      setStatus({ loading: false, error: null });
    } catch (e) {
      console.log(e);
      setStatus({ loading: false, error: "Error updating the status." });
    }
  };
  const clockOut = async () => {
    if (!value?.data()) return;
    setStatus({ loading: true, error: null });
    try {
      await deleteDoc(
        doc(
          db,
          "orders",
          `${authenticatedUser.branchId}-${value?.data()?.clockInDate}`
        )
      );
      await updateDoc(doc(db, "branches", authenticatedUser.branchId), {
        clockInDate: "",
        clockInTime: "",
      });
      setStatus({ loading: false, error: null });
    } catch (e) {
      console.log(e?.message);
      setStatus({ loading: false, error: "Error updating the status." });
    }
  };
  if (loading) return <h1>Loading....</h1>;
  if (error)
    return <h1>{error?.message ? error?.message : "Error right now.."}</h1>;
  return (
    <div>
      <button
        className="disabled:bg-slate-500 bg-black text-white"
        disabled={status.loading || value?.data()?.clockInTime}
        onClick={clockIn}
      >
        Clock in
      </button>
      <button
        className="disabled:bg-slate-500"
        disabled={status.loading || !value?.data()?.clockInTime}
        onClick={clockOut}
      >
        Clock Out
      </button>
    </div>
  );
}
