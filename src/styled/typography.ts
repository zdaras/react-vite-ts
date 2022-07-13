import styled, { css } from 'styled-components';

import { responsive } from '@/styled/responsive';

export const H1 = styled.h1<IH>`
	font-size: 2.5rem;
	line-height: 2.6rem;
	letter-spacing: 0.3px;
	margin: 0.67em 0;

	@media ${responsive.sm} {
		font-size: 1.5rem;
	}

	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`}

	${({ weight }) =>
		weight &&
		css`
			font-weight: ${weight};
		`}
`;

export const H2 = styled.h2<IH>`
	font-size: 2.25rem;
	line-height: 2.6875rem;
	letter-spacing: 0.8px;
	font-weight: 600;
	font-family: ${props => props.theme.DEFAULT_FONT};

	@media ${responsive.sm} {
		font-size: 1.25rem;
	}

	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`};
`;

export const H3 = styled.h3<IH>`
	font-size: 1.625rem;
	line-height: 1.875rem;
	letter-spacing: 0.4px;
	margin-bottom: 6px;
	font-weight: ${props => props.weight || '600'};

	@media ${responsive.sm} {
		font-size: 1.25rem;
		line-height: 1.4rem;
	}

	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`};
`;

export const H4 = styled.h4<IH>`
	font-size: 1.25rem;
	line-height: 1.5rem;
	letter-spacing: 0.2px;
	font-weight: 600;

	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`}
		
	${({ weight }) =>
		weight &&
		css`
			font-weight: ${weight};
		`}
`;

export const H5 = styled.h5<IH>`
	font-size: 1rem;
	line-height: 1.125rem;
	letter-spacing: 0.16px;
	font-weight: 500;
	color: ${props => props.theme.SECONDARY_FONT_COLOR};
	opacity: ${props => props.opacity || '0.6'};

	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`}
`;

export const H6 = styled.h6<IH>`
	font-size: 0.875rem;
	line-height: 1rem;
	letter-spacing: 0.3px;
	color: ${props => props.theme.SECONDARY_FONT_COLOR};
	font-weight: normal;
	opacity: ${props => props.opacity || '0.7'};
	transition: 0.3s;

	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}

	${({ align }) =>
		align &&
		css`
			text-align: ${align};
		`}
`;

interface IH {
	padding?: string;
	margin?: string;
	align?: 'left' | 'center' | 'right';
	weight?: string | number;
	opacity?: string;
}
