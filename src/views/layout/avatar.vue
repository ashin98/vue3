<!--右侧头像-->
<template>
  <el-dropdown>
    <div class="block">
      <el-avatar shape="circle" :size="50" :src="circleUrl"></el-avatar>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const circleUrl = ref(
  'https://img1.baidu.com/it/u=1925715390,133119052&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
)
const logout = () => {
  store.dispatch('logout')
}
</script>

<style lang="scss" scoped></style>
