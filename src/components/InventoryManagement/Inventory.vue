<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { hasInventory, addInventoryCollection, addInventoryItem } from './FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import InventoryItem from './InventoryItem.vue';
    import { placeholderData } from './Utility';

    const inventory = ref<boolean>(false);

    const uuid = localStorage.getItem("uuid");

    async function checkInventory() : Promise<void> {
        //console.log("A")
        if(!uuid) return;
        
        inventory.value = await hasInventory(uuid);

        //no inventory collection found, add new one to database;
        if(!inventory.value) {
            //console.log('Adding Inventory collection')
            await addInventoryCollection(uuid);
        }
    }

    async function addItem() {
        //console.log("do the thing!")
        if(!uuid) return;

        await addInventoryItem(uuid, "bread", {amount: 1});
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
    <InventoryItem :data="placeholderData"/>
    
</template>

<style scoped>

</style>