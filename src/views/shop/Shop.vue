<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe615;</span>
        <input
             class="search__content__input"
             placeholder="请输入商品名称"
            />
      </div>
    </div>
      <ShopInfo  :item="item" :hideBorder="true" v-show="item.imgUrl"/>
      <Content/>
      <Cart/>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request.js'
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import Content from '../shop/Content'
import Cart from '../shop/Cart'
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

const useBackRoterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: ' Shop ',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRoterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
  padding: 0 .18rem;
}
.search{
    margin: .14rem 0 .04rem 0;
    display: flex;
    line-height: .32rem;
    &__back{
        font-size: .24rem;
        height: .3rem;
        color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      background: #F5F5F5;
      border-radius: .16rem;
      &__icon{
        width: .44rem;
        text-align: center;
      }
      &__input{
        display: block;
        width: 100%;
        padding-right: .2rem;
        border: none;
        outline: none;
        background: none;
        height: .32rem;
        font-size: .14rem;
        color: $content-fontcolor;
        &::placeholder{
            color: $content-fontcolor;
        }
    }
  }
}
</style>
