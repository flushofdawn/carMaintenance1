/**
 * Created by 89561 on 2019/10/4.
 */
$(".mui-card-footer>.mui-btn").on("tap",function (){
    console.log(11);
})

mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            style:'circle',
            contentnomore:'没有更多数据了',
            callback: pulldownRefresh
        },
        up: {
            contentrefresh: '正在加载...',
            callback: pullupRefresh
        }
    }
});
function pulldownRefresh() {
    setTimeout(function() {
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        mui.toast("刷新完成");
    }, 1500);
}
function pullupRefresh(){
    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
}