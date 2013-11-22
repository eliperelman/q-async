var async = require('async');
var defer = require('./defer');
var resolvers = require('./resolvers');

var lib = {};

var erroringMethods = [
	'each',
	'eachSeries',
	'eachLimit',
	'map',
	'mapSeries',
	'mapLimit',
	'reduce',
	'reduceRight',
	'sortBy',
	'concat',
	'concatSeries',
	'series',
	'parallel',
	'parallelLimit',
	'whilst',
	'doWhilst',
	'until',
	'doUntil',
	'forever',
	'waterfall',
	'auto'
];

var valueMethods = [
	'filter',
	'filterSeries',
	'reject',
	'rejectSeries',
	'detect',
	'detectSeries',
	'some',
	'every',
	'applyEach',
	'applyEachSeries'
];

var aliases = {
	reduce: ['inject', 'foldl'],
	reduceRight: ['foldr'],
	some: ['any'],
	every: ['all']
};

var mapper = function (resolver) {
	return function (method) {
		lib[method] = defer(async[method], resolver);
	};
};

erroringMethods.forEach(mapper(resolvers.error));
valueMethods.forEach(mapper(resolvers.value));

Object.keys(aliases).forEach(function (method) {
	aliases[method].forEach(function (alias) {
		lib[alias] = lib[method];
	});
});

module.exports = lib;