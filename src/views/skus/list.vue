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
        <i class="el-icon-refresh"></i>
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
          ref="skuFormR"
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
              :value="skuForm.status === 1 ? true : false"
              active-color="#409eff"
              inactive-color="#d9dce3"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
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
        规格值: [{ required: true, message: '规格值不能为空', trigger: 'blur' }]
      }
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
</style>
