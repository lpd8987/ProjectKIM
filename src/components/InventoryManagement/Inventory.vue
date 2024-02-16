<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { hasInventory, addInventoryCollection, getCollectionData } from './FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import InventoryItem from './InventoryItem.vue';
    import { placeholderData } from './Utility';
    import LoadingScreen from './../LoadingScreen.vue'
    import AddItemForm from './AddItemForm.vue';
    import type { Item } from './Types';

    const inventory = ref<boolean>(false);

    const uuid = localStorage.getItem("uuid");

    const dbData = ref<Array<object>>();

    const loading = ref<boolean>(false);

    async function checkInventory() : Promise<void> {
        if(!uuid) return;
        
        loading.value = true;
        dbData.value = await getCollectionData();
        loading.value = false;
    }

    onMounted(async () => {
        await checkInventory();
    })

</script>

<template>
    <h1>YOUR KITCHEN INVENTORY:</h1>

    <br><br>

<!--     <button @click="addItem">
        DO DA THING
    </button> -->

    <RouterLink :to="'/'">HOME</RouterLink>

    <Transition name="slide">
        <LoadingScreen v-if="loading"/>
    </Transition>

    <div v-if="dbData && dbData.length > 0">
        <InventoryItem 
            v-for="(item, index) of dbData"
            :data="(item as Item)"
        />
    </div>
    <div v-else-if="dbData && dbData.length === 0">
        No items found
    </div>
    
    <AddItemForm/> 
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