<template>
  <div class="coupon-container">
    <el-card>
      <header>
        <el-button size="mini" type="primary" @click="handleOpenDrawer('add')"
          >新增</el-button
        ><i class="el-icon-refresh"></i>
      </header>
      <el-table :data="couponList" style="width: 100%">
        <el-table-column prop="scope" label="优惠券名称" width="400">
          <template v-slot="scope">
            <div class="descBox">
              <h5>{{ scope.row.desc }}</h5>
              <small
                >{{ scope.row.start_time }} ~ {{ scope.row.end_time }}</small
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template v-slot="scope">
            <div>{{ scope.row.status === 0 ? '已失效' : '未开始' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="优惠">
          <template v-slot="scope">
            <div>满减 ￥{{ scope.row.value }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量"> </el-table-column>
        <el-table-column prop="used" label="已使用"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Coupon from '../../api/coupon'

export default {
  name: '',
  components: {},
  data() {
    return {
      couponList: []
    }
  },
  created() {
    this.loadGetCouponList()
  },
  methods: {
    async loadGetCouponList() {
      const res = await Coupon.getCouponList()
      this.couponList = res.list
      console.log('优惠券', this.couponList)
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
.descBox {
  width: 330px;
  height: 70px;
  box-sizing: border-box;
  background-color: #f9fafb;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px dashed #e5e7eb;
  h5 {
    font-weight: 700;
    font-size: 14px;
    color: #9ca3af;
  }
  small {
    font-size: 12px;
    color: #9ca3af;
  }
}
</style>
