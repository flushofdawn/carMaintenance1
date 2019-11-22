$(document).ready(function(){
	getOutlets();
});

function locateOutlets(){
	AMap.plugin('AMap.Geolocation', function() {
		var geolocation = new AMap.Geolocation({
		enableHighAccuracy : true,//是否使用高精度定位，默认:true
		timeout : 10000, //超过10秒后停止定位，默认：5s
		buttonPosition : 'RB', //定位按钮的停靠位置
		buttonOffset : new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			zoomToAccuracy : true, //定位成功后是否自动调整地图视野到定位点
		});
		geolocation.getCurrentPosition(function(status, result) {
				if (status == 'complete') {
					onComplete(result)
				} else {
					onError(result)
				}
			});
		});
}


//定位成功后业务处理
function onComplete(data) {
	getOutlets(data);
}
//解析定位错误信息
function onError(data) {
	console.log(data.message);
}

function getOutlets(data) {
	/*var curpoint = data.position;
	var cityCode = $("#regionId").val();
	if (!cityCode)
		cityCode = data.addressComponent.citycode;*/
	var data = {"code":"000000","mesg":"处理成功","timestamp":{"epochSecond":1570889193,"nano":313000000},"data":[{"id":1,"outletsName":"一汽丰田1店徐汇店","outletsShortName":"MD","outletsCode":"MD","outletsAddress":"徐汇区徐家汇地铁站门口","outletsLinkman":"22","contactNumber":"2","contactImageUrl":"2","outletsLongitude":121.2259670,"outletsLatitude":31.0477540,"appTime":null},{"id":2,"outletsName":"一汽丰田1店黄浦区","outletsShortName":"JT","outletsCode":"JT","outletsAddress":"JIUTING","outletsLinkman":"3","contactNumber":"3","contactImageUrl":"2","outletsLongitude":121.3389200,"outletsLatitude":31.1128830,"appTime":null},{"id":3,"outletsName":"一汽丰田浦东1店","outletsShortName":"BW","outletsCode":"BW","outletsAddress":"BW","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.4755620,"outletsLatitude":31.2277430,"appTime":null},{"id":4,"outletsName":"一汽丰田浦东2店","outletsShortName":"PD","outletsCode":"PD","outletsAddress":"PD","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.8032640,"outletsLatitude":31.1593140,"appTime":null},{"id":5,"outletsName":"宝马1店黄浦区","outletsShortName":"XC","outletsCode":"XC","outletsAddress":"XC","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.6485970,"outletsLatitude":31.0278980,"appTime":null}]};
	var list = data.data;
	for (var i = 0; i < list.length; i++) {
		var outlets = list[i];
		var lng = outlets.outletsLongitude;
		var lat = outlets.outletsLatitude;
		var point = new AMap.LngLat(lng, lat)
		console.log( point );
		/*var distance = Math.round(AMap.GeometryUtil
			.distance(point, curpoint));
		list[i].distance = distance;*/
	}
	/*list.sort(function(p1, p2) {
		return p1.distance - p2.distance;
	});*/
	createData(list);

	/*ajaxPost("/view/getOutlets",
			{"cityCode" : cityCode},
			function(data){
				var list = data.data;
				for (var i = 0; i < list.length; i++) {
					var outlets = list[i];
					var lng = outlets.outletsLongitude;
					var lat = outlets.outletsLatitude;
					var point = new AMap.LngLat(lng, lat)
					var distance = Math.round(AMap.GeometryUtil
							.distance(point, curpoint));
					list[i].distance = distance;
				}
				list.sort(function(p1, p2) {
					return p1.distance - p2.distance;
				});
				createData(list);
				},
			function(data){
					Toast("获取失败："+data.mesg);
					}
				);*/
}


function createData(list){
	console.log(111111);
	var content = "";
	for(var i = 0 ;i < list.length;i++){
		var outlets = list[i];
		content += `<li class="mui-table-view-cell mui-media"> 
						<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/serviceStore/tx1.jpg">
						<div class="mui-media-body" name="outlets-div">
						    <input type="hidden" name="outletsId" value="${outlets.id}"/>
							<p class='mui-ellipsis'>${outlets.outletsName}</p>
							<div class="mui-row storeAddress">
								<span class="mui-col-sm-10 mui-col-xs-10">${outlets.outletsAddress}</span>
								<span class="mui-col-sm-2 mui-col-xs-2">${outlets.distance/1000}km</span>
							</div>
							<div class="mui-row appointment">
								<span class="mui-col-sm-3 mui-col-xs-3">预约时间：</span>
								<div class="mui-col-sm-6 mui-col-xs-6">
									<input type="text" name="appTime" class="timeInput" readonly onclick="chooseTime(this)" />
								</div>
								<div class="mui-col-sm-3 mui-col-xs-3">
									<div class="mui-btn mui-btn-primary appointmentBtn" onclick="order(this)">
										预约
									</div>
								</div>
							</div>
						</div>
					</a>
				</li>`
	}
	$("#nearby").empty().append(content);
}

function order(self){
	var _self = self;
	var uuid = $("#uuid").val();
	var appTime = $(_self).closest("div[name='outlets-div']").find("input[name='appTime']").val();
	var outletsId = $(_self).closest("div[name='outlets-div']").find("input[name='outletsId']").val();
	ajaxPost("/view/order",
			{"uuid":uuid,"apptime":appTime,"outLetsId":outletsId},
			function(data){Toast("预约成功");},
			function(data){Toast("预约失败："+data.mesg)});
}

function myOrder(){
	console.log(  11 );
	var data = {"code":"000000","mesg":"处理成功","timestamp":{"epochSecond":1570889193,"nano":313000000},"data":[{"id":1,"outletsName":"一汽丰田1店徐汇店","outletsShortName":"MD","outletsCode":"MD","outletsAddress":"徐汇区徐家汇地铁站门口","outletsLinkman":"22","contactNumber":"2","contactImageUrl":"2","outletsLongitude":121.2259670,"outletsLatitude":31.0477540,"appTime":null},{"id":2,"outletsName":"一汽丰田1店黄浦区","outletsShortName":"JT","outletsCode":"JT","outletsAddress":"JIUTING","outletsLinkman":"3","contactNumber":"3","contactImageUrl":"2","outletsLongitude":121.3389200,"outletsLatitude":31.1128830,"appTime":null},{"id":3,"outletsName":"一汽丰田浦东1店","outletsShortName":"BW","outletsCode":"BW","outletsAddress":"BW","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.4755620,"outletsLatitude":31.2277430,"appTime":null},{"id":4,"outletsName":"一汽丰田浦东2店","outletsShortName":"PD","outletsCode":"PD","outletsAddress":"PD","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.8032640,"outletsLatitude":31.1593140,"appTime":null},{"id":5,"outletsName":"宝马1店黄浦区","outletsShortName":"XC","outletsCode":"XC","outletsAddress":"XC","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.6485970,"outletsLatitude":31.0278980,"appTime":null}]};

	var list = data.data;
	for (var i = 0; i < list.length; i++) {
		var outlets = list[i];
		var lng = outlets.outletsLongitude;
		var lat = outlets.outletsLatitude;
		/*var point = new AMap.LngLat(lng, lat)*/
		/*var distance = Math.round(AMap.GeometryUtil
			.distance(point, curpoint));
		list[i].distance = distance;*/
	}
	/*list.sort(function(p1, p2) {
		return p1.distance - p2.distance;
	});*/
	createMyData(list);

	/*ajaxPost(
		{"code":"000000","mesg":"处理成功","timestamp":{"epochSecond":1570889193,"nano":313000000},"data":[{"id":1,"outletsName":"一汽丰田1店徐汇店","outletsShortName":"MD","outletsCode":"MD","outletsAddress":"徐汇区徐家汇地铁站门口","outletsLinkman":"22","contactNumber":"2","contactImageUrl":"2","outletsLongitude":121.2259670,"outletsLatitude":31.0477540,"appTime":null},{"id":2,"outletsName":"一汽丰田1店黄浦区","outletsShortName":"JT","outletsCode":"JT","outletsAddress":"JIUTING","outletsLinkman":"3","contactNumber":"3","contactImageUrl":"2","outletsLongitude":121.3389200,"outletsLatitude":31.1128830,"appTime":null},{"id":3,"outletsName":"一汽丰田浦东1店","outletsShortName":"BW","outletsCode":"BW","outletsAddress":"BW","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.4755620,"outletsLatitude":31.2277430,"appTime":null},{"id":4,"outletsName":"一汽丰田浦东2店","outletsShortName":"PD","outletsCode":"PD","outletsAddress":"PD","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.8032640,"outletsLatitude":31.1593140,"appTime":null},{"id":5,"outletsName":"宝马1店黄浦区","outletsShortName":"XC","outletsCode":"XC","outletsAddress":"XC","outletsLinkman":"4","contactNumber":"4","contactImageUrl":"4","outletsLongitude":121.6485970,"outletsLatitude":31.0278980,"appTime":null}]}
		,
			{"uuid" : $("#uuid").val()},
			function(data){
				var list = data.data;
				for (var i = 0; i < list.length; i++) {
					var outlets = list[i];
					var lng = outlets.outletsLongitude;
					var lat = outlets.outletsLatitude;
					var point = new AMap.LngLat(lng, lat)
					var distance = Math.round(AMap.GeometryUtil
							.distance(point, curpoint));
					list[i].distance = distance;
				}
				list.sort(function(p1, p2) {
					return p1.distance - p2.distance;
				});
				createMyData(list);
				},
			function(data){
					Toast("获取失败："+data.mesg)
					}
				);*/
}

function createMyData(list){
	var content = "";
	for(var i = 0 ;i < list.length;i++){
		var outlets = list[i];
		content += `<li class="mui-table-view-cell mui-media"> 
						<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/serviceStore/tx1.jpg">
						<div class="mui-media-body" name="outlets-div">
							<p class='mui-ellipsis'>${outlets.outletsName}</p>
							<div class="mui-row storeAddress">
								<span class="mui-col-sm-10 mui-col-xs-10">${outlets.outletsAddress}</span>
								<span class="mui-col-sm-2 mui-col-xs-2">${outlets.distance/1000}km</span>
							</div>
							<div class="mui-row appointment">
								<span class="mui-col-sm-3 mui-col-xs-3">预约时间：${outlets.appTime}</span>
							</div>
						</div>
					</a>
				</li>`
	}
	$("#nearby").empty().append(content);
}

mui.init({
	swipeBack : true
//启用右滑关闭功能
});
var menu = $(".menu");
var downContent = $('.downContent');
menu.on('tap', function(eve) {
	var downTitle = $(this).attr("downContent");
	var downMenu = $("#" + downTitle);
	var spanIcon = $(this).find('.mui-icon');
	if (spanIcon.hasClass("mui-icon-arrowdown")) {
		$('.downContent>div').css("display", "none");
		if (downContent.css("display") == "block") {
			downMenu.slideDown();
			$(".nav .mui-icon").addClass("mui-icon-arrowdown");
			$(".nav .mui-icon").removeClass("mui-icon-arrowup");

			spanIcon.addClass("mui-icon-arrowup");
			spanIcon.removeClass("mui-icon-arrowdown");
		} else {
			downContent.fadeIn();
			downMenu.slideDown();
			spanIcon.addClass("mui-icon-arrowup");
			spanIcon.removeClass("mui-icon-arrowdown");
		}
	} else {
		downContent.fadeOut();
		downMenu.slideUp();
		spanIcon.addClass("mui-icon-arrowdown");
		spanIcon.removeClass("mui-icon-arrowup");
	}
});
$(".downContent").on('click', function(eve) {
	$(this).fadeOut();
	$(this).children("div").slideUp();
	$(".nav .mui-icon").addClass("mui-icon-arrowdown");
	$(".nav .mui-icon").removeClass("mui-icon-arrowup");
});

var controls = document.getElementById("city");
var contents = document.getElementById("segmentedControlContents");
var html = [];
for (i = 1; i < 19; i++) {
	var strA = '<a class="mui-control-item"  onclick="stopBubble( event )" href="#content'
			+ i + '">选项' + i + '</a>';
	html.push(strA);
}
controls.innerHTML = html.join('');
html = [];
for (i = 1; i < 10; i++) {
	html.push('<div id="content' + i
			+ '" class="mui-control-content"><ul class="mui-table-view">');
	for (j = 1; j < 21; j++) {
		html
				.push('<li class="mui-table-view-cell" onclick="stopBubble( event )">第'
						+ i + '个选项卡子项-' + j + '</li>');
	}
	html.push('</ul></div>');
}
contents.innerHTML = html.join('');
//默认选中第一个
controls.querySelector('.mui-control-item').classList.add('mui-active');
contents.querySelector('.mui-control-content').classList.add('mui-active');

$('#addressInfo').click(function() {
	FastClick.attach(document.getElementById("addressInfo"));
})
FastClick.attach(document.body);

function chooseTime(self) {
	var _self = self;
	if (_self.picker) {
		_self.picker.show(function(rs) {
			_self.value=rs.text;
			_self.picker.dispose();
			_self.picker = null;
		});
	} else {
		var optionsJson = _self.getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		_self.picker = new mui.DtPicker(options);
		_self.picker.show(function(rs) {
			_self.value=rs.text;
			_self.picker.dispose();
			_self.picker = null;
		});
	}
}