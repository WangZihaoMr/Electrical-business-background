<template>
  <div class="category-container">
    <el-card>
      <div class="header">
        <el-button size="mini" type="primary" @click="handleOpenDrawer('add')"
          >新增</el-button
        ><i class="el-icon-refresh"></i>
      </div>
      <ul class="cate-wrapper">
        <li class="li-small" v-for="(item, index) in cateData" :key="index">
          <div class="cate-name">{{ item.name }}</div>
          <div>
            <el-button type="text" @click="handleOpenDrawer('goods')"
              >推荐商品</el-button
            >
            <el-switch
              class="swicth"
              :value="item.status === 1 ? true : false"
              active-color="#409eff"
              inactive-color="#d9dce3"
              @change="updateSwitchCate(item.id, item.status)"
            >
            </el-switch>
            <el-button type="text" @click="handleOpenDrawer('edit')"
              >修改</el-button
            >
            <el-popconfirm title="您确定删除吗？">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </li>
      </ul>
    </el-card>

    <!-- 抽屉 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <div v-if="drawerTitle === '新增'">
        <el-form ref="cateFormRef" :model="cateForm" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="cateForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="drawerTitle === '推荐商品'" style="padding: 20px">
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="60"> </el-table-column>
          <el-table-column prop="cover" label="商品封面" width="200">
            <template v-slot="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover"
                fit
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-popconfirm title="是否要删除该记录？">
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="footer">
        <el-button v-if="drawerTitle === '推荐商品'" type="primary"
          >关联</el-button
        >
        <el-button v-else type="primary" @click="handleSubmitCateForm"
          >提交</el-button
        >
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CategoryApi from '../../api/category'

export default {
  name: '',
  components: {},
  data() {
    return {
      cateData: [],
      drawerTitle: '新增',
      drawer: false,
      cateForm: {
        name: ''
      },
      goodsList: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取分类接口
    async getCateList() {
      const res = await CategoryApi.getCatagoryList(this.cateForm)
      // console.log(res)
      this.cateData = res
    },
    // 商品列表数据
    async loadGoods() {
      const res = await CategoryApi.getGoodsList()
      this.goodsList = res
      console.log('商品', res)
    },
    // 编辑状态
    async updateSwitchCate(id, status) {
      const data = {
        id,
        status
      }
      const res = await CategoryApi.updateCateList(data)
      console.log(res)
      // this.getCateList()
    },
    // 打开抽屉
    handleOpenDrawer(action) {
      this.drawer = !this.drawer
      console.log(action)
      switch (action) {
        case 'add':
          this.drawerTitle = '新增'
          break
        case 'goods':
          this.drawerTitle = '推荐商品'
          this.loadGoods()
          break
        case 'edit':
          this.drawerTitle = '修改'
          break
        default:
          break
      }
    },
    // 关闭抽屉
    handleClose() {
      this.drawer = false
      this.cateForm.name = ''
    },
    // 新增
    async handleAddCate() {
      await CategoryApi.addCatagoryList(this.cateForm)
      this.getCateList()
      this.handleClose()
      this.$notify({
        message: '新增成功',
        type: 'success'
      })
    },
    // 编辑
    handleEditCate() {},
    // 推荐商品
    async handleGoods() {},
    // 提交
    handleSubmitCateForm() {
      if (this.drawerTitle === '新增') {
        this.handleAddCate()
      } else if (this.drawerTitle === '推荐商品') {
        this.handleGoods()
      } else if (this.drawerTitle === '修改') {
        this.handleEditCate()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: 0 0 20px;
}
.cate-wrapper {
  width: 100%;
  .li-small {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .cate-name {
      font-size: 14px;
      color: #606266;
    }
    .swicth {
      margin: 0 6px;
    }
  }
}
.el-icon-refresh {
  cursor: pointer;
}
::v-deep(.el-drawer) {
  width: 45% !important;
}
.footer {
  padding: 20px;
}
</style>
