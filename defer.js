var Q = require('q');

module.exports = function (method, callback) {
	var deferred = Q.defer();

	return function () {
		var args = [].slice.call(arguments);

		args.push(function () {
			callback.apply(deferred, [].slice.call(arguments));
		});

		method.apply(method, args);

		return deferred.promise;
	};
};