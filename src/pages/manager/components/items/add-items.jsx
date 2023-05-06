import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { validation_schema_food_items } from "../../../../utils/validation_schema";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { food_items_storage_path } from "../../../../utils/storage-refs";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
import { db, storage } from "../../../../config/@firebase";
import { useCtx } from "../../../../context/Ctx";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatCollectionData } from "../../../../utils/formatData";
export function ManagerAddItem() {
  const [value, loading, error] = useCollection(
    collection(db, COLLECTIONS.categories),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const formattedData = value
    ? [{ title: "" }, ...formatCollectionData(value)]
    : null;
  const [showForm, setShowForm] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null });
  const { updateModalStatus } = useCtx();
  const inputRef = useRef();
  React.useEffect(() => {
    const fetchCategories = async () => {
      const category_exist = await getDocs(
        query(collection(db, COLLECTIONS.categories))
      );

      if (category_exist.docs.length >= 1) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    };
    fetchCategories();
  }, []);
  //Form Data
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
    },
    validationSchema: validation_schema_food_items,
    onSubmit: onSubmit,
  });
  useEffect(() => {
    setFileUploadError(null);
    setFileDataURL(null);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  //

  async function onSubmit(values, actions) {
    const collection_ref = collection(db, COLLECTIONS.food_items);
    setFileUploadError(null);
    setStatus((prev) => ({ ...prev, loading: true, error: null }));

    if (!file) {
      setStatus((prev) => ({ ...prev, loading: false }));
      setFileUploadError(`File is required.`);
      return;
    }
    const item_exist = await getDocs(
      query(
        collection(db, COLLECTIONS.food_items),
        where("title", "==", values.title)
      )
    );

    if (item_exist.docs.length >= 1) {
      setStatus({
        ...status,
        loading: false,
        error: "Item already exists.",
      });
      return;
    }
    try {
      const foodItemStorageRef = ref(
        storage,
        food_items_storage_path(file.name)
      );
      await uploadBytes(foodItemStorageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection_ref, {
            ...values,
            timestamp: serverTimestamp(),
            imageURL: downloadURL,
          });
        });
      });
      updateModalStatus(null, false);
      // setStatus(prev=>({...prev,loading:false,error:null}))
    } catch (e) {
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: `Error adding the item.`,
      }));
      updateModalStatus(null, false);
    } finally {
      reset(actions);
    }
  }
  const setImage = (e) => {
    setFile(e.target.files[0]);
  };
  const reset = (actions) => {
    setFile(null);
    setFileUploadError(null);
    setFileDataURL(null);
    actions.resetForm({ title: "", price: 0, description: "", category: "" });
    setCategoryError(null);
  };
  const formJSX = (
    <div>
      <h1 className="font-bold text-3xl py-3">Add Item</h1>
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
            <label htmlFor="" className="text-xl font-medium text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.description && formik.errors.description ? (
                <p className="my-2">{formik.errors.description}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xl font-medium text-gray-900">
                Price
              </label>
            </div>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                //   type="password"
                placeholder="Price"
                type="number"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.price && formik.errors.price ? (
                <p className="my-2">{formik.errors.price}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xl font-medium text-gray-900">
                Category
              </label>
            </div>
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              onBlur={formik.handleBlur}
            >
              {formattedData?.map(({ title }) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <p className="my-2">{formik.errors.category}</p>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xl font-medium text-gray-900">
                Add Image for the item.
              </label>
              <input
                ref={inputRef}
                accept="image/*"
                type="file"
                className=""
                onChange={setImage}
              ></input>
            </div>
            <div className="mt-2.5"></div>
            {fileDataURL && (
              <div
                // onClick={()=>{
                // setFileDataURL(null)
                // setFile(null)
                // }}
                className="h-[200px] w-[200px] "
              >
                <img
                  className="w-full h-full object-cover"
                  src={fileDataURL ? fileDataURL : ""}
                />
              </div>
            )}
          </div>
          {fileUploadError && <p>{fileUploadError}</p>}
          {status.error && <p>{status.error}</p>}
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
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : !showForm ? (
        <h1>Enter some categories to add a item</h1>
      ) : (
        formJSX
      )}
    </div>
  );
}
