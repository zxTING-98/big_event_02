$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // 2.点击触发input
    $('#btnChooseImg').on('click', function () {
        $('#file').click();
    })

    // 渲染
    let layer = layui.layer;
    $('#file').on('change', function () {
        let file = this.files[0];
        // console.log(file);
        if (file === undefined) {
            return layer.msg('必须设置头像!')
        }
        let newImgURL = URL.createObjectURL(file);

        $('#image')
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })

    // 确认修改
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo()
            }
        });
    })

})