<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { SignOutIcon } from './Icons'
    import { signOutSession } from './OAuth/OAuth'
    import router from './../router'
    import { ref } from 'vue';
    import { useFormStore } from '@/stores/FormStore';
    import ActionVerification from './InventoryManagement/ActionVerification.vue';

    const active = ref<string>('inventory');
    const formStore = useFormStore();

    const emits = defineEmits(['activeChanged'])

    async function signOut() {
        await signOutSession();
        router.push('/');

        formStore.signOutOpen = false
    }
    
    function setActivePage (page : string) {
        active.value = page;
    }
    
</script>

<template>
    <div class="nav">

        <RouterLink 
            :class="active === 'inventory'? 'linkActive' : 'link'" 
            @click="setActivePage('inventory')"
            :to="'/inventory'"
        >
            Inventory
        </RouterLink>

        <RouterLink
            :class="active === 'list'? 'linkActive' : 'link'" 
            @click="setActivePage('list')"
            :to="'/list'"
        >
            List
        </RouterLink>

        <RouterLink
            :class="active === 'recipes'? 'linkActive' : 'link'" 
            @click="setActivePage('recipes')"
            :to="'/recipes'"
        >
            Recipes
        </RouterLink>

        <div 
            class="signOutBtn"
            @click="formStore.signOutOpen = true">
            <SignOutIcon/>
        </div>
    </div>

    <ActionVerification 
        v-if="formStore.signOutOpen"
        @affirmative-clicked="async () => await signOut()"
        @negative-clicked="formStore.signOutOpen = false"
    >
        Sign Out?
    </ActionVerification>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .signOutBtn {
        font-size: 20px;
        text-decoration: none;
        font-family: 'Comfortaa', sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 36px;
        padding-left: 5px;
        margin-right: 5px;
        border-left: 1px solid gray;
    }

    .nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        border: 1px solid gray;
        background-color: lightgray;
        margin-bottom: 10px;
        border-radius: 10px 10px 10px 10px;
    }

    .link {
        transition-property: border-radius, color, background-color;
        transition-duration: .5s;
        transition-timing-function: ease;
        text-align: center;
        width: 90%;
        padding: 5px;
        margin: 2px;
        font-size: 20px;
        text-decoration: none;
        font-family: 'Comfortaa', sans-serif;
        color: black;
    }

    .linkActive {
        transition-property: border-radius, color, background-color;
        transition-duration: .5s;
        transition-timing-function: ease;
        text-align: center;
        width: 90%;
        border-right: 1px solid gray;
        background-color: gray;
        color: lightgray;
        border-radius: 10px;
        padding: 5px;
        margin: 2px;
        font-size: 20px;
        text-decoration: none;
        font-family: 'Comfortaa', sans-serif;
        font-weight: 900;
    }
</style>