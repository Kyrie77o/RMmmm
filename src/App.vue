<template>
  <div id="app">
    <header>
      <musicsearch @musicsearch="show1" @openmusicsong="show1"></musicsearch>
      <ul>
        <router-link to="/index" activeClass="active" tag="li" >个性推荐</router-link>
        <router-link to="/music" activeClass="active" tag="li" >歌单</router-link>
        <router-link to="/station" activeClass="active" tag="li">主播电台</router-link>
        <router-link to="/rank" activeClass="active" tag="li" >排行榜</router-link>
      </ul>
      
    </header>
    <!-- 切换路由时缓存页面 -->
    <keep-alive>
    <router-view ref="menu" @openmenuTotal='openmenuTotal' @openmv='openmv'></router-view>
    </keep-alive>
    <musicmenu ref="musicmenu" v-on:openmusicsong="show1"></musicmenu>
    <Musicsong ref="musicsong"></Musicsong>
    <Video ref="ismv"> </Video>
  </div>
  
</template>

<script>
import Musicsong from './components/Musicsong/Musicsong.vue';
import musicsearch from './components/musicsearch/musicsearch';
import Musicmenu from './components/Musicmenu/Musicmenu.vue';
import Video from './components/Video.vue';
export default {
  data() {
    return {
      Classmove: 'classmove0',
      show: true
    };
  },
  methods: {
    show1: function (item) {
      console.log(item);
      this.$refs.musicsong.show(item);
      },
     openmenuTotal: function (item) {
        this.$refs.musicmenu.show();
        this.$refs.musicmenu.setmusiclist(item);
      },
      get: function(){
        console.log("666");
        this.$refs.menu.get();
      },
      openmv: function (item) {
        this.$refs.ismv.show();
        this.$refs.ismv.getmvurl(item);
        
      }
  },
  components: {
    musicsearch,
    Musicsong,
    Musicmenu,
    Video,
   
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  header
    
    ul
      display: flex
      li
      // flex使子元素都有相同的宽度，填满父元素，要和display：flex一起使用
        flex:1
        display: inline-block
        box-sizing:border-box
        width: 100px
        height:40px
        font-size: 14px
        text-align: center
        line-height: 40px
        background: #f8f8f9
        color: #333
        // &表示上一级（相当于ul>li>.active）
        &.active
          background-color: white
          box-shadow: 0 0px 10px 5px #ce3d3e 
          -webkit-box-shadow:0 0px -10px 5px #ce3d3e 
          z-index :1
          font-size: 18px

</style>
