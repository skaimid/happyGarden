const { bot } = require("../index");
const { picTest } = require("../service/NSFWService");
const groupWhiteList = JSON.parse(process.env.GroupWhiteList);
const admin = parseInt(process.env.ADMIN);

bot.on("message", (msg) => {
  if (
    (groupWhiteList && groupWhiteList.find((item) => item === msg.group_id)) ||
    msg.from_id === admin
  ) {
    console.log(JSON.stringify(msg.source))
    if (msg.raw_message && msg.raw_message.startsWith("#鉴定")) {
      const imgMsgEl = msg.message.find((item) => item.type === "image");
      if (imgMsgEl && imgMsgEl.url) {
        picTest(imgMsgEl.url)
          .then((res) => {
            console.log(res);
            let responseMsg = [
              `${JSON.stringify(res)}`,
            ];            
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
