require('utils/mixins.js');

const listeners = [];

App({
	globalData: {
		theme: 'light', // dark
		mode: '', // 模式(care：关怀模式)
		userInfo: null,
		requestHeader: {
			"X-AUTH-TOKEN": wx.getStorageSync('token') || ''
		}
	},
	changeGlobalData(data) {
		this.globalData = Object.assign({}, this.globalData, data);
		listeners.forEach((listener) => {
			listener(this.globalData);
		});
	},
	watchGlobalDataChanged(listener) {
		if (listeners.indexOf(listener) < 0) {
			listeners.push(listener);
		}
	},
	unWatchGlobalDataChanged(listener) {
		const index = listeners.indexOf(listener);
		if (index > -1) {
			listeners.splice(index, 1);
		}
	},
	onThemeChange(resp) {
		this.changeGlobalData({
			theme: resp.theme,
		});
	},
	onLaunch() {
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
            },
          fail(err) {
            console.log(err, 'user/wechat')
          }
					})
				}
			})
		}
	},
})
