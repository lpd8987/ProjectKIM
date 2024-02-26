import { defineStore } from "pinia";
import { ref } from "vue";

export const useTagStore = defineStore('tagData', () => {
    const selectedTags = ref<{[id: string] : Array<string>}>({});
    
    function addTagCollection(id: string){
        selectedTags.value[id] = [];
    }

    function getSelectedTags(collectionId: string) {
        return selectedTags.value[collectionId];
    }

    function addSelectedTag(collectionId: string, tag: string)
    {
        const arr = selectedTags.value[collectionId];
        if(!arr.includes(tag)) arr.push(tag)
        else console.log("ERROR: TAG ALREADY CONTAINED")

    }

    function removeSelectedTag(collectionId: string, tag: string) {
        const arr = selectedTags.value[collectionId];
        const targIndex = arr.indexOf(tag);
        if(!arr.includes(tag)) console.log("ERROR: TAG NOT FOUND");
        else arr.splice(targIndex, 1);
    }

    function clearAllTags() {
        selectedTags.value = {};
        console.log("CLEARED")
    }

    return { 
        addTagCollection,
        getSelectedTags,
        addSelectedTag,
        removeSelectedTag,
        clearAllTags
    }
})