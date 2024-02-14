<script setup lang="ts">
    import { CircleNotchIcon } from './Icons';
</script>

<template>
    <div class="loading" >
        <CircleNotchIcon />
    </div>
</template>

<style scoped>
    .loading {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(20, 20, 20, .9);
    }

    :deep(path) {
        stroke: rgb(234, 234, 235);
    }

    :deep(svg) {
        position: absolute;
        left: calc(50% - 75px);
        top: calc(50% - 75px);
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        0% { transform: rotate(0deg)}
        100% { transform: rotate(360deg)}
    }
</style>