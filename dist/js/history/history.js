/**
 * Created by 朱颜辞镜花辞树 on 2019/10/9.
 */
mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            style:'circle',
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