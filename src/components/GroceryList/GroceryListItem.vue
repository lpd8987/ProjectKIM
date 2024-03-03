<script setup lang="ts">
    import { ref } from 'vue'
    import type { ListItem } from './../InventoryManagement/Types'
    import type { PropType } from 'vue'
    import ActionVerification from './../InventoryManagement/ActionVerification.vue';
    import { ChevronDown, CheckIcon, TrashIcon, EditIcon, UndoIcon, CartIcon, TagIcon, NotesIcon } from '../Icons';
    import { placeholderListItemData} from './../InventoryManagement/Utility'
    import { useFormStore } from '@/stores/FormStore';
    import { deleteListItem } from '@/FirebaseInteraction'

    const props = defineProps({
        data: {
            type: Object as PropType<ListItem>,
            default: placeholderListItemData
        }
    })

    const emits = defineEmits(['check', 'uncheck', 'deleteItem'])

    const formStore = useFormStore()

    const open = ref<boolean>(false);
    const checked = ref<boolean>(false);

    function toggleOpen() {
        open.value = !open.value
    }

    async function deleteItem () {
        await deleteListItem(props.data!.name)
        emits('deleteItem', "DELETING ITEM")
    }

    function toggleChecked() {
        checked.value = !checked.value

        if(checked.value) {
            emits('check');
        }
        else {
            emits('uncheck');
        }
    }

</script>

<template>
    <div class="grocItem">
        <div :class="[open? 'itemHeaderOpen' : 'itemHeaderClosed', checked? 'headerChecked' : 'header']">
            <div :class="'left'"  @click="toggleOpen">
                <ChevronDown />
                <div class="title">
                    <Transition :name="checked? 'undo' : 'check'" mode="out-in">
                        <div v-if="checked"><del>{{ props.data.name }}</del></div>
                        <div v-else>{{ props.data.name }}</div>
                    </Transition>
                </div>
            </div>

            <Transition name="slide">
                <div :class="[checked? 'rightChecked' : 'right']" v-if="!open" @click="toggleChecked">
                    <Transition :name="checked? 'undo' : 'check'" mode="out-in">
                        <CheckIcon v-if="!checked" />
                        <UndoIcon v-else/>
                    </Transition>
                </div>
            </Transition>
        </div>

        <div :class="open? 'itemContentOpen' : 'itemContent'">
            <div class="propRow">
                <CartIcon />
                <div class="rowContent">Grocery:
                    <span v-for="(t, i) of props.data.groceryType">
                        <span v-if="i !== props.data.groceryType.length - 1">{{ t }}, </span>
                        <span v-else>{{ t }}</span>
                    </span>
                </div>
            </div>
            <div class="propRow">
                <TagIcon />
                <div class="rowContent">Type: 
                    <span v-for="(t, i) of props.data.type">
                        <span v-if="i !== props.data.type.length - 1">{{ t }}, </span>
                        <span v-else>{{ t }}</span>
                    </span>
                </div>
            </div>
            <div v-if="props.data.notes">
                <div class="propRow notesHeader">
                    <NotesIcon />
                    <div class="rowContent">Notes: </div>
                </div>

                <div class="notes">{{ props.data.notes }}</div>
            </div>
            <div class="buttons">
                <div 
                    class="btn leftBtn"
                    @click = "formStore.verificationOpen = true"
                >
                    <div>Delete</div>
                    <TrashIcon/> 
                </div>
                <div class="btn centerBtn"><div>Edit</div> <EditIcon/> </div>
                <div 
                    :class="['btn', checked? 'rightBtn' : 'rightBtnChecked']"
                    @click="toggleChecked"
                >
                    <Transition :name="checked? 'undo' : 'check'" mode="out-in">
                        <div class="checkBtn" v-if="!checked">
                            <div>Check</div> 
                            <CheckIcon/>
                        </div>
                        <div class="checkBtn" v-else>
                            <div>Undo</div>
                            <UndoIcon/>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>

    <ActionVerification 
        v-if="formStore.verificationOpen"
        @affirmative-clicked="async () => {await deleteItem(); formStore.verificationOpen = false;}"
        @negative-clicked="formStore.verificationOpen = false"
    >
        Are you sure you want to delete this item?
    </ActionVerification>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(5px);
    }

    .check-enter-active,
    .check-leave-active {
        transition: all 0.5s ease;
    }

    .check-enter-from {
        opacity: 0;
        transform: translateX(5px);
    }

    .check-leave-to {
        opacity: 0;
        transform: translateX(-5px);
    }

    .undo-enter-active,
    .undo-leave-active {
        transition: all 0.5s ease;
    }

    .undo-enter-from {
        opacity: 0;
        transform: translateX(-10px);
    }

    .undo-leave-to {
        opacity: 0;
        transform: translateX(10px);
    }

/*     :deep(svg) {
        border: 2px dashed greenyellow;
    } */

    .checkBtn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    .notes {
        border: 1px solid gray;
        border-radius: 20px;
        padding: 10px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 5px
    }

    .notesHeader {
        margin-bottom: 5px;
    }

    .rowContent {
        font-size: 18px;
        margin-left: 5px;
    }

    .propRow {
        width: calc(100% - 5px);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 5px;
        border-top: 1px solid gray;
    }

    .title {
        margin-left: 8px;
        height: 100%;
        padding-top: 7px;
        font-size: 28px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 2px;
        border-top: 2px solid gray;
    }

    .btn {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 16px;
        font-weight: 900;
        border: 3px solid gray;
    }

    .leftBtn {
        width: 100%;
        margin: 5px;
        border-radius: 0px 0px 0px 15px;
        background-color: orangered;
    }

    .centerBtn {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .rightBtn {
        width: 100%;
        margin: 5px;
        border-radius: 0px 0px 15px 0px;
        background-color: lightgray;
    }

    .rightBtnChecked {
        width: 100%;
        margin: 5px;
        border-radius: 0px 0px 15px 0px;
        background-color: greenyellow;
    }

    .itemHeaderOpen {
        transition: border-radius .5s ease;
        border: 3px solid gray;
        display: flex;
        flex-direction: row;
        height: 36px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 20px 20px 0px 0px;
    }

    .itemHeaderClosed {
        transition: border-radius .5s ease;
        border: 3px solid gray;
        display: flex;
        flex-direction: row;
        height: 36px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 20px;
    }

    .headerChecked {
        transition: background-color .5s ease;
        background-color: greenyellow;
    }

    .header {
        transition: background-color .5s ease;
        background-color: white;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 85%;
        padding-left: 7px;
        height: 100%;
    }

    .leftChecked {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 85%;
        padding-left: 7px;
        height: 100%;
    }

    .right {
        transition: background-color .5s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        border-radius: 15px;
        margin-right: 5px;
        border: 3px solid gray;
        background-color: greenyellow;
    }

    .rightChecked {
        transition: background-color .5s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 15%;
        border-radius: 15px;
        margin-right: 5px;
        border: 3px solid gray;
        background-color: lightgray;
    }

    .itemContentOpen {
        transition: max-height .25s ease;
        border-right: 3px solid gray;
        border-left: 3px solid gray;
        border-bottom: 3px solid gray;
        border-radius: 0px 0px 20px 20px;
        max-height: 1000px;
    }

    .itemContent {
        transition: max-height .25s ease;
        max-height: 0px;
        overflow: hidden;
    }


    .grocItem {
        width: 100%;
        /* border: 1px solid green; */
        font-family: 'Comfortaa', sans-serif;
        margin-bottom: 5px;
    }

</style>