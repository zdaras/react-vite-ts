import React from 'react';

export const EyeHide = (props: { [key: string]: any }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20.07"
		height="20.07"
		viewBox="0 0 20.07 20.07"
		className="custom"
		{...props}
	>
		<path
			style={{ fill: 'transparent' }}
			d="M0,0H20.07V20.07H0ZM0,0H20.07V20.07H0ZM0,0H20.07V20.07H0ZM0,0H20.07V20.07H0Z"
		/>
		<path
			className="second-path"
			d="M10.2,6.345a4.183,4.183,0,0,1,4.181,4.181,4.059,4.059,0,0,1-.3,1.53L16.521,14.5a9.882,9.882,0,0,0,2.868-3.972,9.89,9.89,0,0,0-9.2-6.272,9.738,9.738,0,0,0-3.328.585L8.669,6.646A4.059,4.059,0,0,1,10.2,6.345ZM1.836,4.062,3.743,5.969l.385.385A9.871,9.871,0,0,0,1,10.526,9.886,9.886,0,0,0,13.862,16.1l.351.351,2.45,2.442,1.062-1.062L2.9,3ZM6.461,8.687l1.3,1.3a2.359,2.359,0,0,0-.067.544A2.505,2.505,0,0,0,10.2,13.035a2.359,2.359,0,0,0,.544-.067l1.3,1.3A4.154,4.154,0,0,1,6.461,8.687Zm3.6-.652L12.7,10.669l.017-.134a2.505,2.505,0,0,0-2.509-2.509Z"
			transform="translate(-0.164 -0.491)"
		/>
	</svg>
);

export default EyeHide;
