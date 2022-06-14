import styled, { css, keyframes } from 'styled-components';

import { IProps } from './select';

const spinner = keyframes`
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
	${spinner} 0.6s linear infinite
`;

export const SelectStyled = styled.div<IProps & { isOpen: boolean; disabled: boolean; loading: boolean | undefined }>`
	position: relative;
	max-width: 100%;
	align-items: flex-start;
	justify-content: flex-end;
	box-shadow: none;
	cursor: ${props => (props.search && props.dropdownType === 'select' ? 'default' : 'pointer')};
	display: flex;
	flex: ${props => (props.inline ? '0 0 auto' : '1')};
	flex-wrap: wrap;
	min-height: ${props => (props.Trigger ? 'auto' : props.theme.INPUT_HEIGHT)};
	letter-spacing: 0.4px;
	border: ${props => (props.borderless ? 'none' : '1px solid')};
	padding: ${props => props.padding || '6px 28px 6px 28px'};
	margin: 0;
	outline: 0;
	background: ${props =>
		props.backgroundless || props.dropdownType === 'dropdown' ? 'transparent' : props.theme.INPUT_BG_COLOR};
	border-color: ${props => props.theme.INPUT_BORDER_COLOR};
	border-radius: ${props => props.theme.INPUT_BORDER_RADIUS};
	transition: 0.2s;

	svg.select-arrow-icon {
		path {
			fill: #a6a6c3;
		}
	}

	:focus,
	:focus-within {
		border-color: ${props => (props.Trigger ? 'transparent' : props.theme.INPUT_BORDER_COLOR_FOCUSED)};

		svg.select-arrow-icon {
			path {
				fill: ${props => (props.isOpen ? props.theme.INPUT_BORDER_COLOR_FOCUSED : '#A6A6C3')};
			}
		}
	}

	${props =>
		props.isOpen &&
		css`
			 {
				border-color: ${props.dropdownType === 'select' ? props.theme.INPUT_BORDER_COLOR_FOCUSED : 'transparent'};
			}
		`}

	${({ disabled, theme }) =>
		disabled &&
		css`
			 {
				color: ${theme.INPUT_DISABLED_COLOR};
				opacity: ${theme.INPUT_DISABLED_OPACITY};
				pointer-events: none;
			}
		`}

  
  ${({ readOnly }: IProps) =>
		readOnly && {
			pointerEvents: 'none',
			cursor: 'default',
			borderColor: 'transparent'
		}}
    
		${({ errorText, theme }) =>
		errorText &&
		css`
			 {
				border-color: ${theme.INPUT_ERROR_BORDER_COLOR} !important;
				/* background-color: ${theme.INPUT_ERROR_BACKGROUND_COLOR}; */
			}
		`}

  :before {
		${({ loading }) =>
			loading &&
			css`
				content: '';
				box-sizing: border-box;
				position: absolute;
				top: 56%;
				right: 40px;
				width: 15px;
				height: 15px;
				margin-top: -10px;
				margin-left: -10px;
				border-radius: 50%;
				border-top: 2px solid #07d;
				border-right: 2px solid transparent;
				animation: ${animationRule};
			`}
	}
`;

export const SelectPlaceholderStyled = styled.span<ISelectPlaceholderStyled>`
	color: ${props => props.theme.INPUT_LABEL_COLOR};
	font-family: ${({ theme }) => theme.INPUT_FONT};
	font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};
	display: inline-flex;
	align-self: center;
	flex-wrap: wrap;
	overflow: hidden;
	max-width: calc(100% - 28px);
	flex: 1 1 auto;
	position: absolute;
	left: 26px;
	top: 50%;
	margin-top: -11px;
	transition: all 0.2s ease;

	${(props: ISelectPlaceholderStyled): any => {
		if (
			(props.isOpen && props.dropdownType !== 'dropdown') ||
			(!props.isOpen && props.dropdownType !== 'dropdown' && props.value)
		) {
			return css`
				 {
					background-color: #fff;
					padding: 0px 5px;
					top: 0;
					color: ${({ theme }) => (!props.isOpen ? theme.INPUT_LABEL_COLOR : theme.INPUT_BORDER_COLOR_FOCUSED)};
					font-size: 0.75rem;
					letter-spacing: 0.4px;

					/* ${({ errorText }: ISelectPlaceholderStyled): any =>
						errorText &&
						css`
							 {
								color: ${p => p.theme.INPUT_ERROR_BORDER_COLOR};
							}
						`} */

					${SelectStyled}:focus, ${SelectStyled}:focus-within & {
						color: ${({ errorText, theme }) =>
							errorText ? theme.INPUT_ERROR_BORDER_COLOR : theme.INPUT_BORDER_COLOR_FOCUSED};
					}
				}
			`;
		}

		return css``;
	}}
`;

export const ArrowDownStyled = styled.div<{ rotate: number }>`
	justify-self: flex-end;
	align-self: center;
	position: relative;
	top: 3px;
	transition: transform 0.2s;
	cursor: pointer;
	margin-left: auto;
	transform: rotate(180deg);

	${props =>
		props.rotate && {
			transform: 'rotate(0deg)',
			top: '-2px'
		}};
`;

export const SelectSearchInput = styled.input`
	position: absolute;
	background-color: transparent;
	outline: none;
	border: none;
	flex: 1 1 auto;
	padding: 0 8px;
	width: calc(100% - 48px);
	z-index: 1;
	letter-spacing: 1px;
	justify-self: flex-start;
	align-self: center;
	height: 32px;
`;

export const SelectOptions = styled.div<Partial<ISelectOptions>>`
	background: ${props => (props.backgroundless ? 'transparent' : props.theme.DROPDOWN_BACKGROUND_COLOR)};
	box-shadow: 0px 3px 15px #7c7d9a29;
	border-color: ${props => props.theme.INPUT_BORDER_COLOR};
	border-radius: 8px;
	color: ${props => props.theme.DROPDOWN_ITEM_COLOR};
	opacity: ${props => (props.isOpen ? '1' : '0')};
	overflow-y: auto;
	margin-top: 10px;
	position: absolute;
	top: 100%;
	right: 0;
	-webkit-overflow-scrolling: touch;
	transition: 0.2s;
	z-index: 6;
	min-width: ${props => (props.dropdownType === 'dropdown' ? props.minWidth : '100%')};
	max-width: ${props => (props.maxWidth ? props.maxWidth || '100%' : '200%')};

	${({ bottomIsOutside }) =>
		bottomIsOutside && {
			bottom: '125%',
			top: 'auto'
		}};

	::-webkit-scrollbar-track {
		border-radius: 0;
		background-color: #f9f9f97a;
	}

	::-webkit-scrollbar {
		width: 8px;
		background-color: #d9d9eb;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: ${props => props.theme.SCROLLBAR_COLOR};
	}
`;

export const SelectOptionStyled = styled.div<ISelectOptionStyled>`
	position: relative;
	padding: 0.6rem 2.225rem;
	cursor: pointer;
	transition: all 0.15s ease-in-out;
	color: ${({ active, theme }) => (active ? theme.DEFAULT_FONT_COLOR_ACTIVE : 'inherit')};
	background-color: ${({ active, theme }) => (active ? theme.DROPDOWN_ITEM_BACKGROUND_COLOR : 'inherit')};
	display: flex;
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	white-space: nowrap;
	font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};
	font-family: ${props => props.theme.INPUT_FONT};
	letter-spacing: 0.5px;

	svg:not(.custom) {
		path {
			fill: ${props => (props.active ? props.theme.DEFAULT_FONT_COLOR_ACTIVE : props.theme.DROPDOWN_ITEM_COLOR)};
		}
	}

	:hover {
		color: ${({ theme }) => theme.DEFAULT_FONT_COLOR_ACTIVE};
		background-color: ${({ theme }) => theme.DROPDOWN_ITEM_BACKGROUND_COLOR};

		svg:not(.custom) {
			path {
				fill: ${props => props.theme.INPUT_BORDER_COLOR_FOCUSED};
			}
		}
	}
`;

export const SelectedOption = styled.span<{ multiple: boolean }>`
	color: ${props => props.color || props.theme.DEFAULT_FONT_COLOR};
	font-family: ${props => props.theme.INPUT_FONT};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	align-items: center;
	display: flex;
	flex: 1;
	justify-content: space-between;

	${({ multiple }) =>
		multiple &&
		css`
			 {
				flex: 0 1 auto;
				margin: 0 4px 0 0;
				font-size: 90%;
			}
		`}
`;

export const SelectedOptionValueStyled = styled.div<Pick<ISelectOptions, 'dropdownType'>>`
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: ${({ theme }) => theme.INPUT_FONT_SIZE};
`;

export const SelectedOptionLabels = styled.div`
	display: flex;
	align-self: center;
	flex-wrap: wrap;
	max-width: calc(100% - 28px);
	flex: 1 1 auto;
`;

export const OptionLabel = styled.span`
	padding-right: 20px;
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	position: relative;
`;

export const OptionIcon = styled.span`
	margin-right: 16px;
	width: 27px;
	height: 27px;

	img,
	svg {
		width: 27px;
		height: 27px;
	}
`;

export const OptionSecondaryLabel = styled.span`
	color: ${props => props.theme.SECONDARY_FONT_COLOR};
	font-size: 88%;
	opacity: 0.8;
`;

export const IconContainer = styled.span`
	margin-right: 21px;
	height: auto;
	width: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SelectOptionsContrainer = styled.div<{ optionsHeight: string; overflow: 'true' | 'false' }>`
	max-height: ${props => props.optionsHeight};
	/* margin-right: ${props => (props.overflow === 'true' ? '1rem' : '0')}; */
	padding: 1rem 0;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;

	::-webkit-scrollbar-track {
		border-radius: 0;
		/* margin: ${props => (props.overflow === 'true' ? '1rem 0' : '0')}; */
		background-color: #f5f5fc;
	}

	::-webkit-scrollbar {
		width: 8px;
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: ${props => props.theme.SCROLLBAR_COLOR};
	}
`;

interface ISelectOptions {
	id: string;
	children: any;
	isOpen: boolean;
	bottomIsOutside: boolean;
	borderless: boolean;
	backgroundless: boolean;
	optionsHeight: string;
	minWidth?: string;
	maxWidth?: string;
	dropdownType?: 'select' | 'dropdown';
}

interface ISelectOptionStyled {
	active: boolean;
	dropdownType?: 'select' | 'dropdown';
	optionType: 'select-item' | 'dropdown-item';
	[key: string]: any;
}

interface ISelectPlaceholderStyled {
	isOpen: boolean;
	dropdownType?: 'select' | 'dropdown';
	value?: string | number | any[] | undefined;
	errorText?: string | boolean;
}
