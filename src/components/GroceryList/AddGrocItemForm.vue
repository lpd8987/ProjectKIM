<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon } from '../Icons';
    import DropdownMenu from '../DropdownMenu.vue';
    import TagPicker from '../TagPicker.vue'
    import { ref } from 'vue'
    import { useFormStore } from '@/stores/FormStore';
    import type { ListItem, FirebaseTimestamp } from './../InventoryManagement/Types';
    import { addListItem } from './../../FirebaseInteraction'

    const emits = defineEmits(['addItem'])

    const formStore = useFormStore();

    const name = ref<string>();
    const notes = ref<string>();

    const returnObj : ListItem = {
        name: '',
        itemId: '',
        type: [],
        groceryType: []
    }

    const typeTags = [
        'Ingredient',
        'Condiment',
        'Meal',
        'Snack',
        'Utility'
    ]

    const grocTags = [
        'Baby Supplies',
        'Baking',
        'Bakery',
        'Beverages',
        'Breakfast',
        'Condiments',
        'Dairy',
        'Deli',
        'Frozen',
        'Grains and Pastas',
        'Health',
        'Cleaning',
        'Meat',
        'Produce',
        'Seafood',
        'Snack Food',
        'Instant Meal',
        'Alcohol',
        'Other'
    ]

    function validateReturnObj() : boolean {
        if(
            returnObj.name.trim() === '' ||
            returnObj.itemId === '' ||
            returnObj.type.length < 1 ||
            returnObj.groceryType.length < 1
        ) {
            return false;
        }
        else {
            return true
        }
    }

    async function addItemToDB() {
        if (!validateReturnObj()) {
            console.log("Invalid Return Obj");
            return
        }
        emits('addItem');

        await addListItem(localStorage.getItem('uuid')!, returnObj.name, returnObj);

        formStore.newItemFormOpen = false;
    }

    function logObj () {
        console.log("LogObj", returnObj)
    }

    function logEv (ev: Event) {
        console.log("LogEv", ev);
    }

    function logActivate(message: string) {
        console.log(message)
    }

</script>

<template>
    <div class="background">
        <div class="main">
            <div class="formTitle">
                ADD NEW ITEM
            </div>

            <div class="itemCol">

                <div class="reqPropsHeader">
                    Required Items:
                </div>

                <div class="textboxDiv">
                    <input
                        class="reqTextbox"
                        name="item"
                        type="text"
                        placeholder="Item Name"
                        v-model="name"
                        @change="
                            returnObj.name = name!; 
                            returnObj.itemId = `i_${name!.toLowerCase()}`;"
                    >
                </div>

                <TagPicker
                    :tags="typeTags"
                    @tags-changed="
                        returnObj.type = JSON.parse(JSON.stringify($event));
                        logEv($event);
                        logObj();
                        logActivate('TYPE TAG CHANGE')"
                >
                    Type
                </TagPicker>

                <TagPicker
                    :tags="grocTags"
                    @tags-changed="
                        returnObj.groceryType = JSON.parse(JSON.stringify($event));
                        logEv($event);
                        logObj();
                        logActivate('GROC TYPE TAG CHANGE');"
                >
                    Grocery Type
                </TagPicker>

                <div class="optionalPropsHeader">
                    Optional Items:
                </div>
                <div class="optionalProps">
                    <div class="notes">
                        <textarea
                            placeholder="Notes:" 
                            v-model="notes"
                            @change="returnObj.notes = notes"
                        >
                        </textarea>
                    </div>
                </div>
            </div>

            <div class="btnDiv">
                <button class="submitBtn" @click="async () => await addItemToDB() ">SUBMIT</button>
            </div>
        </div>

        <LeftArrowIcon class="arrow" @click="formStore.newItemFormOpen = false"/>
    </div>

</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');
    
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

    .reqPropsHeader, .optionalPropsHeader {
        margin-top: 5px;
    }

    .optionalProps {
        width: 100%;
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

    .reqTextbox {
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

    .notes {
        width: 80%;
    }

    textarea {
        width: 100%;
        height: 72px;
        font-family: 'Comfortaa', sans-serif;
        font-size: 24px;
        border: 2px solid gray;
        border-radius: 15px;
    }

    .itemCol {
        width: 100%;
        height: 100%;
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
        font-family: 'Comfortaa', sans-serif;
        position: absolute;
        background-color: white;
        margin-left: 10px;
        margin-right: 10px;
        top: 10%;
        width: calc(100% - 20px);
        height: 56%;
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