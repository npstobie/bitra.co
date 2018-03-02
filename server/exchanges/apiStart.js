var ccxt = require ('ccxt');
var _ = require('lodash')

var exchangeNames = ['binance', 'bithumb', 'bittrex', 'cryptopia', 'hitbtc2', 'kucoin', 'kraken', 'okex', 'poloniex'];

function fetchTickers(exchange, exchangeName){
	return exchange.fetchTickers().then(function(data){
		var result = {};
		for (var key in data) {
			var pair = key.split('/')
			if (['ETH', 'BTC', 'USDT'].includes(pair[1])){
				if (result[pair[1]]) {
					result[pair[1]][pair[0]] = data[key]['info']
				} else {
					result[pair[1]] = {};
					result[pair[1]][pair[0]] = data[key]['info']
				}
			}
		}
		result.exchangeName = exchangeName;
		return result;
	})
}

function createApiConnection(exchangeName) {
	return new ccxt[exchangeName]();
}

var exchanges = {};

function getValues(exchangeNames) {
	for (var i=0; i<exchangeNames.length; i++) {
		var exchange = createApiConnection(exchangeNames[i]);
		fetchTickers(exchange, exchangeNames[i])
		.then(function(data){
			var name = data.exchangeName;
			delete data.exchangeName;
			if (exchanges[name]) {
				console.log(diff(exchanges[name], data));
			} else {
				exchanges[name] = data;
			}
		})
		.catch(function(err){
			console.log(err)
		})
	}
}

setInterval(function(){
	getValues(exchangeNames);
}, 15000);


module.exports.getValues = getValues;
module.exports.exchanges = exchanges;
