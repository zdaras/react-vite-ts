import styled from 'styled-components';

import { IToast } from '@/store/toast';
import { responsive } from '@/styled/responsive';

interface IToastStyled {
	type: IToast['type'];
}

export const ToastContainerStyled = styled.div`
	position: fixed;
	z-index: 9;
	right: 2.4rem;
	bottom: 2.4rem;
	max-height: 100vh;
	display: flex;
	flex-direction: column;

	@media ${responsive.sm} {
		left: 0;
		right: 0;
		width: 100%;
		bottom: 0;
	}
`;

export const ToastStyled = styled.div<IToastStyled>`
	@keyframes fade {
		0% {
			opacity: 0;
			transform: scale(0.97);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	position: relative;
	display: flex;
	align-items: center;
	transition: all 0.3s ease-in-out;
	animation: fade 0.5s;
	z-index: 3;
	word-wrap: break-word;
	width: 380px;
	max-width: 90vw;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 0.8rem;
	max-height: 150px;
	cursor: pointer;

	background: ${({ type, theme }) => {
		switch (type) {
			case 'info':
				return '#73c8ff';
			case 'success':
				return '#edf8f0';
			case 'warning':
				return theme.YELLOW;
			case 'danger':
				return theme.RED;
			case 'processing':
				return '#E5F4FF';
			default:
				return '#73c8ff';
		}
	}};

	@media ${responsive.sm} {
		max-width: 100%;
		width: 100%;
		border-radius: 0;
		margin-bottom: 0;
	}
`;

export const ToastIconStyled = styled.div<IToastStyled>`
	width: 45px;
	height: 45px;
	margin-left: 35px;
	border-radius: 30rem;
	display: flex;
	align-items: center;
	justify-content: center;

	path.icon-background {
		fill: transparent;
	}

	path:not(.icon-background) {
		fill: #fff;
	}

	background: ${({ type }) => {
		switch (type) {
			case 'info':
				return '#6ab1e0';
			case 'success':
				return '#26B980';
			case 'warning':
				return '#daa70e';
			case 'danger':
				return '#dc5046';
			case 'processing':
				return '#bfdff7';
			default:
				return '#6ab1e0';
		}
	}};
`;

export const ToastTextStyled = styled.div`
	padding: 20px 22px;
	user-select: none;
	flex: 1;

	span {
		font-size: 14px;
		font-weight: normal;
		color: ${props => props.theme.DEFAULT_FONT_COLOR};
		opacity: 0.6;
	}
`;

export const ToastTitle = styled.div`
	font-size: 20px;
	padding-bottom: 4px;
	font-weight: normal;
	color: ${props => props.theme.DEFAULT_FONT_COLOR};
`;
