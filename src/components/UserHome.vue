<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { getAuth } from "firebase/auth";
    import { fbApp } from "@/main";
    import SignOut from './OAuth/SignOut.vue'

    const username = ref<string | undefined>(undefined);
    const userPic = ref<HTMLImageElement | undefined>(undefined);
    
    const auth = getAuth(fbApp);

    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);

    onMounted(() => {
        console.log(auth)
        if (existingSessionData.displayName) {
            username.value = existingSessionData.displayName;
            userPic.value!.src = existingSessionData.photoURL!
        }
        else if(auth.currentUser){
            username.value = auth.currentUser!.displayName!;
            userPic.value!.src = auth.currentUser.photoURL!;
        }
    })
</script>

<template>
    <SignOut></SignOut>
    <h1>HOME PAGE</h1>
    <h2>Hello {{ username }}!</h2>
    <img src="" ref="userPic">


</template>

<style scoped>
</style>