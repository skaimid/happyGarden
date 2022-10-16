"use strict"
require('dotenv').config()
// require('./service/telegram');
const { createClient } = require("oicq");

const account = process.env.account;

const bot = createClient(account);

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录");
	process.stdin.once("data", () => {
		this.login();
	})
})
.login()

exports.bot = bot

// template plugins
// require("./plu/plugins/plugin-hello") //hello world
// require("./plugin-image") //发送图文和表情
// require("./plugin-request") //加群和好友
// require("./plugin-online") //监听上线事件

require('./controller/picSearch');
require('./controller/randomPic');

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
})
