<script setup lang="ts">
    import type { Item, Quantity } from './Types'
    import type { PropType} from 'vue';
    import { onMounted, ref } from 'vue';
    import { LocationCheckIcon, TagIcon, CartIcon, CalendarCheckIcon, NotesIcon, EditIcon, TrashIcon, CircleIcon, CalendarExclamationIcon} from '../Icons'
    import ClockIcon from '../Icons/ClockIcon.vue';
    

    const props = defineProps({
        data: {
            type: Object as PropType<Item>,
        }
    })

    const open = ref<boolean>(false);
    const hidden = ref<HTMLElement | null>();
    const mainDisplay = ref<HTMLElement | null>();

    const expiringStatus = ref<string>('Expiring Soon');

    const expDate = ref<Date>();


    function toggle() : void {
        open.value = !open.value;

        if(!hidden.value) return;
        if(!mainDisplay.value) return;

        if(open.value)
        {
            hidden.value.style.maxHeight = `1000px`;
            hidden.value.className = 'hiddenOpen';
            mainDisplay.value.className = 'mainDisplayOpen';
        }
        else
        {
            hidden.value.style.maxHeight = `1px`
            hidden.value.className = 'hiddenClosed'
            mainDisplay.value.className = 'mainDisplayClosed';
        }
    }

    function setExpiringStatus() {
        if(!props.data?.expirationDate) return;
        const now = new Date();

        expDate.value = new Date(props.data.expirationDate.seconds * 1000);
        //const expData = new Date(props.data.expirationDate.seconds)


        const timeDiffMs = expDate.value.valueOf() - now.valueOf();
        const timeDiffDays = timeDiffMs / 86400000;

        if(timeDiffDays > 7) expiringStatus.value='Not Expired'
        else if(timeDiffDays <= 0) expiringStatus.value='Expired'
        else expiringStatus.value = 'Expiring Soon'
    }

    onMounted(() => {
        console.log(props.data)
        setExpiringStatus();
    })

    //TODO:
    /*
    -Pull data in from Firestore
    -Create new items
    -Delete items + popup for verification (i.e. "are you sure?")
    -Edit existing items (add/remove/alter properties)
    -Live updates from store (watcher?)
    -List filters
        -quantity
        -location
        -item type (how to do with multiple?)
        -grocery type (how to do with multiple?)
        -expiration date
    -Other CSS touch ups

    (after grocery list is added)
    -add empty item to grocery list
    -add 'on grocery list' status?

    -export?
    */
</script>

<template>
    <div class="item">
        <div @click="toggle" ref="mainDisplay" class="mainDisplayClosed">
            <div class="text">{{ props.data?.name }}</div>
            <Transition name="slide-reverse">
                <div v-if="!open" class="indicators">
                    <CalendarCheckIcon class="notExpired" v-if="expiringStatus === 'Not Expired' && data?.expirationDate" />
                    <ClockIcon class="expiringSoon" v-else-if="expiringStatus === 'Expiring Soon' && data?.expirationDate" />
                    <CalendarExclamationIcon class="expired" v-else-if="expiringStatus === 'Expired' && data?.expirationDate" />
                    <CircleIcon :class="`${data?.quantity}`"/>
                </div> 
            </Transition>
        </div>
        <div ref="hidden" class="hidden">
            <Transition name="slide">
                <div v-if="open">
                    <!--Quantity-->
                    <div class="flexRow bottomLine">
                        <CircleIcon :class="`${data?.quantity}`"/>
                        {{ data?.quantity }} 
                        {{ data?.exactQuantity || data?.measurement? ': ' : ''}}
                        {{ data?.exactQuantity? data.exactQuantity : '' }}
                        {{ data?.measurement && !data.exactQuantity ? 'a few' : '' }}
                        {{ data?.measurement? data.measurement : '' }}
                        {{ data?.exactQuantity || data?.measurement? ' left' : ''}}
                    </div>

                    <div class="addDiv" v-if="data?.quantity === 'Out'">
                        <div class="outMsg">Looks like this item is out. Add to grocery list?</div>
                        <button class="btn addBtn">Add +</button>
                    </div>

                    <!--Location?-->
                    <div class="flexRow bottomLine" v-if="data?.storageLocation">
                        <LocationCheckIcon/> {{ data?.storageLocation }}
                    </div>

                    <!--Type-->
                    <div class="flexRow bottomLine">
                        <TagIcon/> Type:
                        <span v-for="(item, index) of data?.type">
                            <span v-if="index !== data!.type.length - 1 && data!.type.length > 1">{{ item }},</span>
                            <span v-else>{{ item }}</span>
                        </span> 
                    </div>

                    <!--Groc Type-->
                    <div class="flexRow bottomLine">
                        <CartIcon/> Grocery:
                        <span v-for="(item, index) of data?.groceryType">
                            <span v-if="index !== data!.groceryType.length - 1 && data!.groceryType.length > 1">{{ item }},</span>
                            <span v-else>{{ item }}</span>
                        </span> 
                    </div>

                    <!--Expiring?-->
                    <div class="flexRow bottomLine" v-if="data?.expirationDate">
                        <CalendarCheckIcon class="notExpired" v-if="expiringStatus === 'Not Expired'" />
                        <ClockIcon class="expiringSoon" v-else-if="expiringStatus === 'Expiring Soon'" />
                        <CalendarExclamationIcon class="expired" v-else-if="expiringStatus === 'Expired'" />
                        {{ expiringStatus==='Not Expired'? `Expires` : expiringStatus }}: {{ expDate!.toLocaleDateString() }}
                    </div>

                    <!--notes?-->
                    <div class="bottomLine" v-if="data?.notes">
                        <div class="flexRow notesSection"><NotesIcon/> Notes:</div>
                        <div class="notes">
                            {{ data?.notes }}
                        </div>
                    </div>

                    <!--Edit Buttons-->
                    <div class="buttonDiv">
                        <button class="btn editBtn"><EditIcon/> Edit </button>
                        <button class="btn deleteBtn"><TrashIcon/> Delete</button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .item {
        margin-top: 5px;
    }

    .outMsg {
        margin-bottom: 5px;
    }

    .addDiv {
        display: flex;
        flex-direction: column;
        width: calc(100% - 14px);
        margin: 6px;
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
    }

    .addBtn {
        border: 2px solid gray;
    }

    .Well-Stocked {
        fill: greenyellow;
    }

    .Moderately-Stocked {
        fill: gold
    }

    .Low {
        fill: orangered
    }

    .Out {
        fill: gray;
    }


    .expired {
        fill: orangered
    }

    .expiringSoon {
        fill: gold
    }

    .notExpired {
        fill: greenyellow
    }

    div, button {
        font-family: "Comfortaa", sans-serif;
    }

    .editBtn {
        border-radius: 0px 0px 0px 15px;
        margin-left: 7px;
        margin-right: 4px;
        margin-bottom: 7px;
        margin-top: 3px;
    }

    .deleteBtn {
        border-radius: 0px 0px 15px 0px;
        margin-right: 7px;
        margin-left: 4px;
        margin-bottom: 7px;
        margin-top: 3px;
    }

    .bottomLine {
        margin-top: 5px;
        border-bottom: 1px solid gray;
        margin-bottom: 5px;
    }

    .notes {
        border: 1px solid gray;
        margin-top: 5px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        padding: 10px;
        border-radius: 15px;
    }

    .flexRow {
        font-size: 20px;
        padding-left: 5px;
        display: flex;
        column-gap: 5px;
        align-items: center;
        margin-top: 2px;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
    }

    .buttonDiv{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition-property: opacity transform;
        transition-duration: .25s;
        transition-timing-function: ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateY(-7px);
        opacity: 0%;
    }

    .slide-reverse-enter-active,
    .slide-reverse-leave-active {
        transition-property: opacity transform;
        transition-duration: .25s;
        transition-timing-function: ease;
    }

    .slide-reverse-enter-from,
    .slide-reverse-leave-to {
        transform: translateY(7px);
        opacity: 0%;
    }

    .hiddenClosed {
        max-height: 1000px;
        transition-property: max-height;
        transition-duration: .5s;
        transition-timing-function: ease;
    }

    .hiddenOpen{
        transition-property: max-height;
        transition-duration: .5s;
        transition-timing-function: ease;
        border: 3px solid gray ;
        padding-bottom: 2px;
        border-radius: 0px 0px 20px 20px;
    }

    .mainDisplayOpen {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 3px solid gray;
        border-left: 3px solid gray;
        border-right: 3px solid gray;
        border-radius: 20px 20px 0px 0px;

        padding: 10px;
    }

    .mainDisplayClosed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 3px solid gray;
        border-radius: 20px;
        padding: 10px;
    }


    .indicators {
        display: flex;
    }

    .iconPlaceholder {
        width: 28px;
        height: 28px;
        background-color: aqua;
        margin-right: 5px;
    }

    .text {
        height: 28px;
        font-size: 28px;
    }
</style>