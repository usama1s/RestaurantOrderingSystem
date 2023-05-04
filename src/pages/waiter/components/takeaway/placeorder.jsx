import { useFormik } from "formik";
import { validation_schema_takeaway } from "../../../../utils/validation_schema";
import { WaiterOrder } from "../orders";
export function PlaceOrder() {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phoneNo: "",
    },
    validationSchema: validation_schema_takeaway,
    onSubmit: onSubmit,
  });
  function onSubmit(values) {
    console.log(values);
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
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Phone Number"
                name="phoneNo"
                onChange={formik.handleChange}
                value={formik.values.phoneNo}
              ></input>
              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <p className="my-2">{formik.errors.phoneNo}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xl font-medium text-gray-900">
                Address
              </label>
            </div>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                //   type="password"
                placeholder="Address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              ></input>
              {formik.touched.address && formik.errors.address ? (
                <p className="my-2">{formik.errors.address}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <WaiterOrder />
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  font-regular leading-7 text-white  text-xl"
            >
              Place an order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return formJSX;
}
