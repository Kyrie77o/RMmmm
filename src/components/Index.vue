<template>
  <div style="width: 100%;height: 100%;">
    <div class="hello-wrapper" ref="helloWrapper">
      <div class="hello">
        <div class="swipe-wrapper">
          <swipe class="my-swipe">
            <swipe-item class="slide1">
              <img src="../assets/1df.png" alt="">
            </swipe-item>
            <swipe-item class="slide2">
              <img src="../assets/2ds.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/3ds.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/4fd.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/5ds.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/6ds.jpg" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/7ds.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/8ds.jpg" alt="">
            </swipe-item>
          </swipe>
        </div>
        <div class="cards border-1px">
          <div class="card-li">
            <!-- backgroundSize要大写S，不能写成background-size -->
            <div class="circle" style="background:url(../static/img/FM.png) no-repeat;
          backgroundSize:50px 50px;
          backgroundPosition: center;">
            </div>
            <p>私人FM</p>
          </div>
          <div class="card-li">
            <div class="circle">
              <span>20</span>
            </div>
            <p>每日歌曲推荐</p>
          </div>
          <div class="card-li">
            <div class="circle" style="background: url(../static/img/ph1.png) no-repeat;
          backgroundSize:50px 50px;
          backgroundPosition: center;">
            </div>
            <p>云音乐热歌榜</p>
          </div>
        </div>
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
  import { Swipe, SwipeItem } from 'vue-swipe';
  import BScroll from 'better-scroll';
  import Musictitle from './Musictitle/Musictitle.vue';

//  import data from '../../data.json';
  
  export default {
    name: 'hello',
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
        this.$http.get('https://autumnfish.cn/personalized?limit='+6).then((res) => {
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
      show: function (item) {
        this.$refs.musicsong.show(item);
      }
    },
    components: {
      Swipe,
      SwipeItem,
      Musictitle,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  
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
    bottom:0
    overflow: hidden
    background:#fff
    .my-swipe
      height: 139px
      color: #fff
      font-size: 30px
      text-align: center
      img
        width: 100%
        height 100%
    .cards
      border-1px(#ddd)
      .card-li
        display: inline-block
        width: 30%
        margin-left: 2%
        margin-top: 10px
        margin-bottom: 10px
        .circle
          position: relative;
          width: 58%
          margin: 0 auto
          height: 0
          padding-top: 58%
          border-radius: 50%
          border: 1px solid #d33a31
          span
            position: absolute
            left: 50%
            top:50%
            margin-left: -15px
            margin-top: -15px
            width: 30px
            height: 30px
            line-height: 30px
            text-align: center
            font-size: 20px
            color: #d33a31
        p
          color: #333
          font-size: 10px
          text-align: center
          margin-top: 5px
     
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
