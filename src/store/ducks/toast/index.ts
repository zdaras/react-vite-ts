import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IRootStore } from '@/store/ducks/root-reducer';

import { IShowToastAction, IHideToastAction, IToast, IToastState } from './toast.types';
import * as actions from './toast.actions';

const initialState: IToastState = {
	data: []
};

// slice
const slice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		showToast: (state, { payload }: IShowToastAction) => ({ ...state, data: [...state.data, payload] }),
		hideToast: (state, { payload }: IHideToastAction) => ({
			...state,
			data: state.data.filter((toast: IToast) => toast.id !== payload.id)
		})
	}
});

// selectors
export const toastSelectors = {
	data: createSelector(
		(state: IRootStore) => state.toast,
		toast => toast.data
	)
};

// actions
export const toastActions = actions;

export default slice;
