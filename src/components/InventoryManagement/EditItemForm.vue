<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon } from '../Icons';
    import DropdownMenu from '../DropdownMenu.vue';
    import TagPicker from '../TagPicker.vue'
    import { onMounted, ref } from 'vue'
    import { useFormStore } from '@/stores/FormStore';
    import type { Item, FirebaseTimestamp, Quantity } from './Types';
    import type { PropType } from 'vue';
    import { addInventoryItem, deleteInventoryItem } from './../../FirebaseInteraction'

    const emits = defineEmits(['close', 'save'])

    const props = defineProps({
        data: {
            type: Object as PropType<Item>,
        }
    })

    const startName = props.data?.name;

    const returnObj : Item = props.data!;

    const name = ref<string>(returnObj.name);
    const measurement = ref<string>(returnObj.measurement? returnObj.measurement : '');
    const exactNum = ref<number>(returnObj.exactQuantity? returnObj.exactQuantity : 0);
    const location = ref<string>(returnObj.storageLocation? returnObj.storageLocation : '');
    const notes = ref<string>(returnObj.notes? returnObj.notes : '');

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

    function validateReturnObj() : boolean {
        
        if (Number.isNaN(returnObj.expirationDate?.seconds)){
            delete returnObj.expirationDate
        }

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
        //make sure the object can be added to the db without error
        if (!validateReturnObj()) {
            console.log("Invalid Return Obj");
            return
        }

        //if the original name is changed, delete the original entry
        //(else creates new entry)
        if (returnObj.name !== startName){
            deleteInventoryItem(startName!);
        }

        emits('save', "");

        await addInventoryItem(localStorage.getItem('uuid')!, returnObj.name, returnObj);
    }

    function formatDate(date: Date) {

        //console.log(date.toLocaleDateString())

        const month = date.getMonth() + 1;
        const day = date.getDate()

        let retVal = `${date.getFullYear()}-${month >= 10? month : `0${month}`}-${day >= 10? day : `0${day}`}`
        console.log(retVal)

        return retVal;
    }

    function returnOptionIndex(quantity: Quantity) : number {
        switch(quantity) {
            case 'Well-Stocked':
                return 0;
            case 'Semi-Stocked':
                return 1;
            case 'Low':
                return 2;
            case 'Out':
                return 3;
            default:
                return 0;
        }
    }

    onMounted(() => {

    })

</script>

<template>
    <div class="background">
        <div class="main">
            <div class="formTitle">
                EDIT ITEM
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

                <DropdownMenu
                    :options="stockOptions"
                    :selected-index="returnOptionIndex(returnObj.quantity)"
                    @selection-change="returnObj.quantity = $event; logObj()"
                />

                <TagPicker
                    :tags="typeTags" 
                    @tags-changed="returnObj.type = JSON.parse(JSON.stringify($event)); logObj()"
                    :picker-id="'editTypePicker'"
                    :selected="returnObj.type"
                >
                    Type
                </TagPicker>

                <TagPicker
                    :tags="grocTags"
                    @tags-changed="returnObj.groceryType = JSON.parse(JSON.stringify($event)); logObj()"
                    :picker-id="'editGrocTypePicker'"
                    :selected="returnObj.groceryType"
                >
                    Grocery Type
                </TagPicker>

                <div class="optionalPropsHeader">
                    Optional Items:
                </div>
                <div class="optionalProps">

                    <div class="datePickerDiv">
                        <div>Expires</div>
                        <input 
                            class="datePicker"
                            type="date" 
                            :value="data?.expirationDate? formatDate(new Date(data.expirationDate.seconds * 1000)) : null"
                            @change="setExpDate($event); logObj()">
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
                <button class="submitBtn" @click="async () => { await addItemToDB(); $emit('save') } ">UPDATE</button>
            </div>
        </div>

        <LeftArrowIcon class="arrow" @click="$emit('close')"/>
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
        z-index: 150;
        background-color: rgba(20, 20, 20, .9);
    }
</style>../../FirebaseInteraction