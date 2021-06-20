<!--  -->
<template>
<div v-if="isshow">
  <div class="bg"></div>
  <div class="mvbox" @click="hidemv">
    <video :src="mvurl"  controls="controls" class="mv">
      </video>
  </div>
</div>
</template>

<script>
export default {
 data () {
 return {
   mvurl:"",
   isshow:false,
 }
 },
 methods:{
     show(){
       this.isshow=true;
       
     },
     hidemv(){
       this.isshow=false;

     },
     getmvurl: function(item){
       this.$http.get('https://autumnfish.cn/mv/url?id='+item.id).then((res)=>{
          this.mvurl=res.data.data.url;

       });
       

     }

 },
 components:{
 }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mvbox
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index:20
    background:transparent
    
    .mv
      width :100%
      opacity: 1
      z-index :100
  .bg
    z-index:10
    overflow: hidden
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    background:#fff
    opacity: 0.5

</style>
