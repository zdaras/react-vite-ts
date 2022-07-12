import React, { memo, FC } from 'react';
import DatepickerComponent, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGb from 'date-fns/locale/en-GB';

import Input, { IProps as IInputProps } from '@/components/library/input';

import { DatepickerWrapper } from './datepicker-styled';

registerLocale('en-gb', enGb);

const CustomDateInput = ({ ...props }) => <Input {...props} readOnly />;

export const Datepicker: FC<IProps> = ({
	name,
	value,
	onChange = () => {},
	register,
	dateFormat,
	locale,
	showTimeSelect,
	...props
}) => {
	const format = showTimeSelect ? 'd MMM yyyy HH:mm' : dateFormat;

	return (
		<DatepickerWrapper>
			<DatepickerComponent
				name={name}
				value={value}
				selected={value as any}
				onChange={onChange}
				ref={register}
				dateFormat={format}
				locale={locale}
				customInput={<CustomDateInput datepicker {...props} readOnly />}
				formatWeekDay={formattedDate => formattedDate.substr(0, 3)}
				yearDropdownItemNumber={10}
				showTimeSelect={showTimeSelect}
				showMonthDropdown
				showYearDropdown
				{...props}
			/>
		</DatepickerWrapper>
	);
};

export interface IProps
	extends Omit<ReactDatePickerProps, 'onChange' | 'onBlur'>,
		Omit<IInputProps, 'onChange' | 'onBlur' | 'value'> {
	register?: any;
	onChange?(date: Date | null, event: React.SyntheticEvent<any> | undefined): void;
}

Datepicker.defaultProps = {
	onChange: () => {},
	dateFormat: 'd MMM yyyy',
	locale: 'en-gb'
} as Partial<IProps>;

export default memo(Datepicker);
