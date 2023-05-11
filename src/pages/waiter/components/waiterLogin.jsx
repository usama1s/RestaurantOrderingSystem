import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { validation_schema_form_b } from "../../../utils/validation_schema";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import {
  where,
  getDocs,
  query,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../config/@firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import {
  useCtx,
  LOCAL_STORAGE_BASE,
  WAITER_SIDERBARLINKS_CHEF,
  WAITER_SIDERBARLINKS_NORMAL,
} from "../../../context/Ctx";
import { formatCollectionData } from "../../../utils/formatData";
import { useNavigate } from "react-router";
const { users } = COLLECTIONS;
export function WaiterLogin({ url, type }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: false, error: null });
  const { setAuthenticatedUser, setActiveWaiterTab, setWaiterSidebarLinks } =
    useCtx();
  //Forms Data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation_schema_form_b,
    onSubmit: onSubmit,
  });

  async function onSubmit(values, actions) {
    console.log(values);
    try {
      setStatus({ loading: true, error: null });

      const branchData = await getDocs(
        query(
          collection(db, COLLECTIONS.waiters),
          where("username", "==", values.email)
        )
      );
      const formattedData = formatCollectionData(branchData);
      console.log(formattedData);
      if (
        formattedData.length === 1 &&
        formattedData[0].password === values.password
      ) {
        setStatus({ loading: false, error: null });
        if (formattedData[0].subRole === "CHEF") {
          setActiveWaiterTab("Pending Orders");
          setWaiterSidebarLinks(WAITER_SIDERBARLINKS_CHEF);
        }
        if (formattedData[0].subRole === "NORMAL") {
          setActiveWaiterTab("Dine in");
          setWaiterSidebarLinks(WAITER_SIDERBARLINKS_NORMAL);
        }
        localStorage.setItem(
          `${LOCAL_STORAGE_BASE}Data`,
          JSON.stringify(formattedData[0])
        );
        setAuthenticatedUser(formattedData[0]);
        return;
      }
      if (
        formattedData.length === 1 &&
        formattedData[0].password !== values.password
      ) {
        setStatus({
          loading: false,
          error: "Password doesnot match",
        });
        return;
      }
      if (formattedData.length === 0) {
        setStatus({
          loading: false,
          error: "Username doesnot exist",
        });
        return;
      }

      //   navigate(url);
    } catch (e) {
      console.log(e?.message);
      setStatus({
        loading: false,
        error: e?.message ? e?.message : "Error authenticating the user.",
      });
    }
  }

  const reset = (actions) => {
    actions.resetForm({ branchName: "" });
  };
  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">{type} Login.</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Username"
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

          <div>
            {status.error && <p>{status.error}</p>}
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  font-regular leading-7 text-white  text-xl"
            >
              {status.loading ? "Authenticating" : "Authenticate"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return <div>{formJSX}</div>;
}
