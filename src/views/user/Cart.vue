<template>
  <div class="Cart">
    <table>
      <thead>
        <tr>
          <th width="50">
            <i
              v-show="!hasTotalSelected"
              @click="selectAll"
              class="icon iconfont icon-fangkuangweixuan"
            ></i>
            <i
              v-show="hasTotalSelected"
              @click="selectAll"
              class="icon iconfont icon-shixinfangkuangxuanzhong"
            ></i>
          </th>
          <th width="300">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <td>
            <i
              v-show="!item.hasSelected"
              @click="item.hasSelected = !item.hasSelected"
              class="icon iconfont icon-fangkuangweixuan"
            ></i>
            <i
              v-show="item.hasSelected"
              @click="item.hasSelected = !item.hasSelected"
              class="icon iconfont icon-shixinfangkuangxuanzhong"
            ></i>
          </td>
          <td>
            <img
              width="84"
              height="97.258"
              :src="imgBaseUrl + item.coverImg"
              alt=""
            />
            <section>
              <div class="productName">{{ item.title }}</div>
              <div class="size">{{ item.versionDescription }}</div>
            </section>
          </td>
          <td>{{ item.coin }}鸡腿</td>
          <td>
            <div class="count">
              <div
                class="plus"
                :class="item.total === item.stock ? 'not-allowed' : ''"
                @click="controlAmount(1, item.stock, index, item.total)"
              >
                <i class="icon iconfont icon-add"></i>
              </div>
              <input type="text" disabled v-model="item.total" />
              <div
                class="reduce"
                :class="item.total === 1 ? 'not-allowed' : ''"
                @click="controlAmount(-1, item.stock, index, item.total)"
              >
                <i class="icon iconfont icon-minus"></i>
              </div>
            </div>
          </td>
          <td>{{ item.total * item.coin }}鸡腿</td>
          <td>
            <div @click="remove(item.id)" class="del">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      总计：<span>{{ amount }}鸡腿</span>
    </h3>
    <div @click="submit" class="submit">提交</div>
  </div>
</template>

<script>
import { cartList, deleteProduct, productDetail } from '@/request/api.js'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      productAmount: 1,
      productList: [],
      hasTotalSelected: false
    }
  },
  watch: {
    productList: {
      handler(newVal, oldVal) {
        if (newVal.every((cVal) => cVal.hasSelected === true)) {
          // 全选
          this.hasTotalSelected = true
        } else {
          // 全反选
          this.hasTotalSelected = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState('UserInfo', ['userInfo']),
    // 所有商品共计积分
    amount() {
      let count = 0
      for (let i in this.productList) {
        let simpleItemAmount =
          this.productList[i].total * this.productList[i].coin
        count += simpleItemAmount
      }
      return count
    }
  },
  methods: {
    ...mapActions('ToastState', ['asyncChangeToastState']),
    controlAmount(val, stock, index, total) {
      // 用一个函数同时控制加减
      // 传入一个val参数 1 代表加 -1代表减
      if (
        (val === -1 && total <= 1) || // 当前input框内的数字不能小于1
        (val === 1 && total >= stock) // 当前input框内的数字不能大于库存数
      ) {
        return
      }
      // 用传入的参数做递增或递减
      this.productList[index].total += val
    },
    // 全选\取消全选
    selectAll() {
      this.hasTotalSelected = !this.hasTotalSelected
      if (this.hasTotalSelected === false) {
        for (let i in this.productList) {
          this.productList[i].hasSelected = false
        }
      } else {
        for (let i in this.productList) {
          this.productList[i].hasSelected = true
        }
      }
    },
    // 提交
    submit() {
      this.asyncChangeToastState({
        msg: '该功能暂未开放',
        classType: 'warning'
      })
    },
    // 删除商品
    async remove(id) {
      let res = await deleteProduct({
        productId: id,
        phone: this.userInfo.phone
      })
      if (!res) return
      this.asyncChangeToastState({
        msg: res.data.message,
        classType: 'success'
      })
      this.getCartList()
    },
    // 获取购物车列表
    async getCartList() {
      let res = await cartList({
        phone: this.userInfo.phone
      })
      this.productList = res.data
      // 依次获取列表内商品的库存
      for (let i in res.data) {
        let res2 = await productDetail(res.data[i].id)
        if (!res2) return
        this.productList[i].stock = res2.data.productInfo.stock
      }
    },
    // 初始化商品选择
    init() {
      for (let i in this.productList) {
        // 像这样直接向响应式对象中添加一个property this.productList[i].hasSelected = false, 那么这个新增的属性并不是响应式的
        // 调用$set API 以添加新的响应式property 即可
        this.$set(this.productList[i], 'hasSelected', false)
      }
    }
  },
  async created() {
    await this.getCartList()
    await this.init()
  }
}
</script>

<style scoped lang="less">
@import url('~@/assets/css/global-style.less');
.Cart {
  h3 {
    font-weight: 100;
    text-align: right;
    span {
      color: #fd604d;
    }
  }
  .submit {
    background: @base-color;
    color: #fff;
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 100px;
    float: right;
    cursor: pointer;
  }
  table {
    width: 100%;
    border-spacing: 0;
    thead {
      background: #efefef;
      tr {
        th {
          padding-top: 20px;
          padding-bottom: 20px;
          font-weight: 700;
          i {
            cursor: pointer;
          }
        }
      }
    }
    tbody {
      background: #f5f5f5;
      tr {
        td {
          padding: 0;
          padding-top: 20px;
          padding-bottom: 20px;
          vertical-align: middle;
          i {
            cursor: pointer;
          }
          section {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-left: 10px;
            .productName {
              padding-right: 100px;
              font-weight: 500;
            }
            .size {
              font-size: 12px;
              color: #666;
            }
          }
          &:nth-of-type(2) {
            display: flex;
          }
          .count {
            display: flex;
            justify-content: center;
            .plus,
            .reduce {
              width: 28px;
              height: 28px;
              line-height: 28px;
              border: 1px solid #999;
              color: #000;
              cursor: pointer;
            }
            .not-allowed {
              cursor: not-allowed;
              color: #999;
            }
            input {
              width: 45px;
              height: 28px;
              padding: 0;
              border: 0;
              border-bottom: 1px solid #999;
              border-top: 1px solid #999;
              text-align: center;
            }
          }
          .del {
            padding: 5px 10px;
            display: inline;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
i {
  color: @base-color;
}
</style>
