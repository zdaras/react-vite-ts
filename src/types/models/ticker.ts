import * as ts from 'io-ts';

export const AssetSchema = ts.type({
	data: ts.type({
		changePercent24Hr: ts.string,
		explorer: ts.string,
		id: ts.string,
		marketCapUsd: ts.string,
		maxSupply: ts.union([ts.null, ts.string]),
		name: ts.string,
		priceUsd: ts.string,
		rank: ts.string,
		supply: ts.string,
		symbol: ts.string,
		volumeUsd24Hr: ts.string,
		vwap24Hr: ts.string
	}),
	timestamp: ts.number
});
