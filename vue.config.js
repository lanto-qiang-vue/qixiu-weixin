const path = require('path')
const resolve = dir => {
	return path.join(__dirname, dir)
}
// console.log(process.env.NODE_ENV)
module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('~', resolve('/'))
	},

	// 打包时不生成.map文件
	productionSourceMap: false,

	devServer: {
		port: 8888,
		proxy: {
			'/repairproxy': {
				target: 'http://192.168.169.230:7210/',
				// target: 'https://www.shanghaiqixiu.org/repair/',
				pathRewrite: {'^/repairproxy': ''},
				secure: false
			},
			'/proxy': {
				target: 'http://192.168.169.231:8888/',
				// target: 'https://www.test.shanghaiqixiu.org/proxy/',
				// target: 'https://www.shanghaiqixiu.org/proxy/',
				// target: 'http://192.168.169.128:7310/',
				// target: 'http://212.64.5.54:8888/',
				pathRewrite: {'^/proxy': ''},
				secure: false
			},
		}
	}
}
