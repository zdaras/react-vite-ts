import create from 'zustand';

import { randomInt } from '@/utils/number';

const deflt = (options: IPartialToast): IToast => ({
	id: randomInt(),
	text: '',
	type: 'info',
	autoClose: true,
	closeOnClick: true,
	timeout: 5000,
	...options
});

export const toastStore = create<IToastStore>((set, get) => ({
	data: [],
	info: (text, options = {}) => set({ data: [...get().data, deflt({ ...options, text, type: 'info' })] }),
	success: (text, options = {}) => set({ data: [...get().data, deflt({ ...options, text, type: 'success' })] }),
	warning: (text, options = {}) => set({ data: [...get().data, deflt({ ...options, text, type: 'warning' })] }),
	danger: (text, options = {}) => set({ data: [...get().data, deflt({ ...options, text, type: 'danger' })] }),
	processing: (text, options = {}) => set({ data: [...get().data, deflt({ ...options, text, type: 'processing' })] }),
	hideToast: toastArg => set({ data: get().data.filter(toast => toast.id !== toastArg.id) }),
	clearToasts: () => set({ data: [] })
}));

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

export default toastStore;
