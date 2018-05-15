


layui.define(['jquery','base','element'], function (exports) {
	var $ = layui.jquery;
	var element=layui.element;

	/*地址url*/
	var url_d = location.search;
	//console.log("url_d="+url_d)
	var theRequest = new Object();   
	if (url_d.indexOf("?") != -1) {   
	    var str = url_d.substr(1);
	//  console.log("str="+str)
	    strs = str.split("&");
	    for(var i = 0; i < strs.length; i ++) {   
	       	theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	       	console.log("str="+theRequest[strs[i].split("=")[0]])
	       	console.log("str="+unescape(strs[i].split("=")[1]))
	    }   
	}
	/*不重复数组*/
	var user_id =1;
	var a=[];
	for (var i = 0; i < a.length; i++) {
		alert(a[i]);
	}
	var arr_res_m_role_menu=[];
	var data_m_role_menu = { tablename: "m_role_menu", action: 0 };
    webajax("http://222.163.24.203:8282/DataUI/QueryData.ashx",
        { option: data_m_role_menu},
        function(res_m_role_menu) {
        	console.log(res_m_role_menu);
        	for (var i_res_m_role_menu = 0; i_res_m_role_menu < res_m_role_menu.data.length; i_res_m_role_menu++) {
				//向数组添加连接用户id
        		if(res_m_role_menu.data[i_res_m_role_menu].ROLEID==user_id){
					arr_res_m_role_menu.push(res_m_role_menu.data[i_res_m_role_menu].P_ID)
	        	}
        	}
	        var newArr = [];
			for(var i =0;i<arr_res_m_role_menu.length;i++){
			　　 if(newArr.indexOf(arr_res_m_role_menu[i]) == -1){
			　　　　newArr.push(arr_res_m_role_menu[i]);
			　　}
			}
			/*连接结束*/
			/*主菜单开始*/
			var data_m_pmenu = { tablename: "m_pmenu", action: 0 };
			webajax("http://222.163.24.203:8282/DataUI/QueryData.ashx",
			    { option: data_m_pmenu },
			    function(res_m_pmenu) {
			      	console.log(res_m_pmenu);
			      	for (var i_m_pmenu = 0; i_m_pmenu < res_m_pmenu.data.length; i_m_pmenu++) {
						/*连接与主菜单*/
			      		for (var i_newArr = 0; i_newArr < newArr.length; i_newArr++) {
				      		if (res_m_pmenu.data[i_m_pmenu].ID==newArr[i_newArr]) {
				      			$(".layui-nav.layui-nav-tree").append("<li class='layui-nav-item layui-nav-itemed'><a class='"+res_m_pmenu.data[i_m_pmenu].ID+"' href='javascript:;'>"+res_m_pmenu.data[i_m_pmenu].NAME+"<span class='layui-nav-more'></span></a><dl class='layui-nav-child'></dl></li>")
				      		}
				      	}
			      	}
			/*主菜单结束*/
				/*子菜单开始*/
				var data_m_cmenu = { tablename: "m_cmenu", action: 0 };
				    webajax("http://222.163.24.203:8282/DataUI/QueryData.ashx",
					        { option: data_m_cmenu },
					        function(res_m_cmenu) {
								console.log(res_m_cmenu);
								/*子菜单P_ID*/
								for (var i_m_cmenu = 0; i_m_cmenu < res_m_cmenu.data.length; i_m_cmenu++) {
									for (var i_newArr = 0; i_newArr < newArr.length; i_newArr++) {
										/*主菜单与子菜单*/
										if(res_m_cmenu.data[i_m_cmenu].P_ID==newArr[i_newArr]){
											$("."+newArr[i_newArr]).siblings('dl').append("<dd><a href='javascript:;' data-url='"+res_m_cmenu.data[i_m_cmenu].URL+"' lay-id='"+res_m_cmenu.data[i_m_cmenu].ID+"'>"+res_m_cmenu.data[i_m_cmenu].NAME+"</a></dd>")
										}
										
									}
									
								}
   
/*方法*/
element.init();



 		/*新增*/
		$(".layui-nav-child a").on('click', function () {
			console.log(12121)
			var url = $(this).data('url');
			if($(this).hasClass('had')){
				
			}else{
				var title = $(this).text();
	            element.tabAdd('laytitle', {
	                title: title,//用于演示
	                id: url
	            })
	            console.log("url="+url)
	            $(".layui-tab-title li[lay-id='"+url+"']").click(function () {
	                $(".layui-tab-item").load($(this).attr('lay-id')+'.html');
	            })
	           
	            $(this).addClass('had')
	            
			}
			$(".layui-tab-title [lay-id='"+url+"']").trigger('click');
			$(".layui-tab-item").addClass('layui-show');
			/*移除Class*/
            $(".layui-tab-title .layui-icon").click(function(){
				$(".layui-nav-child [data-url='"+url+"']").removeClass('had')
			})
        })
		
							
					/*子菜单结束*/
					        });
			    
			    });
			    
			    

        });	
    ////输出test接口
    exports('ming', function () { });	  
});