import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDataStore = defineStore('userData', () => {
    const currentUUID = ref<string | null>(null)

    function setUUID (uuid : string) : void {
        currentUUID.value = uuid;
    }

    function clearUUID () : void {
        currentUUID.value = null;
    }

    return { currentUUID, setUUID, clearUUID }
})