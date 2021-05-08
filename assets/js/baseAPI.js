// 开发环境地址
let baseURL = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function (params) {
    // 在每次发送ajax前添加前缀
    params.url = baseURL + params.url

    // 有/my设置头信息
    if (params.url.indexOf('/my/') != -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 需求3: 登录拦截,ajax中有一个 complete(ajax无论接收成功还是失败都会触发这个方法)
    params.complete = function (res) {
        // console.log(res);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 强制跳转到登录页面
            location.href = '/login.html';
            // 清除token
            localStorage.removeItem('token');
        }
    }

})