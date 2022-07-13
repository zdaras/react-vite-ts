import styled, { css } from 'styled-components';

import { responsive } from '@/styled/responsive';

export const WrapperStyled = styled.section`
	min-height: calc(100% - 114px); // header height
	transition: all 0.2s;
	flex: 1 1 auto;
	position: relative;
`;

export const RouteWrapperStyled = styled.div`
	height: 100%;
	position: relative;
	padding: 0 44px;

	@media ${responsive.sm} {
		padding: 0 15px;
	}
`;

export const Container = styled.div<{ maxWidth?: string; height?: string }>`
	padding: 0 14.5%;
	height: ${({ height }) => height || 'auto'};

	@media ${responsive.xxl} {
		padding: 0;
		max-width: ${({ theme }) => theme.MAX_CONTAINER_WIDTH};
		margin: 0 auto;
		width: 100%;
	}

	@media ${responsive.lp} {
		padding: 0 5%;
	}

	@media ${responsive.sm} {
		padding: 0 10px;
	}

	${({ maxWidth }) =>
		maxWidth &&
		css`
			max-width: ${maxWidth};
		`}
`;

export const TopPanelStyled = styled.div`
	height: 114px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 44px 0;

	@media ${responsive.sm} {
		padding: 15px 0;
	}
`;

export const TopLeftStyled = styled.div`
	flex: 1 1 auto;
`;

export const TopRightStyled = styled.div`
	flex: 0 1 auto;
`;

export const BlockStyled = styled.div<IBlockStyled>`
	box-shadow: none;
	background-color: ${({ theme, transparent }) => (transparent ? 'transparent' : theme.BLOCK_BG)};
	position: relative;
	height: ${({ height }) => height || '100%'};
	padding: ${({ theme, padding }) => padding || theme.BLOCK_PADDING};
	transition: background-color 0.1s, height 0s;

	@media ${responsive.sm} {
		padding: ${({ theme, padding }) => padding || theme.BLOCK_PADDING_SM};
		box-shadow: ${({ shadow }) => shadow || '0px 3px 24px #9799c129'};
	}

	${({ formPadding }) =>
		formPadding &&
		css`
			padding: 60px 86px;

			@media ${responsive.sm} {
				padding: 30px;
			}
		`}
`;

export const Avatar = styled.div`
	border-radius: 3rem;
	overflow: hidden;
	width: 39px;
	height: 39px;

	img {
		max-width: 39px;
	}
`;

export const TextEllipsis = styled.div<{ maxWidth?: string }>`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	max-width: 100%;

	@media ${responsive.lg} {
		max-width: ${props => props.maxWidth || '100%'};
	}
`;

export const NotFoundWrapperStyled = styled.div`
	text-align: center;

	h5 {
		font-size: 20px;
		color: ${({ theme }) => theme.SECONDARY_FONT_COLOR};
		font-weight: 400;
	}

	button {
		font-size: 20px;
	}
`;

interface IBlockStyled {
	padding?: string;
	shadow?: string;
	formPadding?: boolean;
	height?: string;
	transparent?: boolean;
}
