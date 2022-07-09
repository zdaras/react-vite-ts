import styled from 'styled-components';

export const TabMenu = styled.div`
	padding: 0;

	.tab-title {
		padding: 10px 80px 10px 0;
		display: inline-block;
		text-align: left;
		margin-left: 0;
		font-size: 20px;
		transition: all 0.3s;
		cursor: pointer;
		color: ${({ theme }) => theme.DEFAULT_FONT_COLOR};
		position: relative;

		&::before {
			content: '';
			position: absolute;
			bottom: -3px;
			width: 32px;
			height: 0px;
			background: transparent;
			border-radius: 40px;
			transition: all 0.3s ease;
		}

		&.selected {
			color: ${({ theme }) => theme.DEFAULT_FONT_COLOR_ACTIVE};

			&:before {
				height: 3px;
				background: ${({ theme }) => theme.DEFAULT_FONT_COLOR_ACTIVE};
			}
		}
	}
`;
