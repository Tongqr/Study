import Confirm from './confirm';
export default {
    install(Vue){
        //vue继承组件
        let confirmExtend=Vue.extend(Confirm);
        Vue.prototype.$confirm=function(text,callback){
            let confirmInit=new confirmExtend().$mount(document.createElement("div"));
            // console.log(confirmInit.$el);
            document.body.appendChild(confirmInit.$el);
            confirmInit.text=text;
            confirmInit.callback=callback;
        }

    }
}
