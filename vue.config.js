const path = require('path')

module.exports = {
	// js文件的hash值可以去掉，但是chunk js的hash值还在
	filenameHashing: false,

	/*publicPath:
	baseUrl从 Vue CLI 3.3 起已弃用，请使用publicPath。
	部署应用包时的基本 URL，默认值为'/'，即默认应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
	如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
	这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
	相对路径的 publicPath 有一些使用上的限制。 在以下情况下，应当避免使用相对 publicPath:
	    1 当使用基于 HTML5 history.pushState 的路由时；    
	    2 当使用 pages 选项构建多页面应用时。
	*/
	publicPath: '',

	// outputDir: __dirname + "/dist",
	// outputDir: "e:\\dist",

	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.output.filename = 'js/[name].js';
			config.output.chunkFilename = 'js/chunks-[name].js';
		} else {
			// 为开发环境修改配置...
		}

		config.resolve = {
			extensions: ['.js', '.vue', '.json', ".css"],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'~': path.resolve(__dirname, 'src'),
			}
		};

	},
	// 多页面
	pages: {
		index: {
			entry: 'src/pages/index/main.js',
			template: 'public/index.html',
			title: 'index',
			filename: 'index.html',
			importTinymce: true
		},
	},
	// 解决开发阶段跨域问题
	devServer: {
		// 端口号
		port: "9446",
		proxy: {
			'/api': {
				target: 'http://localhost:3526/',
				pathRewrite: {
					'^/api': '',
				}
			},
		}
	},
	// 打包上线的环境中，是否需要 sourcemap。默认为true
	productionSourceMap: false,
}