const fs = require("fs")
const axios = require("axios")

function match(str) {
  // console.log(str)
  return ['usdt', 'cro', 'wbtc', 'uni'].includes(str)
}

// call coingecko api and get api data
(function () {
  function mine() {
    console.log('mining data...');
    axios({
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false',
      method: 'GET'
    })
      .then(({ data }) => {
        // const dataPair = data.map(v => match(v.symbol) ? `${v.symbol.toUpperCase()}/USD` : `${v.symbol.toUpperCase()}/USDT`);
        const dataPair = data.map(v => match(v.symbol) ? Object.assign({}, v, { ticker: { s: `${v.symbol.toUpperCase()}/USD` } }) : Object.assign({}, v, { ticker: { s: `${v.symbol.toUpperCase()}/USDT` } }));
        fs.writeFileSync("data.json", JSON.stringify(dataPair));
        console.log('mining complete...');
      })
      .catch(console.error)
  }

  mine()
  setInterval(mine, 300 * 1000)
}())
