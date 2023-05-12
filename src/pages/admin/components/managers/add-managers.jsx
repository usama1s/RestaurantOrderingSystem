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
  addDoc,
} from "firebase/firestore";

import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { db, auth } from "../../../../config/@firebase";
import { useCtx } from "../../../../context/Ctx";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { ROLES } from "../../../../utils/roles";
export function AdminAddManagers() {
  const [status, setStatus] = useState({ loading: false, error: null });
  const { updateModalStatus, authenticatedUser } = useCtx();

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
          collection(db, COLLECTIONS.branches),
          where("branchName", "==", values.branchName)
        )
      );
      if (branchExists.docs.length > 0) {
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
      const branch = await addDoc(collection(db, COLLECTIONS.branches), {
        ...values,
        role: ROLES.MANAGER,
        timestamp: serverTimestamp(),
        managerId: createdUser.user.uid,
        disabled: false,
      });
      await setDoc(doc(db, COLLECTIONS.users, createdUser.user.uid), {
        ...values,
        role: ROLES.MANAGER,
        timestamp: serverTimestamp(),
        managerId: createdUser.user.uid,
        disabled: false,
        branchId: branch.id,
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
      <h1 className="font-bold text-2xl py-3">Add Branches.</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-lg font-medium text-gray-900">
              Branch Name
            </label>
            <div className="mt-1">
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
            <label htmlFor="" className="text-lg font-medium text-gray-900">
              Manager's Name
            </label>
            <div className="mt-1">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            <label htmlFor="" className="text-lg font-medium text-gray-900">
              Email
            </label>
            <div className="mt-1">
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
            <label htmlFor="" className="text-lg font-medium text-gray-900">
              Password
            </label>
            <div className="mt-1">
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
          <div className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-gray-800 active:shadow-none shadow-lg bg-gradient-to-tr from-gray-900 to-gray-800 border-gray-800 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-36 group-hover:h-20 opacity-10"></span>
            <button
              className="relative"
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? "Adding..." : "Add Branch."}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return <div>{formJSX}</div>;
}
