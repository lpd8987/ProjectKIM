<script setup lang="ts">
    import Nav from "./../Nav.vue"
    import ListItem from './ListItem.vue'
</script>

<template>
    <Nav :active-page="'list'"/>
    <h1>YOUR GROCERY LIST:</h1>
    <ListItem></ListItem>
</template>

<style scoped>
</style>