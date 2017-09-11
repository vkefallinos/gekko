/**
 * Detect specific patterns.
 *
 * @author Philippe Prados
 * @see http://www.onlinetradingconcepts.com/TechnicalAnalysis
 */

var log = require('../core/log');
var config = require('../core/util.js').getConfig();

var strat = {};

// Prepare everything our method needs
strat.init = function() {
  this.requiredHistory = 0;
  this.addIndicator('patternsCandles', 'CandlesPatterns', config.CandlesPatterns);
  this.direction=0;
}

strat.update = function(candle) {
}

// For debugging purposes.
strat.log = function() {
  var patternsCandles=this.indicators.patternsCandles;
  if (patternsCandles.result != 0) {
    log.debug(((patternsCandles.result < 0) ? "Down":"Up")+" pattern="+patternsCandles.name);
  }
}

strat.check = function() {
  var patternsCandles=this.indicators.patternsCandles;
  if ((this.direction >= 0) && (patternsCandles.result < 0)) {
    this.advice('short');
    this.direction=patternsCandles.result;
  }
  else if ((this.direction <= 0) && (patternsCandles.result > 0)) {
    this.advice('long');
    this.direction=patternsCandles.result;
  }
}

module.exports = strat;
