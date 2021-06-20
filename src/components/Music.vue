<template>
<div style="width: 100%;height: 100%;">
  <!-- BScroll根据父元素也就是下面调用BScroll的hello-wrapper元素的大小与子元素比较，
  若子元素比父元素大则可以滚动 -->
    <div class="hello-wrapper" ref="helloWrapper">
      <div class="hello">
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list">
          <musictitle :info="info" ></musictitle>
          <!-- 热门歌单推荐列表 -->
          <ul class="list-ul">
            <li v-for="(item,index) in music" @click="openmenuTotal(item)" :key="index">
              <img v-lazy="item.picUrl" alt=""/>
              <div class="item-content">
                {{item.name}}
              </div>
            </li>
          </ul>
          <div class="loading" v-show="loading">
            <img src="../../static/img/rage_loading.png" alt="" width=100 height=100>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Musictitle from './Musictitle/Musictitle.vue';
  export default {
    data() {
      return {
        music: {},
        info: {
          src: './static/img/aei.png',
          content: '推荐歌单'
        },
        loading: false
      };
    },
    created() {
      console.log(1);
      this.get();
      
//      this.music = data.music;
    },
    methods: {
      get() {
        this.loading = true;
        // 获取热门歌单
        this.$http.get('https://autumnfish.cn/personalized?limit='+30).then((res) => {
          this.music = res.data.result;
          console.log(this.music)
          // 数据渲染后再调用_initScroll()
          this.$nextTick(() => {
            this._initScroll();
          });
          this.loading = false;
        });
      },
      _initScroll() {
        // 如果还不存helloScroll则新建一个
        if (!this.helloScroll) {
          this.helloScroll = new BScroll(this.$refs.helloWrapper, {
            click: true
          });
        } else {
          this.helloScroll.refresh();
        }
      },
      // 将歌单里全部歌曲展示
      openmenuTotal: function (item) {
        this.$emit('openmenuTotal',item);
      },
    },
    components: {
      Musictitle,
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl";
  img[lazy=error]
    transition: all 0.5s
    width: 100%
  img[lazy=loading]
    transition: all 0.5s
    width: 100%
  img[lazy=loaded]
    transition: all 0.5s
    width: 100%
    animation: fade 0.5s
  @keyframes fade
    0%{
      opacity: 0
    }
    100%{
      opacity: 1
    }
  @-webkit-keyframes rotating{
    0% {
      -webkit-transform:rotate(0deg)
    }
    100% {
      -webkit-transform:rotate(360deg)
    }
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .hello-wrapper
    width: 100%
    position: absolute
    top:87px
    bottom:2%
    overflow: hidden
    background:#fff
    .music-list
      .loading
        width:100px
        height: 100px
        margin:10px auto 0 auto
        img
          -webkit-animation: rotating 3s  linear .3s infinite
          animation: rotating 3s linear .3s infinite    
      .list-ul li
        /*float: left;*/
        min-height: 154px
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 2.5%
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content
          height: 38px
          word-wrap:break-word
          overflow: hidden
          display: -webkit-box
          text-overflow:ellipsis
          -webkit-line-clamp:2
          -webkit-box-orient: vertical
          font-size: 12px
          color:#333
          line-height: 1.5
          letter-spacing: 1px
</style>
