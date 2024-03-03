<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { SignOutIcon, LogoOpenIconVue, HamburgerIcon, CrossIcon } from './Icons'
    import { signOutSession } from './OAuth/OAuth'
    import router from './../router'
    import { onMounted, ref } from 'vue';
    import { useFormStore } from '@/stores/FormStore';
    import ActionVerification from './InventoryManagement/ActionVerification.vue';

    const props = defineProps({
        activePage: {
            type: String
        }
    })

    const open = ref<boolean>(false);

    const formStore = useFormStore();

    const emits = defineEmits(['activeChanged'])

    async function signOut() {
        await signOutSession();
        router.push('/');

        formStore.signOutOpen = false;
    }

    function toggle() {
        open.value = !open.value
    }

    onMounted(() => {
        console.log(props.activePage)
    })
    
</script>

<template>
    <div class="nav">
        <div :class="open? 'contentOpen' : 'contentClosed'">
            <div class="leftContent">
                <div class="logoIcon">
                    <LogoOpenIconVue />
                </div>

                <div class="title">
                    Kitchen Inventory Manager
                </div>
            </div>


            <div class="rightContent">
                <div
                    v-if="!open"
                    class="icon"
                    @click="toggle"
                >
                    <HamburgerIcon />
                </div>
                <div
                    v-else
                    class="icon"
                    @click="toggle"
                >
                    <CrossIcon />
                </div>
            </div>
        </div>

        <div :class="open? 'dropdownOpen' : 'dropdownClosed'">
            <RouterLink 
                :class="activePage === 'inventory'? 'linkActive' : 'link'" 
                :to="'/inventory'"
            >
                Inventory
            </RouterLink>

            <RouterLink
                :class="activePage === 'list'? 'linkActive' : 'link'" 
                :to="'/list'"
            >
                List
            </RouterLink>

            <RouterLink
                :class="activePage === 'recipes'? 'linkActive' : 'link'" 
                :to="'/recipes'"
            >
                Recipes
            </RouterLink>

            <div 
                class="signOutBtn"
                @click="formStore.signOutOpen = true"
            >
                <div>Sign Out</div>
                <SignOutIcon/>
            </div>
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
    
    .title {
        font-family: 'Comfortaa', sans-serif;
        font-size: 18px;
    }

    .leftContent {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .contentOpen {
        transition: border-radius .25s ease;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 2px solid gray;
        border-bottom: none;
        border-radius: 10px 10px 0px 0px;
        background-color: lightgray;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    
    .contentClosed {
        transition: border-radius .25s ease;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px 10px 10px 10px;
        border: 2px solid gray;
        border-radius: 10px 10px 10px 10px;
        background-color: lightgray;
        padding-top: 3px;
        padding-bottom: 3px;
    }

    .dropdownOpen {
        transition: max-height .25s ease;
        background-color: lightgray;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: calc(100% - 4px);
        top: 100%;
        border: 2px solid gray;
        border-top: 1px solid gray;
        border-radius: 0px 0px 15px 15px;
        max-height: 1000px;
    }

    .dropdownClosed {
        transition: max-height .25s ease;
        background-color: lightgray;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        top: 100%;
        overflow: hidden;
        max-height: 0px;
    }

    .logoIcon, .rightContent {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        margin-left: 5px;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .signOutBtn {
        border-top: 1px solid gray;
        font-size: 20px;
        text-decoration: none;
        font-family: 'Comfortaa', sans-serif;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 36px;
        padding: 5px;
        gap: 10px;
    }

    .nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        margin-bottom: 10px;
    }

    .link {
        transition-property: border-radius, color, background-color;
        transition-duration: .5s;
        transition-timing-function: ease;
        width: 100%;
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
        width: calc(100% - 15px);
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