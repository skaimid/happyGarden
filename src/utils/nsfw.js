
const nsfwArrToMap =(arr) => {
    const rs = {};
    arr.forEach((item) => {
        rs[item.className] = item.probability;
    });
    return rs;
}

const isNsfw = (arr) => {
    const mp = nsfwArrToMap(arr);
    return mp['Hentai'] + mp['Porn'] > 0.5;
}

const toReadableText  = (arr) => {
    let rs = '';
    arr.forEach((item) => {
        rs = rs.concat(`${item.className}: ${item.probability}`);
    });
    return rs;
}

module.exports = {
    nsfwArrToMap,
    isNsfw,
    toReadableText,
}
