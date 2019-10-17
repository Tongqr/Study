import Vue from 'vue'
import {addCollectData,collectionInfoData,delCollectionData} from '../../../api/user/collection.js';

let modules={
    namespaced:true,
    state:{
        collectionList:[],
        cpageInfo:{}
    },
    mutations:{
        addCollect(state,payload){
            addCollectData(payload.uid,payload.gid).then(res=>{
                // console.log(res)
                if(payload&&payload.success){
                    payload.success(res)
                }
            })

        },
        //收藏详情
        collectionInfo(state,payload){
            collectionInfoData(payload.uid).then(res=>{
                console.log(res)
                if(res.code==200){
                    state.collectionList=res.data;
                    state.cpageInfo=res.pageinfo;
                }else{
                    state.collectionList=[];
                    state.cpageInfo={}
                }
                if(payload&&payload.success){
                    payload.success()
                }
            })
        },
        getColletionPage(state,payload){
            collectionInfoData(payload.uid,payload.page).then(res=>{
                // console.log(res)
                if(res.data==200){
                    state.collectionList.push(...res.data)
                    console.log(state.collectionList)
                }
            })
        },
        delCollection(state,payload){
            delCollectionData(payload.uid,payload.fid).then(res=>{
                console.log(res)
                state.collectionList.splice(payload.index,1)
                if(payload&&payload.success){
                    payload.success(res)
                }
            })

        }
    },
    actions:{
        addCollect(conText,payload){
            conText.commit("addCollect",payload)
        },
        collectionInfo(conText,payload){
            conText.commit("collectionInfo",payload)
        },
        getColletionPage(conText,payload){
            conText.commit("getColletionPage",payload)
        },
        delCollection(conText,payload){
            conText.commit("delCollection",payload)
        }
    }

}

export default modules