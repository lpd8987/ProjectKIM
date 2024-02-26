<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon } from '../Icons';
    import { ref, onUnmounted } from 'vue'
    import { useFormStore } from '@/stores/FormStore';
    import type { Item, FirebaseTimestamp, ListItem } from './../InventoryManagement/Types';
    import { addInventoryItem, deleteListItem } from './../../FirebaseInteraction'
    import { useTagStore } from '@/stores/TagStore';
    import InventoryMinItem from './InventoryMinItem.vue';
    import LoadingScreen from '../LoadingScreen.vue';

    const props = defineProps({
        data: {
            type: Array<Item>
        }
    })

    const loading = ref<boolean>(false);

    const data = ref<Array<Item>>(props.data!);

    const emits = defineEmits(['update'])

    const formStore = useFormStore();
    const tagStore = useTagStore();

    async function updateDB () {
        loading.value = true;
        for ( const i of data.value )
        {
            const uuid = localStorage.getItem('uuid');
            if(!uuid) return;

            await addInventoryItem (uuid, i.name, i)
        }

        for (const i of data.value) 
        {
            await deleteListItem(i.name)
        }
        loading.value = false;

        emits('update');

        formStore.addManyFormOpen = false;
    }
    
    onUnmounted(() => {
        tagStore.clearAllTags()
    })

    function logAny(item: any){
        console.log(item)
    }
</script>

<template>
    <div class="background">
        <div class="main">
            <div class="formTitle">
                ADD INVENTORY
            </div>

            <div class="itemCol">
                <div v-for="(item, index) of data">
                    <InventoryMinItem 
                        :data="item"
                        @changed="data[index] = JSON.parse(JSON.stringify($event)); logAny(data![index])"
                    />
                </div>
            </div>

            <div class="btnDiv">
                <button class="submitBtn" @click="updateDB">SUBMIT</button>
            </div>
        </div>

        <LeftArrowIcon class="arrow" @click="formStore.addManyFormOpen = false"/>
    </div>

    <LoadingScreen v-if="loading"/>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');
    
    .itemOpen {
        border-radius: 15px;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 3px solid gray;
    }

    .submitBtn {
        width: 50%;
        height: 35px;
        border-radius: 15px;
    }

    .btnDiv {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: sticky;
        bottom: 0%;
        width: 100%;
        padding: 5px;
        background-color: lightgray;
        border-top: 1px solid gray;
    }

    .optionalPropsHeader {
        margin-top: 5px;
    }

    .optionalProps {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .formTitle {
        background-color: lightgray;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 32px;
        text-align: center;
        border-bottom: 1px solid gray;
        font-weight: 900;
        z-index: 150;
    }

    .datePickerDiv {
        background-color: lightgray;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        border: 1px solid gray;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .datePicker {
        height: 32px;
        width: 95%;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        border-radius: 15px;
        border: 2px solid gray;
    }

    .textboxDiv {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%
    }

    .textbox {
        height: 32px;
        width: 80%;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 15px;
        border: 2px solid gray;
    }

    .preview {
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
    }

    .quantityOpen{
        background-color: lightgray;
        margin-top: 5px;
        width: 80%;
        border: 1px solid gray;
        border-radius: 15px;
    }

    .measurement {
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        border: 2px solid gray;
        border-radius: 15px;
        width: calc(100% - 13px);
        height: 32px;
        margin-left: 3px;
        margin-right: 3px;
        margin-bottom: 7px;
    }

    .exactNum {
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        border: 2px solid gray;
        border-radius: 15px;
        width: calc(100% - 13px);
        height: 32px;
        margin: 3px;
    }

    .notes {
        width: 80%;
    }

    .itemCol {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
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
        font-family: 'Comfortaa', sans-serif;
        position: absolute;
        background-color: white;
        margin-left: 10px;
        margin-right: 10px;
        top: 10%;
        width: calc(100% - 20px);
        height: 75%;
        border-radius: 15px;
        overflow-y: scroll;
        overflow-x: hidden;
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