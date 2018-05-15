


$(function() {
	//创建“新增”按钮
	$('#btntc').remove();
	$('#table_min').before("<input id='btntc' type='button' value='新增'/>");
	$("#btntc").css({
		"width": "100px",
		"height": "30px",
		"border": "none",
		"margin": "20px",
		"outline": "none",
		"cursor": "pointer",
		"background": "#66ccff",
		"color": "white",
		"border-radius": "5%"
	});

	//“新增”按钮点击事件
	$('#btntc').click(function() {
		//页面层
		layer.open({
			type: 1,
			title: ['新增信息', 'font-size:18px;background:#0099FF;color:white;'],
			area: ['350px', '350px'], //宽高
			btn: ['确认保存'],
			yes: function(index, layero) {
				//按钮【按钮一】的回调
				//确认保存事件
				//修改数据
				var tc_newval = get_tanchuang_data();
				if(tc_newval.msg02 == '' || tc_newval.msg03 == '' || tc_newval.msg04 == '') {
					layer.msg('请输入完整信息');
				} else {
					layer.close(index);
					var bean = {
						//ID: tc_newval.msg01,
						USERNAME: tc_newval.msg02,
						USERID: tc_newval.msg03,
						USERPWD: tc_newval.msg04
					};
					var opdata = {
						tablename: "M_USERS",
						action: 1,
						//condition: "id='" + data.ID + "'",
						bean: JSON.stringify(bean)
					};
					webajax('http://222.163.24.203:8282/DataUI/QueryData.ashx', {
						option: opdata
					}, function(res) {
						//console.log(res);
					})

					var table = layui.table;
					//执行重载
					//console.log(0431)
					layui.use('table', function() {
						//	console.log(0432)
						table.reload('table_min', {
							//	console.log(0433)
							page: {
								curr: 1 //重新从第 1 页开始
							}
						});
					});
				}
			},
			btnAlign: 'c',
			anim: 0,
			move: false,
			skin: 'myskin',
			content: $('#cp_tanchuang').html(),
			shade: [0.1, '#ffffff']
		});

		//隐藏id行
		$('.myskin #cp_iddiv').css({
			'display': 'none'
		});
		

	});


})

/*
 * 生成弹窗数据内容的方法
 */
function create_tanchuang_data(data) {
	$('.myskin #cp_ID').val(data.ID);
	$('.myskin #cp_username').val(data.USERNAME);
	$('.myskin #cp_userid').val(data.USERID);
	$('.myskin #cp_userpwd').val(data.USERPWD);
}

function get_tanchuang_data() {
	return {
		'msg01': $('.myskin #cp_ID').val(),
		'msg02': $('.myskin #cp_username').val(),
		'msg03': $('.myskin #cp_userid').val(),
		'msg04': $('.myskin #cp_userpwd').val()
	}

}