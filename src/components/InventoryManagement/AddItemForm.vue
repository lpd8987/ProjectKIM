<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon } from '../Icons';
    import DropdownMenu from '../DropdownMenu.vue';
    import TagPicker from '../TagPicker.vue'
    import { ref, onUnmounted } from 'vue'
    import { useFormStore } from '@/stores/FormStore';
    import type { Item, FirebaseTimestamp } from './Types';
    import { addInventoryItem } from './../../FirebaseInteraction'
    import { useTagStore } from '@/stores/TagStore';

    const emits = defineEmits(['addItem'])

    const formStore = useFormStore();
    const tagStore = useTagStore();

    const name = ref<string>();
    const measurement = ref<string>();
    const exactNum = ref<number>();
    const location = ref<string>();
    const notes = ref<string>();

    const returnObj : Item = {
        name: '',
        itemId: '',
        quantity: 'Well-Stocked',
        type: [],
        groceryType: []
    }


    const stockOptions = [
        {icon: CircleIcon, fill: 'greenyellow', item: 'Well-Stocked'},
        {icon: CircleIcon, fill: 'gold', item: 'Semi-Stocked'},
        {icon: CircleIcon, fill: 'orangered', item: 'Low'},
        {icon: CircleIcon, fill: 'gray', item: 'Out'}]

    const typeTags = [
        'Ingredient',
        'Condiment',
        'Meal',
        'Snack',
        'Tool',
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
        'Spices',
        'Other'
    ]

    function checkEmitVal (ev : Event) {
        console.log(ev)
    }

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


    function logObj () {
        console.log(returnObj)
    }

    function logEvent (ev: Event) {
        console.log(ev)
    }


    function setExpDate(ev: any) {
        const evDate = new Date(ev.target.value)

        console.log(evDate.getTime());
        const dateSeconds = evDate.getTime() / 1000;
        const dateNanoseconds = evDate.getTime() * 1000000;

        console.log(dateSeconds, dateNanoseconds)

        const timestampObj : FirebaseTimestamp = {
            seconds: dateSeconds,
            nanoseconds: dateNanoseconds
        }

        returnObj.expirationDate = timestampObj;
    }

    async function addItemToDB() {
        console.log("CALLED")
        if (!validateReturnObj()) {
            console.log("Invalid Return Obj");
            return
        }
        emits('addItem', 'ADDED ITEM');

        await addInventoryItem(localStorage.getItem('uuid')!, returnObj.name, returnObj);

        formStore.newItemFormOpen = false;
    }
    
    onUnmounted(() => {
        tagStore.clearAllTags()
    })
</script>

<template>
    <div class="background">
        <div class="main">
            <div class="formTitle">
                ADD NEW ITEM
            </div>

            <div class="itemCol">

                <div class="reqPropsHeader">Required Items:</div>

                <div class="textboxDiv">
                    <input
                        class="reqTextbox"
                        name="item"
                        type="text"
                        placeholder="Item Name"
                        v-model="name"
                        @change="returnObj.name = name!; 
                                returnObj.itemId = `i_${name!.toLowerCase()}`;
                                logObj()"
                    >
                </div>

                <DropdownMenu :options="stockOptions" @selection-change="returnObj.quantity = $event; logObj()" />

                <TagPicker
                    :picker-id="'typeTags'"
                    :tags="typeTags"
                    @tags-changed="returnObj.type = JSON.parse(JSON.stringify($event))"
                >
                    Type
                </TagPicker>

                <TagPicker
                    :picker-id="'grocTypeTags'"
                    :tags="grocTags"
                    @tags-changed="returnObj.groceryType = JSON.parse(JSON.stringify($event))"
                >
                    Grocery Type
                </TagPicker>

                <div class="optionalPropsHeader">
                    Optional Items:
                </div>
                <div class="optionalProps">

                    <div class="datePickerDiv">
                        <div>Expires</div>
                        <input class="datePicker" type="date" @change="setExpDate($event); logObj()">
                    </div>
                    
                    <div class="quantityOpen">
                        <div class="preview">"{{ exactNum? exactNum : "a few" }} {{ measurement? measurement : "things" }} left"</div>
                        <input class="exactNum"
                            v-model="exactNum"
                            type="number"
                            placeholder="number" 
                            @change="returnObj.exactQuantity = exactNum; logObj()">
                        <input 
                            class="measurement"
                            v-model="measurement" 
                            type="text" 
                            placeholder="measurement"
                            @change="returnObj.measurement = measurement; logObj()">
                    </div>

                    <div class="textboxDiv">
                        <input
                            v-model="location"
                            class="textbox"
                            type="text"
                            placeholder="Location"
                            @change="returnObj.storageLocation = location; logObj()">
                    </div>

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
        height: 85%;
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
</style>../../FirebaseInteraction