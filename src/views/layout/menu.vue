<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
    unique-opened
    :collapse="$store.getters.siderBar"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menuslist"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]" />
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          {{ $t(`menus.${it.path}`) }}
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '../../api/menuList'
import { ref } from 'vue'
import {
  Avatar,
  Setting,
  Goods,
  List,
  Document,
  Menu
} from '@element-plus/icons-vue'
const iconList = ['Avatar', 'Setting', 'Goods', 'List', 'Document']
const icon = ref('Avatar')
const menuslist = ref([])
const initMenuList = async () => {
  menuslist.value = await menuList()
}

initMenuList()
</script>

<style scoped lang="scss">
.el-menu-item {
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
