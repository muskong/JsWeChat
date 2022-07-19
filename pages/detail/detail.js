// pages/detail/detail.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loading: false,
		storyId: 0,
		story: {}
	},
	btnLike(e) {
		var that = this
		that.setData({ loading: true })
		const params = {
			"StoryId": Math.abs(that.data.storyId),
			"StoryAttitudeId": Number(e.currentTarget.id),
		}
		console.log(params)
		wx.request({
			method: "POST",
			url: 'http://localhost:9985/story/like',
			data: params,
			header: app.globalData.requestHeader,
			success(res) {
				console.log(res, 'likelikelike')
				that.setData({ loading: false })
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			"storyId": options.storyId
		})

		var that = this
		wx.request({
			url: 'http://localhost:9985/story/detail',
			data: {
				"StoryId": options.storyId
			},
			header: app.globalData.requestHeader,
			success(res) {
				console.log(res, 'detaildetail')
				that.setData({
					story: res.data
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})