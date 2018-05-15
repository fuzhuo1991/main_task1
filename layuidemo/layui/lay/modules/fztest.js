/**
 项目JS主入口
 以依赖layui的layer和form模块为例
 **/
layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var obj = {
        hello: function(str){
            alert('Hello '+ (str||'mymod'));
        }
    };

    //输出test接口
    exports('www', obj);
});