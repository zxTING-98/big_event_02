// 入口函数
$(function () {
    // 获取头像
    getUserInfo();

    // 退出
    let layer = layui.layer;
    console.log(layer);
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            layer.close(index);
            // 跳转
            window.location.href = '/login.html';
            // 清除token
            localStorage.removeItem('token')
        });
    })
})

function getUserInfo() {
    // 发送ajax
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    });
}

function renderAvatar(user) {
    // 名字
    let name = user.nickname || user.username;
    $('#welcom').html('欢迎&emsp;' + name);
    // 头像
    if (user.user_pic) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        let text = name[0].toUpperCase()
        $('.text-avatar').show().html(text);
        $('.layui-nav-img').hide();
    }

}