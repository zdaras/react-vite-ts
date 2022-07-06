import { FC } from 'react';
import styled from 'styled-components';

import { Flex } from '@/styled/flex';

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	background: ${({ theme }) => theme.BG_COLOR};
`;

export const Loading = styled.div<{ width?: string; height?: string; margin?: string }>`
	@keyframes L {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	width: ${({ width }) => width || '67px'};
	height: ${({ height }) => height || '67px'};
	margin: ${({ margin }) => margin || '25px'};
	border-radius: 100%;
	border: 4px solid #e5f4ff;
	border-right-color: #1d93f7;
	animation: L 0.6s linear infinite;
`;

export const LoadingLarge: FC<IProps> = ({ loading }) => (
	<LoadingContainer>
		<Flex center full height="100vh">
			{loading && <Loading />}
		</Flex>
	</LoadingContainer>
);

interface IProps {
	loading: boolean;
}

LoadingLarge.defaultProps = {
	loading: true
} as Partial<IProps>;

export default LoadingLarge;
