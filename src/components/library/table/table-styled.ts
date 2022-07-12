import styled, { css } from 'styled-components';

import { responsive } from '@/styled/responsive';

import { ITableProps } from './table-types';
import { IProps } from './cell';

export const TableComp = styled.table<ITableProps>`
	width: 100%;
	display: table;
	border-spacing: 0;
	border-collapse: collapse;
	overflow: hidden;

	@media ${responsive.sm} {
		width: 100%;
		display: block;
	}

	tr {
		td:nth-last-child(-n + 2) {
			text-align: right;
		}

		:last-child {
			td {
				border-bottom: 0;
			}
		}

		td {
			padding: 10px;
		}
	}

	thead tr td {
		height: 25px;
		padding: 2px 10px;
		color: #c1c1d5;
		font-size: 14px;
		border-bottom: 0;
	}

	tbody tr {
		:not(:first-child) {
			border-top: 1px solid #ededf7;
		}
	}

	${props =>
		props.hoverable &&
		css`
			cursor: pointer;

			tbody tr:hover {
				background-color: #7073af09;
				border-top-color: transparent;

				& + tr {
					border-top-color: transparent;
				}
			}
		`};
`;

export const TableContainer = styled.div<{ overflow?: string }>`
	overflow: ${props => props.overflow || 'hidden'};
	position: relative;
	flex: 1 1 100%;
	overflow-x: ${props => (props.overflow ? 'unset' : 'auto')};

	table {
		overflow: ${props => props.overflow || 'hidden'};
	}

	::-webkit-scrollbar {
		width: 4px;
		height: 5px;
		background-color: #d9d9eb;
	}
`;

export const TD = styled.td<IProps>`
	display: table-cell;
	text-align: ${({ align }) => (align ? `${align} !important` : 'unset')};
	width: ${({ width }) => (width ? `${width} !important` : 'auto')};
	color: ${({ secondary, theme }) => (secondary ? theme.TABLE_SECONDARY_COLOR : theme.TABLE_COLOR)};
	white-space: nowrap;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	height: 60px;
`;

export const TR = styled.tr`
	transition: 0.2s ease-in-out;
`;
