// const ccxt = require("ccxt");
// const sortArr = require("./data.json");

// const printSupportedExchanges = function () {
//   console.log("Supported exchanges:", ccxt.exchanges.join(", ").green);
// };

// const printTickers = async (id) => {
//   // check if the exchange is supported by ccxt
//   const exchangeFound = ccxt.exchanges.indexOf(id) > -1;
//   if (exchangeFound) {
//     console.log("Instantiating", id, "exchange");

//     // instantiate the exchange by id
//     const exchange = new ccxt[id]({ enableRateLimit: true });
//     // const krakenEx = new ccxt["kraken"]({ enableRateLimit: true });
//     const ftx = new ccxt["ftx"]({ enableRateLimit: true });

//     const [data1, data2] = await Promise.all([exchange.fetchTickers(), ftx.fetchTickers(["USDT/USD", "CRO/USD", "WBTC/USD", "UNI/USD"])]);
//     const tickers = Object.assign({}, data1, data2)

//     // console.log("--------------------------------------------------------");
//     // console.log(id, exchange.iso8601(exchange.milliseconds()));
//     // console.log("Fetched", Object.keys(tickers).length.toString(), "tickers:");

//     const b = sortArr
//       .map((v) => Object.keys(tickers).includes(v) && tickers[v])
//       .filter(Boolean)
//       .map((ticker, i) => ({
//         symbol: ticker.symbol,
//         price: ticker.last.toFixed(8),
//         "%": ticker.info.priceChangePercent,
//         c: ticker.change,
//       }));
//     // console.log(b)
//     return b
//   } else {
//     console.log(`Exchange ${id} not found`);
//     printSupportedExchanges();
//   }
// };

// (function (exchange) {
//   if (exchange)
//     // printTickers(exchange)
//     setInterval(() => printTickers(exchange), 10000);
//   // printUsage();
// }("binance"));


/* eslint-disable max-len */
/* eslint-disable func-names */
const http = require("http")
const express = require("express")
const socketIO = require("socket.io")
const ccxt = require("ccxt");
// const sortedArr = require("./data.json");


(function () {
  const app = express();
  const svr = http.createServer(app);
  const server = svr.listen(process.env.PORT || 8086, () => {
    console.log("Socket listening for messages");
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Socket connected");
    socket.emit("market", "market data goes here");
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });

  // instantiate the exchange by id
  const id = "binance"
  const ftx = new ccxt["ftx"]({ enableRateLimit: true }); // supplimentry exchange
  const exchange = new ccxt[id]({ enableRateLimit: true });

  async function request() {
    // require our json
    const sortedArr = require("./data.json")

    // check if the exchange is supported by ccxt
    const exchangeFound = ccxt.exchanges.indexOf(id) > -1;
    if (exchangeFound) {
      console.log("Instantiating", id, "exchange");

      const [data1, data2] = await Promise.all([exchange.fetchTickers(), ftx.fetchTickers(["USDT/USD", "CRO/USD", "WBTC/USD", "UNI/USD"])]);
      const tickers = Object.assign({}, data1, data2)

      // console.log("--------------------------------------------------------");
      // console.log(id, exchange.iso8601(exchange.milliseconds()));
      // console.log("Fetched", Object.keys(tickers).length.toString(), "tickers:");

      const data = sortedArr
        .map((v) => Object.keys(tickers).includes(v['ticker'].s) && Object.assign({}, v, { ticker: tickers[v['ticker'].s] }))
        .filter(Boolean)
        .map((data, i) => ({
          ...data,
          ticker: {
            s: data.ticker.symbol,
            p: data.ticker.last.toFixed(8),
            g: data.ticker.info.priceChangePercent || data.ticker.percentage,
            c: data.ticker.change,
          }
        }));
      io.emit("market", data);
    } else {
      console.log(`Exchange ${id} not found`);
      printSupportedExchanges();
    }
  }
  setInterval(request, 5000); // change to 5 seconds
}());
