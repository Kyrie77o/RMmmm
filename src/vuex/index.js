// 使用vuex先要全局安装vuex（npm install --save vuex）
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        playing: true,
        song:{},
        songname:"暂无歌曲",
        name:"",
        audiourl:"",
        albumPic: '../../../static/img/placeholder_disk_play_song.png',
        mwidth: 0,//当前播放的时长

    },
    // 更改vuex的store中的状态的唯一方法是提交mutation。
    mutations:{
        add:(state,payload)=>{
            console.log(payload);
            state.song={};
            state.songname="";
            state.song=payload;
            state.songname=payload.songname;
            
        },
        pic:(state,payload)=>{
            state.albumPic='';

            state.albumPic=payload;
        },
        ado:(state,payload)=>{
            state.audiourl=payload;
            console.log(state.audiourl);
        },
        playmusic:(state,payload)=>{
            state.playing=payload;
        },
        changemwidth:(state,payload)=>{
            state.mwidth=payload;
        }

    },
    // 需要从store中的state派生出一些状态而使用就用getter
    getters:{
        activelist(state){
            // filter过滤器将每个item的值 item。isChecked==false挑选出来
            return state.list.filter(item=>item.isChecked==false)

        },
        completedlist(state){
            return state.list.filter(item=>item.isChecked==true) 
        },
        activenumber(state){
            return state.list.filter(item=>item.isChecked==false).length
        }
    }
})
export default store;