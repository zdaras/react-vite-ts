import { AssetSchema } from '@/types/models/ticker';
import { decode } from '@/utils/typebox';

import { get } from '../axios';

export default {
	getAsset: (params: { coin?: string }) => get(`assets/${params.coin}`).then(({ data }) => decode(AssetSchema, data))
};
