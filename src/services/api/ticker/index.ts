import { AssetSchema } from '@/types/models/ticker';
import { decode } from '@/utils/io-ts';

import { get } from '../axios';

export default {
	getAsset: ({ coin }: { coin?: string }) => get(`assets/${coin}`).then(decode(AssetSchema))
};
