// pages/wxml/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: '',
        userInfo: {},
    },
    methods: {
        switchTab(e) {
            const url = e.currentTarget.dataset.path;
            const index = e.currentTarget.dataset.index;
            wx.switchTab({
                url
            })
            this.setData({
                selected: index
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //获取输入账号
    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },
    //更新数据
    onLoad: function (options) {
        var that = this
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })

        })
    },
    login: function () {
        if (this.data.phone.length == 0 || this.data.password.length == 0) {

            wx.showToast({

                title: '用户名和密码不能为空',

                icon: 'none',

                duration: 2000

            })
        } else if (this.data.phone == "admin" && this.data.password == "admin") {
            wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                    wx.switchTab({
                        url: '../demo01/demo01',
                    })
                }
            })
        } else {
            wx.showToast({

                title: '账号或密码错误',

                icon: 'none',

                duration: 2000

            })
        }
    }
})