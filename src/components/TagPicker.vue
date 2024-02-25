<script setup lang="ts">
    import { ref } from 'vue';
    import { CrossIcon, ChevronDown } from './Icons'

    const props = defineProps({
        tags: {
            type: Array<string>
        },
        selected: {
            type: Array<string>,
            default: []
        }
    });

    const emits = defineEmits([`tagsChanged`]);
    
    const selectedTags = ref<Array<string>>(props.selected);
    const open = ref<boolean>(false)

    function toggleOpen() {
        open.value = !open.value;
    }

    function removeFromSelected(item: string) {
        const itemIndex : number = selectedTags.value.indexOf(item);

        if(itemIndex === -1) return;

        selectedTags.value.splice(itemIndex, 1);
    }

    function logTags() {
        console.log('selectedTags', selectedTags.value)
    }
</script>

<template>
    <div class="wrapper">
        <div 
            :class="open? 'titleOpen' : 'titleClosed'"
            @click="toggleOpen"
        >
            <slot></slot>
            <ChevronDown />
        </div>

        <div :class="open? 'tagsOpen' : 'tagsClosed'" >
            <div 
                v-for="(tag, index) of tags"
                class="item"
            >
                <div 
                    class="selectedTag" 
                    v-if="selectedTags.includes(tag)"
                >
                    <div>{{ tag }}</div>
                    <CrossIcon @click="removeFromSelected(tag); $emit('tagsChanged', selectedTags)"/>
                </div>
                <div
                    class="unselectedTag"
                    @click="selectedTags.push(tag); $emit('tagsChanged', selectedTags)"
                    v-else
                >
                    <div>{{ tag }}</div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

    .wrapper {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 80%;
        font-family: 'Comfortaa', sans-serif;
        position: relative;
    }

    .item {
        width: 100%;
    }

    .titleOpen {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        border-top: 2px solid gray;
        border-left: 2px solid gray;
        border-right: 2px solid gray;
        border-bottom: 1px solid gray;
        padding: 10px;
        border-radius: 15px 15px 0px 0px;
        transition-property: border-radius;
        transition-duration: .25s;
        transition-timing-function: ease;
    }

    .titleClosed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition-property: border-radius;
        transition-duration: .25s;
        transition-timing-function: ease;
        font-size: 24px;
        border: 2px solid gray;
        padding: 10px;
        border-radius: 15px;
    }

    .unselectedTag {
        margin: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 15px;
        height: 28px;
    }

    .selectedTag {
        margin: 5px;
        background-color: lightgray;
        font-weight: 900;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 15px;
        height: 28px;
    }

    .tagsOpen {
        background-color: white;
        width: calc(100% - 4px);
        position: absolute;
        transition-property: max-height, opacity;
        transition-duration: .25s;
        transition-timing-function: ease;
        display: flex;
        flex-direction: column;
        border-left: 2px solid gray;
        border-right: 2px solid gray;
        border-bottom: 2px solid gray;
        padding-bottom: 5px;
        border-radius: 0px 0px 15px 15px;
        max-height: 150px;
        z-index: 100;
        opacity: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .tagsClosed {
        position: absolute;
        transition-property: max-height, opacity;
        transition-duration: .25s;
        transition-timing-function: ease;
        max-height: 0px;
        opacity: 0%;
        overflow: hidden;
    }

</style>