module.exports = {
	error: function (err, value) {
		if (err) {
			this.reject(err);
		} else {
			this.resolve(value);
		}
	},
	value: function (value) {
		this.resolve(value);
	}
};