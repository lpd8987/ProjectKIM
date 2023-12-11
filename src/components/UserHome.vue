<script setup lang="ts">
    import { useUserDataStore } from "@/stores/UserDataStore";
    import { onMounted, ref } from "vue";

    const userDataStore = useUserDataStore();
    const username = ref<string | undefined>("")

    onMounted(() => {
        username.value = userDataStore.getUsername();
    })
</script>

<template>
    <h1>HOME PAGE</h1>
    <h2>Hello {{ username }}!</h2>
</template>

<style scoped>
</style>