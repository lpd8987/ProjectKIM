<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { hasInventory, addInventoryCollection, getCollectionData } from './FirebaseInteraction'
    import { onMounted, ref } from 'vue';
    import InventoryItem from './InventoryItem.vue';
    import { placeholderData } from './Utility';
    import LoadingScreen from './../LoadingScreen.vue'
    import AddItemForm from './AddItemForm.vue';
    import type { Item } from './Types';
    import { useFormStore } from '../../stores/FormStore'

    const formStore = useFormStore();

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

    
    <button @click="formStore.newItemFormOpen = true">
        Add New Item
    </button>
    
    <Transition name="slideLeft">
        <AddItemForm 
            v-if="formStore.newItemFormOpen"
        /> 
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


    .slideLeft-enter-active,
    .slideLeft-leave-active {
        transition: all .5s ease;
    }

    .slideLeft-enter-from,
    .slideLeft-leave-to {
        opacity: 0%;
        transform: translateY(-100%);
    }
</style>