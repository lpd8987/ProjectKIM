<script setup lang="ts">
    import { ref, type Component } from 'vue'
    import { ChevronDown } from './Icons'

    const props = defineProps({
        options: {
            type: Array<{icon: Component, fill: string, item: string}>
        },
        selectedIndex: {
            type: Number,
            default: 0
        }
    })

    const emits = defineEmits(['selectionChange'])

    const selectedDiv = ref<HTMLElement | null>()
    const optionsDiv = ref<HTMLElement | null>()

    const open = ref<boolean>(false);
    const selectedIndex = ref<number>(props.selectedIndex);
    const selectedItem = ref<string>(props.options![0].item);

    function toggleOpen() {
        open.value = !open.value

        if(!optionsDiv.value) return;
        if(!selectedDiv.value) return;

        if(open.value) {
            optionsDiv.value.className = 'optionsOpen'
            selectedDiv.value.className = 'selectedOpen'
        }
        else {
            optionsDiv.value.className = 'optionsClosed'
            selectedDiv.value.className = 'selectedClosed'
        }
    }

    function setActive(index: number) {
        selectedIndex.value = index;
        selectedItem.value = props.options![index].item;
        
        toggleOpen();
    }
</script>

<template>
    <div class="dropdown">
        <div ref="selectedDiv" class="selectedClosed" @click="toggleOpen">
            <div class="currentContent">
                <component :is="options![selectedIndex].icon" :style="`fill: ${options![selectedIndex].fill}`"/>
                <div class="text">{{ options![selectedIndex].item }}</div>
            </div>
            <ChevronDown />
        </div>


            <div ref="optionsDiv" :class="'optionsClosed'">
                <div 
                    v-for="(option, index) of options"
                    @click="setActive(index); $emit('selectionChange', selectedItem)"
                    class="item"    
                >
                    <component :is="option.icon" :style="`fill: ${option.fill}`"/>
                    <div class="text">{{ option.item }}</div>
                </div>
            </div>
    </div>
</template>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .text {
        font-size: 24px;
        font-family: "Comfortaa", sans-serif;
        margin-left: 10px;
    }

    .dropdown {
        position: relative;
        width: 80%;
        margin: 5px;
    }

    .selectedClosed {
        transition-property: border-radius;
        transition-duration: .25s;
        transition-timing-function: ease;
        border: 2px solid gray;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 15px;
    }

    .selectedOpen {
        transition-property: border-radius;
        transition-duration: .25s;
        transition-timing-function: ease;
        border: 2px solid gray;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 15px 15px 0px 0px;
    }

    .currentContent {
        display: flex;
        flex-direction: row;
    }

    .optionsOpen {
        transition-property: max-height;
        transition-duration: .5s;
        transition-timing-function: ease;
        max-height: 1000px;
        width: calc(100% - 4px);
        position: absolute;
        z-index: 100;
        background-color: white;
        padding-bottom: 5px;
        border-radius: 0px 0px 15px 15px;
        border: 2px solid gray;
        border-top: none;
    }

    .optionsClosed {
        transition-property: max-height;
        transition-duration: .25s;
        transition-timing-function: ease;
        max-height: 0px;
        overflow: hidden;
        width: 100%;
        position: absolute;
        z-index: 100;
        background-color: white;
        border-radius: 0px 0px 15px 15px;
    }

    .item {
        border: 1px solid gray;
        border-radius: 10px;
        margin: 3px;
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
</style>