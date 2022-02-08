<template>
  <el-container class="app-wrapper">
    <el-aside class="sidebar-container" :width="width">
      <Menu></Menu>
    </el-aside>
    <el-container
      class="container"
      :class="{ hidderContainer: store.getters.siderBar }"
    >
      <el-header><Header></Header></el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from './menu.vue'
import Header from './header.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const width = computed(() => {
  return store.getters.siderBar === false ? '210px' : '67px'
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/mixin.scss';
@import '../../styles/sidebar.scss';
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
}
</style>
