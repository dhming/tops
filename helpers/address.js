var crypto = require('crypto');
var base58check = require('./base58check');

const PREFIX = 'T'; // A

module.exports = {
	isAddress: function (address) {
		if (typeof address !== 'string') {
			return false;
		}
		if (!base58check.decodeUnsafe(address.slice(1))) {
			return false;
		}
		if ([PREFIX].indexOf(address[0]) == -1) {
			return false;
		}
		return true;
	},

	generateAddress: function (publicKey) {
		if (typeof publicKey === 'string') {
			publicKey = Buffer.from(publicKey, 'hex');
		}
		var h1 = crypto.createHash('sha256').update(publicKey).digest();
		var h2 = crypto.createHash('ripemd160').update(h1).digest();
		return PREFIX + base58check.encode(h2);
	},
};