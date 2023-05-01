import React, { useRef, useState, useEffect } from "react";

import { useFormik } from "formik";
import { validation_schema_food_items } from "../../../utils/validation_schema";
import {
  collection,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { food_items_storage_path } from "../../../utils/storage-refs";
import { COLLECTIONS } from "../../../utils/firestore-collections";
import { db, storage } from "../../../config/@firebase";
import { useCtx } from "../../../context/Ctx";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatCollectionData } from "../../../utils/formatData";
export function EditItem() {
  return <div>formJSX</div>;
}
