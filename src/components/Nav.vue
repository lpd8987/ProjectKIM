<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { SignOutIcon } from './Icons'
    import { signOutSession } from './OAuth/OAuth'
    import router from './../router'
    import { useFormStore } from '@/stores/FormStore';
    import ActionVerification from './InventoryManagement/ActionVerification.vue';

    const formStore = useFormStore();

    const props = defineProps({
        activePage: {
            type: String
        }
    })

    async function signOut() {
        await signOutSession();
        router.push('/signIn');

        formStore.signOutOpen = false
    } 

</script>

<template>
    <div class="nav">
        <div class="links">
            <RouterLink class="link" v-if="props.activePage !== 'inventory'" :to="'/'">Inventory</RouterLink>
            <RouterLink class="link" v-if="props.activePage !== 'list'" :to="'/'">List</RouterLink>
            <RouterLink class="link" v-if="props.activePage !== 'recipes'" :to="'/'">Recipes</RouterLink>
        </div>

        <div 
            class="signOutBtn"
            @click="formStore.signOutOpen = true">
            Sign Out &nbsp;
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
    }

    .nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border: 1px solid gray;
        background-color: lightgray;
        margin-bottom: 10px;
        border-radius: 10px 10px 0px 0px;

    }

    .links {
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .link {
        text-align: center;
        width: 90%;
        border-right: 1px solid gray;
        padding: 5px;
        margin: 2px;
        font-size: 20px;
        text-decoration: none;
        font-family: 'Comfortaa', sans-serif;
        color: black;
    }
</style>