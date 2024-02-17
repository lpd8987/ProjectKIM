import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormStore = defineStore('formData', () => {
    const newItemFormOpen = ref<boolean>(false);

    return { newItemFormOpen }
})