<template>
<div class="postion">
      <span class="iconfont position__icon">&#xe7f1;</span>
              南华大学雨母校区三省园5栋
        <span class="iconfont position__notice">&#xe60b;</span>
      </div>
      <div class="search">
      <span class="iconfont">&#xe615;</span>
      <span class="serch__text">屈臣氏部分美妆六折起</span>
    </div>
    <div class="banner">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
    </div>
    <div class="icons">
      <div class="icons__item" v-for="item in iconList" :key="item.desc">
          <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"/>
           <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: ' 菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.postion{
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;
  .postion__icon{
    position: relative;
    top:.01rem;
    font-size: .2rem;
  }
  .position__notice{
    position: absolute;
    right: 0;
    top:.17rem;
    font-size: .2rem;
  }
  color: $content-fontcolor;
}
.search{
  margin-bottom: .12rem;
  line-height: .32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: .16rem;
  font-size: .14rem;
  .iconfont{
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
    font-size: .16rem;
  }
  &__text{
    display: inline-block;
    font-size: .14rem;
  }
}
.banner{
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img{
    width: 100%;
  }
}
.icons{
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item{
    width: 20%;
     &__img{
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
     }
     &__desc{
      padding: .16rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
     }
  }
}
.gap{
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -.18rem;
}
</style>
