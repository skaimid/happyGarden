const { bot } = require("../index");
const { segment } = require("oicq");
const { getHotListRecent } = require("../service/yande.re");
const { picTest } = require("../service/NSFWService");
const { isNsfw } = require("../utils/nsfw");
const { splitFile } = require("../service/imgSplitService");
const groupWhiteList = JSON.parse(process.env.GroupWhiteList);
const admin = parseInt(process.env.ADMIN);

bot.on("message", (msg) => {
  if (
    (groupWhiteList && groupWhiteList.find((item) => item === msg.group_id)) ||
    msg.from_id === admin
  ) {
    if (msg.raw_message && msg.raw_message.startsWith("#yande")) {
      getHotListRecent("即时")
        .then((res) => {
          msg.reply(`获取yande.re热榜成功`);
          res.forEach((item, idx) => {
            picTest(item.location)
              .then((rs) => {
                if (isNsfw(rs)) {
                  // splitFile(item.location).then((splImgs) => {
                  //   msg.reply([
                  //     `${idx + 1}/${res.length}`,
                  //     segment.image(splImgs[0]),
                  //     segment.image(splImgs[1]),
                  //     item.url,
                  //     `\ntags: ${item.tags}`,
                  //   ]);
                  // }).catch((e) => {
                  //   msg.reply([
                  //     `${idx + 1}/${res.length} \n 分割失败：${item.url} `,
                  //     `\ntags: ${item.tags}`,
                  //   ]);
                  //   console.log(`切割失败${e}`);
                  // });;
                  msg.reply([
                        `${idx + 1}/${res.length} 不宜展示`,
                        item.url,
                        `\ntags: ${item.tags}`,
                      ]);
                } else {
                  msg.reply([
                    `${idx + 1}/${res.length}`,
                    segment.image(item.location),
                    item.url,
                    `\ntags: ${item.tags}`,
                  ]);
                }
              })
              .catch((e) => {
                msg.reply([
                  `${idx + 1}/${res.length} \n 鉴定失败：${item.url} `,
                ]);
                console.log(`鉴定失败${e}`);
              });
          });
        })
        .catch((e) => {
          msg.reply(`涩不出来了喵~`);
          console.log(`${e}`);
        });
    }
  }
});
