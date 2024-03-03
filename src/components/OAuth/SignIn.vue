<script setup lang="ts">
    import { LogoOpenIconVue, GoogleIconVue } from "../Icons";
    import GoogleSignInBtn from "./GoogleSignInBtn.vue";
</script>

<template>
    <div class="icon">
        <h1>Kitchen Inventory Manager</h1>
        <LogoOpenIconVue />
    </div>

    <div class="btns">
        <GoogleSignInBtn />
    </div>

    <div class="version">
        alpha v1.1
    </div>

</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .btns {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 60vh;
        width: 100%;
    }

    button {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        font-weight: 900;
        padding: 10px;
        width: 200px;
        border: 3px solid gray;
        border-radius: 15px;
    }

    h1 {
        font-family: 'Comfortaa', sans-serif;
        font-weight: bold;
        text-align: center;
    }

    .version {
        position: absolute;
        bottom: 1%;
        right: 3%;
        font-family: 'Comfortaa', sans-serif;
        font-size: small;
        color: lightgray;
    }
</style>