<template>
  <transition-group name="fade" >
    <div class="musicsong-wrapper" v-show="showFlag" key="musicsong" >
      <div class="scroll-warpper">
        <div class="menu-title border-1px">
          <div class="back" @click="hide">
            <img src="../../../static/img/back.png" alt="" width=24 height=24>
          </div>
          <div class="title-name">
            {{song.name}}-
            {{songname}}
          </div>
          <div class="setting" >
            <img src="../../../static/img/list-1.png" alt="" width=24 height=24>
          </div>
        </div>
        <div class="rotate"  ref="rotate" @click="showlyric">
          <div class="rotate-img" :class="{'cd-paly':!playing}">
            <img src="../../../static/img/stick_bg.png" alt="" height=140 >
          </div>
          <div class="rotate-mid" :class="{'cd-rotate':!playing}" >
            <img :src="albumPic + '?param=500y500'" alt="">
          </div>
        </div>
        <div class="bottom">
          <div class="menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <!-- 时间条框 -->
          <div class="progress">
            <progressslider  :mwidth="mwidth" @change="setTime"></progressslider>
            <div class="time">
              <span id="cur">{{time.start}}</span>
              <span id="total">{{time.end}}</span>
            </div>
          </div>
          <div class="action">
            <span></span>
            <span @click="pre"></span>
            <span @click="togglePlay" :class="{'isplay':playing,'noplay':!playing}"></span>
            <span @click="next"></span>
            <span @click="showlist"></span>
          </div>
        </div>
      </div>
      <div class="bg">
        <!-- ?param可以设定请求图片的样式 -->
        <img :src="albumPic + '?param=500y500'" alt="" width="100%" height="100%">
      </div>
      <!-- 音乐标签 -->
      <div class="">
        <audio :src="audiourl" id="audioPlay" @canplay="canPlaySong"
               @timeupdate="updateTime"
        ></audio>
      </div>
      <div class="tip" v-show="tipshow">
        <div class="content">
          歌曲加载错误！
        </div>
        <div class="fun" @click="tipshow = !tipshow">
          确定
        </div>
      </div>
      <!-- 历史播放记录 -->
      <div class="list">
        <transition name="fade">
          <div class="list-bg" @click="hidelist"  v-show="listshow"></div>
        </transition >
        <transition name="fold">
          <div class="list-song" v-show="listshow">
            <div class="title" @click="nulllist">清空</div>
            <div ref="songlistWrapper" class="ul-song">
              <ul>
                <li v-for="(item,index) in list" class="li border-1px" @click="playsong(index,item)" :key="index">
                  <div :class="{'active':item.songname === song.songname}">
                    <span>{{index}}</span>
                    <span>{{item.songname}}</span>
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <!-- 歌词框 -->
      <div class="musiclyric" v-show="lyricisshow" @click="hidelyric">
                
                <div class="turemusiclyric" ref="turemusiclyric">
                <li v-for="(item,index) in lyric" :key="index" 
                :style="{'font-size':(index==currentRow?'large':'xx-small') ,'color':(index==currentRow?'white':'#fff'),
                'box-shadow':(index==currentRow?'0 0px 10px 5px white inset':'')}">
                    {{item.text}}
            
                </li>
                </div>
      </div>
    </div>
  </transition-group>
</template>

<script type="text/ecmascript-6">
  import Progressslider from '../Progressslider/Progressslider.vue';
  import {changeTime} from '../../common/js/changeTime';
  import BScroll from 'better-scroll';
  import {mapGetters} from "vuex";
  import {mapState} from "vuex";
  export default{
    data() {
      return {
        index: -1,
        lyricisshow:false,
        listshow: false,
        showFlag: false,
        tipshow: false,
        mwidth:0,
        lyric:[],
        currentTime:0,
        currentRow:0,
        time: {
          start: '00:00',
          end: '00:00'
        },
        list: []
      };
    },
    watch: {
                
                currentTime(n,o){
                this.lyric.forEach((element, index) => {
                if (Math.ceil(this.currentTime) == element.time) {
                    this.$refs.turemusiclyric.style.top=-index*10+20+'vh';
                    this.currentRow=index
                }})
            }},
    computed:{
      ...mapState(["songname"]),
      ...mapState(["albumPic"]),
      ...mapState(["audiourl"]),
      ...mapState(["song"]),
      ...mapState(["playing"]),


    },
    created() {
      this.$nextTick(() => {
        this.canPlaySong();
      });
    },
    methods: {
      pre() {
        if (this.index > 0) {
          console.log('pre');
          this.index--;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
        else if(this.index=0){
          this.index=this.list.length-1;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
      },
      next() {
        if (this.index < this.list.length - 1) {
          console.log('next');
          this.index++;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
        else if(this.index=this.list.length - 1){
          this.index=0;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
      },
      _initScroll() {
        if (!this.songlistScroll) {
          this.songlistScroll = new BScroll(this.$refs.songlistWrapper, {
            click: true
          });
        } else {
          this.songlistScroll.refresh();
        }
      },
      nulllist() {
        this.list.splice(0, this.list.length);
        this.hide();
      },
      hidelist() {
        this.listshow = false;
      },
      showlist() {
        this.listshow = true;
      },
      // 接收组件发来的item
      show(item) {
        // 显示musicsong组件
//      this.albumPic = item.al.picUrl;
        this.showFlag = true;
        if (item) {
          let index = 0;
          var thisindex = 0;
          for (let i in this.list) {
            if (this.list[i].songname === item.songname) {
              thisindex = i;
              index++;
            }
          }
          if (index === 0) {
            this.list.push(item);
            this.$nextTick(() => {
              this._initScroll();
            });
            this.playsong(this.list.length - 1, item);
          } else {
            this.playsong(thisindex, item);
          }
        }
      },
      playsong(index, item) {
        console.log(index);
        console.log(item.id);
        var that=this;
        this.hidelist();
        this.$store.commit("add",item);
        // 获取图片的url
        this.$http.get("https://autumnfish.cn/song/detail?ids="+item.id).then((res) => {
       console.log(res.data.songs[0].al.picUrl)
         var _albumPic = res.data.songs[0].al.picUrl;
        // 提交图片url给vuex
          this.$store.commit("pic",_albumPic);
      });
        this.index = index;
        
        // 获取歌曲的url
        this.$http.get("https://autumnfish.cn/song/url?id="+item.id).then((res) => {
       if (res.data.data[0].url !== undefined) {
          var audiourl = res.data.data[0].url;
          this.$store.commit("ado",audiourl);
          this.$nextTick(() => {
            this.canPlaySong();
            console.log(123)
          });
        } else {
          this.get(item);
          this.canPlaySong();
        }
      });
      this.$http.get("https://autumnfish.cn///lyric?id="+item.id).then((res) => {
          this.lyric=[];
          this.formatLyric(res.data.lrc.lyric)
      });
       

      },
      canPlaySong() {
        document.getElementById('audioPlay').play();
        this.$store.commit("playmusic",false);
      },
      get(item) {
        this.$http.get("https://autumnfish.cn/song/url?id="+item.id).then((res) => {
          console.log(res);
          if (res.data.data[0].url === null) {
            console.log('歌曲加载错误');
          } else {
            var audiourl = res.data.data[0].url;
            this.$store.commit("ado",audiourl);
            this.canPlaySong();
            this.$nextTick(() => {
              this.canPlaySong();
            });
          }
        }).catch((error) => {
          console.log('加载歌曲信息出错:' + error);
        });
      },
      hide() {
        this.showFlag = false;
      },
      // 判断是播放还是暂停状态
      togglePlay() {
        if (this.playing === false) {
          document.getElementById('audioPlay').pause();
          this.$store.commit("playmusic",true);
        } else {
          document.getElementById('audioPlay').play();
          this.$store.commit("playmusic",false);
        }
      },
      updateTime(e) {
        this.currentTime=e.target.currentTime;
        var myaudio = document.getElementById('audioPlay');
        var time = parseInt(myaudio.currentTime);// 现在播放的时间
        var timelength = myaudio.duration;
        // isNaN函数检查是否为非数字
        if (isNaN(timelength)) {
          
        } else {
          this.tipshow = false;// 提示框
          this.mwidth = time / timelength * 100;
          this.time.start = changeTime(time);// 现在播放的时间
          this.time.end = changeTime(timelength);// 总的播放时间
          if (timelength === time) {
            this.togglePlay();
          }
        }
      },
      setTime(value) {
        var myaudio = document.getElementById('audioPlay');
        var timelength = myaudio.duration;
        myaudio.currentTime = timelength * value / 100;// 将时间赋给audio的当前播放时间
      },
      showlyric(){
        this.lyricisshow=true;
        this.$refs.rotate.style.opacity=0

      },
      hidelyric(){
        this.lyricisshow=false;
        this.$refs.rotate.style.opacity=1
      },
      formatLyric:function(text) {
                var that=this;
                let arr = text.split("["); 
                let row = arr.length; //获取歌词行数
                for (let i = 0; i < row; i++) {
                let temp_row = arr[i]; //现在每一行格式大概就是这样"[02:10.00]hello world";
                let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
                if(temp_arr.length!=1&&temp_arr[1].toString()!="\n"){//判断歌词是否只有一个换行符号
                    
                let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
                //再对剩下的歌词时间进行处理
                
                temp_arr.forEach(element => {
                let obj = {};
                let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
                let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
                obj.time = s;
                obj.text = text;
                that.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
                
                    });}
                }
                that.lyric.sort(); 
                
                },
    },
    components: {
      Progressslider
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
  .musicsong-wrapper
    overflow: hidden
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index:100
    background:#ceacac
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s linear
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      transform translate3d(100%, 0, 0)
    .musiclyric
      
      position:absolute
      top:6.5vh
      width:100%
      height:50vh
      z-index :200
      text-align: center
      overflow:auto
      li
        list-style-type: none
        text-align: center
        padding: 0
        margin: 0
        height: 10vh
        line-height :10vh
      .turemusiclyric
        position: absolute
        width:100%
        color: #FFFFFF
    .menu-title
      display :flex
      border-1px(#ddd)
      height :6.5vh
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
    .rotate
      height:50vh
      opacity:1
      .rotate-img
        position:relative
        width: 94px
        margin:0 auto;
        padding-left:56px
        z-index:2
        img
          transition:all 0.3s
          transform-origin: left top;
          -webkit-transform: rotate(-20deg);
          -moz-transform: rotate(-20deg);
          -ms-transform: rotate(-20deg);
          transform: rotate(-20deg);
        &.cd-paly
          img
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
      .rotate-mid
        background-image:url(/../static/img/cd.png) 
        background-size:290px 290px
        background-position:center center 
        position:relative
        width:290px
        height :290px
        margin:-60px auto 0
        z-index:1
        img
          display:block
          position:absolute
          width:195px
          height:195px
          left:50%
          top:50%
          margin-top: -97px
          margin-left:-97px
          border-radius:100%
    .bottom
      width:100%
      margin-top:60px
      .menu
        display:flex
        margin-left:30px
        margin-right:30px
        span
          flex:1
          display:inline-block
          height:60px
          background-repeat:no-repeat
          background-position:center center
        span:nth-child(1)
          background-image:url(../../../static/img/collect.png)
          background-size:30px 30px
        span:nth-child(2)
          background-image:url(../../../static/img/down.png)
          background-size:24px 24px
        span:nth-child(3)
          background-image:url(../../../static/img/chat.png)
          background-size:24px 24px
        span:nth-child(4)
          background-image:url(../../../static/img/morew.png)
          background-size:24px 24px
      .progress
        width:60%
        padding-left:12%
        padding-right:12%
        margin:0 auto
        position:relative
        .time
          span
            position: absolute;
            top: 25%;
            font-size:12px
            opacity: .5;
            color: #ffffff
          #cur
            left:0
          #total
            right:0
      .action
        display:flex
        span
          flex:1
          display:inline-block
          height:60px
          background-repeat:no-repeat
          background-position:center center
          &.isplay
            background-image:url(../../../static/img/play.png)
            background-size:60px 60px
          &.noplay
            background-image:url(../../../static/img/pause.png)
            background-size:60px 60px
        span:nth-child(1)
          background-image:url(../../../static/img/seq.png)
          background-size:60px 60px
        span:nth-child(2)
          background-size:34px 34px
          background-image:url(../../../static/img/pre_l.png)
        span:nth-child(4)
          background-image:url(../../../static/img/pre_r.png)
          background-size:34px 34px
        span:nth-child(5)
          background-image:url(../../../static/img/list.png)
          background-size:60px 60px
  .bg
    position absolute
    top: 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(60px)
    img
      min-height:667px
  .tip
    position:absolute
    width:200px
    height 100px
    left:50%
    top:50%
    margin-left: -100px
    margin-top: -50px
    background:#fff
    z-index:10000
    border-radius: 5px
    .content
      border-1px(#ddd)
      color:#333
      height: 70px
      text-align center
      line-height:70px
      font-size:14px
    .fun
      text-align:center
      color:#333
      line-height:30px
      font-size:14px
  .list
    .list-bg
      position:absolute
      left :0
      top:0
      width:100%
      height:100%
      z-index:200
      background:rgba(0,0,0,0.4)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.3s linear
        opacity: 1
      &.fade-enter, &.fade-leave-active
        opacity: 0
    .list-song
      width:100%
      position:fixed
      left:0
      bottom:0
      z-index:201
      background:rgba(255,255,255,0.8)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
        opacity: 1
        transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 100%, 0)
        opacity: 0
      .title
        width:90%
        margin:0 auto
        height:50px
        line-height:50px
      .ul-song
        max-height:300px
        overflow: hidden
        li
          padding-left: 10px
          margin:0 auto
          height:50px
          line-height:50px
          .active
            span
              color: #d33a31
          span
            color: #333
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
  .cd-rotate
    -webkit-animation: rotating 10s  linear .3s infinite
    animation: rotating 10s linear .3s infinite
</style>
