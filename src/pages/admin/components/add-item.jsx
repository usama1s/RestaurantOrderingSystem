import React, { useRef, useState ,useEffect} from "react";
import { useFormik } from "formik";
import { validation_schema_food_items } from "../../../utils/validation_schema";
import { collection,addDoc,serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { food_items_storage_path } from "../../../utils/storage-refs";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import { db,storage } from "../../../config/@firebase";
import { useAdminCtx } from "../../../context/AdminCtx";
export function AddItem() {
  const [file,setFile]=useState(null)
  const [fileUploadError,setFileUploadError]=useState(null)
  const [fileDataURL, setFileDataURL] = useState(null);
  const [status,setStatus]=useState({loading:false,error:null})
  const {updateModalStatus}=useAdminCtx()
  const inputRef=useRef()
  //Form Data
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
    },
    validationSchema: validation_schema_food_items,
    onSubmit: onSubmit,
  });
  useEffect(() => {
   setFileUploadError(null)
   setFileDataURL(null)
    let fileReader, isCancel = false;
    if (file) {
   
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);
    //
   
    async function onSubmit(values,actions) {
      const collection_ref=collection(db,COLLECTIONS.food_items)
      setFileUploadError(null)
      console.log("CLikce1")
      setStatus(prev=>({...prev,loading:true}))
      if(!file) {
        setStatus(prev=>({...prev,loading:false}))
        setFileUploadError(`File is required.`)
        return 
      }
      try{ 
      const foodItemStorageRef=ref(storage, food_items_storage_path(file.name))
      await uploadBytes(foodItemStorageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async(downloadURL) => {
            await addDoc(collection_ref,{...values,timestamp:serverTimestamp(),imageURL:downloadURL})
            });
        });
        // setStatus(prev=>({...prev,loading:false,error:null}))
      }
      catch(e){
        setStatus(prev=>({...prev,loading:false,error:`Error adding the item.`}))
      }
      finally{
        reset(actions)
        updateModalStatus(null,false)
        setStatus(prev=>({...prev,loading:false,error:null}))
      }
    
    }
    const setImage=(e)=>{
      setFile(e.target.files[0])
    }
    const reset=(actions)=>{
      setFile(null)
      setFileUploadError(null)
      setFileDataURL(null)
      actions.resetForm({title:'',price:0})
    }
  return (
    <div>
      <h1 className="font-bold text-3xl py-3">Add Item</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <div>
            <label
              htmlFor=""
              className="text-xl font-medium text-gray-900 dark:text-gray-200"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                className="flex  h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
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
              <label
                htmlFor=""
                className="text-xl font-medium text-gray-900 dark:text-gray-200"
              >
                Price
              </label>
            </div>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
         
              <label
                htmlFor=""
                className="text-xl font-medium text-gray-900 dark:text-gray-200"
              >
                Add Image for the item.
              </label>
              <input ref={inputRef} accept="image/*" type="file" className="" onChange={setImage}></input>
            
            </div>
            <div className="mt-2.5">
            
            </div>
        { fileDataURL && <div 
        // onClick={()=>{
          // setFileDataURL(null)
          // setFile(null)
        // }}
         className="h-[200px] w-[200px] ">
            <img className="w-full h-full object-cover" src={fileDataURL?fileDataURL:''}/>
          </div>}

          </div>
          {fileUploadError && <p>{fileUploadError}</p>}
          {status.error && <p>{status.error}</p>}
          <div>
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5  font-regular leading-7 text-white hover:bg-indigo-500 text-xl"
            >
             {status.loading ? 'Adding...' :'Add an item.'}
            </button>
          </div>
        </div>
      </form>
     
    </div>
  );
}
