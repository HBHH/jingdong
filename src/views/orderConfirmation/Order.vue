<template>
    <div class="order">
        <div class="order__price">实付金额 ￥<b>{{calculations.price}}</b></div>
        <div
            class="order__btn"
            @click="()=>handleShowConfirmChange(true)"
        >提交订单</div>
    </div>
    <div
        class="mask"
        v-show="showConfirm"
        @click="()=>handleShowConfirmChange(false)"
    >
        <div class="mask__content" @click.stop>
            <h3 class="mask__content__title">确认离开收银台</h3>
            <p class="mask__content__desc">请尽快完成支付,否则30分钟后自动取消</p>
            <div class="mask__content__btns">
                <button
                    class="mask__content__btn mask__content__btn--first"
                    @click="()=>handleConfirmOrder(true)"
                >取消订单</button>
                <button
                    class="mask__content__btn mask__content__btn--second"
                    @click="()=>handleConfirmOrder(false)"
                >确认支付</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import { post } from '../../utils/request'

// 下单相关逻辑
const useMakeOrderEffect = (shopName, productList, shopId) => {
  const store = useStore()
  const router = useRouter()
  const handleConfirmOrder = async (isCancled) => {
    const products = []
    // eslint-disable-next-line prefer-const
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCancled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', { shopId })
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
    // 提示下单失败
    // showToast("请求失败")
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopName, productList, shopId)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return {
      showConfirm,
      calculations,
      handleConfirmOrder,
      handleShowConfirmChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/virables.scss";
.order{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background: $bgColor-white;
    &__price{
        flex: 1;
        text-indent: .24rem;
        font-size: .14rem;
        color: $content-fontcolor;
    }
    &__btn{
        width: .98rem;
        background: #4fb0f9;
        color: $bgColor-white;
        text-align: center;
        font-size: .14rem;
    }
}
.mask{
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.50);
    &__content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 3rem;
        height: 1.56rem;
        background: #fff;
        border-radius: .04rem;
        text-align: center;
        &__title{
            margin: .24rem 0 0 0;
            line-height: .26rem;
            font-size: .18rem;
            color: #333;
        }
        &__desc{
            margin: .08rem 0 0 0 ;
            font-size: .14rem;
            color: #666;
        }
        &__btns{
            display: flex;
            margin: .24rem .58rem ;
        }
        &__btn{
            flex: 1;
            width: .8rem;
            line-height: .32rem;
            border-radius: .16rem;
            font-size: .14rem;
            &--first{
                margin-right: .12rem;
                border: .01rem solid #4fb0f9;
                color: #4fb0f9;
            }
            &--second{
                margin-left: .12rem;
                background: #4fb0f9;
                color: #fff;
            }
        }
    }
}
</style>
