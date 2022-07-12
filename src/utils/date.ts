import dayjs from 'dayjs';

export const dateTimeFormat: IFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
export const dateFormat: IFormat = 'DD-MM-YYYY';
export const defaultDateFormat: IFormat = 'DD MMM, YYYY';
export const defaultDatetimeFormat: IFormat = 'DD MMM, YYYY HH:mm';

export const convertIsoDateOffset = (date: IDate) => {
	const [splitDate, offset] = String(date).split('+');

	if (!offset) return `${date}+00:00`;

	if (offset.indexOf(':') >= 0) return date;

	const hoursOffset = offset.substring(0, 2) || '00';
	const secondsOffset = offset.substring(2, 4) || '00';

	return `${splitDate}+${hoursOffset}:${secondsOffset}`;
};

export const formatDate = (date: IDate | null, format: IFormat = defaultDateFormat) => {
	if (!date) return false;

	return dayjs(convertIsoDateOffset(date)).format(format);
};

export const isSame = (d1: Date, d2: Date, type: any = 'day') => {
	return dayjs(d1).isSame(d2, type);
};

export const isAfter = (d1: Date, d2: Date, type: any = 'day') => {
	return dayjs(d1).isAfter(d2, type);
};

export const dateSubstract = (date?: Date, range = 3, type: any = 'month') => {
	return new Date(dayjs(date).subtract(range, type).format());
};

export const dateAdd = (date?: Date, range = 3, type: any = 'month') => {
	return new Date(dayjs(date).add(range, type).format());
};

export type IDate = string | number | Date | dayjs.Dayjs | undefined;

export type IFormat = 'DD MMM, YYYY' | 'YYYY-MM-DDTHH:mm:ss.SSS' | 'DD-MM-YYYY' | 'DD MMM, YYYY HH:mm';
