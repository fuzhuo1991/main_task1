$(function() {
	//定义表格
	layui.use(['table'], function() {
		//请求微信表
		var opdata = {
			tablename: "WX_OUT_OILLIST",
			action: 0,
		};
		webajax('http://222.163.24.203:8282/DataUI/QueryData.ashx', {
			option: opdata
		}, function(res) {
			//请求站表
			var cpdata = {
				tablename: "YF_ORG_STATION",
				action: 0,
			};
			webajax('http://222.163.24.203:8282/DataUI/QueryData.ashx', {
				option: cpdata
			}, function(res2) {
				var data01 = res.data; //微信表返回的数据
				var data02 = res2.data; //站表返回的数据
				console.log(data01);
				console.log(data02);

				var my_data = new Array(); //用于生成表格的数据
				var you_arr = new Array(); //油品名
				var money_arr = new Array(); //油品对应的总金额
				//获取到油品名
				for(var i = 0; i < data01.length; i++) {//遍历每笔记录
					var flag = 0;
					for(var j = 0; j < you_arr.length; j++) {//遍历油品名
						if(data01[i].OILTYPE == you_arr[j]) {//如果已经存在，则不再添加
							flag = 1;
							break;
						}
					}
					if(flag == 0) {//如果没有，则添加油品名，并在money_arr数组中添加对应的金额占位
						you_arr.push(data01[i].OILTYPE);
						money_arr.push(0);
					}
				}

				for(var i = 0; i < data02.length; i++) { //遍历所有站
					//将油品对应的金额数组清零
					for(var b = 0; b < money_arr.length; b++) {
						money_arr[b] = 0;
					}
					//获取每个站相应油品的总金额
					for(var j = 0; j < data01.length; j++) { //遍历所有消费笔数
						if(data01[j].STATIONID == data02[i].STATION_CODE) { //获取每个站的数据
							for(var a = 0; a < you_arr.length; a++) {//遍历油品名
								if(data01[j].OILTYPE == you_arr[a]) {//找到对应的油品
									//由于油品名数组与总金额数组顺序相同，所以直接存储对应位置的总金额
									money_arr[a] += parseFloat(data01[j].PAYMONEY);
								}
							}
						}
					}
					//将记录添加到生成表的数组my_data中
					for(var c = 0; c < you_arr.length; c++) {
						if(money_arr[c] != 0) {
							my_data.push({
								'STATIONID': data02[i].STATION_CODE,
								'STAIONNAME': data02[i].STATION_NAME,
								'OILTYPE': you_arr[c],
								'PAYMONEY': money_arr[c].toFixed(2)
							});
						}
					}
				}
				console.log(my_data)

				//生成表格
				var table = layui.table;

				table.render({
					elem: '#table_min',
					method: 'post',
					cellMinWidth: 80,
					skin: 'line',
					loading: true,
					page: {
						layout: ['prev', 'page', 'next'],
						prev: '《上一页',
						next: '下一页》',
						theme: '#0099ff',
					},
					data: my_data,
					cols: col_tb03,
				});

				//监听工具条
				table.on('tool(my_table_filter)', function(obj) {
					var data = obj.data;
					if(obj.event === 'detail') { //-------------------查看操作
						//layer.msg('ID：' + data.ID + ' 的查看操作');
						layer.open({
							type: 1,
							title: ['查看信息', 'font-size:18px;background:#0099FF;color:white;'],
							area: ['350px', '400px'], //宽高
							shade: [0.1, '#ffffff'],
							anim: 0,
							move: false,
							skin: 'myskin',
							content: $('#cp_tanchuang02').html()
						});
						create_tanchuang_data(data, 2);

						$('.myskin .min_input').attr('readonly', 'readonly');
						$('.myskin #cp_stationtype').attr('disabled', 'disabled');

					} else if(obj.event === 'del') { //---------------删除操作
						layer.confirm('真的删除行么', function(index) {
							obj.del();
							layer.close(index);
						});
					} else if(obj.event === 'edit') { //--------------编辑操作
						layer.open({
							type: 1,
							title: ['编辑信息', 'font-size:18px;background:#0099FF;color:white;'],
							area: ['350px', '450px'], //宽高
							btn: ['确认保存'],
							yes: function(index, layero) {
								//按钮【按钮一】的回调
								//修改数据
								var tc_newval = get_tanchuang_data(2);
								layer.msg('暂时不能实现编辑功能');
								//						var bean = {
								//							//ID: tc_newval.msg01,
								//							USERNAME: tc_newval.msg02,
								//							USERID: tc_newval.msg03,
								//							USERPWD: tc_newval.msg04
								//						};
								//						var opdata = {
								//							tablename: "M_USERS",
								//							action: 2,
								//							condition: "id='" + data.ID + "'",
								//							bean: JSON.stringify(bean)
								//						};
								//						webajax('http://222.163.24.203:8282/DataUI/QueryData.ashx', {
								//							option: opdata
								//						}, function(res) {
								//							//console.log(res);
								//						})

								//执行重载
								table.reload('table_min', {
									page: {
										curr: 1 //重新从第 1 页开始
									}
								});

								layer.close(index);
							},
							btnAlign: 'c',
							shade: [0.1, '#ffffff'],
							anim: 0,
							move: false,
							skin: 'myskin',
							content: $('#cp_tanchuang02').html()
						});
						//显示出要修改的表格内容
						create_tanchuang_data(data, 2);

					}
				});
				mouse_online();
			});

		});

		//顶部搜索事件
		//top_search(2);

	});

	//创建“新增”按钮
	create_add_btn();

	//“新增”按钮点击事件
	click_add_btn(2);

	$('#cp_createdate').attr('value', get_now_time());

})