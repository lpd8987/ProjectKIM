import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDataStore = defineStore('userData', () => {
    const username = ref<string | undefined>("");
    const token = ref<string | undefined>("")

    function getUsername() {
        return username.value
    }

    function getToken() {
        return token.value
    }

    function setUsername(newUsername : string) {
        username.value = newUsername;
    }
    
    function setToken(newToken : string) {
        token.value = newToken;
    }

    return {getUsername, setUsername, getToken, setToken }
})