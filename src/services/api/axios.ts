import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import storage from '@/utils/storage';
import { ILoginResponse } from '@/types/models/user';
import { IError } from '@/types/error';
import { userStore } from '@/store/user';
import config from '@/utils/config';

export const otpHeader = 'x-as-otp';
export const authToken = String(config.AUTH_TOKEN);
const baseURL = config.API_BASE_URL;
const instance = axios.create({ baseURL });
const noAuthInstance = axios.create({ baseURL });

export const setAuthHeader = (response: Pick<ILoginResponse, 'access_token' | 'refresh_token'>) => {
	storage('access_token').set(response.access_token);
	storage('refresh_token').set(response.refresh_token);
	instance.defaults.headers.common[authToken] = `Bearer ${response.access_token}`; // set on getCurrentUser success action
};

export const deleteAuthHeader = () => {
	storage('access_token').unset();
	storage('refresh_token').unset();
	delete instance.defaults.headers.common[authToken]; // remove on logout action
};

let authTokenRequest: Promise<any> | null;

function resetAuthTokenRequest() {
	authTokenRequest = null;
}

function getAuthToken(refreshToken: string) {
	if (!authTokenRequest) {
		authTokenRequest = noAuthInstance.post('/auth/refresh', { refreshToken });
		authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
	}

	return authTokenRequest;
}

const requestInterceptor = (cfg: AxiosRequestConfig) => {
	if (cfg.data && cfg.data.otp && !(cfg.data instanceof FormData) && !(cfg.data instanceof URLSearchParams)) {
		const { otp, ...data } = cfg.data;
		cfg.data = data;
		if (![undefined, null].includes(otp) && cfg.headers) cfg.headers[otpHeader] = otp; // transfer 2fa code from params to header
	}

	return cfg;
};

const responseSuccessInterceptor = (response: AxiosResponse): AxiosResponse => response;

const responseErrorInterceptor = async (error: AxiosError<IError>) => {
	const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
	const invalidToken = error.response?.status === 401;

	if (invalidToken) {
		const refreshToken = storage('refresh_token').get();

		if (!['undefined', 'null'].includes(String(refreshToken)) && !originalRequest._retry) {
			delete originalRequest.headers?.[authToken];
			try {
				const res = await getAuthToken(refreshToken);
				if ([200, 201].includes(res.status)) {
					setAuthHeader(res.data);
					originalRequest._retry = true;
					if (originalRequest.headers) originalRequest.headers[authToken] = `Bearer ${res.data.access_token}`;
					return instance(originalRequest);
				}
			} catch (err: any) {
				userStore.getState().logout();
				return Promise.reject(err?.response?.data);
			}
		} else {
			return Promise.reject(error?.response?.data);
		}
	}

	return Promise.reject(error?.response?.data);
};

instance.interceptors.request.use(requestInterceptor, err => Promise.reject(err));

instance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export const { get, post, put, delete: del } = instance;

export default instance;
