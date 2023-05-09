import React, { useRef, useState, useEffect } from "react";
import { useCtx } from "../../../../context/Ctx";
import { useFormik } from "formik";
import { validation_schema_manager_add_waiters } from "../../../../utils/validation_schema";
export function AddWaiters() {
  const [status, setStatus] = useState({ loading: false, error: null });
  const { updateModalStatus, authenticatedUser } = useCtx();

  //Form Data
  const formik = useFormik({
    initialValues: {
      waiterName: "",
      subRole: "LEAD",
      email: "",
      password: "",
    },
    validationSchema: validation_schema_manager_add_waiters,
    onSubmit: onSubmit,
  });
  useEffect(() => {}, []);

  async function onSubmit(values, actions) {
    console.log({ ...values, managerId: authenticatedUser.id });
  }

  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">Add Waiters.</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Waiter Name
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Waiter Name"
                name="waiterName"
                onChange={formik.handleChange}
                value={formik.values.waiterName}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.waiterName && formik.errors.waiterName ? (
                <p className="my-2">{formik.errors.waiterName}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Waiter's Role
            </label>
            <div className="mt-2.5">
              <select
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Waiter's Role"
                name="subRole"
                onChange={formik.handleChange}
                value={formik.values.subRole}
                onBlur={formik.handleBlur}
              >
                <option value="LEAD">Head Waiter</option>
                <option value="ChEF">CHEF</option>
                <option value="NORMAL">Regular Waiter</option>
              </select>
              {formik.touched.subRole && formik.errors.subRole ? (
                <p className="my-2">{formik.errors.subRole}</p>
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
