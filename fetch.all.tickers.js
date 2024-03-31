"use strict";

// const fs = require("fs")
// const axios = require("axios")


// const ccxt      = require ('ccxt')
const asTable   = require ('as-table')
const log       = require ('ololog').configure ({ locate: false })


const ccxt = require ('ccxt')
    , { writeFileSync, writeFile } = require ('fs')
    , path = require ('path')
    , exchanges = {}
    , tickers = {}


ccxt.exchanges.forEach (id => {
    try {
        const exchange = new ccxt[id] ()
        if (exchange.has['fetchTickers']) {
            exchanges[id] = exchange
        }
    } catch (e) {
        console.log ('Failed to initialize', id, e.constructor.name, e.message)
    }
})

async function main () {

    console.log ('Started')
    const start = Date.now ()

    try {
        const promises = Object.values (exchanges).map (exchange => (
            (async () => {
                // console.log (exchange.id)
                try {
                    const response = await exchange.fetchTickers ()
                    tickers[exchange.id] = response
                } catch (e) {
                    console.log ('Failed to fetchTickers() from', exchange.id)
                }
            }) ()
        ))
        await Promise.all (promises)
    } catch (e) {
        console.log ('Failed awaiting all exchanges to complete')
    }

    Object.entries (tickers).forEach (([ id, response ]) => {
        const folder = path.join(__dirname, '', 'tickers');
        const filename = `${id}-tickers.json`
        console.log (path.join (folder, filename))
        writeFile(path.join(folder, filename), JSON.stringify(response), () => null)
    })

    const end = Date.now ()
    console.log (`Fetched tickers in ${(end - start) / 1000} seconds`)

}

main ()