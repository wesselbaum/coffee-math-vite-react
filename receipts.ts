import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ReceiptInterface } from "./lib/ReceiptInterface.ts";

export async function getReceipts(query?: string): Promise<ReceiptInterface[]> {
  let receipts = (await localforage.getItem("receipts")) as ReceiptInterface[];
  if (!receipts) receipts = [];
  if (query) {
    receipts = matchSorter(receipts, query, { keys: ["name"] });
  }
  console.log(`getReceipts`, receipts);
  return receipts.sort(sortBy("last", "createdAt"));
}

export async function createReceipt() {
  const id = Math.random().toString(36).substring(2, 9);
  const receipt: ReceiptInterface = {
    id,
    createdAt: Date.now(),
    favorite: false,
    ratioConf: {
      waterInGroundCoffeeCapacity: 2.2,
      relationship: { coffeeG: 1, waterMl: 16 },
    },
    name: "New Receipt",
  };
  const receipts = await getReceipts();
  receipts.unshift(receipt);
  await set(receipts);
  return receipt;
}

export async function getReceipt(id: string) {
  const receipts = (await localforage.getItem(
    "receipts"
  )) as ReceiptInterface[];
  const receipt = receipts.find((receipt) => receipt.id === id);
  return receipt ?? null;
}

export async function updateReceipt(id: string, updates) {
  const receipts = (await localforage.getItem(
    "receipts"
  )) as ReceiptInterface[];
  const receipt = receipts.find((receipt) => receipt.id === id);
  if (!receipt) throw new Error(`No receipt found for ${id}`);
  Object.assign(receipt, updates);
  await set(receipts);
  return receipt;
}

export async function deleteReceipt(id: string) {
  const receipts = (await localforage.getItem(
    "receipts"
  )) as ReceiptInterface[];
  const index = receipts.findIndex((receipt) => receipt.id === id);
  if (index > -1) {
    receipts.splice(index, 1);
    await set(receipts);
    return true;
  }
  return false;
}

function set(receipts: ReceiptInterface[]) {
  return localforage.setItem("receipts", receipts);
}
