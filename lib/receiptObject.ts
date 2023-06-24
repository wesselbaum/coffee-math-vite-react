import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { RatioConf } from "coffeemathlib/RatioCalculator";
import localforage from "localforage";
import { matchSorter } from "match-sorter";

export interface ReceiptObject {
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
}
const RECEIPTS_REF = collection(db, "recipes");

export async function getReceipts(query?: string): Promise<ReceiptObject[]> {
  // let receipts = (await localforage.getItem("receipts")) as ReceiptObject[];
  let receipts: ReceiptObject[] = [];
  await getDocs(RECEIPTS_REF).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      // id: doc.id,
    }));
    receipts = newData as unknown as ReceiptObject[];
  });
  receipts.map((r) => {
    if ("receipt" in r) {
      console.log(`r.receipt`, r.receipt);
      return r.receipt as unknown as ReceiptObject;
    } else {
      console.log(`r`, r);
      return r;
    }
  });
  if (query) {
    receipts = matchSorter(receipts, query, { keys: ["name"] });
  }
  return receipts as unknown as ReceiptObject[];
}

export async function createReceipt() {
  const id = Math.random().toString(36).substring(2, 9);
  const recipe: ReceiptObject = {
    id,
    favorite: false,
    ratioConf: {
      waterInGroundCoffeeCapacity: 2.2,
      relationship: { coffeeG: 1, waterMl: 16 },
    },
    name: "New Receipt",
  };
  const receipts = await getReceipts();
  receipts.unshift(recipe);

  try {
    await addDoc(RECEIPTS_REF, {
      ...recipe,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  await set(receipts);

  return recipe;
}

export async function getReceipt(id: string) {
  const q = query(RECEIPTS_REF, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].data();
  }
  throw new Error(`No recipe with id: ${id}`);
}

export async function updateReceipt(
  id: string,
  updates: Partial<ReceiptObject>
) {
  const receipts = (await localforage.getItem("receipts")) as ReceiptObject[];
  const receipt = receipts.find((receipt) => receipt.id === id);
  if (!receipt) throw new Error(`No receipt found for ${id}`);
  Object.assign(receipt, updates);
  await set(receipts);
  return receipt;
}

export async function deleteReceipt(id: string) {
  const receipts = (await localforage.getItem("receipts")) as ReceiptObject[];
  const index = receipts.findIndex((receipt) => receipt.id === id);
  if (index > -1) {
    receipts.splice(index, 1);
    await set(receipts);
    return true;
  }
  return false;
}

function set(receipts: ReceiptObject[]) {
  return localforage.setItem("receipts", receipts);
}
