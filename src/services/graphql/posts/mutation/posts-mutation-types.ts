export interface IAddPostArgs {
	input: {
		title?: string;
		body?: string;
	};
}

export interface IUpdatePostArgs {
	id: string;
	input: {
		body?: string;
	};
}
