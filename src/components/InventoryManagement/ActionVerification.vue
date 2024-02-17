<script setup lang="ts">
    import { useFormStore } from '@/stores/FormStore';

    const emits = defineEmits(['affirmativeClicked', 'negativeClicked'])
</script>

<template>
    <div class="background">
        <div class="verification">
            <div class="message">
                <slot></slot>
            </div>
            <div class="buttons">
                <button @click="$emit('affirmativeClicked')" class="affirmative">YES</button>
                <button @click="$emit('negativeClicked')" class="negative">NO</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 10px;
    }

    .affirmative, .negative {
        width: 45%;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        padding: 15px;
        border-radius: 15px;
    }

    .affirmative {
        font-weight: 900;
        background-color: orangered;
    }

    .verification {
        position: absolute;
        top: 30%;
        width: calc(100% - 10px);
        background-color: white;
        margin: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 15px;
    }

    .background {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(20, 20, 20, .9);
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        text-align: center;
        z-index: 100;
    }
</style>