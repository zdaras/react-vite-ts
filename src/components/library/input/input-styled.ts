import styled, { css } from 'styled-components';

import { IProps } from '.';

export const InputStyled = styled.input<IProps>`
	border-radius: ${({ theme }) => theme.INPUT_BORDER_RADIUS};
	border: 1px solid ${({ theme }) => theme.INPUT_BORDER_COLOR};
	height: ${({ theme }) => theme.INPUT_HEIGHT};
	width: 100%;
	outline: none;
	transition: all 0.3s ease;
	padding: 0 28px;
	font-family: ${({ theme }) => theme.INPUT_FONT};
	font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};
	line-height: ${({ theme }) => theme.INPUT_LINE_HEIGHT};
	box-shadow: none;

	&[disabled] {
		background-color: transparent;
	}

	${({ AbsoluteComp }) =>
		AbsoluteComp &&
		css`
			 {
				padding-right: 5rem;
			}
		`}

	:focus {
		border-color: ${({ theme }) => theme.INPUT_BORDER_COLOR_FOCUSED};

		~ span svg.calendar-icon path {
			fill: ${({ theme }) => theme.INPUT_BORDER_COLOR_FOCUSED};
		}
	}

	&:focus ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']),
	&:not(:placeholder-shown) ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']) {
		top: 0;
		color: ${({ theme }) => theme.INPUT_LABEL_COLOR};
		font-size: 0.75rem;
		left: 26px;
		width: auto;
	}

	:-webkit-autofill ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']) {
		top: 0;
		color: ${({ theme }) => theme.INPUT_LABEL_COLOR};
		font-size: 0.75rem;
		left: 26px;
		width: auto;
	}

	&:focus ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']) {
		color: ${({ theme }) => theme.INPUT_BORDER_COLOR_FOCUSED};
	}

	&[type='checkbox'],
	&[type='radio'] {
		width: 29px;
		height: 29px;
		display: inline-block;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-image: url('/icons/checkIcon.svg');
		background-size: 0;
		padding: 0;
		border: 2px solid;
		border-color: ${({ theme }) => theme.INPUT_LABEL_COLOR};
		border-radius: 100%;
		background-position: center;
		cursor: pointer;
		transition: border-color 0.1s, background-color 0.2s, border-image 0s;

		${({ uncheck }) =>
			uncheck &&
			css`
				 {
					background-image: url('/icons/uncheck.svg');
				}
			`}

		:checked {
			background-size: 29px;
			background-repeat: no-repeat;
			border: 2px solid;
			border-color: ${props => props.theme.BTN_BG_COLOR};
			background-color: ${props => props.theme.BTN_BG_COLOR};
		}
	}

	${({ switcher }) =>
		switcher &&
		css`
			 {
				display: none !important;
			}
		`}

	${({ errorText, theme }) =>
		errorText &&
		css`
			 {
				border-color: ${theme.INPUT_ERROR_BORDER_COLOR} !important;

				&:not(:placeholder-shown) ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']),
				&:focus ~ label.input-label:not([input-type='checkbox']):not([input-type='radio']) {
					color: ${theme.INPUT_ERROR_BORDER_COLOR};
				}
			}
		`}

		${({ type }) =>
		type === 'password' &&
		css`
			 {
				letter-spacing: 2px;
			}
		`}
`;

export const AbsoluteCompStyled = styled.span`
	padding: 3px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 24px;
	top: 0;
	height: 100%;
	font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};

	span {
		font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};
	}

	:hover {
		svg.close-icon path {
			fill: rgb(121, 121, 142);
		}
	}
`;
