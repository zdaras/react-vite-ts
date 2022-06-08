import React from 'react';

export const BlockIcon = (props: { [key: string]: any }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 17.5 17.5" {...props}>
		<g transform="translate(0.25 0.25)">
			<path
				fill="#2d2d52"
				strokeWidth="0.5px"
				d="M8.5,0A8.5,8.5,0,1,0,17,8.5,8.51,8.51,0,0,0,8.5,0Zm0,14.875A6.382,6.382,0,0,1,2.125,8.5a6.293,6.293,0,0,1,1.18-3.692l8.887,8.887A6.293,6.293,0,0,1,8.5,14.875Zm5.195-2.683L4.808,3.305A6.293,6.293,0,0,1,8.5,2.125,6.382,6.382,0,0,1,14.875,8.5,6.293,6.293,0,0,1,13.695,12.192Z"
			/>
		</g>
	</svg>
);

export default BlockIcon;
