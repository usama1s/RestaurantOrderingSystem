import React from "react";
import { ROLES } from "../../utils/roles";
import { useFormik } from "formik";
import { ROUTES } from "../../utils/routes";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/@firebase";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS } from "../../utils/firestore-collections";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validation_schema_form } from "../../utils/validation_schema";
export const LoginAdmin = () => {
  const { admin } = ROUTES;
  const navigate = useNavigate();
  const [status, setStatus] = React.useState({
    error: null,
    loading: false,
  });
  //Form Data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation_schema_form,
    onSubmit: onSubmit,
  });
  async function onSubmit(values) {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userDocument =
        user && (await getDoc(doc(db, COLLECTIONS.users, user?.user?.uid)));
      if (userDocument.data().role === ROLES.ADMIN) {
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        navigate(admin);
      }
    } catch (error) {
      console.log(error?.message);
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: error?.message ? error?.message : "Error authenticating User.",
      }));
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center w-[70%] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto w-full ">
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-xl font-medium text-gray-900 dark:text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-xl font-medium text-gray-900 dark:text-gray-200"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    //   type="password"
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
                  <p>{status.error}</p>
                </div>
              </div>

              <div>
                <button
                  disabled={status.loading}
                  type="submit"
                  className="inline-flex w-full  items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-regular leading-7 text-white hover:bg-indigo-500"
                >
                  {status.loading ? "Loading..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
