<template>
<div class="docker">
      <div v-for="(item, index) in dockerList"
      :class="{'docker__item': true,'docker__item--active':index===0}" class="docker__item" :key="item.icon">
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon" />
          <div class="docker__title">{{item.text}}</div>
        </router-link>
      </div>
    </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe867;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6bc;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe7b3;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/virables.scss';
@import '../style/mixins.scss';
.docker{
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  &__item{
    flex: 1;
    text-align: center;
    a{
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont{
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active{
      color: #1FA4FC;
    }
  }
  color: $content-fontcolor;
}
.docker_title{
  font-size: .2rem;
  transform: scale(0.5,0.5);
  transform-origin: center top;
}
</style>
