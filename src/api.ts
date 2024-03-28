import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { IList } from "types";
import { updDateFirestore } from "./utils";

const firebaseConfig = {
  apiKey: "AIzaSyDylvDaoAT0RNPJOi9Vkp50HBdIWGUefl8",
  authDomain: "to-do-list-4640f.firebaseapp.com",
  projectId: "to-do-list-4640f",
  storageBucket: "to-do-list-4640f.appspot.com",
  messagingSenderId: "637185847687",
  appId: "1:637185847687:web:7e70854d0abaf807966322",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = "list";

export const getList = async (): Promise<IList[]> => {
  const dataList: IList[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, myCollection));
    querySnapshot.forEach((doc) => {
      const dataItem = { id: doc.id, ...doc.data() };
      dataList.push(dataItem as IList);
    });

    return dataList;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tasks");
  }
};

export const addTask = async (data: { task: string; date: string }) => {
  try {
    const newDate = updDateFirestore(data.date);

    console.log("новая дата", newDate);

    const docRef = await addDoc(collection(db, myCollection), {
      task: data.task,
      date: newDate,
      done: false,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add task");
  }
};

export const deleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(db, myCollection, id));
    console.log("запись удалена");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove task");
  }
};

export const getTask = async (id: string): Promise<IList | undefined> => {
  const docRef = doc(db, myCollection, id);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { id: docSnap.id, ...data } as IList;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
};
