// app.js
App({
	onLaunch() {
		// 展示本地存储能力
		const logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		const that = this
		const token = wx.getStorageSync('token') || ''
		if (token.length == 0) {
			// 登录
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					wx.request({
						url: 'http://localhost:9985/user/wechat',
						data: {
							Code: res.code
						},
						success(res) {
							wx.setStorageSync('token', res.data.Token)
						}
					})
				}
			})
		}
	},
	globalData: {
		userInfo: null,
		requestHeader: {
			"x-auth-token": wx.getStorageSync('token')
		}
	}
})
