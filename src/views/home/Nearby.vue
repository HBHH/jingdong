<template>
<div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList " :key="item._id">
        <ShopInfo :item="item" />
      </router-link>
</div>
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request.js'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearByList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearByList }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearByList } = useNearbyListEffect()
    getNearByList()
    return { nearbyList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.nearby{
  &__title{
    margin: .16rem 0 .04rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a{
    text-decoration: none;
  }

}
</style>
