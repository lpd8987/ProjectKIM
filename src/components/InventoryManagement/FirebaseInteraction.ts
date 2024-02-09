import { doc, setDoc, deleteDoc, getDoc, getFirestore, DocumentReference, type DocumentData, DocumentSnapshot, type WithFieldValue } from "firebase/firestore";
import { fbApp } from "@/main";

type InventoryItem = {
    amount: number
}

async function getData(collection: string, item: string) : Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined>
{
    const db = getFirestore(fbApp);
    const docTemplate = doc(db, collection, item);
    let x;
    try {
        x = await getDoc(docTemplate); 
    }
    catch (error: any) {
        console.log(error.message)
    }
    return x;
}

async function addInventoryCollection(uid : string) {
    //console.log("addInventoryCollection")
    const docTemplate = doc(getFirestore(fbApp), `inventories`, uid);
    try{
        await setDoc(docTemplate, {});
    }
    catch (error: any) {
        console.log(error.message)
    }
}

async function addInventoryItem(uid: string, itemName : string, itemData: InventoryItem) {
    //console.log('addInventoryItem');
    const docTemplate = doc(getFirestore(fbApp), `/inventories/${uid}/items/${itemName}`);
    try{
        let inventory = await getDoc(docTemplate);
        //console.log("inventory", inventory.data());

        await setDoc(docTemplate, itemData);
    }
    catch (error: any) {
        console.log(error.message)
    }
}

async function hasInventory(uid : string) : Promise<boolean> {
    let data = await getData('inventories', uid);

    //console.log("data", data);

    if(data?.exists()) return true;
    else return false;
}

export {
    getData,
    hasInventory,
    addInventoryCollection,
    addInventoryItem,
}