<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <Transition name="fade">
        <RouterView></RouterView>
    </Transition>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(300px);
    }
</style>
