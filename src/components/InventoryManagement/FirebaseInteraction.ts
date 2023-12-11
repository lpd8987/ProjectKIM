import { doc, setDoc, deleteDoc, getDoc, getFirestore } from "firebase/firestore";
import { fbApp } from "@/main";

const db = getFirestore(fbApp)

async function getData(collection: string, item: string){
    const docTemplate = doc(db, collection, item)
    return await getDoc(docTemplate); 
}

async function setData(collection: string, item: string, value: {[key : string] : any}) 
{
    const docTemplate = doc(db, collection, item);
    await setDoc(docTemplate, value);
}

async function updateInventory() {}
async function updateRecipes() {}
async function updateList() {}

export {
    getData,
    setData,
}