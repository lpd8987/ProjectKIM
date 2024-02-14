<script setup lang="ts">
    import { LeftArrowIcon } from '../Icons';
</script>

<template>
    <div class="background">
        <div class="main">
            <h2>ADD NEW ITEM</h2>

<!--             <label for="item">Item: </label>
            <input name="item" type="text">

            <label for="quantity">Quantity?: </label>
            <input name="quantity" type="text">

            <input type="number"> -->

            <button>SUBMIT</button>
        </div>

        <LeftArrowIcon class="arrow"/>
    </div>

</template>

<style scoped>
    .arrow {
        position: absolute;
        top: 3%;
        left: 5%;
    }

    :deep(path) {
        fill: white;
    }

    .main {
        position: absolute;
        background-color: white;
        margin-left: 10px;
        margin-right: 10px;
        top: 15%;
        width: calc(100% - 20px);
    }
    .background {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(20, 20, 20, .9);
    }
</style>