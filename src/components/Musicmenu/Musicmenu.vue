// 歌单详情页面
<template>
  <transition-group name="fade" >
    <div v-show="showFlag" class="musicmenu-wrapper" key="musicmenu">
      <div class="menu-title" :style="{'background': 'rgba(7, 17, 27, '+ opacity +')'}">
        <div class="back" @click="hideTotal">
          <img src="../../../static/img/back.png" alt="" width=24 height=24>
        </div>
        <div class="title-name">
          歌单
        </div>
        <div class="setting" @click="openmusicsong()">
          <img src="../../../static/img/ph.png" alt="" width=24 height=24>
        </div>
      </div>
      <!-- 触摸滚动窗口 -->
      <div ref="menuWrapper" class="list-wrapper">
        <div>
          <header>
            <div class="menu-user">
              <div class="user-img" >
                <img :src="coverImgUrl" alt="" width="100%">
              </div>
              <div class="user-info">
                <!-- 歌单名 -->
            <span>
             {{name}}
            </span>
            <!-- 歌单作者名 -->
                <div class="user-name">
                  <p>{{creator.nickname}}</p>
                  <img src="../../../static/img/arrows_right.png" alt="">
                </div>
              </div>
            </div>
            <div class="menu-info">
              <ul class="info-ul">
                <li>
                  <div class="info-img"></div>
                  <p>14633</p>
                </li>
                <li>
                  <div class="info-img"></div>
                  <p>434</p>
                </li>
                <li>
                  <div class="info-img"></div>
                  <p>80</p>
                </li>
                <li>
                  <div class="info-img"></div>
                  <p>下载</p>
                </li>
              </ul>
            </div>
            <div class="background">
              <!-- 模糊背景img -->
              <img :src="coverImgUrl" alt="" width="100%" height="100%">
            </div>
          </header>
          <div class="menu-list">
            <div class="list-title">
              <div class="img"></div>
              <div class="title border-1px">
                播放全部
                <span>(共{{trackCount}}首)</span>
              </div>
              <div class="menu border-1px"></div>
            </div>
            <!-- 歌单列表 -->
            <ul class="list-ul">
              <li v-for="(item, index) in musiclist" @click="openmusicsong(index,item)" :key="index">
                <div class="img" :class="{'active': number===index}">
                  {{index + 1}}
                </div>
                <div class="title border-1px" >
              <span class="music-name" :class="{'active': number===index}">
                {{item.name}}
              </span>
                  <p>
                    <i v-show="item.sq"></i>
                    <span :class="{'active': number===index}">{{item.ar[0].name}} - {{item.al.name}}</span>
                  </p>
                </div>
                <div class="menu border-1px" v-show="item.movie">
                  <div class="menu-img"></div>
                </div>
                <div class="menu border-1px">
                  <div class="menu-img"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

export default{
  data() {
    return {
      showFlag: false,
      musiclist: {},
      number: -1,
      coverImgUrl: '',
      name: '',
      description: '',
      id: '',
      creator: '',
      trackCount: 0,
      opacity: 0
    };
  },
  methods: {
    show() {
      // 先清空原来歌单有的musiclist
      this.musiclist={};
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    hideTotal() {
      this.hide();
    },
    openmusicsong(index, item) {
      this.number = index;
      var obj;
      if (item) {
        obj = {
          id: item.id,
          migUrl: item.al.picUrl,
          name: item.ar[0].name,
          songname: item.name
        };
      } else {
        obj = null;
      }
      // 子组件向父组件发送obj数据，第一个参数是父组件接受的函数名，父组件用@openmusicsong接收子组件数据

      this.$emit('openmusicsong', obj);
    },
    // 获取歌单各类信息
    setmusiclist(item) {
      console.log(item)
      this._get(item);
      this.coverImgUrl = item.picUrl;
      this.name = item.name;
      this.description = item.copywriter;
      this.id = item.id;
      this.trackCount = item.trackCount;
    },
    _get(item) {
      // 获取歌单里全部的歌曲（先用for循环拿到全部的歌曲id再查找歌曲详细信息）
      this.$http.get('https://autumnfish.cn/playlist/detail?id=' + item.id).then((re) => {
        // 获取歌单作者
        this.creator = re.data.playlist.creator;
        var musicid=re.data.playlist.trackIds;
        var musicids=[];

        for(var i=0;i<musicid.length;i++){
          musicids.push(musicid[i].id)
        }
        this.$http.get('https://autumnfish.cn/song/detail?ids=' + musicids).then((res) => { 
        this.musiclist = res.data.songs;
        this.$nextTick(() => {
          this._initScroll();
        });
        })

      }).catch((error) => {
        console.log('加载歌单信息出错:' + error);
      });
    },
    _initScroll() {
      if (!this.menuScroll) {
        // 当子元素的大小大于父容器时就可以滚动
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        //  probeType: probe 侦测
        // 　　0,1 都是不侦测
        // 　　2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
        // 　　3：只要是滚动，都侦测
          probeType: 3,
          click: true
        });
        // 监听滚动位置
        this.menuScroll.on('scroll', (p) => {
          // 求滚动时y轴的绝对值四舍五入
        //  console.log(Math.abs(Math.round(p.y)));
          let myopacity = Math.abs(Math.round(p.y)) / 150;
        //  根据滚动位置设置头部框的透明度
          if (Math.round(p.y) < 0) {
            if (myopacity > 0.5) {
              this.opacity = 0.5;
            } else {
              this.opacity = myopacity;
            }
          }
        });
      } 
      // 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 menuScroll.refresh() 
      else {
        this.menuScroll.refresh();
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixin.styl';
  .musicmenu-wrapper
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    background: #ffffff
    z-index:100
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s linear
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      transform translate3d(100%, 0, 0)
    .menu-title
      position:fixed
      width:100%
      top:0
      display :flex
      z-index: 110
      .back
        flex-basis:40px
        display :inline-block
        img
          margin-top:12px
          margin-left: 12px
      .title-name
        flex :1
        display :inline-block
        height 48px
        line-height:48px
        text-align center
        font-size:18px
        color:#fff
      .setting
        flex-basis:40px
        display :inline-block
        img
          margin-top:12px
    .list-wrapper
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      overflow :hidden
      header
        position relative
        color: #fff
        padding-top:48px
        overflow hidden
        background: rgba(7, 17, 27, 0.5)
        .menu-user
          margin:16px 20px 0 20px
          display:flex
          .user-img
            flex-basis:150px
          .user-info
            padding-left:10px
            padding-right:20px
            flex:1
            span
              display:block
              margin-top: 20px
              letter-spacing: 1px
              line-height :1.3
            .user-name
              p
                display:inline-block
                vertical-align:top
                line-height:30px
                height: 30px
                font-size:18px
              img
                vertical-align:top
                height:24px
                margin-top 3px
        .menu-info
          .info-ul
            margin-bottom:8px
            display:flex
            li
              flex:1
              .info-img
                height:48px
                background-size:24px 24px
                background-repeat:no-repeat
                background-position:center center
              p
                text-align:center
                line-height: 20px
                font-size:14px
                color:#c2bebc
            li:nth-child(1)
              .info-img
                background-image:url('../../../static/img/list-3.png')
            li:nth-child(2)
              .info-img
                background-image:url('../../../static/img/list-2.png')
            li:nth-child(3)
              .info-img
                background-image:url('../../../static/img/list-1.png')
            li:nth-child(4)
              .info-img
                background-image:url('../../../static/img/list-4.png')
        .background
          position absolute
          top: 0
          left 0
          width 100%
          height 100%
          z-index -1
          filter blur(10px)
      .menu-list
        background:#fbfcfd
        .list-title
          display:flex
          .img
            flex-basis:48px
            height:48px
            background:url(../../../static/img/start.png) no-repeat
            background-position:center center
            background-size: 24px 24px
          .title
            flex :1
            line-height:48px
            font-size: 18px
            border-1px(#ddd)
            span
              font-size:14px
              color:#949494
          .menu
            flex-basis:48px
            height:48px
            background:url(../../../static/img/menu.png) no-repeat
            background-position:center center
            background-size: 24px 24px
            border-1px(#ddd)
        .list-ul
          overflow: hidden
          
          li
            display:flex
            .img
              &.active
                color: #d33a31
              flex-basis:48px
              text-align :center
              line-height: 56px
              color:#999999
            .title
              flex :1
              border-1px(#ddd)
              .music-name
                &.active
                  color: #d33a31
                line-height: 32px
                font-size: 18px
                color :#333
              p
                font-size: 16px
                color:#949494
                i
                  display :inline-block
                  width:16px
                  height:16px
                  background-image:url(../../../static/img/sq.png)
                  background-position:center center
                  background-size: 16px 16px
                  background-repeat:no-repeat
                  vertical-align:middle
                span
                  &.active
                    color: #d33a31
                  vertical-align:middle
                  font-size:12px
            .menu
              flex-basis:48px
              margin-top: 12px
              border-1px(#ddd)
              .menu-img
                width:36px
                height:26px
                background-position:center center
                background-size: 18px 18px
                background-repeat:no-repeat
                border:1px solid #d3d4da
                border-radius:4px
            .menu:nth-child(3)
              .menu-img
                background-image:url(../../../static/img/aee.png)
            .menu:nth-child(4)
              .menu-img
                background-image:url(../../../static/img/more.png)
</style>
