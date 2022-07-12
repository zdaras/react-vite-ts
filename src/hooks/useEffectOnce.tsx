import { useEffect, useRef, useState, EffectCallback } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
	const effectFn = useRef(effect);
	const destroyFn = useRef<void | (() => void)>();
	const effectCalled = useRef(false);
	const rendered = useRef(false);
	const [, refresh] = useState(0);

	if (effectCalled.current) rendered.current = true;

	useEffect(() => {
		if (!effectCalled.current) {
			destroyFn.current = effectFn.current();
			effectCalled.current = true;
		}

		refresh(1);

		return () => {
			if (!rendered.current) return;
			if (destroyFn.current) destroyFn.current();
		};
	}, []);
};

export default useEffectOnce;
