const axios = require("axios"); //you can use any http client
const fs = require("fs");
const { picTest } = require("./NSFWService");
const { isNsfw } = require("../utils/nsfw");
const download = require("download");
const path = require("path");

const getHotListRecent = async (type, year, month, day) => {
  const date = new Date();
  const typeMap = {
    日榜: `https://yande.re/post/popular_by_day.json?day=${
      day || date.getDate()
    }&month=${month || date.getMonth() + 1}&year=${year || date.getFullYear()}`,
    周榜: `https://yande.re/post/popular_by_week.json?day=${
      day || date.getDate()
    }&month=${month || date.getMonth() + 1}&year=${year || date.getFullYear()}`,
    月榜: `https://yande.re/post/popular_by_month.json?month=${
      month || date.getMonth() + 1
    }&year=${year || date.getFullYear()}`,
    即时: `https://yande.re/post/popular_recent.json`,
    随机: `https://yande.re/post.json?tags=order%3Arandom`,
  };

  let dataArr = (await axios.get(typeMap[type || "随机"])).data;
  dataArr = dataArr.slice(0,5)
  const rs = [];

  for (let item of dataArr) {
    const filePath = `./tempImg/yande.re/${
      new URL(item.jpeg_url).pathname.split("/").reverse()[0]
    }.jpg`;
    if (!fs.existsSync(filePath)) {
      await download(item.jpeg_url, `./`, { filename: filePath });
    }
    rs.push({ url: item.jpeg_url, location: path.join(__dirname, '../../',filePath), tags: item.tags });
  }
  console.log(JSON.stringify(rs));
  return rs;
};

module.exports.getHotListRecent = getHotListRecent;
