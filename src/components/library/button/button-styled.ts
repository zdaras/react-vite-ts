import styled, { css, keyframes } from 'styled-components';

import { IProps } from './index';

const buttonLoader = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const animationRule = css`
	${buttonLoader} 0.6s linear infinite
`;

export const ButtonStyled = styled.button<IProps>`
	position: relative;
	width: ${props => (props.inline ? 'auto' : '100%')};
	height: ${({ theme }) => theme.BTN_HEIGHT};
	border: 0px;
	border-radius: ${props => props.theme.BTN_BORDER_RADIUS};
	box-shadow: none;
	outline: none;
	transition: all 0.2s ease-in-out;
	font-size: 1rem;
	line-height: 1.225rem;
	letter-spacing: 0.4px;
	display: ${props => (props.inline ? 'inline-flex' : 'flex')};
	align-items: center;
	justify-content: center;
	font-family: ${props => props.theme.DEFAULT_FONT};
	font-size: ${props => props.theme.DEFAULT_FONT_SIZE};

	svg {
		margin-right: 12px;

		path.icon-background {
			fill: transparent !important;
		}
	}

	svg,
	path,
	circle {
		transition: all 0.2s ease-in-out;
	}

	${({ theme, active }) =>
		active &&
		css`
			background: ${theme.BTN_BG_COLOR_ACTIVE};
		`}

	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}

	${({ disabled }) =>
		disabled &&
		css`
			cursor: not-allowed;
			opacity: 0.4;
		`}

	${({ loading, buttonType, theme }) =>
		loading &&
		css`
			pointer-events: none;
			color: transparent !important;
			opacity: 0.8;

			::after {
				position: absolute;
				content: '';
				top: 50%;
				left: 50%;
				margin: -0.64285714em 0 0 -0.64285714em;
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 500rem;
				border-top: ${buttonType !== 'text' ? `2px solid ${theme.BTN_COLOR}` : `2px solid ${theme.BTN_BG_COLOR}`};
				border-right: 2px solid transparent;
				animation: ${animationRule};
			}
		`}


	${({ buttonType, height, padding }) => {
		switch (buttonType) {
			case 'primary':
				return css`
					 {
						padding: 10px 44px;
						background-color: ${({ theme }) => theme.BTN_BG_COLOR};
						color: ${({ theme }) => theme.BTN_COLOR};

						path:not(.icon-background) {
							fill: ${({ theme }) => theme.BTN_COLOR};
						}

						:hover {
							background-color: ${({ theme }) => theme.BTN_BG_COLOR_ACTIVE};
						}
					}
				`;
			case 'text':
				return css`
					 {
						height: ${height || 'auto'};
						padding: ${padding || '0'};
						background: transparent;
						color: ${({ theme }) => theme.BTN_NORMAL_COLOR};

						path:not(.icon-background) {
							fill: ${({ theme }) => theme.BTN_NORMAL_COLOR};
						}
					}
				`;
			default:
				return css`
					 {
						padding: ${padding || '10px 44px'};
						background-color: ${({ theme }) => theme.BTN_BG_COLOR};
						color: ${({ theme }) => theme.BTN_COLOR};

						path:not(.icon-background) {
							fill: ${({ theme }) => theme.BTN_COLOR};
						}

						:hover {
							background-color: ${({ theme }) => theme.BTN_BG_COLOR_ACTIVE};
						}
					}
				`;
		}
	}}
`;

export const ButtonText = styled.span<{ fontSize?: string }>`
	font-size: ${props => props.fontSize || 'inherit'};
	font-weight: 600;
`;
