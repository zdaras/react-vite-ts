import { AssetSchema } from '@/types/models/ticker';
import { decode } from '@/utils/io-ts';

import { get } from '../axios';

export default {
	getAsset: (params: { coin?: string }) => get(`assets/${params.coin}`).then(decode(AssetSchema))
};
