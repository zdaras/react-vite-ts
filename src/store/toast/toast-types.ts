export interface IToast {
	id?: number;
	text?: string;
	type: 'info' | 'success' | 'warning' | 'danger' | 'processing';
	autoClose?: boolean;
	closeOnClick?: boolean;
	timeout?: number;
}

export interface IPartialToast extends Partial<IToast> {}

export interface IToastStore {
	data: IToast[];
	info: (text: string, options?: IPartialToast) => void;
	success: (text: string, options?: IPartialToast) => void;
	warning: (text: string, options?: IPartialToast) => void;
	danger: (text: string, options?: IPartialToast) => void;
	processing: (text: string, options?: IPartialToast) => void;
	hideToast: (toastArg: IPartialToast) => void;
}
