// 入口函数
$(function () {
    // 校验
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须为1~6位'
            }
        }
    })

    // 2.把用户信息渲染到form表单中
    initUserInfo();
    let layer = layui.layer;
    function initUserInfo() {
        // ajax
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        });
    }

    // 3.重置信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 4.修改用户信息
    $('#formUserInfo').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功提示
                layer.msg('用户信息修改成功')
                // 调用父页面的头像渲染方法
                //  window.parent 父页面的window
                window.parent.getUserInfo();
            }
        });
    })

})