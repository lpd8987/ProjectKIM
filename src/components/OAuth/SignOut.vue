<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { googleSignIn, signOutSession } from './OAuth'
    import router from '../../router'

    const signOutBtn = ref<HTMLButtonElement | undefined>(undefined);

    onMounted(() => {
        if (signOutBtn.value !== undefined){
            signOutBtn.value.onclick = async () => { await signOutSession(); router.push('/signIn'); }
        }
    })
</script>

<template>
    <button ref="signOutBtn">SIGN OUT</button>
</template>

<style scoped>
</style>