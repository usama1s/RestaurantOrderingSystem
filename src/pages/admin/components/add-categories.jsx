import React, { useRef, useState ,useEffect} from "react";
import { useFormik } from "formik";
import { validation_schema_food_categories, } from "../../../utils/validation_schema";
import { collection,addDoc,serverTimestamp } from "firebase/firestore";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import { db, } from "../../../config/@firebase";
import { useAdminCtx } from "../../../context/AdminCtx";
export function AddCategories() {
  const {updateModalStatus}=useAdminCtx()
    //Form Data
  const formik = useFormik({
    initialValues: {
      title: "",
     
    },
    validationSchema: validation_schema_food_categories,
    onSubmit: onSubmit,
  });
  const [status,setStatus]=useState({loading:false,error:null})
  async function onSubmit(values,actions){
    const collection_ref=collection(db,COLLECTIONS.categories)
      setStatus(prev=>({...prev,loading:true}))
      
      try{ 
            await addDoc(collection_ref,{...values,timestamp:serverTimestamp()})
      }
      catch(e){
        setStatus(prev=>({...prev,loading:false,error:`Error adding the item.`}))
      }
      finally{
        reset(actions)
        setStatus(prev=>({...prev,loading:false,error:null}))
        updateModalStatus(false,null)
      }
  }
  const reset=(actions)=>{
    actions.resetForm({title:'',price:0})
  }
  return (
    <div>
        <h1 className="font-bold text-3xl py-4 pt-8">Add a Category</h1>
        <form className="mt-16" onSubmit={formik.handleSubmit}>
        <div>
            <label
              htmlFor=""
              className="text-xl font-medium text-gray-900 dark:text-gray-200"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                className="flex w-full h-10 mb-2 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
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
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
             {status.loading ? 'Adding...' :'Add an item.'}
            </button>
          </div>
        </form>
    </div>
    
  )
}

