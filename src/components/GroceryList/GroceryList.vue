<script setup lang="ts">
    import GroceryListItem from './GroceryListItem.vue';
    import { fbApp } from "@/main";
    import { getListCollection } from './../../FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import LoadingScreen from './../LoadingScreen.vue'
    import AddGrocItemForm from './AddGrocItemForm.vue';
    import { useFormStore } from '../../stores/FormStore'
    import { getAuth } from "firebase/auth";
    import type { Item, ListItem } from '../InventoryManagement/Types';
    import { PlusIcon, UndoIcon } from './../Icons'
    import InventoryAddForm from './InventoryAddForm.vue'
    import Nav from '../Nav.vue';

    const auth = getAuth(fbApp);
    const existingSessionData = JSON.parse(sessionStorage.getItem(`firebase:authUser:${import.meta.env.VITE_APP_FIREBASE_KEY}:${auth.name}`)!);
    localStorage.setItem("uuid", existingSessionData.uid);


    const formStore = useFormStore();
    const uuid = localStorage.getItem("uuid");
    const dbData = ref<Array<object>>();
    const loading = ref<boolean>(false);
    const checkedNum = ref<number>(0);
    const checkedItems = ref<Array<Item>>([])

    async function checkList() : Promise<void> {
        if(!uuid) return;
        
        loading.value = true;
        dbData.value = await getListCollection();
        loading.value = false;
    }

    function addToCheckedItems(item: Item) {
        if(!checkedItems.value.includes(item)) checkedItems.value.push(item);
    }

    function removeFromCheckedItems(item: Item) {
        const index = checkedItems.value.indexOf(item);
        if(index !== -1) checkedItems.value.splice(index, 1);
    }

    onMounted(async () => {
        document.title = 'My Grocery List';
        setTimeout(await checkList, 100);
    })
</script>

<template>
    <Nav active-page="list"/>

    <div class="title">YOUR GROCERY LIST:</div>

    <Transition name="slide">
        <div 
            class="addBtn" v-if="checkedNum > 0"
            @click="formStore.addManyFormOpen = true"
        >
            Add all checked to inventory
            <PlusIcon />
        </div>
    </Transition>

    <div class="list">
        <div v-if="dbData && dbData.length > 0">
            <GroceryListItem 
                v-for="(item, index) of dbData"
                :data="(item as ListItem)"
                @delete-item="async () => await checkList()"
                @uncheck="checkedNum--; removeFromCheckedItems(item as Item)"
                @check="checkedNum++; addToCheckedItems(item as Item)"
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
            <div>Add Item</div>
            <PlusIcon />
        </button>

        <button 
                class="addItemBtn"
                @click="async () => await checkList()"
            >
                <div>Refresh</div>
                <UndoIcon />
            </button>
    </div>

    <Transition name="slide">
        <LoadingScreen v-if="loading"/>
    </Transition>

    <Transition name="slideLeft">
        <AddGrocItemForm 
            v-if="formStore.newItemFormOpen"
            @add-item="async () => await checkList()"
        /> 
    </Transition>

    <Transition name="slideLeft">
        <InventoryAddForm 
            v-if="formStore.addManyFormOpen"
            :data="checkedItems"
            @update="async() => {await checkList(); checkedItems = []; checkedNum = 0}"
        />
    </Transition>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .slideLeft-enter-active,
    .slideLeft-leave-active {
        transition: all .5s ease;
    }

    .slideLeft-enter-from,
    .slideLeft-leave-to {
        opacity: 0%;
        transform: translateY(-100%);
    }

    .addItemBtn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        width: 45%;
        padding: 15px;
        border-radius: 15px;
    }
    
    .addNew {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
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

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-5px);
    }

    .addBtn {
        margin-bottom: 5px;
        font-family: 'Comfortaa', sans-serif;
        border: 3px solid gray;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 7px;
        padding-bottom: 7px;
        border-radius: 15px;
        background-color: lightgray;
    }

    .stats{
        display: flex;
        flex-direction: column;
        font-family: 'Comfortaa', sans-serif;
        font-size: 18px;
        border: 3px solid gray;
        border-radius: 10px;
        padding: 7px;
        margin-bottom: 5px;
        transition: height .5px ease;
    }

    .title {
        font-family: 'Comfortaa', sans-serif;
        font-size: 22px;
        font-weight: 900;
        text-align: center;
    }
</style>