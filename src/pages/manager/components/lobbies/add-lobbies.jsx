import { useFormik } from "formik";
import { validation_schema_lobbies } from "../../../../utils/validation_schema";
export function ManagerAddLobbies() {
  const formik = useFormik({
    initialValues: {
      title: "",
      noOfTables: 0,
    },
    validationSchema: validation_schema_lobbies,
    onSubmit: onSubmit,
  });
  async function onSubmit(values, reset) {
    console.log(values);
  }
  //jsx
  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">Add Lobbies</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Title
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.title && formik.errors.title ? (
                <p className="my-2">{formik.errors.title}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xl font-medium text-gray-900">
                Number of Tables
              </label>
            </div>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                //   type="password"
                placeholder="Number of Tables"
                type="number"
                name="noOfTables"
                onChange={formik.handleChange}
                value={formik.values.noOfTables}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.noOfTables && formik.errors.noOfTables ? (
                <p className="my-2">{formik.errors.noOfTables}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  font-regular leading-7 text-white  text-xl"
            >
              Add a lobbie
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return formJSX;
}
