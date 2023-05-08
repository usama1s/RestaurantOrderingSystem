import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { validation_schema_admin_add_managers } from "../../../../utils/validation_schema";
import {
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { db, auth } from "../../../../config/@firebase";
import { useCtx } from "../../../../context/Ctx";
import { createUserWithEmailAndPassword } from "@firebase/auth";
export function AdminAddManagers() {
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState({ loading: false, error: null });
  const { updateModalStatus } = useCtx();

  //Form Data
  const formik = useFormik({
    initialValues: {
      branchName: "",
      managerName: "",
      email: "",
      password: "",
    },
    validationSchema: validation_schema_admin_add_managers,
    onSubmit: onSubmit,
  });

  async function onSubmit(values, actions) {
    setStatus({ loading: true, error: null });
    try {
      const branchExists = await getDocs(
        query(
          collection(db, COLLECTIONS.managers),
          where("branchName", "==", values.branchName)
        )
      );

      if (branchExists?.docs?.length > 0) {
        setStatus({
          ...status,
          error: "Branch already exists.",
          loading: false,
        });
        return;
      }
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await setDoc(doc(db, COLLECTIONS.users, createdUser.user.uid), {
        ...values,
        role: "MANAGER",
        timestamp: serverTimestamp(),
      });
      setStatus({ error: null, loading: false });
      updateModalStatus(false, null);
    } catch (e) {
      console.log(e);
      setStatus({
        loading: false,
        error: e?.message ? e?.message : "Error creating the user.",
      });
    }
  }

  const reset = (actions) => {
    actions.resetForm({ branchName: "" });
  };
  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">Add Managers.</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Branch Name
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Branch Name"
                name="branchName"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.branchName && formik.errors.branchName ? (
                <p className="my-2">{formik.errors.branchName}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Manager's Name
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Manager Name"
                name="managerName"
                onChange={formik.handleChange}
                value={formik.values.managerName}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.managerName && formik.errors.managerName ? (
                <p className="my-2">{formik.errors.managerName}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.email && formik.errors.email ? (
                <p className="my-2">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.password && formik.errors.password ? (
                <p className="my-2">{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          {status.error && <h2>{status.error}</h2>}
          <div>
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  font-regular leading-7 text-white  text-xl"
            >
              {status.loading ? "Adding..." : "Add an item."}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return <div>{formJSX}</div>;
}
