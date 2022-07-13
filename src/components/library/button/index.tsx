import { memo, FC, ReactNode, SyntheticEvent } from 'react';

import Icons from '@/components/icons';

import { ButtonStyled, ButtonText } from './button-styled';

export const Button: FC<IProps> = ({
	type,
	children,
	onClick,
	active,
	disabled,
	buttonType,
	inline,
	icon,
	text,
	padding,
	loading,
	fontSize,
	className,
	height,
	margin,
	hidden
}) => {
	const Icon = icon ? Icons[icon] : () => null;

	return (
		<ButtonStyled
			type={type}
			onClick={onClick}
			active={active}
			hidden={hidden}
			disabled={disabled}
			buttonType={buttonType}
			inline={inline}
			padding={padding}
			loading={loading ? 'true' : undefined}
			className={className}
			height={height}
			margin={margin}
		>
			<Icon />
			{text && <ButtonText fontSize={fontSize}>{text}</ButtonText>}
			{children}
		</ButtonStyled>
	);
};

export interface IProps {
	type?: 'submit' | 'reset' | 'button';
	children?: ReactNode;
	onClick?: (e: SyntheticEvent) => any;
	active?: boolean;
	disabled?: boolean;
	buttonType?: 'primary' | 'text';
	inline?: boolean;
	icon?: keyof typeof Icons;
	text?: string;
	padding?: string;
	loading?: boolean | string;
	fontSize?: string;
	className?: string;
	height?: string;
	margin?: string;
	hidden?: boolean;
}

Button.defaultProps = {
	type: 'button',
	active: false,
	disabled: false,
	inline: false,
	loading: false
} as Partial<IProps>;

export default memo(Button);
