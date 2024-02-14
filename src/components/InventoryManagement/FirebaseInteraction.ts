import { doc, setDoc, deleteDoc, getDoc, getFirestore, DocumentReference, type DocumentData, DocumentSnapshot, type WithFieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { fbApp } from "@/main";
import { collection, query, where, getDocs } from "firebase/firestore";

type InventoryItem = {
    amount: number
}

async function getDataItem(collection: string, item: string) : Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined>
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

async function getInventoryCollection() {
    const db = getFirestore(fbApp);
    const currUser = localStorage.getItem('uuid');
    const inventoryCollectionRef = collection(db, `/inventories/${currUser}/items`);

    const q = query(inventoryCollectionRef);
    const querySnapshot = await getDocs(q);

    //console.log('querySnapshot', querySnapshot);

    const returnObj : DocumentData[]= []

    querySnapshot.forEach((doc) => returnObj.push(doc.data()));
    return returnObj;
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
    let data = await getDataItem('inventories', uid);

    //console.log("data", data);

    if(data?.exists()) return true;
    else return false;
}

export {
    getDataItem as getData,
    hasInventory,
    addInventoryCollection,
    addInventoryItem,
    getInventoryCollection as getCollectionData
}