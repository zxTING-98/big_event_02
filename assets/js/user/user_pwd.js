$(function () {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/
            , '密码必须6到16位，且不能出现空格'
        ],
        samePwd: function (value) {
            let v1 = $('input[name=oldPwd]').val();
            if (value == v1) {
                return '新密码与原密相同,请重新输入'
            }
        },
        rePwd: function (value) {
            let v2 = $('input[name=newPwd]').val();
            if (value != v2) {
                return '两次输入的密码不一致'
            }
        },
    })



    // 修改密码
    let layer = layui.layer;
    $('#formPwd').on('submit', function (e) {
        e.preventDefault();
        // ajax
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                $('#formPwd')[0].reset();
            }
        });
    })
})