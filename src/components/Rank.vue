<template>

  <div class="hello-wrapper0" ref="helloWrapper0">
    <!-- 一定要在调用BScroll的模块的下面建一个空的承载器<div> ,如下的hellodiv-->
  <div div class="hello">
    <!-- 内地排行榜 -->
    <musictitle :info="info1" style="margin-bottom:20px"></musictitle>
    <div class="hello-wrapper1" ref="helloWrapper1" @touchstart="stop0">
      <div class="hello1">
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list1">
          <!-- 热门歌单推荐列表 -->
          <ul class="list-ul1">
            <li v-for="(item,index) in mvlist1" @click="openmv(item)" :key="index">
              <img v-lazy="item.cover" alt=""/>
              <div class="item-content1">
                {{index+1}}--{{item.artistName}}
              </div>
            </li>
          </ul>
          <div class="loading1" v-show="loading1">
            <img src="../../static/img/rage_loading.png" alt="" width=100 height=100>
          </div>
        </div>
      </div>
    </div>
    <!-- 日本排行榜 -->
    <musictitle :info="info2" style="margin-bottom:20px;margin-top: 20px"></musictitle>
    <div class="hello-wrapper2" ref="helloWrapper2" @touchstart="stop0">
      <div class="hello2">
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list2">
          <!-- 热门歌单推荐列表 -->
          <ul class="list-ul2">
            <li v-for="(item,index) in mvlist2" @click="openmv(item)" :key="index">
              <img v-lazy="item.cover" alt=""/>
              <div class="item-content2">
                {{index+1}}--{{item.artistName}}
              </div>
            </li>
          </ul>
          <div class="loading2" v-show="loading2">
            <img src="../../static/img/rage_loading.png" alt="" width=100 height=100>
          </div>
        </div>
      </div>
    </div>
    <!-- 欧美排行榜 -->
    <musictitle :info="info3" style="margin-bottom:20px;margin-top: 14px"></musictitle>
    <div class="hello-wrapper3" ref="helloWrapper3" @touchstart="stop0">
      <div class="hello3">
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list3">
          <!-- 热门歌单推荐列表 -->
          <ul class="list-ul3">
            <li v-for="(item,index) in mvlist3" @click="openmv(item)" :key="index">
              <img v-lazy="item.cover" alt=""/>
              <div class="item-content3">
                {{index+1}}--{{item.artistName}}
              </div>
            </li>
          </ul>
          <div class="loading3" v-show="loading3">
            <img src="../../static/img/rage_loading.png" alt="" width=100 height=100>
          </div>
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
        mvlist1: {},
        mvlist2: {},
        mvlist3: {},
        info1: {
          src: './static/img/ph1.png',
          content: '内地mv排行榜'
        },
        info2: {
          src: './static/img/ph1.png',
          content: '日本mv排行榜'
        },
        info3: {
          src: './static/img/ph1.png',
          content: '欧美mv排行榜'
        },
        loading1: false,
        loading2: false,
        loading2: false
      };
    },
     created() {
      console.log(1);
      this.get();
      
//      this.music = data.music;
    },
 methods:{
  show() {
        this.$emit('musicsearch', obj);
      },
  get() {
        this.loading1 = true;
        // 获取热门歌单
        this.loading2 = true;
        this.loading3 = true;
        this.$http.get('https://autumnfish.cn/top/mv?area=内地&limit='+30).then((res) => {
          this.mvlist1=res.data.data;
          console.log(this.mvlist1);
          this.$nextTick(() => {
            this._initScroll1();
          });
          this.loading1 = false;
        });
        this.$http.get('https://autumnfish.cn/top/mv?area=日本&limit='+30).then((res) => {
          this.mvlist2=res.data.data;
          // console.log(this.mvlist2);
          this.$nextTick(() => {
            this._initScroll2();
          });
          this.loading2 = false;
        });
        this.$http.get('https://autumnfish.cn/top/mv?area=欧美&limit='+30).then((res) => {
          this.mvlist3=res.data.data;
          // console.log(this.mvlist2);
          this.$nextTick(() => {
            this._initScroll3();
            this._initScroll0();
          });
          this.loading3 = false;
        });
        
      },
      _initScroll0() {
        // 如果还不存helloScroll则新建一个
        if (!this.helloScroll0) {
          this.helloScroll0 = new BScroll(this.$refs.helloWrapper0, {
            click: true
          });
        } else {
          this.helloScroll0.refresh();
        }
      },
      _initScroll1() {
        // 如果还不存helloScroll则新建一个
        if (!this.helloScroll1) {
          this.helloScroll1 = new BScroll(this.$refs.helloWrapper1, {
            click: true
          });
          console.log(333)
        } else {
          this.helloScroll1.refresh();
        }
      },
      _initScroll2() {
        // 如果还不存helloScroll则新建一个
        if (!this.helloScroll2) {
          this.helloScroll2 = new BScroll(this.$refs.helloWrapper2, {
            click: true
          });
          console.log(333)
        } else {
          this.helloScroll2.refresh();
        }
      },
      _initScroll3() {
        // 如果还不存helloScroll则新建一个
        if (!this.helloScroll3) {
          this.helloScroll3 = new BScroll(this.$refs.helloWrapper3, {
            click: true
          });
        } else {
          this.helloScroll3.refresh();
        }
      },
      // 将歌单里全部歌曲展示
      openmenuTotal: function (item) {
        this.$emit('openmenuTotal',item);
      },
      stop0(e){
        // 调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点
        // 防止滚动里面的BScroll外面的也一起滚动
         e.stopPropagation();
      },
      openmv: function (item){
        this.$emit('openmv',item);
      },
    },
 components:{
   Musictitle,
 }
}

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
.hello-wrapper0
  width: 100%
  position: absolute
  top:87px
  bottom:0
  overflow: hidden
  background:#fff
  
  .hello-wrapper1
    width: 100%
    height:30vh
    overflow: hidden
    background:#fff
    .music-list1
      
      .loading1
        width:100px
        height: 100px
        margin:10px auto 0 auto
        img
          -webkit-animation: rotating 3s  linear .3s infinite
          animation: rotating 3s linear .3s infinite    
      .list-ul1 li
        /*float: left;*/
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 10px
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content1
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
  .hello-wrapper2
    width: 100%
    height:30vh
    overflow: hidden
    background:#fff
    .music-list2
      
      .loading2
        width:100px
        height: 100px
        margin:10px auto 0 auto
        img
          -webkit-animation: rotating 3s  linear .3s infinite
          animation: rotating 3s linear .3s infinite    
      .list-ul2 li
        /*float: left;*/
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 10px
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content2
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
  .hello-wrapper3
    width: 100%
    height:30vh
    overflow: hidden
    background:#fff
    .music-list3
      
      .loading3
        width:100px
        height: 100px
        margin:10px auto 0 auto
        img
          -webkit-animation: rotating 3s  linear .3s infinite
          animation: rotating 3s linear .3s infinite    
      .list-ul3 li
        /*float: left;*/
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 10px
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content3
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

