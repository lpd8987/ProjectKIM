<script setup lang="ts">
    import { fbApp } from "@/main";
    import { getInventoryCollection } from './../../FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import InventoryItem from './InventoryItem.vue';
    import LoadingScreen from './../LoadingScreen.vue'
    import AddItemForm from './AddItemForm.vue';
    import type { Item } from './Types';
    import { useFormStore } from '../../stores/FormStore'
    import { PlusIcon } from '../Icons';
    import { getAuth } from "firebase/auth";

    const auth = getAuth(fbApp);
    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);
    localStorage.setItem("uuid", existingSessionData.uid);

    const formStore = useFormStore();

    const uuid = localStorage.getItem("uuid");

    const dbData = ref<Array<object>>();

    const loading = ref<boolean>(false);

    async function checkInventory() : Promise<void> {
        if(!uuid) return;
        
        loading.value = true;
        dbData.value = await getInventoryCollection();
        loading.value = false;
    }

    onMounted(async () => {
        setTimeout(await checkInventory, 100);
    })

</script>

<template>
    <div>
        <div class="pageTitle">YOUR KITCHEN INVENTORY</div>

        <div class="inventory">
            <div v-if="dbData && dbData.length > 0">
                <InventoryItem 
                    v-for="(item, index) of dbData"
                    :data="(item as Item)"
                    @delete-item="async () => await checkInventory()"
                />
            </div>
            <div v-else-if="dbData && dbData.length === 0">
                No items found
            </div>
        </div>

        <div class="addNew">
            <button 
                class="addItemBtn"
                @click="formStore.newItemFormOpen = true"
            >
                <div>Add New Item</div>
                <PlusIcon />
            </button>
        </div>
    </div>

    <Transition name="slide">
        <LoadingScreen v-if="loading"/>
    </Transition>
    
    <Transition name="slideLeft">
        <AddItemForm 
            v-if="formStore.newItemFormOpen"
            @add-item="async () => await checkInventory()"
        /> 
    </Transition>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .addItemBtn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        width: 80%;
        padding: 15px;
        border-radius: 15px;
    }

    
    .addNew {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 7px;
        left: 7px;
        width: calc(100% - 14px);
        border: 1px solid gray;
        border-radius: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: lightgray;
    }

    .inventory {
        border: 1px solid gray;
        border-radius: 20px;
        max-height: calc(75vh);
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 5px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .pageTitle {
        font-weight: 900;
        font-family: 'Comfortaa', sans-serif;
        font-size: 22px;
        text-align: center;
    }


    .slide-enter-active,
    .slide-leave-active {
        transition: all .5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0%;
    }


    .slideLeft-enter-active,
    .slideLeft-leave-active {
        transition: all .5s ease;
    }

    .slideLeft-enter-from,
    .slideLeft-leave-to {
        opacity: 0%;
        transform: translateY(-100%);
    }
</style>../../FirebaseInteraction