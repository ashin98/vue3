<template>
    
       <button @click="add">++</button>
        {{$store.state.num}}
    
</template>

<script setup>
import $store from '../store/index'
function add(){
    $store.commit('add')
}
</script>

<style lang="less" scoped>

</style>
