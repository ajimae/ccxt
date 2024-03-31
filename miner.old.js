const fs = require("fs")
const axios = require("axios")

function match(str) {
  // console.log(str)
  return ['usdt', 'cro', 'wbtc', 'uni'].includes(str)
}

const fetchAssets = async () => {
  const data = await Promise.all([
    axios({
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false',
      method: 'GET'
    }),
    axios({
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false',
      method: 'GET'
    })
  ])

  return [...data[0].data, ...data[1].data]
}

// call coingecko api and get api data
(function () {
  function mine() {
    const start = Date.now()
    console.log('mining data...');
    fetchAssets()
      .then(data => {
        // const dataPair = data.map(v => match(v.symbol) ? `${v.symbol.toUpperCase()}/USD` : `${v.symbol.toUpperCase()}/USDT`);
        const dataPair = data.map(v => match(v.symbol) ? Object.assign({}, v, { ticker: { s: `${v.symbol.toUpperCase()}/USD` } }) : Object.assign({}, v, { ticker: { s: `${v.symbol.toUpperCase()}/USDT` } }));
        fs.writeFileSync("data.json", JSON.stringify(dataPair));

        const end = Date.now()
        console.log('mining completed in', (end - start), 'seconds');
      })
      .catch(console.error)

  }

  mine()

  // setInterval(mine, 300 * 1000)
  const options = { interval: 300000 }
  setInterval(mine, options.interval)
}())
