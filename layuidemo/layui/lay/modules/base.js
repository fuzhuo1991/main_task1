/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/
layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;
    window.wxlib = {
        gettype: function (object) {
            return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        },
        assertReply: function (result) {
            var _type = wxlib.gettype(result);
            switch (_type) {
                case "Object": {
                    if (result.hasOwnProperty("statusCode")) {
                        var redirecturl = false;
                        switch (result.statusCode * 1) {//判断登录状态
                            case -401://状态码为-401跳转到登录页面
                                redirecturl = "/htmlpage/login.html";
                                break;
                            case -402://状态码为-402跳转到错误页面
                                redirecturl = "/htmlpage/ErrorPage/error-402.html";
                                break;
                        }
                        if (redirecturl) {//控制跳转
                            //if (window.parent) {
                            //    window.parent.window.location.href = YFLib.BasicURL + redirecturl;
                            //} else {
                            //    window.location.href = YFLib.BasicURL + redirecturl;
                            //}
                        }
                    }
                }
                    break;
                default:
                    {

                    }
                    break;
            }
        },
        toJSON: function (strdata, filter) {
            if (strdata == undefined) return false;
            var _type = wxlib.gettype(strdata);
            if (_type == 'Object' || _type == "Array" || _type == "Function") return strdata;
            if (wxlib.gettype(strdata) != "String") return new Object();
            if (filter) {
                if (/\/\*[\w\W\r\n]*?\*\//gmi.test(strdata)) {
                    strdata = strdata.replace(/\/\*[\w\W\r\n]*?\*\//gmi, '');
                }
                if (/^\s*(var)\s*\w*\s*=\s*(\{|\[)/.test(strdata)) {
                    strdata = strdata.replace(/^\s*(var)\s*\w*\s*=/, '');
                }
            }
            if (wxlib.gettype(strdata) == 'String' && /(^\{[\s\S]+\}$)|(^\[[\s\S]+\]$)/.test(strdata))
                return eval("(" + strdata + ")");
            else return strdata;
        },
        dateFormat: function (ds, format, offset) {
            if (ds == undefined) ds = new Date();
            if (offset == undefined) offset = 0;
            var thisdate = false;
            if (!format) format = "yyyy-MM-dd hh:mm:ss";
            if (wxlib.getType(ds) == "Date") {
                thisdate = ds;
            }
            if (wxlib.getType(ds) == "String") {
                if (/00:00:00\.0$/.test(ds))
                    if (/\d\.0$/.test(ds)) ds = ds.substr(0, ds.length - 2);
                var ddddd = new Date(ds.replace(/-/g, "/"));
                if (ddddd) {
                    thisdate = ddddd;
                }
            }
            if (!thisdate) return ds;
            //时间的整数值
            var _time = thisdate.valueOf() + offset * 24 * 60 * 60 * 1000;
            thisdate = new Date(_time);
            var o = {
                "M+": thisdate.getMonth() + 1, //month
                "d+": thisdate.getDate(), //day
                "h+": thisdate.getHours(), //hour
                "m+": thisdate.getMinutes(), //minute
                "s+": thisdate.getSeconds(), //second
                "q+": Math.floor((thisdate.getMonth() + 3) / 3), //quarter
                "S": thisdate.getMilliseconds() //millisecond
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (thisdate.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;

        }
    }
    $.webajax = function () {
        //默认变量
        function empty() { }
        //默认的情况的参数
        var def = {
            type: "POST",
            dataType: "json",
            timeout: 30000000,
            onBefore: empty,
            onComplete: empty,
            requestType: 'YF', //安装自定义的数据接口进行访问和使用
            async: false,
            assert: true,
            hasErrorFun: true //是否含有错误处理函数
        };
        var url, data, callback, errorfun, opt;
        var strsize = 0, objsize = 0, funsize = 0;
        if (arguments.length < 1) return;
        //对argumnents进行解析
        for (var i = 0; i < arguments.length; ++i) {
            var atype = wxlib.gettype(arguments[i]);//获取参数类型
            if (atype == "String") {
                if (++strsize == 1) {//第一次出现字符串形式的参数，默认为URL
                    url = arguments[i];
                }
                if (strsize > 1) {
                    //非第一次出现的字符串形式的参数判断组成
                    if ((/^json|xml|jsonp|script|html$/gi).test(arguments[i])) {
                        def.dataType = arguments[i];//改变数据类型
                        continue;
                    } else if ((/^post|get|put|delete$/gi).test(arguments[i])) {
                        def.type = arguments[i];//改变通讯方式
                        continue;
                    } else if (/=/.test(arguments[i])) {
                        data = arguments[i];
                        continue;
                    } else {
                        def.requestType = arguments[i];//改变请求方式
                        continue;
                    }
                }
            } else if (atype == "Function") {
                if (++funsize == 1) {//第一次出现function类型的参数，默认为回调方法
                    callback = arguments[i];
                }
                if (funsize == 2) {  //第二次出现的function类型的参数，视为错误处理方法
                    errorfun = arguments[i];
                }
            } else if (atype == "Object") {
                if (objsize == 0) {//第一次出现对象类型的参数
                    if (funsize > 0) {//出现过function类型的参数
                        opt = arguments[i];//该参数为配置项
                    } else {
                        data = arguments[i];//未出现过function则为交互数据
                        strsize++;
                    }
                }
            } else if (atype == "Number") {//参数类型为数字，为超时时间
                def.timeout = arguments[i];
            } else if (atype == "Boolean") {//参数类型为布尔型，改变为异步或同步
                def.diyAsync = arguments[i];
                def.async = arguments[i];
            }
        }


        var config = $.extend(def, opt);
        if (callback) config.async = true;//在没有处理成功返回函数时候，置同步处理
        //url = YFLib.Service.parseUrl(url);//解析请求的路径的表达式
        //if (!url) {
        //    alert("对不起.没有访问服务路径");
        //    return;
        //}
        //判断是跨域请求
        var _link = (location.href);
        _link = _link.substr(0, _link.indexOf("/", 7));//当前页面url的域名
        if (url.indexOf("http") > -1) {
            var _weblink = url.substr(0, url.indexOf("/", 7));
            if (_link != _weblink) {
                config.dataType = "jsonp";
                config.async = true;
                // if (!callback && config.hasOwnProperty("diyAsync") && !config.diyAsync) {
                //     alert("对不起，跨域访问，无法进行数据同步请求,请联系您的程序开发员");
                //     return false;
                //     //config.wait=true;//线程等待
                //     //config.isResulthandle=false;//是否经过结果处理
                //     //config.result=null;//返回的数据
                //     //config.currentTime=new Date();
                // }
            }
        }
        //处理参数中含有对象或者数组的情况
        if (wxlib.gettype(data) == "Object") {
            var newObject = {};
            for (var propname in data) {
                if (/(Object)|(Array)/i.test(wxlib.gettype(data[propname])))
                    newObject[propname] = JSON.stringify(data[propname]);
                else newObject[propname] = data[propname];
            }
            data = newObject;
        }
        //处理错误
        if (callback && config.requestType == 'YF' && !errorfun) {
            errorfun = function () {
                callback({
                    statusCode: 500,
                    message: "网络访问出现错误"
                });
            };
            config.hasErrorFun = false;
        }
        var xhr = $.ajax({
            cache: false,
            type: config.type,
            url: url,
            dataType: config.dataType,
            data: data,
            async: config.async,
            success: handlesuccess,
            error: errorfun,
            timeout: config.timeout,
            beforeSend: config.elem ? function () { $(config.elem).loadover() } : config.onBefore,
            complete: config.elem ? function () { $(config.elem).unloadover() } : config.onComplete
        });
        //访问结果处理类
        function handlesuccess(re_data, xhe, tt) {

            if (config.wait) {
                config.result = re_data;
                config.isResulthandle = true;
            }
            if (callback) {
                if (config.requestType == 'YF') {
                    re_data = wxlib.toJSON(re_data);
                    if (re_data.statusCode != 200) {
                        //                        if(re_data.statusCode==-401)alert(url);
                        if (config.assert && wxlib.assertReply) {
                            wxlib.assertReply(re_data);
                        }
                        if (config.hasErrorFun) errorfun(re_data);
                        else callback(re_data, xhe, tt);
                    } else {
                        if (re_data.data && /(^\{[\s\S]+\}$)|(^\[[\s\S]+\]$)/.test(re_data.data)) {
                            re_data.data = wxlib.toJSON(re_data.data);
                        }
                        callback(re_data, xhe, tt);
                    }
                } else {
                    callback(re_data, xhe, tt);
                }
            }
        }
        if (!config.async && config.requestType == 'YF') {
            var re_data = wxlib.toJSON(xhr.responseText);
            if (re_data.statusCode != 200 && wxlib.assertReply) {
                wxlib.assertReply(re_data);
            }
            return re_data;
        }
        return xhr;
    };
    window.webajax = $.webajax;
    ////输出test接口
    exports('base', function () { });
});
