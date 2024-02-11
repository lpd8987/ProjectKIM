<script setup lang="ts">
    import { ref } from 'vue';

</script>

<template>
    <div class="meter">
        <div class="background"/>
        <div class="foreground"/>
        <div class="overlay"/>
    </div>
</template>

<style scoped>
    .meter {
        position: relative;
        width: 28px;
        height: 28px;
    }

    .background, .foreground, .overlay {
        position: absolute;
    }

    .overlay {
        height: 28px;
        width: 28px;
        background: radial-gradient(transparent 13px, white 5px);
    }

    .background {
        height: 28px;
        width: 28px;
        background-color: #212121;
    }

    .foreground {
        transition-property: width background-color;
        transition-duration: .5s;
        transition-timing-function: ease;
        height: 28px;
        width: 28px;
        background-color: greenyellow;
    }
</style>