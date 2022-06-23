import { useContext } from 'react';

import { ViewportContext } from '@/context/viewport';

const useViewport = () => {
	const viewPort = useContext(ViewportContext);

	return viewPort;
};

export default useViewport;
