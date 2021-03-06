import styled from 'styled-components';

export const DatepickerWrapper = styled.span`
	.react-datepicker-wrapper {
		width: 100%;
	}

	.react-datepicker {
		font-family: unset;
		font-size: 12px;
		line-height: 14px;
		border: 0;
		border-radius: 10px;
		box-shadow: 0 5px 9px 0 rgba(151, 153, 193, 0.36);
	}

	.react-datepicker__day--outside-month {
		visibility: hidden;
	}

	.react-datepicker__triangle {
		visibility: hidden;
	}

	.react-datepicker__header {
		padding-top: 24px;
		background-color: transparent;
		border-bottom: 0;
	}

	.react-datepicker__current-month {
		color: #2d2d52;
		font-size: 18px;
		letter-spacing: 0.2px;
		padding-bottom: 14px;
		font-weight: 600;
		display: none;
	}

	.react-datepicker__month {
		margin: 0;
		padding: 0 24px 24px;
	}

	.react-datepicker__day-name {
		color: #c1c1d2;
		font-size: 10px;
		letter-spacing: 0.3px;
	}

	.react-datepicker__navigation {
		border: 0.35rem solid transparent;
		width: 5px;
		height: 5px;
		top: 26px;
	}

	.react-datepicker__navigation--previous {
		border-right-color: #a6a6c3;
		left: 25px;
	}

	.react-datepicker__navigation--next {
		border-left-color: #a6a6c3;
		right: 25px;
	}

	.react-datepicker__day {
		transition: background-color 0.2s;
		color: #79798e;
		font-size: 12px;
		letter-spacing: 0.2px;
		border-radius: 100%;
		position: relative;
	}

	.react-datepicker__day--weekend {
		color: #bebeca;
	}

	.react-datepicker__day--keyboard-selected,
	.react-datepicker__month-text--keyboard-selected,
	.react-datepicker__quarter-text--keyboard-selected {
		color: #1d93f7;
		background-color: #edf8ff;
	}

	.react-datepicker__day--selected {
		color: #1d93f7;
		background-color: #edf8ff;
		font-weight: 700;
	}

	.react-datepicker__day:hover,
	.react-datepicker__month-text:hover,
	.react-datepicker__quarter-text:hover {
		border-radius: 100%;
		background-color: #edf8ff;
	}

	.react-datepicker__day--disabled:hover {
		pointer-events: none;
	}

	.react-datepicker__day--disabled,
	.react-datepicker__month-text--disabled,
	.react-datepicker__quarter-text--disabled {
		color: #ccc;
	}

	.react-datepicker__day--today {
		font-weight: 500;

		&:before {
			position: absolute;
			content: '';
			top: 3px;
			right: 3px;
			width: 4px;
			height: 4px;
			background-color: #1d93f7;
			border-radius: 100%;
		}
	}

	.react-datepicker__month-read-view--down-arrow,
	.react-datepicker__year-read-view--down-arrow {
		display: none;
	}

	.react-datepicker__header__dropdown {
		color: #2d2d52;
		font-size: 16px;
		letter-spacing: 0.2px;
		font-weight: 600;
		position: relative;
		bottom: 1px;
		padding-bottom: 14px;
	}

	.react-datepicker__month-read-view,
	.react-datepicker__year-read-view {
		visibility: visible !important;
	}

	.react-datepicker__month-dropdown,
	.react-datepicker__year-dropdown {
		left: 17%;
		border: 0;
		border-radius: 3px;
		box-shadow: 2px 2px 10px 0px rgba(151, 153, 193, 0.36);
		padding: 4px 0;
		background-color: #fff;
		font-size: 14px;
	}

	.react-datepicker__month-option,
	.react-datepicker__year-option {
		transition: all 0.15s;

		&:hover {
			background-color: #eaeaea;
		}
	}

	.react-datepicker__year-dropdown {
		left: 37%;
	}

	.react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
		right: 113px;
	}

	.react-datepicker__time-container {
		border-left: 1px solid #f3f3f3;
	}

	.react-datepicker-time__header {
		color: #2d2d52;
		font-weight: 600;
		letter-spacing: 0.2px;
	}

	.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
		color: #6a6a73;
	}

	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list::-webkit-scrollbar {
		width: 4px;
	}

	.react-datepicker__time-container li.react-datepicker__time-list-item {
		display: inline-flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.react-datepicker__time-container li.react-datepicker__time-list-item--selected {
		color: #1d93f7 !important;
		background-color: #e0f0fb !important;
	}
`;
