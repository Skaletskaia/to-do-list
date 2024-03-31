import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IList } from "types";
import { updDateFirestore } from "./utils";

export let firebaseApp: FirebaseApp;

export const initializeAPI = (): FirebaseApp => {
  firebaseApp = initializeApp({
    apiKey: "AIzaSyDylvDaoAT0RNPJOi9Vkp50HBdIWGUefl8",
    authDomain: "to-do-list-4640f.firebaseapp.com",
    projectId: "to-do-list-4640f",
    storageBucket: "to-do-list-4640f.appspot.com",
    messagingSenderId: "637185847687",
    appId: "1:637185847687:web:7e70854d0abaf807966322",
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);

  return firebaseApp;
};

const myCollection = "list";

export const getList = async (userID: string): Promise<IList[]> => {
  const db = getFirestore();
  const dataList: IList[] = [];

  const queryForUserDocuments = query(
    collection(db, myCollection),
    where("userID", "==", userID),
  );

  try {
    const querySnapshot = await getDocs(queryForUserDocuments);
    querySnapshot.forEach((doc) => {
      const dataItem: IList = { id: doc.id, ...doc.data() } as IList;
      dataList.push(dataItem);
    });
    return dataList;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTask = async (data: {
  task: string;
  date: string;
  userID: string;
}) => {
  try {
    const db = getFirestore();
    const newDate = updDateFirestore(data.date);

    await addDoc(collection(db, myCollection), {
      task: data.task,
      date: newDate,
      done: false,
      userID: data.userID,
    });
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const deleteTask = async (id: string) => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, myCollection, id));
  } catch (error) {
    throw new Error("Failed to remove task");
  }
};

export const getTask = async (id: string): Promise<IList | undefined> => {
  const db = getFirestore();
  const docRef = doc(db, myCollection, id);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { id: docSnap.id, ...data } as IList;
    } else {
      return undefined;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updTask = async (
  id: string,
  data: { task: string; date: string },
) => {
  const db = getFirestore();

  try {
    const washingtonRef = doc(db, myCollection, id);

    await updateDoc(washingtonRef, {
      task: data.task,
      date: updDateFirestore(data.date),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
