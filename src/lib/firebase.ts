import { initializeApp } from "firebase/app";
import {
  DatabaseReference,
  getDatabase,
  onValue,
  ref,
  push,
  set,
  remove,
  // set,
} from "firebase/database";
import { Item } from "./types";
import { getStorage, ref as storageRef } from "firebase/storage";

export enum Collections {
  Items = "items/",
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase();
export const storage = getStorage();

//Query Helper Section

export const getRef = (collection: Collections, id: string = "") =>
  ref(db, collection + id);

export const getStorageRef = (id: string) =>
  storageRef(storage, `items/${id}/`);

export const getCollection = <T>(
  ref: DatabaseReference,
  isArray: boolean = true,
) =>
  new Promise<T>((resolve, reject) =>
    onValue(
      ref,
      (snapshot) => {
        if (isArray) {
          const collection: Array<T> = [];
          snapshot.forEach((data) => {
            collection.push({ id: data.key, ...data.val() } as T);
          });

          resolve(collection as T);
        } else {
          const key = snapshot.key;
          const data = snapshot.val();
          const item = data as T;
          resolve({
            ...item,
            id: key,
          });
        }
      },
      reject,
      {
        onlyOnce: true,
      },
    ),
  );

// Mutation Helper Section

export const getPush = (collection: Collections) => push(getRef(collection));

export const itemsRef = getRef(Collections.Items);

export const itemRef = (id: string) => getRef(Collections.Items, id);

export const getItem = async (id: string) =>
  getCollection<Item>(itemRef(id), false)
    .then((data) => data)
    .catch(() => undefined);

export const getItems = async () =>
  getCollection<Item[]>(itemsRef)
    .then((data) => data)
    .catch(() => []);

export const upsertItem = async (id: string, item: Item) =>
  await set(ref(db, Collections.Items + id), item)
    .then(() => true)
    .catch(() => false);

export const removeItem = async (id: string) =>
  await remove(ref(db, Collections.Items + id))
    .then(() => true)
    .catch(() => false);
