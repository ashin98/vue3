<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="dialogTitle === '添加用户'"
      >
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCofirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps, watch } from 'vue'
import { addUser, editUser } from '../../api/users'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
//表单验证规则
const rules = ref({
  username: [
    {
      required: true,
      message: '请正确输入名称',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请正确输入密码',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      required: true,
      message: '请正确输入邮箱',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请正确输入手机号',
      trigger: 'blur'
    }
  ]
})

//定义自定义事件
const emits = defineEmits(['update:modelValue', 'initUserList'])

//取消按钮，关闭弹窗
const handleClose = () => {
  emits('update:modelValue', false)
}

//确认按钮 确定添加用户或修改用户
const handleCofirm = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      //三元表达式，如果是添加用户就发送添加用户api，否则发送编辑api
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      handleClose()
      emits('initUserList') //向父组件发送更新数据事件
      ElMessage({
        message: props.dialogTitle === '添加用户' ? '添加成功' : '修改成功',
        type: 'success'
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

//监听编辑表单
watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped></style>
