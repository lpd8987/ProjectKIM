<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { googleSignIn } from './OAuth'

    const signInBtn = ref<HTMLButtonElement | undefined>(undefined);

    onMounted(() => {
        if (signInBtn.value !== undefined){
            signInBtn.value.onclick = async () => { await googleSignIn(); }
        }
    })
</script>

<template>
    <button ref="signInBtn">SIGN IN WITH GOOGLE</button>
</template>

<style scoped>
</style>