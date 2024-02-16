<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon } from '../Icons';
    import DropdownMenu from '../DropdownMenu.vue';

    const stockOptions = [
        {icon: CircleIcon, fill: 'greenyellow', item: 'Well-Stocked'},
        {icon: CircleIcon, fill: 'gold', item: 'Moderately-Stocked'},
        {icon: CircleIcon, fill: 'orangered', item: 'Low'},
        {icon: CircleIcon, fill: 'gray', item: 'Out'}]
</script>

<template>
    <div class="background">
        <div class="main">
            <h2>ADD NEW ITEM</h2>

            <div class="itemCol">
                <div>
                    <label for="item">Item: </label>
                    <input name="item" type="text">
                </div>

                <DropdownMenu :options="stockOptions" /> 

                <div class="quantity">
                    <input type="number" placeholder="Exact Number">
                    <input type="text" placeholder="Measurement">
                </div>
                <div>
                    <input type="text" placeholder="Location">
                </div>
                <div>type - array (tag)</div>
                <div>groceryType - array (tag)</div>
                <div>expirationDate - Date (-> timestamp)</div>

                <div class="notes">
                    <textarea placeholder="Notes:"></textarea>
                </div>
            </div>



            <button>SUBMIT</button>
        </div>

        <LeftArrowIcon class="arrow"/>
    </div>

</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .notes {
        width: 80%;
    }

    textarea {
        width: 100%;
        height: 72px;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        border: 1px solid gray;
        border-radius: 15px;
    }

    .itemCol {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

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