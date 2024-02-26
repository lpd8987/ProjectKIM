<script setup lang="ts">
    import { LeftArrowIcon, CircleIcon, ChevronDown } from '../Icons';
    import DropdownMenu from '../DropdownMenu.vue';
    import TagPicker from '../TagPicker.vue'
    import { ref, onUnmounted, onMounted } from 'vue'
    import type { PropType } from 'vue';
    import { useFormStore } from '@/stores/FormStore';
    import type { Item, FirebaseTimestamp, ListItem } from './../InventoryManagement/Types';

    const props = defineProps({
        data: {
            type: Object as PropType<Item>
        }
    })

    const returnObj : Item = {
        name: props.data!.name,
        itemId: props.data!.itemId,
        quantity: 'Well-Stocked',
        type: props.data!.type,
        groceryType: props.data!.groceryType
    }

    const emits = defineEmits(['changed'])

    const open = ref<boolean>(false);

    const measurement = ref<string>();
    const exactNum = ref<number>();
    const location = ref<string>();

    const stockOptions = [
        {icon: CircleIcon, fill: 'greenyellow', item: 'Well-Stocked'},
        {icon: CircleIcon, fill: 'gold', item: 'Moderately-Stocked'},
        {icon: CircleIcon, fill: 'orangered', item: 'Low'},
        {icon: CircleIcon, fill: 'gray', item: 'Out'}]

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
        
    function toggleOpen() {
        open.value = !open.value
    }

    onMounted(() => {
        emits('changed', returnObj);
    })
</script>

<template>
    <div class="item">
        <div
            :class="['flex-between', open? 'titleOpen' : 'titleClosed']"
            @click="toggleOpen"
        >
            <div>
                {{ props.data?.name }}
            </div>
            <ChevronDown />
        </div>
        <div 
            :class="[open? 'contentOpen' : 'contentClosed']"
        >
            <DropdownMenu
                :options="stockOptions"
                @selection-change="returnObj.quantity = $event; $emit('changed', returnObj)"
            />

            <div class="datePickerDiv">
                <div>Expires</div>
                <input 
                    class="datePicker"
                    type="date"
                    @change="setExpDate($event); $emit('changed', returnObj)"
                >
            </div>

            <div class="quantityOpen">
                <div class="preview">"{{ exactNum? exactNum : "a few" }} {{ measurement? measurement : "things" }} left"</div>
                <input class="exactNum"
                    v-model="exactNum"
                    type="number"
                    placeholder="number"
                    @change="returnObj.exactQuantity = exactNum; $emit('changed', returnObj)" 
                >
                <input 
                    class="measurement"
                    v-model="measurement" 
                    type="text" 
                    placeholder="measurement"
                    @change="returnObj.measurement = measurement; $emit('changed', returnObj)"
                >
            </div>

            <input
                v-model="location"
                class="textbox"
                type="text"
                placeholder="Location"
                @change="returnObj.storageLocation = location; $emit('changed', returnObj)"
            >
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

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

    .flex-between {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        font-size: 22px;
    }

    .titleOpen {
        transition: border-radius .25s ease;
        border: 3px solid gray;
        border-radius: 15px 15px 0px 0px;
    }

    .titleClosed {
        transition: border-radius .25s ease;
        border: 3px solid gray;
        border-radius: 15px;
    }

    .contentOpen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: max-height .25s ease;
        border-left: 3px solid gray;
        border-right: 3px solid gray;
        border-bottom: 3px solid gray;
        border-radius: 0px 0px 15px 15px;
        max-height: 1000px;
        padding: 5px;
    }

    .contentClosed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: max-height .25s ease;
        max-height: 0px;
        overflow: hidden;
    }

    .item {
        width: calc(100% - 20px);
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>