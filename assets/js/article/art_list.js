$(function () {
    // 0.事件函数
    template.defaults.imports.dataFormat = function (dtStr) {
        let dt = new Date(dtStr);
        let years = padZero(dt.getFullYear());
        let month = padZero(dt.getMinutes() + 1);
        let date = padZero(dt.getDate());
        let hours = padZero(dt.getHours());
        let mint = padZero(dt.getMinutes());
        let sec = padZero(dt.getSeconds());
        return `${years}-${month}-${date} ${hours}:${mint}:${sec}`
    }

    // 补0
    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }

    // 1.定义查询参数
    let q = {
        pagenum: 1,       // 页码值
        pagesize: 2,     // 每页显示多少条数据
        cate_id: '',      // 文章分类的 Id
        state: '',        // 文章的状态，可选值有：已发布、草稿
    }

    // 2.渲染页面
    let layer = layui.layer;
    let form = layui.form;
    initTable();
    function initTable() {
        $.ajax({
            url: "/my/article/list",
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 模板字符串
                let str = template('tpl-table', res);
                $('tbody').html(str);
                // 分页
                renderPage(res.total)
            }
        });
    }

    // 3.初始化文章分类
    initCate();

    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功渲染
                let str = template('tpl-cate', res);
                $('[name=cate_id]').html(str);
                form.render();
            }
        });
    }

    // 4.筛选
    $('#search').on('submit', function (e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        initTable();
    })

    // 5.分页
    function renderPage(total) {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,  //每页显示的条数
            curr: q.pagenum, //启示页面
            // 自定义排版
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10, 20],  // 每页多少选择框
            // 跳转页面到的回调函数
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数

                // 改变当前页
                q.pagenum = obj.curr;
                // 改变一页显示多少
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    initTable();
                }
            }
        });
    }

    // 6.删除
    $('tbody').on('click', '.btn-del', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: "/my/article/delete/" + Id,
                success: function (res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    if ($('.btn-del').length == 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    // 重新渲染列表
                    initTable();
                    layer.close(index);
                }
            });
        })
    })
})