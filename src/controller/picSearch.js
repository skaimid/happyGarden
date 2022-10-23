"use strict";
const { bot } = require("../index");
const { SauceClient } = require("../service/SauceNAOService");
const { segment } = require("oicq");

const groupWhiteList = JSON.parse(process.env.GroupWhiteList);
const admin = parseInt(process.env.ADMIN);

bot.on("message", (msg) => {
  if (
    (groupWhiteList && groupWhiteList.find((item) => item === msg.group_id)) ||
    msg.from_id === admin
  ) {
    console.log(groupWhiteList, admin);
    if (msg.raw_message && msg.raw_message.startsWith("搜图")) {
      const imgMsgEl = msg.message.find((item) => item.type === "image");
      if (imgMsgEl && imgMsgEl.url) {
        SauceClient(imgMsgEl.url, { mask: [5] })
          .then((res) => {
            console.log(JSON.stringify(res));
            let responseMsg = [
              `${res && res.length > 0 ? "搜索结果：\n" : "未搜索到"}`,
            ];
            res.forEach((el) => {
              const msgSeg = [
                segment.image(el.thumbnail),
                `相似度${el.similarity} (${
                  el.similarity > 60 ? "High" : "Low"
                }) \n${el.url}\n`,
              ];
              console.log(msgSeg);
              responseMsg = responseMsg.concat(msgSeg);
            });
            console.log(JSON.stringify(responseMsg));
            msg.reply(responseMsg);
          })
          .catch((e) => {
            msg.reply("看起来坏了");
            console.log(e);
          });
      } else {
        msg.reply("你图呢？");
      }
    }
  }
});
