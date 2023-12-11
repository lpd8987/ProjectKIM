<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { getAuth } from "firebase/auth";

    const username = ref<string | undefined>("")
    
    const auth = getAuth();

    onMounted(() => {
        username.value = auth.currentUser!.displayName!
    })
</script>

<template>
    <h1>HOME PAGE</h1>
    <h2>Hello {{ username }}!</h2>
</template>

<style scoped>
</style>