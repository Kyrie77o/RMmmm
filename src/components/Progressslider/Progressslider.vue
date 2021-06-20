// 进度条组件
<template>
  <div class="progressslider-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
       @touchcancel="handleTouchEnd">
    <div class="progressslider-track"></div>
    <div class="progressslider-fill" :style="wStyle"></div>
    <div class="progressslider-thumb" :style="lStyle"></div>
  </div>
</template>

<script type="text/ecmascript-6">
 import {mapState} from "vuex";
export default{
  props:['mwidth'],
  data() {
    return {
      mymwidth: this.mwidth,
      help:false,
      wStyle: {
        width: '0%'
      },
      lStyle: {
        left: '0%'
      },
      disabled: false
    };
  },
  watch: {
    mwidth(val) {
      // 如果触发了触摸函数就不改变mymwidth
      if(!this.help){
      // console.log(val);
      this.mymwidth = val;
      }
    },
    mymwidth(val){
      this.wStyle.width = val + '%';
      this.lStyle.left = val + '%';

    }
  },
  methods: {
    // e.touches[0]表示手指移动的距离,移动端用touch函数代替了click函数
    handleTouchStart(e) {
       this.help=true;//告诉watch此事件已经触发
      if (this.disabled) return;
      // 手指按下添加事件，touchstart和touchmove事件都触发this.handleTouchMove来改变时间条位置
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchstart', this.handleTouchMove);
      document.addEventListener('touchup', this.handleTouchEnd);
      document.addEventListener('touchend', this.handleTouchEnd);
      document.addEventListener('touchcancel', this.handleTouchEnd);

      e.preventDefault();
    },
    handleTouchEnd(e) {
      // 手指起来或者系统取消告诉watch又可以继续监听用mwidth赋值给mymwidth
      this.help=false;
      if (this.disabled) return;
      this.$emit('change', this.mymwidth);
      // console.log(123);
      // 手指起来或者系统取消触发以下函数删除之前添加的事件
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchstart', this.handleTouchMove);
      document.removeEventListener('touchup', this.handleTouchEnd);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('touchcancel', this.handleTouchEnd);


    },
    handleTouchMove (e) {
      this.setValue(e.touches[0]);
      // console.log('touchmove123');
    },
    setValue(e) {
      let value = (e.clientX - this.$el.getBoundingClientRect().left) / this.$el.offsetWidth * 100;
      value = parseFloat(value.toFixed(5));
      // console.log(value);
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      }
      this.mymwidth = value;


    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.progressslider-wrapper
  width: 100%
  position: relative
  height: 24px
  margin-bottom: 16px
  display: flex
  cursor: default
  outline: none
  .progressslider-track
    width:100%
    position: absolute
    height: 2px
    left: 0
    top: 50%
    margin-top: -1px
    background-color: #bdbdbd
  .progressslider-fill
    position: absolute
    height: 2px
    left: 0
    top: 50%
    margin-top: -1px
    background:linear-gradient(to right,white,#ce3d3e)
  .progressslider-thumb
    position: absolute
    top: 50%
    width: 12px
    height: 12px
    box-shadow: 0 0px 10px 5px #ce3d3e
    background:linear-gradient(#ce3d3e,#ce3d3e)
    color: #ce3d3e
    border-radius: 50%
    -webkit-transform: translate(-50%,-50%)
    transform: translate(-50%,-50%)
    -webkit-transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1)
    transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1)
    cursor: pointer
  .progressslider-thumb:hover
    width: 20px
    height: 20px
</style>
