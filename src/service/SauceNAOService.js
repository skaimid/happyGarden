const sagiri = require("sagiri");

const client = sagiri("e12136de8562e263f8ac459b60cf0694078234ed");

exports.SauceClient = client;

// const results = await client("http://i.imgur.com/5yFTeRV.png", { mask: [5] });
