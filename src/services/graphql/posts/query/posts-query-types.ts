export interface IGetPostsArgs {
	options: {
		paginate?: {
			page: number;
			limit: number;
		} | null;
		sort?: {
			field: string;
			order: 'ASC' | 'DESC';
		};
		search?: {
			q: string;
		};
	};
}
