import styled, { css } from 'styled-components';

import { IProps } from './form-input';
import { IProps as IErrorProps } from './error';

export const FormInputWrapper = styled.div<Partial<IProps>>`
	margin: ${({ margin }) => margin || '0 0 25px'};
	padding: ${({ padding }) => padding || '0'};
	display: flex;
	flex-direction: column;
	position: relative;
	flex-wrap: wrap;
	align-items: stretch;
	flex: 1 1 auto;
`;

export const ErrorWrapper = styled.div<IErrorProps>`
	transition: min-height 0.15s, padding 0.15s, opacity 0.2s;
	padding: 0 32px;
	background-color: #d859471f;
	margin: ${props => (props.text ? props.margin || '0 0 25px' : '0')};
	min-height: ${props => (props.text ? '35px' : '0')};
	display: ${props => (props.inline ? 'inline-flex' : 'flex')};
	position: relative;
	flex-wrap: wrap;
	align-items: stretch;
	flex: 1 1 auto;
	justify-content: center;
	align-items: center;
	opacity: ${props => (props.text ? '1' : '0')};

	${({ inForm, center, text }) =>
		inForm &&
		css`
			padding: ${text ? '3px 0 0' : '0'};
			min-height: ${text ? '20px' : '0'};
			justify-content: ${center ? 'center' : 'flex-start'};
			background-color: transparent;
		`}
`;

export const ErrorText = styled.div<IErrorProps>`
	color: #f44336;
	transition: all 0.2s;
	letter-spacing: 0.5px;
	font-size: ${({ inForm }) => (inForm ? '13px' : '14px')};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: ${props => (props.multiline ? 'unset' : 'nowrap')};
	opacity: ${props => (props.text ? '1' : '0')};
	text-align: ${props => (props.center ? 'center' : 'left')};
`;
