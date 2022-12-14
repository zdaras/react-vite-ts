import React from 'react';

import { BlankLayout } from '@/components/layout';
import NotFound from '@/pages/not-found';
import { Flex } from '@/styled/flex';

class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error({ error, errorInfo });
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<Flex height="90vh" padding="100px 0 0">
					<BlankLayout>
						<NotFound />
					</BlankLayout>
				</Flex>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
