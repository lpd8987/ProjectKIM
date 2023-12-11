<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { getAuth } from "firebase/auth";
    import { fbApp } from "@/main";
    import SignOut from './OAuth/SignOut.vue'

    const username = ref<string | undefined>("")
    
    const auth = getAuth(fbApp);

    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);

    onMounted(() => {

        console.log(auth)
        if (existingSessionData.displayName) {
            username.value = existingSessionData.displayName;
        }
        else if(auth.currentUser){
            username.value = auth.currentUser!.displayName!
        }

    })
</script>

<template>
    <SignOut></SignOut>
    <h1>HOME PAGE</h1>
    <h2>Hello {{ username }}!</h2>


</template>

<style scoped>
</style>