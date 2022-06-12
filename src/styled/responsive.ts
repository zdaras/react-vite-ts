import { css } from 'styled-components';

const size = {
	xs: 1, // mobile 10px
	sm: 48, // tablet 768px
	md: 64, // laptop 1024px
	lg: 90, // computer 1440px
	lp: 96.25, // laptop 1540px
	xl: 120, // large screen 1920px
	xxl: 2550 // large screen 2550px
};

export const responsive = {
	xs: `(max-width: ${size.xs}rem)`,
	sm: `(max-width: ${size.sm}rem)`,
	md: `(max-width: ${size.md}rem)`,
	lg: `(max-width: ${size.lg}rem)`,
	lp: `(max-width: ${size.lp}rem)`,
	xl: `(max-width: ${size.xl}rem)`,
	xxl: `(min-width: ${size.xxl}px)`
};

// 16 = width 100%, 8 = 50% .........
type IResponsiveSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export type IResponsiveBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'lp' | 'xl' | 'xxl';

export interface IResponsiveTypes {
	xs?: IResponsiveSizes;
	sm?: IResponsiveSizes;
	md?: IResponsiveSizes;
	lg?: IResponsiveSizes;
	xl?: IResponsiveSizes;
}

export const DIMENSIONS = ['xs', 'sm', 'md', 'lg', 'xl'];

const BASE_CONF = {
	mediaQuery: 'only screen',
	columns: {
		xs: 16,
		sm: 16,
		md: 16,
		lg: 16,
		xl: 16
	},
	breakpoints: size,
	media: {}
};

const makeMedia =
	(media: any) =>
	(...args: any) =>
		css`
			@media ${media} {
				${css(...(args as [any, any]))}
			}
		`;

export default function config(): any {
	const conf: any = BASE_CONF;
	conf.media = Object.keys(conf.breakpoints).reduce((media: any, breakpoint) => {
		const breakpointWidth = conf.breakpoints[breakpoint];
		media[breakpoint] = makeMedia(
			[conf.mediaQuery, breakpointWidth >= 0 && `(min-width: ${breakpointWidth}rem)`].filter(Boolean).join(' and ')
		);
		return media;
	}, {});

	return conf;
}
