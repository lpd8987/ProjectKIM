<script setup lang="ts">
    import type { Item } from './Types'
    import type { PropType} from 'vue';
    import { ref } from 'vue';
    import QuantityMeter from '../QuantityMeter.vue';;

    const props = defineProps({
        data: {
            type: Object as PropType<Item>,
        }
    })

    const open = ref<boolean>(true);
    const hidden = ref<HTMLElement | null>();

    function toggle() : void {
        open.value = !open.value;

        if(!hidden.value) return;

        if(open.value)
        {
            hidden.value.style.maxHeight = `1000px`
        }
        else
        {
            hidden.value.style.maxHeight = `1px`
        }
    }
</script>

<template>
    <div>
        <div @click="toggle" class="mainDisplay">
            <div class="text">{{ props.data?.name }}</div>
            <Transition name="slide-reverse">
                <div v-if="!open" class="indicators">
                    <div class="iconPlaceholder"></div>
                    <QuantityMeter />
                </div> 
            </Transition>

        </div>
        <div ref="hidden" class="hidden">
            <Transition name="slide">
                <div v-if="open">
                    <div>{{ data?.quantity }}</div>
                    <div>{{ data?.exactQuantity }}</div>
                    <div>{{ data?.measurement }}</div>
                    <div>{{ data?.storageLocation }}</div>
                    <div>{{ data?.type }}</div>
                    <div>{{ data?.groceryType }}</div>
                    <div>
                        {{ data?.expirationDate?.toISOString() }}
                        <QuantityMeter />
                    </div>
                    <div>{{ data?.notes }}</div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
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

    .hidden {
        border: 1px solid blue;
        max-height: 1000px;
        transition-property: max-height;
        transition-duration: .5s;
        transition-timing-function: ease;
    }

    .mainDisplay {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid gray;
        padding: 5px;
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