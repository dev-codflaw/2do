import { openDB } from 'idb';

const DB_NAME = 'MinimalAppDB';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('todos')) {
        db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('ideas')) {
        db.createObjectStore('ideas', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
};

export const addItem = async (storeName: string, item: any) => {
  const db = await initDB();
  await db.add(storeName, item);
};

export const getAllItems = async (storeName: string) => {
  const db = await initDB();
  return db.getAll(storeName);
};

// export const getAllItems = async (storeName: string, filter: { [key: string]: any } = {}) => {
//   const db = await initDB();
//   const allItems = await db.getAll(storeName);

//   // Apply filter if provided
//   if (Object.keys(filter).length > 0) {
//     return allItems.filter(item => 
//       Object.entries(filter).every(([key, value]) => 
//         item[key]?.toLowerCase() === value.toLowerCase()
//       )
//     );
//   }

//   return allItems;
// };

export const updateItem = async (storeName: string, item: any) => {
  const db = await initDB();
  await db.put(storeName, item);
};

export const deleteItem = async (storeName: string, id: number) => {
  const db = await initDB();
  await db.delete(storeName, id);
};
