<!--全屏模块-->
<template>
  <div id="screenFull">
    <el-icon :size="30" style="padding-top: 12px" @click="handleFullScreen"
      ><full-screen
    /></el-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount } from 'vue'
import { FullScreen } from '@element-plus/icons-vue'
const handleFullScreen = () => {
  console.log(screenfull.isEnabled)
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
</script>

<style lang="scss" scoped></style>
