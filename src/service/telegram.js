// const { Api, TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const input = require("input");
// const fs = require("fs");
// const path = require("path");

// require("dotenv").config();

// // login session presistance
// const saveSession = (session) => {
//   fs.writeFileSync(path.join(__dirname, "../../session/tg.session"), session);
// };

// const loadSession = () => {
//   return fs.readFileSync(
//     path.join(__dirname, "../../session/tg.session"),
//     "utf-8"
//   );
// };

// let session = "";

// try {
//   session = loadSession();
// } catch (e) {
//   console.log(`加载tg session 失败 ${e}`);
// }

// const apiId = parseInt(process.env.TLEGRAM_APP_ID);
// const apiHash = process.env.TELEGRAM_APP_KEY;
// const stringSession = new StringSession(session); // fill this later with the value from session.save()

// console.log("Loading interactive example...");
// const client = new TelegramClient(stringSession, apiId, apiHash, {
//   connectionRetries: 5,
// });
// client
//   .start({
//     phoneNumber: async () => await input.text("Please enter your number: "),
//     password: async () => await input.text("Please enter your password: "),
//     phoneCode: async () =>
//       await input.text("Please enter the code you received: "),
//     onError: (err) => console.log(err),
//   })
//   .then((_) => {
//     console.log("You should now be connected.");
//     console.log(client.session.save()); // Save this string to avoid logging in again
//     saveSession(client.session.save());
//     // client.sendMessage("me", { message: "Hello!" })
//   });

// getRandomImgByChannelName = async (name) => {
//   await client.connect(); // This assumes you have already authenticated with .start()

//   const channelInfo = await client.invoke(
//     new Api.channels.GetFullChannel({
//       channel: name,
//     })
//   );

//   const channelMessageMax =
//     channelInfo.fullChat.readInboxMaxId + channelInfo.fullChat.unreadCount;

//   const randomMsg = Math.floor(Math.random() * channelMessageMax);

//   const message = await client.invoke(
//     new Api.channels.GetMessages({
//       channel: name,
//       id: [22474],
//     })
//   );
//   const photo = message.messages[0].media.photo;
//   // console.log(JSON.stringify(message)); // prints the result

//   const result = await client.invoke(
//     new Api.upload.GetFile({
//       location: new Api.InputPhotoFileLocation({
//         id: photo.id,
//         fileReference: photo.fileReference,
//         accessHash: photo.accessHash,
//         thumbSize:photo.sizes[photo.sizes.length - 1].type,
//       }),
//       limit:1048576,
//       offset:0,
//       cdnSupported:false,
//     })
//   );
//   console.log(result); // prints the result
// };
// getRandomImgByChannelName("GfWR16");

// module.exports = { client };
