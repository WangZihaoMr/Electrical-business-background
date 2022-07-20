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
          <div class="cate-right">
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
            <el-button type="text" @click="handleOpenDrawer('edit', item.name)"
              >修改</el-button
            >
            <el-popconfirm title="您确定删除吗？">
              <el-button class="del-button" type="text" slot="reference"
                >删除</el-button
              >
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
      <div v-if="drawerTitle === '新增' || drawerTitle === '修改'">
        <el-form ref="cateFormRef" :model="cateForm" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="cateForm.name" placeholder="分类名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="drawerTitle === '推荐商品'" style="padding: 20px">
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="60"> </el-table-column>
          <el-table-column prop="cover" label="商品封面" width="200">
            <template v-slot="scope">
              <el-image
                style="width: 64px; height: 64px"
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
        <el-button
          v-if="drawerTitle === '推荐商品'"
          type="primary"
          @click="handleOpenGoodsSelection"
          >关联</el-button
        >
        <el-button v-else type="primary" @click="handleSubmitCateForm"
          >提交</el-button
        >
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-drawer>

    <!-- 对话框 -->
    <el-dialog
      title="商品选择"
      :visible.sync="goodsDialogVisible"
      width="80%"
      :before-close="handleCloseGoodsSections"
    >
      <el-table
        ref="multipleTable"
        :data="goodsSelectionList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品" width="300">
          <template slot-scope="scope">
            <div class="goods-box">
              <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.cover"
                fit
              ></el-image>
              <div class="desc">
                <p class="desc-title">{{ scope.row.desc }}</p>
                <p>分类：{{ scope.row.category.name }}</p>
                <p>创建时间：{{ scope.row.create_time }}</p>
              </div>
            </div></template
          >
        </el-table-column>
        <el-table-column prop="stock" label="总库存" width="120">
          <template v-slot="scope"> {{ scope.row.stock }} </template>
        </el-table-column>
        <el-table-column label="价格" show-overflow-tooltip width="200">
          <template v-slot="scope">
            <div class="goods-price">
              <span>{{ scope.row.min_price }}</span>
              <i></i>
              <span>{{ scope.row.min_oprice }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="60"
      ></el-pagination>
    </el-dialog>
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
      goodsList: [],
      goodsDialogVisible: false,
      goodsSelectionList: []
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
        status: status === 1
      }
      await CategoryApi.updateCateList(data)
      // this.getCateList()
    },
    // 打开抽屉
    handleOpenDrawer(action, nameEdit) {
      // console.log('1', nameEdit)
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
          this.cateForm.name = nameEdit
          break
        default:
          break
      }
      // console.log('2', this.cateForm.name)
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
    handleGoods() {},
    // 提交
    handleSubmitCateForm() {
      if (this.drawerTitle === '新增') {
        this.handleAddCate()
      } else if (this.drawerTitle === '推荐商品') {
        this.handleGoods()
      } else if (this.drawerTitle === '修改') {
        this.handleEditCate()
      }
    },
    // 商品选择对话框的打开
    async handleOpenGoodsSelection() {
      this.goodsDialogVisible = true
      const res = await CategoryApi.getGoodsSelectionList()
      this.goodsSelectionList = res.list
      console.log(this.goodsSelectionList)
    },
    // 商品选择对话框叉号关闭
    handleCloseGoodsSections() {
      this.goodsDialogVisible = false
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
      margin: 0 10px;
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
.cate-right {
  ::v-deep(.el-button) {
    font-size: 12px !important;
  }
}
.del-button {
  margin-left: 20px;
}
.goods-box {
  display: flex;
  .desc {
    color: #9ca3af;
    .desc-title {
      color: #606233;
    }
  }
  .goods-price {
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 0 15px;
    i {
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #dcdfe6;
    }
  }
}
::v-deep(.el-image) {
  margin-right: 8px;
}
::v-deep(.el-pagination) {
  display: inline-block;
  margin: auto;
}
</style>
