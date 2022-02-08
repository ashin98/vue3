<template>
  <el-row :gutter="20" style="margin-bottom: 30px">
    <el-col :span="7">
      <el-input
        clearable
        v-model="queryForm.query"
        :placeholder="$t(`table.placeholder`)"
      ></el-input>
    </el-col>
    <el-button type="primary" @click="initUsersList">{{
      $t('table.search')
    }}</el-button>
    <el-button type="primary" @click="handleDialog()">{{
      $t('table.adduser')
    }}</el-button>
  </el-row>

  <el-table :data="tableData" style="width: 100%" height="550">
    <el-table-column
      :prop="item.prop"
      :label="$t(`table.${item.label}`)"
      :width="item.width"
      v-for="(item, index) in options"
      :key="index"
    >
      <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
        <el-switch v-model="row.mg_state" @change="changeState(row)" />
      </template>
      <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
        {{ $filters.filterTimes(row.create_time) }}
      </template>
      <template #default="{ row }" v-else-if="item.prop === 'action'">
        <el-button
          type="primary"
          size="small"
          :icon="Edit"
          @click="handleDialog(row)"
        ></el-button>
        <el-button type="warning" size="small" :icon="Setting"></el-button>
        <el-button
          type="danger"
          size="small"
          :icon="Delete"
          @click="delUser(row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页器-->
  <el-pagination
    v-model:currentPage="queryForm.pagenum"
    v-model:page-size="queryForm.pagesize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :background="blue"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>

  <!--v-if="dialogVisible" 让每次出来的表单都是最新的情况，让上次输入的内容清空-->
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    @initUserList="initUsersList"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUsers, changeUserState, deleteUser } from '../../api/users'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './dialog.vue'
import { isNull } from '../../utils/time'
const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1, //当前页
  pagesize: 5 //每页条数
})

//获取用户数据
const tableData = ref([])
const total = ref(0)
const initUsersList = async () => {
  const res = await getUsers(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}
initUsersList()

//分页器---每页条数
const handleSizeChange = (pagesize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pagesize
  initUsersList()
}

//分页器---当前页
const handleCurrentChange = (pagenum) => {
  queryForm.value.pagenum = pagenum
  initUsersList()
}

//改变状态开关
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

const dialogTitle = ref('') //弹窗标题
const dialogVisible = ref(false) //控制弹窗显示和关闭
const dialogTableValue = ref({}) //点击编辑按钮这一行的数据对象
//判断是添加用户还是编辑用户
const handleDialog = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row)) //深拷贝
  }
  dialogVisible.value = true
}

//删除用户
const delUser = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitle'), {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      initUsersList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败'
      })
    })
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
