<script setup lang="ts">
    import GroceryListItem from './GroceryListItem.vue';
    import { fbApp } from "@/main";
    import { getListCollection } from './../../FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import LoadingScreen from './../LoadingScreen.vue'
    import { useFormStore } from '../../stores/FormStore'
    import { getAuth } from "firebase/auth";
    import type { ListItem } from '../InventoryManagement/Types';


    const auth = getAuth(fbApp);
    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);
    localStorage.setItem("uuid", existingSessionData.uid);

    const formStore = useFormStore();

    const uuid = localStorage.getItem("uuid");

    const dbData = ref<Array<object>>();

    const loading = ref<boolean>(false);

    async function checkList() : Promise<void> {
        if(!uuid) return;
        
        loading.value = true;
        dbData.value = await getListCollection();
        loading.value = false;
    }

    onMounted(async () => {
        setTimeout(await checkList, 100);
    })
</script>

<template>
    <h1>YOUR GROCERY LIST:</h1>
    <div class="list">
        <div v-if="dbData && dbData.length > 0">
            <GroceryListItem 
                v-for="(item, index) of dbData"
                :data="(item as ListItem)"
                @delete-item="async () => await checkList()"
            />
        </div>
        <div v-else-if="dbData && dbData.length === 0">
            No items found
        </div>
    </div>

    <Transition name="slide">
        <LoadingScreen v-if="loading"/>
    </Transition>
</template>

<style scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: all .5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0%;
    }
</style>