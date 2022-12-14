import { Type } from '@sinclair/typebox';

export const AssetSchema = Type.Object({
	data: Type.Object({
		changePercent24Hr: Type.String(),
		explorer: Type.String(),
		id: Type.String(),
		marketCapUsd: Type.String(),
		maxSupply: Type.Union([Type.Null(), Type.String()]),
		name: Type.String(),
		priceUsd: Type.String(),
		rank: Type.String(),
		supply: Type.String(),
		symbol: Type.String(),
		volumeUsd24Hr: Type.String(),
		vwap24Hr: Type.String()
	}),
	timestamp: Type.Number()
});
