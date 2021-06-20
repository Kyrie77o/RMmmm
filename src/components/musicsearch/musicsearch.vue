<template>
  <div>
    <div class="search">
      <div class="yuyin"></div>
      <div class="input" @click="showlist">
        <input type="text" value="" placeholder="搜索音乐、歌曲、电台" id="inputvalue" @keydown="search">
      </div>
      <!-- 取消框 -->
      <div class="music" @click="hidelist">
        <span v-show="lshow">取消</span>
        <!-- 点击打开musicsong组件 -->
        <img src="../../../static/img/ph.png" alt="" v-show="!lshow" @click="openmusicsong">
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="searchresult" v-show="lshow">
      <ul class="list-ul">
        <li v-for="(item, index) in list" @click="opensong(item)" :key="index">
          <div class="img" :class="{'active': number===index}">
            {{index + 1}}
          </div>
          <div class="title border-1px" >
              <span class="music-name" :class="{'active': number===index}">
                {{item.name}}
              </span>
            <p>
              <i v-show="item.sq"></i>
              <span :class="{'active': number===index}">{{item.artists[0].name}} - {{item.album.name}}</span>
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
</template>

<script type="text/ecmascript-6">
export default{
  data() {
    return {
      list: [],
      number: -1,
      lshow: false
    };
  },
  methods: {
    showlist() {
      this.lshow = true;
    },
    hidelist() {
      document.getElementById('inputvalue').value = '';
      this.lshow = false;
    },
    openmusicsong() {
      var obj = null;
      this.$emit('openmusicsong', obj);
    },
    opensong(item) {
      if (item) {

      } else {
        item = null;
      }
      var obj = {
        id: item.id,
        migUrl: item.album.picUrl,
        name: item.name,
        songname: item.artists[0].name,
        audiosrc: item.mp3Url
      };
      this.lshow = false;
      console.log(obj);
      // 子组件发obj值给父组件（app.vue)，父组件通过@musicsearch=“调用自己的函数名”接收obj的值
      this.$emit('musicsearch', obj);
    },
    search() {
      var that=this;
      var name = document.getElementById('inputvalue').value;
      // 获取搜索歌曲的列表
      this.$http.get('https://autumnfish.cn/search?keywords=' + name).then((res) => {
        var that=this;
        var data = res.data;
        var obj = data.result.songs;
        console.log(obj);
        console.log(obj.name);
        that.list=obj;
        // 获取歌曲详情
         
            
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .search
    background:linear-gradient(to right ,#d43c33,black)
    height:46px
    display :flex
    .yuyin
      flex-basis:40px
      background:url(../../../static/img/music.png) no-repeat;
      background-position:center center
      background-size: 32px 32px
    .input
      flex:1
      display: flex
      justify-content: center
      input
        width:80%
        height:30px
        border-radius:5px
        margin-top:8px
        color:#c6c7c9
        font-size:12px
        padding-left:60px
    .music
      flex-basis: 40px
      text-align:center
      span
        text-align:center
        line-height: 46px
        color: #ffffff
      img
        width: 20px
        height: 20px
        margin-left: 10px;
        margin-top: 13px;
  .searchresult
    position :absolute
    top: 46px
    left:0
    bottom:0
    width:100%
    background: #ffffff
    z-index:10
    .list-ul
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
