import React, { Component } from 'react';

import { DropdownArrowIcon } from '@/components/icons';
import { ReactComponent as CheckIcon } from '@/assets/icons/checkIcon.svg';

import {
	SelectStyled,
	SelectPlaceholderStyled,
	ArrowDownStyled,
	SelectSearchInput,
	SelectOptions,
	SelectOptionStyled,
	SelectedOption,
	SelectedOptionLabels,
	SelectedOptionValueStyled,
	OptionLabel,
	OptionSecondaryLabel,
	SelectOptionsContrainer,
	OptionIcon
} from './select-styled';

const emptyOption = { label: 'Clear', value: null };

export class Select extends Component<IProps, IState> {
	private container = React.createRef<HTMLDivElement>();

	state = {
		isOpen: false,
		input: '',
		filteredOptions: [],
		selectedOptions: [],
		selectedIndex: -2,
		value: '',
		loading: false,
		fetched: false,
		bottomIsOutside: false
	};

	static getDerivedStateFromProps({ options = [], value, multiple }: IProps, state: IState) {
		const opts: IOption[] = state.fetched === true && options.length < 1 ? state.filteredOptions : options;
		const filteredOptions: IOption[] = opts.filter(o => {
			const label = String(o.label).toLowerCase();
			const sec = String(o.secondaryLabel || '').toLowerCase();
			const searchInput = state.input.toLocaleLowerCase().trim();

			return label.includes(searchInput) || sec.includes(searchInput);
		});
		const selectedOptions: IOption[] = opts.filter(o =>
			Array.from(multiple ? (value !== null ? (value as any[]) : []) : [value]).find(v => v === o.value)
		);
		return {
			filteredOptions,
			selectedOptions,
			value,
			fetched: options.length > 1
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = (event: any) => {
		if (this.container.current && !this.container.current.contains(event.target)) {
			this.setState({ isOpen: false });
		}
	};

	handleToggle = async () => {
		const { fetched, isOpen } = this.state;
		const { fetchOptions, fetchRepeat } = this.props;

		if (typeof fetchOptions === 'function' && isOpen === false && (fetched === false || fetchRepeat)) {
			try {
				this.setState({ loading: true });
				await fetchOptions();
				this.setState({ loading: false, fetched: true });
			} finally {
				this.setState({ loading: false, fetched: false });
			}
		}
		await this.setState(prevState => ({ isOpen: !prevState.isOpen, bottomIsOutside: false }));

		// open upside if bottom is out of viewport
		if (!isOpen) {
			const elem = document.querySelector('#select-dropdown');
			if (elem) {
				const bounding = elem.getBoundingClientRect();
				if (bounding.bottom > window.innerHeight) {
					this.setState({ bottomIsOutside: true });
				}
			}
		}
	};

	handleClose = () => this.setState({ isOpen: false, input: '', selectedIndex: -2 });

	handleSearch = (e: any) =>
		this.setState({ input: e.target.value, isOpen: true, selectedIndex: e.target.value ? 0 : -2 });

	handleKeyPress = (e: React.KeyboardEvent) => {
		const { isOpen, filteredOptions, selectedIndex } = this.state;
		if (e.key === 'Enter') e.preventDefault();
		if (isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
			e.preventDefault();
			if (e.key === 'ArrowDown') {
				this.setState(state => ({ selectedIndex: state.selectedIndex + 1 }));
			}
			if (e.key === 'ArrowUp') {
				this.setState(state => ({ selectedIndex: state.selectedIndex === -2 ? -2 : state.selectedIndex - 1 }));
			}
			if (e.key === 'Enter') {
				const selected = filteredOptions[selectedIndex];
				if (selected) this.handleOptionClick(null, selected);
				else this.handleOptionClick(null, emptyOption);
				if (selectedIndex === -1) this.handleOptionClick(null, emptyOption);
				this.handleClose();
			}
		}
	};

	removeOption = async (op: IOption) => {
		const { value } = this.state;
		const { optionSelectionHandler = () => {}, multiple, onChange, handleOptionChange } = this.props;
		const newValue = multiple ? Array.from(value).filter(o => o !== op.value) : undefined;

		if (typeof onChange === 'function') onChange(newValue); // sets react-hook-form value by derivedSateFromProps
		if (typeof handleOptionChange === 'function') handleOptionChange(); // form submit on value change
		optionSelectionHandler(emptyOption, newValue); // additional custom onChange function
	};

	handleMultipleOptionClick = async (e: React.SyntheticEvent | null, op: IOption, selected?: boolean) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (selected) {
			this.removeOption(op);
			return;
		}
		const { value } = this.state;
		const { optionSelectionHandler = () => {}, onChange, handleOptionChange } = this.props;
		const newValue = value === null ? [op.value] : [...(value as any), op.value];

		this.setState({ input: '', selectedIndex: -2 });

		if (typeof onChange === 'function') onChange(newValue); // sets react-hook-form value by derivedSateFromProps
		if (typeof handleOptionChange === 'function') handleOptionChange(); // form submit on value change
		optionSelectionHandler(op, newValue); // additional custom onChange function
	};

	handleOptionClick = async (e: React.SyntheticEvent | null, op: IOption, selected?: boolean) => {
		const { optionSelectionHandler = () => {}, multiple, onChange, handleOptionChange } = this.props;
		if (multiple) {
			this.handleMultipleOptionClick(e, op, selected);
			return;
		}
		if (e) e.preventDefault();
		const newValue = op.value;

		this.setState({ input: '', selectedIndex: -2 });

		if (typeof onChange === 'function') onChange(newValue); // sets react-hook-form value by derivedSateFromProps
		if (typeof handleOptionChange === 'function') handleOptionChange(); // form submit on value change
		optionSelectionHandler(op, newValue); // additional custom onChange function
	};

	render() {
		const {
			value,
			isOpen,
			input,
			filteredOptions,
			selectedOptions,
			selectedIndex,
			loading: loadingState,
			bottomIsOutside
		}: IState = this.state;

		const {
			placeholder = '',
			search,
			borderless,
			padding,
			backgroundless,
			disabled,
			inline,
			readOnly,
			multiple = false,
			clearable,
			secondaryLabel,
			emptyChooseOption,
			optionsHeight = '210px',
			Trigger,
			dropdownType,
			children,
			minWidth = '200px',
			withIcon,
			errorText,
			maxWidth,
			loading: loadingProp,
			...rest
		} = this.props;

		const loading = loadingState || loadingProp;

		const selectOptionsOverflow =
			!multiple && !clearable && emptyChooseOption && !Trigger
				? filteredOptions.length >= 4
				: filteredOptions.length >= 5;

		const showPlaceholder = (!input && !readOnly && !Trigger) || !selectedOptions.length;

		return (
			<div
				className="container"
				ref={this.container}
				style={{ flex: Trigger ? '0 1 auto' : '1 1 auto', maxWidth: '100%' }}
			>
				<SelectStyled
					onClick={this.handleToggle}
					search={search}
					borderless={borderless}
					padding={padding}
					backgroundless={backgroundless}
					disabled={disabled}
					inline={inline}
					isOpen={isOpen}
					readOnly={readOnly}
					onKeyDown={this.handleKeyPress}
					tabIndex={0}
					loading={loading ? 'true' : undefined}
					dropdownType={dropdownType}
					Trigger={Trigger}
					errorText={errorText}
					{...rest}
				>
					{showPlaceholder && (
						<SelectPlaceholderStyled value={value} isOpen={isOpen} dropdownType={dropdownType} errorText={errorText}>
							{placeholder}
						</SelectPlaceholderStyled>
					)}

					{Trigger && <Trigger />}

					{selectedOptions.length > 0 && (
						<SelectedOptionLabels>
							{selectedOptions.map((o, ind) => {
								const lastItem = selectedOptions.slice(-1)[0];
								const hideComma = lastItem?.value === o.value;

								return (
									<SelectedOption key={`${o.value}${ind}`} multiple={multiple}>
										{withIcon && o.logo && (
											<OptionIcon>
												<img alt="icon" src={o.logo} />
											</OptionIcon>
										)}
										<SelectedOptionValueStyled dropdownType={dropdownType}>
											{o.label || o.value}
											{multiple && hideComma && ''}
											{multiple && !hideComma && ','}
										</SelectedOptionValueStyled>
									</SelectedOption>
								);
							})}
						</SelectedOptionLabels>
					)}

					{search && dropdownType === 'select' && (
						<SelectSearchInput onChange={this.handleSearch} value={input} tabIndex={-1} />
					)}

					{!readOnly && !Trigger && (
						<ArrowDownStyled rotate={isOpen ? 1 : 0}>
							<DropdownArrowIcon />
						</ArrowDownStyled>
					)}

					{isOpen && (
						<SelectOptions
							isOpen={isOpen}
							id="select-dropdown"
							bottomIsOutside={bottomIsOutside}
							optionsHeight={optionsHeight}
							minWidth={minWidth}
							maxWidth={maxWidth}
							dropdownType={dropdownType}
						>
							<SelectOptionsContrainer
								optionsHeight={optionsHeight}
								overflow={selectOptionsOverflow ? 'true' : 'false'}
							>
								{!multiple && !clearable && emptyChooseOption && !Trigger && (
									<SelectOptionStyled
										onClick={(e: React.SyntheticEvent) => this.handleOptionClick(e, emptyOption)}
										active={selectedIndex === -1}
										dropdownType={dropdownType}
									>
										{withIcon && (
											<OptionIcon>
												<CheckIcon className="custom" />
											</OptionIcon>
										)}
										<OptionLabel>{emptyOption.label}</OptionLabel>
									</SelectOptionStyled>
								)}

								{filteredOptions.map((op, index) => {
									const selected = multiple && selectedOptions.some(i => i.value === op.value);

									return (
										<React.Fragment key={`${op.value}${index}`}>
											<SelectOptionStyled
												value={op.value}
												onClick={(e: React.SyntheticEvent) => this.handleOptionClick(e, op, selected)}
												active={selectedIndex === index}
												dropdownType={dropdownType}
												Trigger={Trigger}
											>
												{op.logo && withIcon && (
													<OptionIcon>
														<img alt="icon" src={op.logo} />
													</OptionIcon>
												)}
												<OptionLabel>{op.label}</OptionLabel>
												{secondaryLabel && <OptionSecondaryLabel>{op.secondaryLabel}</OptionSecondaryLabel>}
											</SelectOptionStyled>
										</React.Fragment>
									);
								})}

								{children}
							</SelectOptionsContrainer>
						</SelectOptions>
					)}
				</SelectStyled>
			</div>
		);
	}
}

export interface IState {
	isOpen: boolean;
	input: string;
	filteredOptions: IOption[];
	selectedOptions: IOption[];
	selectedIndex: number;
	value: string | number | any[] | undefined | null;
	loading: boolean;
	fetched: boolean;
	bottomIsOutside: boolean;
}

export interface IProps {
	dropdownType?: 'select' | 'dropdown';
	options?: IOption[];
	label?: string;
	placeholder?: string;
	value?: string | number | any[];
	optionSelectionHandler?: (arg0: IOption, arg1: string | number | any[] | undefined | null) => any;
	search?: boolean;
	borderless?: boolean;
	padding?: string;
	backgroundless?: boolean;
	disabled?: boolean;
	inline?: boolean;
	readOnly?: boolean;
	multiple?: boolean;
	clearable?: boolean;
	fetchOptions?: (...args: any[]) => Promise<any>;
	fetchRepeat?: boolean;
	secondaryLabel?: boolean;
	emptyChooseOption?: boolean;
	name?: string;
	optionsHeight?: string;
	minWidth?: string;
	errorText?: string | any;
	Trigger?: () => any;
	withIcon?: boolean;
	maxWidth?: string;
	loading?: boolean;
	[key: string]: any;
}

export interface IOption {
	value: string | number | undefined | null;
	label?: string | number;
	secondaryLabel?: string;
	logo?: string;
	[key: string]: any;
}

// @ts-ignore
Select.defaultProps = {
	dropdownType: 'select',
	options: [],
	label: '',
	placeholder: '',
	value: '',
	optionSelectionHandler: () => {},
	search: false,
	borderless: false,
	backgroundless: false,
	disabled: false,
	inline: false,
	readOnly: false,
	multiple: false,
	clearable: false,
	fetchRepeat: false,
	secondaryLabel: false,
	emptyChooseOption: false,
	optionsHeight: '210px',
	minWidth: '200px',
	Trigger: null,
	withIcon: false
} as Partial<IProps>;

export default Select;

export { default as SelectItem } from './select-item';
