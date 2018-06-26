'use strict';

/**
 * @namespace constants
 * @memberof module:helpers
 * @property {number} activeDelegates - The default number of delegates.
 * @property {number} maxVotesPerTransaction - The maximum number of votes in vote type transaction.
 * @property {number} addressLength - The default address length.
 * @property {number} blockHeaderLength - The default block header length.
 * @property {number} blockReceiptTimeOut
 * @property {number} confirmationLength
 * @property {Date} epochTime
 * @property {object} fees - The default values for fees.
 * @property {number} fees.send
 * @property {number} fees.vote
 * @property {number} fees.secondsignature
 * @property {number} fees.delegate
 * @property {number} fees.multisignature
 * @property {number} fees.dapp
 * @property {number} feeStart
 * @property {number} feeStartVolume
 * @property {number} fixedPoint
 * @property {number} maxAddressesLength
 * @property {number} maxAmount
 * @property {number} maxConfirmations
 * @property {number} maxPayloadLength
 * @property {number} maxPeers
 * @property {number} maxRequests
 * @property {number} maxSharedTxs
 * @property {number} maxSignaturesLength
 * @property {number} maxTxsPerBlock
 * @property {number} minBroadhashConsensus
 * @property {string[]} nethashes - Mainnet and Testnet.
 * @property {number} numberLength
 * @property {number} requestLength
 * @property {object} rewards
 * @property {number[]} rewards.milestones - Initial 5, and decreasing until 1.
 * @property {number} rewards.offset - Start rewards at block (n).
 * @property {number} rewards.distance - Distance between each milestone
 * @property {number} signatureLength
 * @property {number} totalAmount
 * @property {number} unconfirmedTransactionTimeOut - 1080 blocks
 */
module.exports = {
	activeDelegates: 101,
	maxVotesPerTransaction: 33,
	addressLength: 208,
	blockHeaderLength: 248,
	blockReceiptTimeOut: 20, // 2 blocks
	confirmationLength: 77,
	epochTime: new Date(Date.UTC(2018, 5, 18, 9, 0, 0, 0)),
	fees: {
		send: 100000000,
		vote: 1000000000,
		secondsignature: 5000000000,
		delegate: 25000000000,
		multisignature: 5000000000,
		dapp: 25000000000
	},
	feeStart: 1,
	feeStartVolume: 10000 * 100000000,
	fixedPoint: Math.pow(10, 8),
	maxAddressesLength: 208 * 128,
	maxAmount: 100000000,
	maxConfirmations: 77 * 100,
	maxPayloadLength: 1024 * 1024,
	maxPeers: 100,
	maxRequests: 10000 * 12,
	maxSharedTxs: 100,
	maxSignaturesLength: 196 * 256,
	maxTxsPerBlock: 25,
	minBroadhashConsensus: 51,
	nethashes: [
		// Mainnet
		'cd1538789527bfb39ee11a6735c2999ab99b83a614b29e4d4ef6ef973a2661d2',
		// Testnet
		'e9aea69c58de019ecbbb04ae20ddc282836b4d72866e85319fd27362e9c29b8c'
	],
	numberLength: 100000000,
	requestLength: 104,
	// WARNING: When changing rewards you also need to change getBlockRewards(int) SQL function!
	rewards: {
		milestones: [
			4000000000, // Initial Reward
			2000000000, // Milestone 1
			1000000000 // Milestone 2
		],
		//offset: 1451520,   // Start rewards at block (n)
		offset: 777600, // 3个月
		//distance: 3000000, // Distance between each milestone
		distance: 9331200 // 3年
	},
	signatureLength: 196,
	// WARNING: When changing totalAmount you also need to change getBlockRewards(int) SQL function!
	totalAmount: 100000000000000000,
	unconfirmedTransactionTimeOut: 10800, // 1080 blocks
	multisigConstraints: {
		min: {
			minimum: 1,
			maximum: 15
		},
		lifetime: {
			minimum: 1,
			maximum: 72
		},
		keysgroup: {
			minItems: 1,
			maxItems: 15
		}
	}
};
