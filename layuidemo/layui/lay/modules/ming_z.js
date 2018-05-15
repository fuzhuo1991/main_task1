//layui.config({
//			jquery:'/main_task_中/layuidemo/layui/lay/modules/',
//          ming_z:'/main_task_中/layuidemo/zym/js/'
//      }).extend({ //设定模块别名
//      		jquery:'jquery',
//				ming_z:'ming_z'
//      });

layui.define(['jquery'], function (exports) {
	var $ = layui.jquery;
	

		//左右高度协调

		if($(".leftbar").height()<$(".r_body").height()){
			$(".leftbar").height($(".r_body").height())
		}else{
			$(".r_body").height($(".leftbar").height())
		}

		//左侧栏展开收缩
		$(".navbtn").click(function(){
			//收缩
			if($(this).parent(".leftbar").attr("class")=="leftbar"){
				$(".leftbar").animate({width:"70px"},300)//整体宽度收缩
				$("nav .nav-i").animate({marginLeft:"20px"},300)//所有图标位置调整
				$(".r_body").animate({marginLeft:"70px",width:"auto"},300)//右侧内容跟随变化
				$(".sec_nav").animate({left:"70px"},300)//二级导航位置变化
				$(".leftbar").addClass("slide")//左侧栏加载收缩类名样式
				$(".navslide").css('transform','rotate(0)')//收缩展开按钮转换
				$(".layui-nav").animate({width:"70px"},300)
				$(".layui-nav-item").animate({width:"70px"},300)
				setTimeout(
					function(){
						$(".nav-tit").css({   //所有标题隐藏
							'opacity':'0',
							'font-size':'0',
							'left':'500px',
							'top':'0'
						})
						$(".ar_sh").addClass("on");//含二级菜单的提示
						//左右高度协调
						var Lheight = $(".leftbar").height();
						var Rheight = $(".r_body").height();
						if(Lheight <= Rheight){
							$(".r_body").height(Lheight)

						}else{
							$(".leftbar").height(Rheight);
						}
					}
					,100
				)
			}else{
				//展开
				$(".leftbar").animate({width:"200px"},300)//整体宽度展开
				$(".r_body").animate({marginLeft:"200px"},300)//右侧内容跟随变化
				$(".sec_nav").animate({left:"0px"},300)//二级导航位置变化
				$(".ar_sh").removeClass("on")//含二级菜单的提示
				$(".navslide").css('transform','rotate(180deg)')//收缩展开按钮转换
				$(".layui-nav").animate({width:"200px"},300)
				$(".layui-nav-item").animate({width:"200px"},300)
				setTimeout(
					function(){
						$(".leftbar").removeClass("slide")//左侧栏加载收缩类名样式
						$(".nav-tit").css({    //所有标题显示
							'opacity':'1' ,//所有标题显示
							'font-size':'14px',
						})
						//左右高度协调
						var Lheight = $(".leftbar").height();
						var Rheight = $(".r_body").height();
						if(Rheight <= Lheight){
							$(".r_body").height(Lheight);
						}else{
							$(".leftbar").height(Rheight);
						}
					},300
				)
			}
		})





		//二级导航展开
		$("nav>ul>li>a").on("click",function(){
			if($(this).siblings("ol").is(":visible")){
				$(this).siblings(".sec_nav").slideUp();
				$(this).find("i").addClass("up");
				setTimeout(
					function(){
						//左右高度协调
						var Lheight = $(".leftbar").height();
						var Rheight = $(".r_body").height();
						if(Lheight <= Rheight){
							$(".r_body").height(Lheight)

						}else{
							$(".leftbar").height(Rheight);
						}
					}
				,500)

			}else{
				$(this).siblings(".sec_nav").slideDown();
				$(this).find("i").removeClass("up");

				setTimeout(
					function(){
						//左右高度协调
						var Lheight = $(".leftbar").height();
						var Rheight = $(".r_body").height();
						if(Rheight <= Lheight){
							$(".r_body").height(Lheight);
						}else{
							$(".leftbar").height(Rheight);
						}
					}
				,500)
			}
		})


		//导航滑过竖条UI优化
		$(".colornav>ul>li>a").mouseenter(function(){
			$(this).parents("ul").find(".cur").children(".linec").css("opacity","0")
		})
		$(".colornav>ul").mouseleave(function(){
			$(this).children("li").children(".cur").find(".linec").css("opacity","1")
		})
		
		//表格隔行换色
		$(".hovlight tr:odd").css("background","#fbf9fc")
		$(".hometab tr:even").css("background","#fbf9fc")
		//查看信息隔行换色
		$(".infolist li:even").css("background","#f5f7fc")

		//模拟select
		$('body').delegate('.checkspan', 'click', function(){
			var ul = $(this).siblings('ul');
			if(ul.is(":hidden")){
				ul.slideDown('400', function() {
					$(this).find("li").unbind('click').bind("click",function(){
						var selectLi=$(this);
						$(this).parents(".select").find("span").text(selectLi.text());
						$(this).parents(".select").find("input").val(selectLi.data("id")).trigger("change");
						$(this).parents(".select").find("span").css("color","#1c2b36")
						$(this).parents(".select").find("ul").slideUp(400);
					});
						ul.mouseleave(function() {
							$(this).parents(".select").find("ul").slideUp(400)
						});
				});
			}else{
				$(this).siblings('ul').slideUp(400)
			}
		})


		//输入框placeholder优化
	    var tx = $("input").attr("placeholder")
	    $("input").focus(function(){
	    	$(this).attr("placeholder","")
	    })
	    $("input").blur(function(){
	    	$(this).attr("placeholder",tx)
	    })

		//分页输入跳页
		$(".page input").focus(function(){
			$(".page").find("button").animate({
				"width":"68px",
				"opacity":"1",
			},200)
		})
		$(".page input").blur(function(){
			if($(this).val()==""){
				$(".page").find("button").animate({
				"width":"0",
				"opacity":"0",
			},200)
			}else{}
		})





		//关闭弹窗
		$(".close").click(function(){
			$(this).parents(".commontc").hide();
			$(this).parents(".mask").hide()
		})


		//操作按钮提示
		$(".ctr_btn").mouseenter(function(){
			$(this).find("font").animate({
				"top":"-42",
				"opacity":"1",
			},0)
		})
		$(".ctr_btn").mouseleave(function(){
			$(this).find("font").animate({
				"top":"-50px",
				"opacity":"0",
			},0)
		})



		//金额输入放大显示
	    $(".showbig").focus(function(){
	    	var _fill_ipt = $(this).parent(".fill_ipt");
	    	if (_fill_ipt.find('.bigtx').size() === 0) {
                var tar = "<div class='bigtx'><span></span><i></i></div>";
                _fill_ipt.append(tar)
            }
	    }).bind('input propertychange', function(){
	    	//console.log(1)
	    	var tx =$(this).val();

			var _format_value = tx;
			console.log(_format_value);
            if (_format_value !== '' && !isNaN(_format_value)) {
            	console.log(176);
                var _value_array = _format_value.split('.');
                var _int = _value_array[0];
                var _decimal = '';
                if (_value_array.length > 1) {
                    _decimal = _value_array[1];
                }

                var _int_str = '';
                var _count = 0;

                for (var i = _int.length - 1; i >= 0; i--) {
                    _count++;
                    _int_str = _int.charAt(i) + _int_str;
                    if (!(_count % 3) && i !== 0) {
                        _int_str = ',' + _int_str;
                    }
                }

                _format_value = _int_str;

                if (_decimal !== '') {
                    _format_value += '.' + _decimal;
                }
            }

	    	$(this).siblings(".bigtx").css({
	    		"top":"-37px",
	    		"opacity":"1"
	    	});
	    	$(this).siblings(".bigtx").find("span").html(_format_value);
	    	if(_format_value ===""){
	    		$(this).siblings(".bigtx").css({
	    		"top":"0",
	    		"opacity":"0"
	    	})
	    	}
	    }).blur(function(){

	    	$(this).siblings(".bigtx").css({
	    		"top":"0",
	    		"opacity":"0"
	    	});
            var _fill_ipt = $(this).parent(".fill_ipt");
            if (_fill_ipt.find('.bigtx').size() > 0) {
				setTimeout(function () {
                    _fill_ipt.find('.bigtx').remove();
                }, 200);
            }
	    });
		
		//js获取日期
		var now_z= new Date();
		var year_z=now_z.getFullYear();
		var month_z=now_z.getMonth();
		var day_z=now_z.getDate();
		//获取相应ID
		$("#time_d").html(year_z+"-"+(month_z+1)+"-"+day_z)
//		document.getElementById("time_d").innerHTML=year_z+"-"+(month_z+1)+"-"+day_z;
		
	/*微信销售笔数*/
	var a1 = 0;
	$(".tr_s").each(function(){
		var b1 = $(this).children('td').eq(1).text();
		a1 +=parseInt(b1);
		/*console.log(b);*/
	});
	/*console.log(c);*/
//	document.getElementById("w_x_b").innerHTML=a1;
	
	/*优惠券使用金额（元）*/
	var a2 = 0.00;
	$(".tr_s").each(function(){
		var b2 = $(this).children('td').eq(2).text();
		a2 +=parseFloat(b2);
		
	});
//	document.getElementById("y_s_e").innerHTML=parseFloat(a2).toFixed(2);
	/*实际销售总金额（元）*/
	var a3 = 0.00;
	$(".tr_s").each(function(){
		var b3 = $(this).children('td').eq(3).text();
		a3 +=parseFloat(b3);
		
	});
//	document.getElementById("s_x_ze").innerHTML=parseFloat(a3).toFixed(2);
	/*网页天数刷新*/
	
	
	
	
	
	
	
	
	////输出test接口
    exports('ming_z', function () { });	
	
})