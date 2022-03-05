// pages/demo03/demo03.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        view_division: 0,
    },

    changeCanvas: function (e) {
        var total_width //view宽度
        wx.getSystemInfo({
            success: (res) => {
                total_width = res.windowWidth
            },
        })
        var division = 12 //分成几份
        var each_width = total_width / division //每份长度
        var t = Number(parseFloat(e.touches[0]['pageX'] / each_width).toFixed(2)) //计算下标刻度,保留两位小数
        this.setData({
            view_division: t
        })
        const query = wx.createSelectorQuery()
        query.select('#lineCanvas2')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                const dpr = wx.getSystemInfoSync().pixelRatio
                canvas.width = res[0].width * dpr
                canvas.height = res[0].height * dpr
                var division = 12
                var width = canvas.width / division //定义每一份长度
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 15
                ctx.moveTo(width * t - 10, canvas.height / 2) //从这开始
                ctx.lineTo(width * t + 10, canvas.height / 2) //从这结束
                ctx.stroke()
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*const ctx = wx.createCanvasContext('lineCanvas') //获取canvas对象
        var division = 12 //定义分成几个部分
        var ctx_height = 150
        var ctx_width
        wx.getSystemInfo({
            success: (res) => {
                ctx_width = res.windowWidth
            },
        })

        var width = ctx_width / division //定义每一份长度
        for (var i = 1; i < division; i++) {
            ctx.moveTo(width * i, 0) //从这开始
            ctx.lineTo(width * i, ctx_height) //从这结束
            ctx.fillText(i, width * (i - 1), ctx_height - 10) //填充文字
        }
        ctx.fillText(i, width * (i - 1), ctx_height - 10) //补齐最后一次文字
        ctx.stroke() //绘出图形
        ctx.draw()*/
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const query = wx.createSelectorQuery()
        query.select('#lineCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                const dpr = wx.getSystemInfoSync().pixelRatio
                canvas.width = res[0].width * dpr
                canvas.height = res[0].height * dpr
                var division = 12
                var width = canvas.width / division //定义每一份长度
                ctx.font = "35px 微软雅黑"
                for (var i = 1; i < division; i++) {
                    ctx.moveTo(width * i, 0) //从这开始
                    ctx.lineTo(width * i, canvas.height) //从这结束
                    ctx.fillText(i, width * (i - 1), canvas.height - 10) //填充文字
                }
                ctx.fillText(i, width * (i - 1), canvas.height - 10) //补齐最后一次文字
                ctx.stroke() //绘出图形
            })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})