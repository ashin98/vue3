<!--Header组件汇总-->
<template>
  <div class="hamburger">
    <el-icon :size="22" style="padding-top: 5px" @click="handleSiderbar">
      <fold />
    </el-icon>
  </div>
  <Breadcrumb />
  <div class="screenfull">
    <ScreenFull />
  </div>
  <div class="lang">
    <Lang />
  </div>
  <div class="avatar">
    <Avatar />
  </div>
</template>

<script setup>
import Breadcrumb from './breadcrumb.vue'
import Avatar from './avatar.vue'
import Lang from './lang.vue'
import ScreenFull from './screenFull.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
function handleSiderbar() {
  console.log(1111)
  store.commit('changeSiderBar')
}
// const icon = computed(() => {
//   return store.getters.siderBar ? 'Expand' : 'Fold'
// })
</script>

<style lang="scss" scoped>
.hamburger {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
  .el-button {
    border: none;
    font-size: 26px;
  }
}
.screenfull {
  position: absolute;
  right: 170px;
}
.lang {
  position: absolute;
  right: 120px;
}
.avatar {
  position: absolute;
  right: 30px;
}
</style>
