const axios = require('axios');

// let search = '铝蜂窝板与干挂花岗岩';

const getRealTimePrice = async (search) => {
    try {
        const {data} = (await axios.get('https://b2b.baidu.com/s/a', {
            params: { q: search }
        })).data;
        let {productList} = data;

        const unit = getMostUnit(productList.map(product => product.unit));

        productList = productList.filter(product => product.unit === unit);

        let prices = productList.map(product => product.price);
        prices = cleanPriceArr(prices);

        let price = getAverage(prices);

        const image = productList[0] ? productList[0].picUrl : "";

        let sources = productList.map(product => product.jUrl);

        return {price, unit, image, sources};

        // console.log(JSON.parse(objStr).productList.map(product => product.unit));

    } catch (error) {
        console.log(error.toString());
    }
}

const getMostUnit = (arr) => {
  if (!arr.length) return;
  if (arr.length === 1) return 1;
  let maxName, maxNum = 0;
  let res = arr.reduce((res, currentNum) => {
    res[currentNum] ? res[currentNum] += 1 : res[currentNum] = 1
    if (res[currentNum] > maxNum) {
      maxNum = res[currentNum]
      maxName = currentNum
    }
    return res
  }, {});
  return maxName;
}

const cleanPriceArr = (arr) => {
    let prices = arr.map(price => parseFloat(price));
    prices = prices.filter(price => !isNaN(price));
    prices.sort((a, b) => a - b);
    let mid = prices[Math.ceil(prices.length / 2)];
    return prices.filter(price => price >= mid * 0.7 && price <= mid * 1.3);
}

const getAverage = (arr) => {
    let sum = 0;
    for (let n of arr) {
        sum += n;
    }
    return parseFloat((sum / arr.length).toFixed(2));
}

module.exports = getRealTimePrice;

