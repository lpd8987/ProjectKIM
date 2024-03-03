import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDataStore = defineStore('userData', () => {
    const signedIn = ref<boolean>(false)

    return { signedIn }
})