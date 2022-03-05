// pages/demo/demo01.js
var wxCharts = require('../../wxcharts')
var lineChart = null
var pieChart = null
var columnChart = null
var ringChart = null
var chartData = {
    main: {
        title: '总成交量',
        data: [15, 20, 45, 37],
        categories: ['2012', '2013', '2014', '2015']
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chartTitle: '总成交量',
        isMainChartDisplay: true,
    },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('2016-' + (i + 1));
            data.push(Math.random() * (20 - 10) + 10);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var simulationData = this.createSimulationData()
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            categories: simulationData.categories,
            type: 'line',
            animation: true,
            series: [{
                name: '成交量1',
                data: [1, 2, 6, 3, 7, 2, 0, 2, 0],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '成交量2',
                data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: 320,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        })
        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '成交量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '万';
                },
                title: 'hello',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: 320,
            height: 200,
        });
        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '成交量1',
                data: 15,
            }, {
                name: '成交量2',
                data: 35,
            }, {
                name: '成交量3',
                data: 78,
            }, {
                name: '成交量4',
                data: 63,
            }],
            width: 320,
            height: 300,
            dataLabel: true,

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: '70%',
                color: '#7cb5ec',
                fontSize: 25
            },
            subtitle: {
                name: '收益率',
                color: '#666666',
                fontSize: 15
            },
            series: [{
                name: '成交量1',
                data: 15,
                stroke: false
            }, {
                name: '成交量2',
                data: 35,
                stroke: false
            }, {
                name: '成交量3',
                data: 78,
                stroke: false
            }, {
                name: '成交量4',
                data: 63,
                stroke: false
            }],
            disablePieStroke: true,
            width: 320,
            height: 200,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
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