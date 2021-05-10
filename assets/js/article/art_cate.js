$(function () {
    initArtCateList();
    let layer = layui.layer;

    // 获取文章列表
    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                let str = template('tpl-art-cate', res);
                $('tbody').html(str);
            }
        });
    }

    // 添加窗口展示
    let indexAdd;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edd').html()
        });
    })

    // 添加文章  事件委托
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                initArtCateList();
                layer.close(indexAdd)
            }
        });
    })

    // 修改窗口
    let indexEdit;
    // 渲染数据
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        let Id = $(this).attr('data-id');
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + Id,
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        });
    })

    // 修改数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                initArtCateList();
                layer.close(indexEdit)
            }
        });
    })

    // 删除文章
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + Id,
                data: Id,
                success: function (res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArtCateList();
                    layer.close(index);
                }
            });
        })
    })
})