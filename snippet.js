// const https = require('https')

// // const data = JSON.stringify({
// //   todo: 'Buy the milk'
// // })


// let _data = ""
// function cb(data) {
//   // console.log(data && data.toString().result['market:binance-us:btcusdt'], '-->')
//   console.log(data.toString())
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   // res.on('data', d => {
//   //   // process.stdout.write(d)
//   //   _data += d.toString()
//   // })

//   res.on('data', cb)
// })

// req.on('error', error => {
//   console.error(error)
// })

// // req.write()
// req.end()


// const https = require('https')

// // https://api.blockchain.com/v3/exchange/tickers
// function query() {
//   const options = {
//     hostname: 'api.blockchain.com',
//     port: 443,
//     path: '/v3/exchange/tickers',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Length': data.length
//     }
//   }

//   https.get(options, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//       // console.log(JSON.parse(data).result['market:binance-us:btcusdt'], '-->');
//       // console.log(data.result['market:binance-us:btcusdt'], '-->')

//       const result = JSON.parse(data).find(v => v['symbol'] == 'BTC-USD')
//       console.log(result.price_24h, result.last_trade_price)
//     }.on("error", (err) => {
//     // console.log("Error: " + err.message);
//   })
// }

// query()
// setInterval(query, 3000)


// let options = {
//   // Forex conversions
//   getForexData_oxr: true, // Mocked values will be uses if set to false
//   // osx_app_id: "YOUR_OSX_APP_ID" // openexchangerates.org app id

//   loopForEver: false,
//   maxNumberOfIterations: 10,

//   // getCoinGeckoPrices: true
// };

// var ca = require("crypto-aggregator")(options);
// ca.start(options);

// const log = console;
// const fs = require('fs')
// const ccxt = require("ccxt");
// var moment = require("moment");
// var momentDurationFormatSetup = require("moment-duration-format");

// async function getAllPriceFullCoinGecko() {
//   const CoinGecko = require("coingecko-api");
//   const CoinGeckoClient = new CoinGecko();
//   let coinList = await CoinGeckoClient.coins.list();
//   if (coinList && coinList.success) {
//     let markets = [];
//     // let maxNumberOfCoins = coinList.data.length;
//     let maxNumberOfCoins = 2000;
//     for (let p = 0; p < maxNumberOfCoins / 250; p++) {
//       let partialMarket = await CoinGeckoClient.coins.markets({
//         per_page: 250,
//         page: p,
//         vs_currency: "usd"
//       });
//       if (partialMarket && partialMarket.success) {
//         markets = markets.concat(partialMarket.data);
//       }
//     }
//     let prices = {};
//     markets.forEach(c => {
//       let symbol = c.symbol.toUpperCase();

//       // Fix coins with the same abbreviation
//       switch (symbol) {
//         case "BTG": {
//           if (c.name == "Bitcoin Gold") {
//           } else {
//             symbol = "BTG*";
//           }
//           break;
//         }

//         case "KEY": {
//           if (c.name == "Selfkey") {
//           } else {
//             symbol = "KEY*";
//           }
//           break;
//         }
//       }

//       prices[symbol] = {};
//       // prices[symbol]["USD"] = {
//       //   PRICE: Number(c.current_price),
//       //   CHANGEPCT24HOUR: Number(c.price_change_percentage_24h),
//       //   MKTCAP: Number(c.market_cap)
//       // };
//       prices[symbol]["USD"] = c

//       // try {
//       //   Globals.refCryptoPrice[symbol] = c;
//       // } catch (e) {
//       //   log("Error: ", e);
//       // }
//     });

//     fs.writeFileSync('c.json', JSON.stringify(prices), 'utf-8')
//     log("Successfully Updated CoinGecko prices!");
//   }
// }

// getAllPriceFullCoinGecko()


// // var exports = (module.exports = {
// //   Globals: Globals,
// //   fiats: fiats,
// //   // options: options,
// //   log: log
// // });

// //-----------------------------------------------------------------------------
// /**
//  *
//  * @param {number} time
//  */
//  function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

// //-----------------------------------------------------------------------------
// /**
//  *
//  * @param {Array} array
//  * @param {number} n
//  * @param {object} options
//  */
// // Gets an array of arrays A are returns an array of Nth element of A
// function projectOnNthElement(array, n, options = {}) {
//   let nullValue = options.nullValue || 0;

//   if (!array) {
//     return array;
//   }
//   try {
//     return array.map(e => {
//       if (e[n] === undefined || e[n] === null) {
//         return nullValue;
//       }
//       return e[n];
//     });
//   } catch (error) {
//     log("Error: ".red, error);
//   }
// }

// var Globals = {
//   options: {
//     cmd: false,
//     loopForEver: true,
//     maxNumberOfIterations: 10, // ignored if loopForEver == true

//     printBanner: true,

//     getCoinGeckoPrices: true, // Get CoinGecko prices as a reference to compare our prices (optional)

//     // Forex conversions
//     getForexData_oxr: false,  // Mocked values will be uses if set to false
//     osx_app_id: "YOUR_OSX_APP_ID", // openexchangerates.org app id

//     // control
//     enable: true, // Used for start/stop

//     // Outlier detection
//     bypassOutliers: true, // Ignores outliers
//     outlierStandardDeviationDistanceFromMean: 3, // distance from mean for an outlier in sigma

//     aggregatePriceInterval_ms: 5000,
//     coingGeckoUpdateInterval_ms: 100 * 1000,
//     statusBarTextInterval_ms: 1000,

//     aggregatePricesCallBack: null, // Called whenever the partial WVAP is calculated
//     iterationCallBack: null, // Calculated whenever all exchanges and pairs were queired at the end of one iteration
//     discoveredOneTickerCallBack: null,  // Called whenever found a new pair on an exchange


//     bPrintStatus: true,
//     printAllPrices: true,
//     coinsInStatusBar: ["BTC", "ETH"], // Coins to be shown in the summary status bar

//     ccxtExchangeRateLimitDivider: 1,  // Divides CCXT's recommended rateLimit time if filling adventerous!

//     // Exchanges to query from
//     trustedExchanges: [
//       // "bitforex",
//       // "bitfinex",

//       "huobipro",
//       "kraken",
//       "binance",
//       "bittrex",
//       "bitmex",
//       "bitstamp",
//       "coinbasepro",
//       "gemini",
//       "itbit",
//       "bitflyer",
//       "poloniex",
//       "independentreserve",

//       "liquid",
//       "upbit"
//     ],
//     // Exchanges to exclude the query from
//     excludeExchanges: [
//       "_1btcxe",
//       "allcoin",
//       "theocean",
//       "xbtce",
//       "cointiger",
//       "bibox",
//       "coolcoin",
//       "uex",
//       "dsx",
//       "flowbtc",
//       "bcex"
//     ]
//   },
//   fallBackToMockForexValues: false,

//   startTime: 0,
//   iterationEndTime: 0,
//   iterationNumber: 0,
//   coinGeckoCoinList: [],

//   refCryptoPrice: {},
//   generalMarketData: {},
//   forex: {},
//   intervals: {
//     aggregatePriceInterval: null,
//     coingGeckoUpdateInterval: null,
//     statusBarTextInterval: null
//   },
//   logOptions: {
//     ololog_configure: {
//       time: { yes: true, print: x => x.toLocaleString()+ " " },
//       locate: false,
//       tag: true
//     },
//     initialStatusTextArray: ["Please wait..."],
//     minVerbosity: 1, //Minimum verbosity level
//     verbosity: 1, //Default verbosity level
//     enableStatusBar: true
//   },

//   /**
//    * Captures all tickers from all exchanges for all pairs
//    * tickers[cryptoName][exchangeName]['pairs'][index].ticker to USD
//    *         g_tickers = {
//    *           'BTC' : {
//    *             'binance': {
//    *               pairs: [{ticker: {...}, market: {symbol: 'BTC/USDT'}},
//    *                       {ticker: {...}, market: {symbol: 'BTC/BNB'}}
//    *                       ]
//    *             },
//    *             'kraken': {
//    *               pairs: [{ticker: {...}, market: {symbol: 'ETH/BTC'}},
//    *                       {ticker: {...}, market: {symbol: 'BTC/USDT'}},
//    *                      ]
//    *             }
//    *           }
//    *         }
//    */
//   tickers: {},
//   totalNumberOfTickers: 0,
//   aggregatedOHLCV: {},
//   progressFetchOHLCV: {},
//   pricesInUSD: {
//     // USDT: 1.01,
//   },

//   volumeInUSD: {
//     // USDT: 1.01,
//   },

//   prevPricesInUSD: {
//     // USDT: 1.01,
//   },

//   prevVolumeInUSD: {
//     // USDT: 1.01,
//   }
// };

// let fiats = [
//   "AED",
//   "AFN",
//   "ALL",
//   "AMD",
//   "ANG",
//   "AOA",
//   "ARS",
//   "AUD",
//   "AWG",
//   "AZN",
//   "BAM",
//   "BBD",
//   "BDT",
//   "BGN",
//   "BHD",
//   "BIF",
//   "BMD",
//   "BND",
//   "BOB",
//   "BOV",
//   "BRL",
//   "BSD",
//   "BTN",
//   "BWP",
//   "BYR",
//   "BZD",
//   "CAD",
//   "CDF",
//   "CHE",
//   "CHF",
//   "CHW",
//   "CLF",
//   "CLP",
//   "CNY",
//   "COP",
//   "COU",
//   "CRC",
//   "CUC",
//   "CUP",
//   "CVE",
//   "CZK",
//   "DJF",
//   "DKK",
//   "DOP",
//   "DZD",
//   "EGP",
//   "ERN",
//   "ETB",
//   "EUR",
//   "FJD",
//   "FKP",
//   "GBP",
//   "GEL",
//   "GHS",
//   "GIP",
//   "GMD",
//   "GNF",
//   "GTQ",
//   "GYD",
//   "HKD",
//   "HNL",
//   "HRK",
//   "HTG",
//   "HUF",
//   "IDR",
//   "ILS",
//   "INR",
//   "IQD",
//   "IRR",
//   "ISK",
//   "JMD",
//   "JOD",
//   "JPY",
//   "KES",
//   "KGS",
//   "KHR",
//   "KMF",
//   "KPW",
//   "KRW",
//   "KWD",
//   "KYD",
//   "KZT",
//   "LAK",
//   "LBP",
//   "LKR",
//   "LRD",
//   "LSL",
//   "LTL",
//   "LVL",
//   "LYD",
//   "MAD",
//   "MDL",
//   "MGA",
//   "MKD",
//   "MMK",
//   "MNT",
//   "MOP",
//   "MRO",
//   "MUR",
//   "MVR",
//   "MWK",
//   "MXN",
//   "MXV",
//   "MYR",
//   "MZN",
//   "NAD",
//   "NGN",
//   "NIO",
//   "NOK",
//   "NPR",
//   "NZD",
//   "OMR",
//   "PAB",
//   "PEN",
//   "PGK",
//   "PHP",
//   "PKR",
//   "PLN",
//   "PYG",
//   "QAR",
//   "RON",
//   "RSD",
//   "RUB",
//   "RWF",
//   "SAR",
//   "SBD",
//   "SCR",
//   "SDG",
//   "SEK",
//   "SGD",
//   "SHP",
//   "SLL",
//   "SOS",
//   "SRD",
//   "SSP",
//   "STD",
//   "SYP",
//   "SZL",
//   "THB",
//   "TJS",
//   "TMT",
//   "TND",
//   "TOP",
//   "TRY",
//   "TTD",
//   "TWD",
//   "TZS",
//   "UAH",
//   "UGX",
//   "USD",
//   "USN",
//   "USS",
//   "UYI",
//   "UYU",
//   "UZS",
//   "VEF",
//   "VND",
//   "VUV",
//   "WST",
//   "XAF",
//   "XAG",
//   "XAU",
//   "XBA",
//   "XBB",
//   "XBC",
//   "XBD",
//   "XCD",
//   "XDR",
//   "XFU",
//   "XOF",
//   "XPD",
//   "XPF",
//   "XPT",
//   "XTS",
//   "XXX",
//   "YER",
//   "ZAR",
//   "ZMW"
// ];

// // var Globals = Globals;

// const e_commands = Object.freeze({ fetchTicker: 0x01, fetchOHLCV: 0x02 });

// /**
//  * Resets memory after each iteration
//  */
// function resetIteration() {
//   Globals.tickers = {};
//   Globals.prevPricesInUSD = clone(Globals.pricesInUSD);
//   Globals.prevVolumeInUSD = clone(Globals.volumeInUSD);
// }

// //-----------------------------------------------------------------------------
// /**
//  * Creates the chain of object[keys[0]][keys[1]]...[keys[keys.length-1]]
//  * @param {object} object
//  * @param  {...any} keys
//  */
//  function createChain(object, ...keys) {
//   // console.log('keys: ', JSON.stringify(keys));
//   if (!object) return false;
//   if (!keys || !keys.length) {
//     return;
//   }

//   if (!object[keys[0]]) {
//     object[keys[0]] = {};
//   }
//   if (keys.length == 1) {
//     return;
//   }
//   let key0 = keys.shift();
//   return createChain(object[key0], ...keys);
// }

// //-----------------------------------------------------------------------------
// /**
//  * Checks if the chain of
//  * object[keys[0]][keys[1]]...[keys[keys.length-1]] is valid
//  * @param {object} object
//  * @param {...any} keys
//  */
//  function validChain(object, ...keys) {
//   if (!object) return false;
//   return keys.reduce((a, b) => (a || {})[b], object) !== undefined;
// }

// //-----------------------------------------------------------------------------
// /**
//  * Checks if object[keys[0]][keys[1]]...[keys[keys.length-1]] is valid
//  * otherwise creates it
//  * @param {*} object
//  * @param  {...any} keys
//  */
//  function validOrCreateChain(object, ...keys) {
//   if (!validChain(object, ...keys)) {
//     createChain(object, ...keys);
//     return false;
//   } else {
//     return true;
//   }
// }

// //-----------------------------------------------------------------------------
// /**
//  * returns true of the currency is Fiat
//  * @param {String} currency
//  */
// function isFiat(currency) {
//   return fiats.indexOf(currency) >= 0;
// }

// async function getExchangeData(options) {
//   let exchangeName = options.exchangeName;
//   let ohlcvPeriod = options.ohlcvPeriod || "1m";
//   let drawOhlcvChart = options.drawOhlcvChart || false;
//   let cmd = options.cmd || e_commands.fetchOHLCV | e_commands.fetchTicker;

//   log.info(`Starting ${exchangeName}. cmd: ${cmd}`);

//   let exchange;
//   let promises = [];

//   // Create the exchange object using ccxt
//   try {
//     exchange = new ccxt[exchangeName]({ enableRateLimit: true });
//   } catch (error) {
//     log
//       .error(`exchangeName: ${exchangeName}`, error);
//     return;
//   }

//   // Check if the exchange has the cmd api
//   Object.keys(e_commands).forEach(availableCmd => {
//     if (cmd & e_commands[availableCmd] && !exchange.has[availableCmd]) {
//       log
//         .error(`Exchange ${exchangeName} doesn't have ${availableCmd}.`);
//       return;
//     } else {
//       if (cmd & e_commands[availableCmd]) {
//         log
//           .info(`Exchange ${exchangeName} has ${availableCmd}.`);
//       }
//     }
//   });

//   // Load all markets in this exchange
//   let markets;
//   try {
//     markets = await exchange.loadMarkets();
//   } catch (error) {
//     log.error(error);
//   }
//   if (!markets) {
//     log.error(`Exchange ${exchangeName} didn't return valid markets.`);
//     return;
//   }

//   let marketPairs = Object.values(markets);

//   // Iterate all markets
//   for (
//     let i = 0, // counts all markets
//     j = 0; // counts  valid markets
//     i < marketPairs.length && Globals.options.enable;
//     i++
//   ) {
//     let m = marketPairs[i];

//     // bypass incactive, darkpool, etc
//     if (
//       m.darkpool ||
//       m.active === false ||
//       m.type === "future" ||
//       m.type === "expired" ||
//       m.type === "option"
//     ) {
//       log
//         .info(
//           `Bypassing ${m.symbol} on ${exchangeName}: `,
//           (m.type ? `type: ` + `${m.type}, ` : ``) + `active:`,
//           `${m.active}`.red,
//           m.darkpool ? `, dark: ${m.darkpool}` : ``
//         );
//       continue;
//     } else if (m.type) {
//       // log
//       //   .verbosity(4)
//       //   .debug(
//       //     `Not bypassing ${m.symbol} on ${exchangeName}: t:${m.type}, a:${
//       //       m.active
//       //     }, d:${m.darkpool}`
//       //   );
//     }

//     await sleep(
//       exchange.rateLimit / Globals.options.ccxtExchangeRateLimitDivider
//     );

//     // Request the ticker
//     if (cmd & e_commands.fetchTicker && Globals.options.enable) {
//       let ticker;
//       try {
//         ticker = await exchange.fetchTicker(m.symbol);

//         let nonFiats = [];
//         if (!isFiat(m.base)) {
//           nonFiats.push(m.base);
//         }
//         if (!isFiat(m.quote)) {
//           nonFiats.push(m.quote);
//         }

//         // Iterate the non-fiat currencies in the pair
//         for (let index = 0; index < nonFiats.length; index++) {
//           const crypto = nonFiats[index];
//           // Store the ticker and the market in
//           // Globals.tickers[m.symbol][exchangeName]['pairs']
//           // TODO: refactor this in a new function
//           validOrCreateChain(
//             Globals.tickers,
//             crypto,
//             exchangeName
//           );

//           if (!Globals.tickers[crypto][exchangeName]["pairs"]) {
//             Globals.tickers[crypto][exchangeName]["pairs"] = [];
//           }

//           Globals.tickers[crypto][exchangeName]["pairs"].push({
//             ticker: ticker,
//             market: m
//           });

//           // Call the callback function
//           try {
//             if (Globals.options.discoveredOneTickerCallBack) {
//               Globals.options.discoveredOneTickerCallBack({
//                 symbol: crypto,
//                 exchangeName: exchangeName,
//                 ticker: ticker,
//                 market: m
//               });
//             }
//           } catch (error) {
//             log.error(error);
//           }
//         }
//         log
//           .info(
//             `Fetched`,
//             `${exchangeName}`,
//             `(${i})`,
//             `: ${m.symbol}`,
//             `| ask: `+
//             (ticker.ask ? `${ticker.ask.toString()}` : `NA`),
//             `| bid: ` +
//             (ticker.bid ? `${ticker.bid.toString()}` : `NA`),
//             `| close: ` +
//             (ticker.close ? `${ticker.close.toString()}` : `NA`),
//             `| last: ` +
//             (ticker.last ? `${ticker.last.toString()}` : `NA`)
//           );
//       } catch (error) {
//         log.error(
//           error +
//           ` exchangeName: ${exchangeName}, symbol: ${m.symbol
//           }, exchange.rateLimit: ${exchange.rateLimit}`,
//           error
//         );
//       }
//     }

//     // Request OHLCV
//     if (cmd & e_commands.fetchOHLCV && Globals.options.enable) {
//       await sleep(exchange.rateLimit);
//       let ohlcv;
//       try {
//         try {
//           ohlcv = await exchange.fetchOHLCV(m.symbol, ohlcvPeriod);
//         } catch (error) {
//           // log.configure({ locate: true }).error(error);
//           continue;
//         }

//         if (!ohlcv || ohlcv.length === 0) {
//             log.error(
//               `${exchangeName} `,
//               `fetchOHLCV (${j})`,
//               `: ${m.symbol.magenta} ohlcv is invalid:`,
//               JSON.stringify(ohlcv)
//             );
//           continue;
//         }

//         createChain(
//           Globals.aggregatedOHLCV,
//           m.symbol,
//           exchangeName,
//           ohlcvPeriod
//         );
//         Globals.aggregatedOHLCV[m.symbol][exchangeName][ohlcvPeriod] = ohlcv;

//         createChain(
//           Globals.g_progressFetchOHLCV,
//           m.symbol,
//           exchangeName,
//           ohlcvPeriod
//         );
//         Globals.g_progressFetchOHLCV[m.symbol][exchangeName][ohlcvPeriod] =
//           moment(ohlcv[ohlcv.length - 1][0]).format(`YYYY-MM-DD hh:mm:ss a`) +
//           " " +
//           `(${moment(ohlcv[ohlcv.length - 1][0]).format()})`;

//         log.info(
//           `${exchangeName} `.blue,
//           `fetchOHLCV (${j})`,
//           `: ${m.symbol.magenta} done.`
//         );

//         if (!ohlcv || ohlcv.length === 0) {
//           log
//             .configure({ locate: true })
//             .error(
//               `${exchangeName} `.blue,
//               `fetchOHLCV (${j})`,
//               `: ${m.symbol.magenta} didn't return valid value.`
//             );
//         } else {
//           if (drawOhlcvChart) {
//             log("Debug: ", `ohlcv length is: `, ohlcv.length);

//             var asciichart = require("asciichart");
//             // Use closing value
//             let plotPrices = projectOnNthElement(ohlcv, 4);
//             plotPrices.splice(80);

//             let plotOptions = { height: 6 };

//             if (!plotPrices || plotPrices.lengt === 0) {
//               log
//                 .configure({ locate: true })
//                 .error(
//                   `${exchangeName} `.blue,
//                   `fetchOHLCV (${j})`,
//                   `: ${m.symbol.magenta} plotPrices length is invalid: `,
//                   `${plotPrices}`
//                 );
//             } else {
//               log(
//                 "Debug: ",
//                 `plotPrices length is: `,
//                 plotPrices.length
//               );
//               try {
//                 log.info(asciichart.plot(plotPrices, plotOptions));
//               } catch (error) {
//                 log.error(error);
//                 log(
//                   "Debug: ",
//                   "plotPrices: ",
//                   JSON.stringify(plotPrices)
//                 );

//                 log("Debug: ", "ohlcv: ", JSON.stringify(ohlcv));
//               }
//             }
//           }
//         }
//       } catch (error) {
//         log.error(error);
//       }
//     }
//     j++;
//   }

//   if (promises.length > 0) {
//     await Promise.all(promises);
//   }
//   // log
//   //   .verbosity(2)
//   //   .info(`${exchangeName}`.blue, ` getExchangeData`, ` done!`);
//   // log.verbosity(2)(
//   //   "-----------------------------------------------------------------------------"
//   // );

//   // log.info(_c);
// }

// // getExchangeData(Globals.options);
// async function calCulatePrices(options) {
//   let promises = [];
//   let parallelExchangeRequests = options?.parallelExchangeRequests || 50;
//   let exchanges = options?.exchanges || Globals.options.trustedExchanges;


//   // Force the limit on number of parallel exchanges
//   for (
//     let index = 0, limitCounter = 0;
//     index < exchanges?.length && Globals.options.enable;
//     index++, limitCounter++
//   ) {
//     const e = exchanges[index];
//     console.error(options)
//     options.exchangeName = e;

//     // Calculate the price for coins in this exchange
//     promises.push(getExchangeData(options));
//     if (limitCounter > parallelExchangeRequests && Globals.options.enable) {
//       log.info(
//         `Rate limiter: `,
//         `waiting for parallel requests to finish:`,
//         ` index: ${index}, limitCounter:${limitCounter}`
//       );
//       await Promise.all(promises);
//       log.info(
//         `Rate limiter`,
//         ` index: ${index}, limitCounter:${limitCounter} done!`
//       );
//       promises = [];
//       limitCounter = 0;
//     }
//   }
//   await Promise.all(promises);
//   // log.info(_c)
// }

// // log.info(Globals.options, '>>>')
// calCulatePrices(Globals.options)


// var item = 0;
// var seconds = 5
// var lastIndex = 0
// var delay = seconds * 1000
// var masterArray = []

// var i1 = setInterval(stream, delay);

// function stream() {
//   masterArray.push(++item)
// }

// var i2 = setInterval(() => {
//   console.log("Original array", masterArray)
//   console.log("Reading from the lastIndex...")
  
//   for(var i = lastIndex; i < masterArray.length; i++) {
//     console.log(masterArray.slice(lastIndex, masterArray.length))
//   }
// }, 5000)



// // clear the setTimeout method
// if (masterArray.length > 10) {
//   console.log("Clearing Intervals...");
//   clearInterval(i1)
//   clearInterval(i2)
// }



// var arr = [{a:1},{b:2},{c:3},{b:8}];

// var lastIndex = 0;

// var n = 4;
// (function loop(){
//    setTimeout(function() {
//       arr.push({b:n++});
//        var date = new Date();
//        var t = date.getMinutes() + ":" + date.getSeconds();
//       readArray(t, arr)
//       loop();
//   }, 6000);
// })();

// function readArray(t,arr) {
// console.log (t)
//   for (i = lastIndex; i < arr.length; i++) {
//     console.log(arr[i]);
//   }

//   lastIndex = arr.length;
// }
