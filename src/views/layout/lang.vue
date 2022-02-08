<!--切换语言组件-->
<template>
  <el-dropdown @command="handleCommand">
    <el-icon :size="30" style="padding-top: 12px"><setting /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { Setting } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
const store = useStore()
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const i18n = useI18n()

const currentLanguage = computed(() => {
  return i18n.locale.value //返回使用的语言是zh还是en
})

const handleCommand = (val) => {
  console.log(i18n)
  i18n.locale.value = val
  store.commit('changeLang', val)
  localStorage.setItem('lang', val)
}
</script>

<style lang="scss" scoped></style>
