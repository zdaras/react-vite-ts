/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

declare module '*.jpg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.json' {
	const content: any;
	export default content;
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
