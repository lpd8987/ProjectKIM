<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { getAuth } from "firebase/auth";
    import { useUserDataStore } from "@/stores/UserDataStore";
    import { fbApp } from "@/main";
    import Nav from "./Nav.vue";
    import SignOut from './OAuth/SignOut.vue'

    const username = ref<string | undefined>(undefined);
    //const userPic = ref<HTMLImageElement | undefined>(undefined);
    
    const userDataStore = useUserDataStore();
    
    const auth = getAuth(fbApp);

    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);

    localStorage.setItem("uuid", existingSessionData.uid);

    onMounted(() => {
        //console.log(auth)
        if (existingSessionData.displayName) {
            username.value = existingSessionData.displayName;
            //userPic.value!.src = existingSessionData.photoURL!
        }
        else if(auth.currentUser){
            username.value = auth.currentUser!.displayName!;
            //userPic.value!.src = auth.currentUser.photoURL!;
        }
    })
</script>

<template>
    <Nav :active-page="'home'"/>
    <h1>HOME PAGE</h1>
    <h2>Hello {{ username }}!</h2>
    <!-- <img src="" ref="userPic"> -->

    <RouterLink :to="'/inventory'">INVENTORY</RouterLink>
</template>

<style scoped>
</style>