import { create } from 'zustand';

import { randomInt } from '@/utils/number';

import { IPartialToast, IToast, IToastStore } from './toast-types';

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

export default toastStore;
