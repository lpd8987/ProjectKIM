import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormStore = defineStore('formData', () => {
    const verificationOpen = ref<boolean>(false);
    const signOutOpen = ref<boolean>(false);
    const newItemFormOpen = ref<boolean>(false);
    const addManyFormOpen = ref<boolean>(false)

    return { verificationOpen, newItemFormOpen, signOutOpen, addManyFormOpen }
})