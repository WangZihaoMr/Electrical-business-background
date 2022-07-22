<template>
  <div class="skus-container">
    <el-card>
      <!-- 头部 -->
      <header>
        <div>
          <el-button
            type="primary"
            size="mini"
            @click="handleOpenDrawer('add')"
          >
            新增 </el-button
          ><el-button type="danger" size="mini">批量删除</el-button>
        </div>
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新数据"
          placement="top"
        >
          <div class="refresh"><i class="el-icon-refresh"></i></div>
        </el-tooltip>
      </header>
      <el-table :data="skusList" stripe sortable style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column
          prop="name"
          label="规格名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="default"
          label="规格值"
          width="180"
        ></el-table-column>
        <el-table-column prop="order" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-switch
              :value="scope.row.status === 1 ? true : false"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              @change="handleChangeTableSwitch(scope.row.status)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button type="text" size="text" @click="handleOpenDrawer('edit')"
              >修改</el-button
            >
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button type="danger" size="text" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 抽屉组件 -->
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        :before-close="handleCloseDrawer"
      >
        <el-form
          :model="skuForm"
          :rules="skuFormRules"
          ref="skuFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="规格名称" prop="name">
            <el-input v-model="skuForm.name" placeholder="规格名称"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <template>
              <el-input-number v-model="skuForm.num" :min="1"></el-input-number>
            </template>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              class="swicth"
              :value="skuForm.status === 1"
              active-color="#409eff"
              inactive-color="#d9dce3"
              @change="handleChangeSwitch(skuForm.status)"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="规格值">
            <el-tag
              :key="tag"
              v-for="tag in tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="countStatus"
              v-model="skusSum"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="handleShowIpt"
              >+ 添加值</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSkusFormSubmit"
              >提交</el-button
            >
            <el-button @click="handleColseForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import SkusApi from '../../api/skus'

export default {
  name: '',
  components: {},
  data() {
    return {
      skusList: [],
      total: 0,
      drawer: false,
      skuForm: {
        name: '',
        num: 1,
        status: 1,
        default: []
      },
      drawerTitle: '新增',
      skuFormRules: {
        name: [
          { required: true, message: '规格名称不能为空', trigger: 'blur' }
        ],
        skusSum: [
          { required: true, message: '规格值不能为空', trigger: 'blur' },
          { min: 1, message: '请添加规格值', trigger: 'blur' }
        ]
      },
      skusSum: '',
      countStatus: false,
      tags: []
    }
  },
  created() {
    this.loadSkusList()
  },
  methods: {
    async loadSkusList() {
      const res = await SkusApi.getSkusList()
      this.skusList = res.list
      this.total = res.totalCount
      console.log('1', res)
    },
    // 抽屉的打开
    handleOpenDrawer() {
      this.drawer = !this.drawer
    },
    // 抽屉的关闭
    handleCloseDrawer() {
      this.drawer = false
    },
    // 显示/隐藏    规格添加值
    handleShowIpt() {
      this.countStatus = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除tag标签
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    // 回车添加值
    handleInputConfirm() {
      const skusSum = this.skusSum
      if (skusSum) {
        this.tags.push(skusSum)
      }
      this.countStatus = false
      this.skusSum = ''
    },
    // switch
    handleChangeSwitch(status) {
      console.log(status)
    },
    // 表格switch
    handleChangeTableSwitch(status) {
      this.status = !this.status
    },
    // 表单取消
    handleColseForm() {
      this.drawer = false
    },
    // 表单提交验证
    handleSkusFormSubmit() {
      // this.$refs.skuFormRef.validate(valid)
    }
  }
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: 0 0 20px;
}
::v-deep(.el-drawer) {
  width: 45% !important;
}
.addSkusBtn {
  width: 80px;
  height: 30px;
  font-size: 12px;
  color: #616367;
  border: 1px solid #dcdfe6;
  background-color: #ffffff;
  cursor: pointer;
}
.skusIpt {
  width: 100px;
  height: 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.refresh {
  width: 60px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
