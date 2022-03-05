// pages/demo02/demo02.js
const date = new Date();
const years = [];
const months = [];
const days = [];
//获取年
for (let i = 2021; i <= date.getFullYear() + 5; i++) {
    years.push("" + i + "年");
}
//获取月份
for (let i = 1; i <= 12; i++) {
    if (i < 10) {
        i = "0" + i;
    }
    months.push("" + i + "月");
}
//获取日期
for (let i = 1; i <= 31; i++) {
    if (i < 10) {
        i = "0" + i;
    }
    days.push("" + i + "号");
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showListData: [],
        listData: [],
        i: 1,
        num: 8,
        count: 0,
        up: 'upSelected',
        down: 'down',
        startTime: '2021-12-17',
        endTime: '2022-02-17',
        date1: '',
        date2: '',
        multiArray: [years, months, days],
        multiIndex: [0, 9, 16, 10, 17],
        choose_year: '',
        key: '全部',
        productionId: [],
        keyIndex: 0,
        flag: true,
        checkValue: '',
        clickId: -1,
        productCode: 'R1123-24',
        productMeter: '',
        productCount: '',
        productManged: '',
        closePopup: 'display:none'
    },
    //计算count 总页数，传入数组长度len和每页展示量num
    computeCount: function (len, num) {
        var tempCount
        if (parseInt(len / num) == len / num) {
            tempCount = parseInt(len / num)
        } else {
            tempCount = parseInt(len / num + 1)
        }
        return tempCount
    },
    //与UP函数同理
    checkKey2: function () {
        var that = this
        var index = this.data.productionId[0].indexOf(this.data.key) - 1
        if (index != -1) {
            var temp = []
            this.data.listData.forEach(item => {
                //console.log(item[index])
                var readyValue = new RegExp(that.data.checkValue, 'g')
                if (readyValue.test(item[index])) {
                    temp.push(item)
                }
            });
            var tempCount = this.computeCount(temp.length, that.data.num)
            this.setData({
                showListData: temp,
                count: tempCount,
                i: 1
            })
        } else {
            var tempCount = this.computeCount(that.data.listData.length, that.data.num)
            this.setData({
                showListData: that.data.listData,
                count: tempCount,
                i: 1
            })
        }
    },
    down: function () {
        var temp = this.data.i + 1
        var num = this.data.num
        if (temp * num > this.data.showListData.length) {
            this.setData({
                down: 'downSelected'
            })
        }
        if ((temp - 1) * num < this.data.showListData.length) {
            this.setData({
                i: temp
            })
        } else {
            wx.showToast({
                title: '已经到底啦！',
                icon: 'none',
                duration: 2000
            })
        }
        this.setData({
            up: 'up'
        })
    },
    //用于向上翻页
    up: function () {
        var temp = this.data.i - 1 //赋值量
        //temp等于1说明加载到第一页，将第一页的"上一页"按钮置空
        if (temp == 1) {
            this.setData({
                up: 'upSelected'
            })
        }
        //如果页数不为负数，就进行复制操作
        if (temp > 0) {
            this.setData({
                i: temp
            })
        } else {
            wx.showToast({
                title: '上面没有数据啦！',
                icon: 'none',
                duration: 2000
            })
        }
        //按上一页，所以下一页一定为可选状态
        this.setData({
            down: 'down'
        })
    },
    check: function () {
        var that = this
        var temp = null
        var tempTime1 = this.data.date1.replace("年", "").replace("月", "").replace("号", "")
        var tempTime2 = this.data.date2.replace("年", "").replace("月", "").replace("号", "")
        this.setData({
                startTime: String(tempTime1),
                endTime: String(tempTime2)
            }),
            wx.showLoading({
                title: '加载中',
            })
        wx.request({
            url: 'https://api2.hzkmzn.com/RongXiangTest/home/getOutStoreListNew',
            method: 'POST',
            data: {
                StartTime: that.data.startTime,
                EndTime: that.data.endTime,
                ProductCode: '',
                WeaveType: '0'
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            success(res) {
                temp = res.data.data
                //console.log(temp)
                if (!temp) {
                    wx.showToast({
                        title: '未查询到数据',
                        icon: 'error',
                        duration: 1500
                    })
                } else {
                    temp.splice(0, 1)
                    var tempCount = that.computeCount(temp.length, that.data.num)
                    console.log(tempCount)
                    console.log(temp.length)
                    that.setData({
                        showListData: temp,
                        listData: temp,
                        count: tempCount,
                        i: 1
                    })
                    wx.hideLoading()
                }
            },
        })
    },
    keyPickerChange: function (e) {
        this.setData({
            keyIndex: e.detail.value
        })
        const index = this.data.keyIndex
        const productionId = this.data.productionId
        this.setData({
            key: productionId[0][index]
        })
        this.checkKey2()
    },
    keyInput: function (e) {
        //console.log(e)
        this.setData({
            key: e.detail.value
        })
    },
    checkKey: function (e) {
        this.setData({
            i: 1,
            checkValue: e.detail.value
        })
        this.checkKey2()
        //console.log(this.data.checkValue)
        //console.log(this.data.listData[0][index])
        //console.log(temp)
        //console.log(this.data.listData)
    },
    trClick: function (e) {
        //console.log(e)
        this.setData({
            clickId: e.currentTarget.id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            choose_year: this.data.multiArray[0][0]
        })
        var temp
        var that = this
        wx.showLoading({
            title: '加载中……',
        })
        wx.request({
            url: 'https://api2.hzkmzn.com/RongXiangTest/home/getOutStoreListNew',
            method: 'POST',
            data: {
                StartTime: that.data.startTime,
                EndTime: that.data.endTime,
                ProductCode: '',
                WeaveType: '0'
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            success(res) {
                var tempProduct = [
                    ['全部']
                ]
                temp = res.data.data
                temp[0].forEach(t => {
                    var bool = tempProduct[0].indexOf(t)
                    if (bool == -1) {
                        tempProduct[0].push(t)
                    }
                });
                temp.splice(0, 1)
                that.setData({
                    showListData: temp,
                    listData: temp,
                    count: parseInt(temp.length / that.data.num + 1),
                    productionId: tempProduct
                })
                wx.hideLoading()
            },
        })

    },
    bindMultiPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
        const index = this.data.multiIndex;
        const year = this.data.multiArray[0][index[0]];
        const month = this.data.multiArray[1][index[1]];
        const day = this.data.multiArray[2][index[2]];
        this.setData({
            date1: year + '-' + month + '-' + day
        })
    },
    bindMultiPickerChange2: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
        const index = this.data.multiIndex;
        const year = this.data.multiArray[0][index[0]];
        const month = this.data.multiArray[1][index[1]];
        const day = this.data.multiArray[2][index[2]];
        this.setData({
            date2: year + '-' + month + '-' + day
        })
    },
    closePopup: function () {
        this.setData({
            closePopup: 'display:none'
        })
    },
    popupSave: function () {
        this.closePopup()
    },
    showPopup: function (e) {
        //console.log(e)
        var index = e.currentTarget.id
        this.setData({
            closePopup: 'display:block',
            productCode: this.data.showListData[index][0],
            productMeter: this.data.showListData[index][2],
            productCount: this.data.showListData[index][1],
            productManged: this.data.showListData[index][3]
        })
    },
    changeProductMeter: function (e) {
        this.setData({
            productMeter: e.detail.value
        })
    },
    changeProductCount: function (e) {
        this.setData({
            productCount: e.detail.value
        })
    },
    changeProductManged: function (e) {
        this.setData({
            productManged: e.detail.value
        })
        //console.log(this.data.productManged)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

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