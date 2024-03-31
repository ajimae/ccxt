const fs = require('fs')
  , ccxt = require('ccxt')
  , CoinGecko = require('coingecko-api')

async function getAllPriceFullCoinGecko() {

  const CoinGeckoClient = new CoinGecko();
  let coinList = await CoinGeckoClient.coins.list();
  if (coinList && coinList.success) {
    let markets = [];
    // let maxNumberOfCoins = coinList.data.length;
    // console.log(coinList.data.length);
    let maxNumberOfCoins = 500;
    for (let p = 0; p < maxNumberOfCoins / 250; p++) {
      let partialMarket = await CoinGeckoClient.coins.markets({
        per_page: 250,
        page: p,
        vs_currency: 'usd'
      });
      if (partialMarket && partialMarket.success) {
        markets = markets.concat(partialMarket.data);
      }
    }

    let prices = {};
    // markets.map(async c => {
    //   let symbol = c.symbol.toUpperCase();

    //   // Fix coins with the same abbreviation
    //   switch (symbol) {
    //     case 'BTG': {
    //       if (c.name == 'Bitcoin Gold') {
    //       } else {
    //         symbol = 'BTG*';
    //       }
    //       break;
    //     }

    //     case 'KEY': {
    //       if (c.name == 'Selfkey') {
    //       } else {
    //         symbol = 'KEY*';
    //       }
    //       break;
    //     }
    //   }

    //   const id = symbol + '/USDT'
    //   prices[id] = [];
    //   // prices[symbol]['USD'] = {
    //   //   PRICE: Number(c.current_price),
    //   //   CHANGEPCT24HOUR: Number(c.price_change_percentage_24h),
    //   //   MKTCAP: Number(c.market_cap)
    //   // };
    //   prices[id] = c
    //   await getTicker(id)

    //   // try {
    //   //   Globals.refCryptoPrice[symbol] = c;
    //   // } catch (e) {
    //   //   log('Error: ', e);
    //   // }
    // });


    for (var i = 0; i < markets.length; i++) {
      let symbol = markets[i].symbol.toUpperCase()
      console.log(i, symbol)

      // Fix coins with the same abbreviation
      switch (symbol) {
        case 'BTG': {
          if (c.name == 'Bitcoin Gold') {
          } else {
            symbol = 'BTG*';
          }
          break;
        }

        case 'KEY': {
          if (c.name == 'Selfkey') {
          } else {
            symbol = 'KEY*';
          }
          break;
        }
      }

      const id = symbol + '/USDT'
      await getTicker(id)

      // try {
      //   Globals.refCryptoPrice[symbol] = c;
      // } catch (e) {
      //   log('Error: ', e);
      // }
    }

    // fs.writeFileSync('c.json', JSON.stringify(prices), 'utf-8')
    // console.log('Successfully Updated CoinGecko prices!');
  }
}

// const exchanges = ['aax', 'ascendex', 'bequant', 'bibox', 'bigone', 'binance', 'binancecoinm', 'binanceus', 'binanceusdm', 'bit2c', 'bitbank', 'bitbay', 'bitbns', 'bitcoincom', 'bitfinex', 'bitfinex2', 'bitflyer', 'bitforex', 'bitget', 'bithumb', 'bitmart', 'bitmex', 'bitpanda', 'bitrue', 'bitso', 'bitstamp', 'bitstamp1', 'bittrex', 'bitvavo', 'bl3p', 'btcalpha', 'btcbox', 'btcmarkets', 'btctradeua', 'btcturk', 'buda', 'bw', 'bybit', 'bytetrade', 'cdax', 'cex', 'coinbase', 'coinbaseprime', 'coinbasepro', 'coincheck', 'coinex', 'coinfalcon', 'coinmate', 'coinone', 'coinspot', 'crex24', 'currencycom', 'delta', 'deribit', 'digifinex', 'eqonex', 'equos', 'exmo', 'flowbtc', 'ftx', 'ftxus', 'gateio', 'gemini', 'hitbtc', 'hitbtc3', 'hollaex', 'huobi', 'huobijp', 'huobipro', 'idex', 'independentreserve', 'indodax', 'itbit', 'kraken', 'kucoin', 'kuna', 'latoken', 'latoken1', 'lbank', 'liquid', 'luno', 'lykke', 'mercado', 'mexc', 'ndax', 'novadax', 'oceanex', 'okcoin', 'okex', 'okex3', 'okex5', 'paymium', 'phemex', 'poloniex', 'probit', 'qtrade', 'ripio', 'stex', 'therock', 'tidebit', 'tidex', 'timex', 'upbit', 'vcc', 'wavesexchange', 'whitebit', 'xena', 'yobit', 'zaif', 'zb', 'zipmex', 'zonda']
const exchanges = ['binance', 'aax', 'ascendex', 'delta', 'bitbay', 'binanceus']

let getTicker = async (symbol) => {
  let j = 0;
  // for (var i = 0; i < ccxt.exchanges.length; i++) {
  for (var i = 0; i < exchanges.length; i++) {
    let id = ccxt.exchanges[i]

    const exchange = new ccxt[id]({ verbose: false })
    if (exchange.has.publicAPI) {
      try {
        await exchange.loadMarkets()

        if (exchange.symbols.indexOf(symbol) > -1) {
          j = 0
          console.log(symbol, 'found on', id, 'exchange')
          break;
        } else {
          // console.log(symbol, 'was not found on ', id, ' exchange')
          if (j == exchanges.length - 1) console.log(symbol, 'not found anywhere');j++
          continue;
        }
      } catch (e) { }
    }
  }
}

getAllPriceFullCoinGecko()