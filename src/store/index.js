import { createStore } from 'vuex'

// 实现本地存储
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (e) {
    return {}
  }
}
export default createStore({
  state: {
  // cartList:{
    //   shopId:{
    //     shopNme:'沃尔玛',
    //     productList:{
    //        productId:{
    //          _id: "1",
    //          name: "番茄 250g / 份",
    //          imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //          sales: 10,
    //          price: 33.6,
    //          oldPrice: 39.6,
    //          count:2
    //        }
    //     }
    // }
    // cartList:{}
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, pyload) {
      const { shopId, productId, productInfo } = pyload
      // eslint-disable-next-line prefer-const
      let shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      // if(!shopInfo) {shopInfo={}}
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
        // product.count = 0;
      }
      product.count = product.count + pyload.num

      if (pyload.num > 0) { product.check = true }
      // 等价于
      // (pyload.num > 0) && (product.check = true);
      if (product.count < 0) { product.count = 0 }
      // 等价于
      // (product.count < 0) && (product.count = 0);

      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName (state, pyload) {
      const { shopId, shopName } = pyload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo

      setLocalCartList(state)
    },
    changeCartItemChecked (state, pyload) {
      const { shopId, productId } = pyload
      const product = state.cartList[shopId].productList[productId]
      // console.log(product)
      product.check = !product.check

      setLocalCartList(state)
    },
    cleanCartProducts (state, pyload) {
      const { shopId } = pyload
      state.cartList[shopId].productList = {}
    },

    setCartItemsChecked (state, pyload) {
      const { shopId } = pyload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData (state, pyload) {
      const { shopId } = pyload
      state.cartList[shopId].productList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
