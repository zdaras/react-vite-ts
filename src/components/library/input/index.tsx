import { memo, FC, SyntheticEvent, forwardRef } from 'react';

import { CalendarIcon, CloseSmallIcon } from '@/components/icons';

import { InputStyled, AbsoluteCompStyled } from './input-styled';
import { LabelStyled } from './label-styled';

type IType = 'text' | 'checkbox' | 'radio' | 'search' | 'number' | 'email' | 'password';

export const Input: FC<IProps> = forwardRef(
	(
		{
			value,
			id,
			type = 'text',
			label,
			onChange,
			active,
			placeholder,
			autoFocus,
			name,
			errorText,
			AbsoluteComp,
			onClick,
			switcher,
			disabled,
			datepicker,
			onBlur,
			readOnly,
			checked,
			setValue,
			uncheck,
			autoComplete
		},
		ref
	) => {
		const clearValue = (e: any) => {
			e.preventDefault();
			if (typeof setValue === 'function' && name) setValue(name, null);
		};

		return (
			<LabelStyled type={type} disabled={disabled}>
				<InputStyled
					value={value}
					type={type}
					onChange={onChange}
					onBlur={onBlur}
					active={active}
					placeholder={placeholder}
					autoFocus={autoFocus}
					name={name}
					id={id || name}
					ref={ref}
					errorText={errorText}
					onClick={onClick}
					disabled={disabled}
					readOnly={readOnly}
					autoComplete={autoComplete}
					switcher={switcher}
					AbsoluteComp={AbsoluteComp}
					checked={checked}
					uncheck={uncheck}
					{...(type === 'number' && { step: '0.00000001' })}
					{...(type === 'number' && { onKeyDown: evt => evt.key === 'e' && evt.preventDefault() })}
				/>
				{label && (
					<label className="input-label" htmlFor={id || name} input-type={type}>
						{label}
					</label>
				)}
				{AbsoluteComp && <AbsoluteCompStyled>{AbsoluteComp}</AbsoluteCompStyled>}
				{!AbsoluteComp && datepicker && !value && (
					<AbsoluteCompStyled>
						<CalendarIcon />
					</AbsoluteCompStyled>
				)}
				{!AbsoluteComp && datepicker && value && (
					<AbsoluteCompStyled title="Clear" onClick={clearValue} style={{ cursor: 'pointer' }}>
						<CloseSmallIcon />
					</AbsoluteCompStyled>
				)}
				{switcher && <div className="switcher" />}
			</LabelStyled>
		);
	}
);

export interface IProps {
	value?: any;
	id?: string;
	type?: IType;
	onChange?: (e: SyntheticEvent) => void;
	active?: boolean;
	label?: string | React.ReactNode;
	placeholder?: string;
	autoFocus?: boolean;
	name?: string;
	errorText?: string | any;
	switcher?: boolean;
	disabled?: boolean;
	AbsoluteComp?: React.ReactNode;
	onClick?: (e: SyntheticEvent) => void;
	onBlur?: (e: SyntheticEvent) => Promise<any> | any;
	datepicker?: boolean;
	readOnly?: boolean;
	checked?: boolean;
	setValue?: (name: any, value?: any) => any;
	uncheck?: boolean;
	autoComplete?: string;
	ref?: any;
}

Input.defaultProps = {
	type: 'text',
	active: false,
	autoFocus: false,
	placeholder: ' ',
	AbsoluteComp: null,
	switcher: false,
	autoComplete: 'off'
} as Partial<IProps>;

export default memo(Input);
