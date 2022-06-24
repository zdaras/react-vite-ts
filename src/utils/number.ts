export const randomInt = (min = 0, max = 100000) => Math.floor(Math.random() * (max - min + 1) + min);

export const numberToFixed = (n: number | string, decimal = 8, lowNumber = false) => {
	const num = parseFloat(Number(n).toFixed(decimal));
	if (lowNumber && decimal <= 8 && Number(num.toFixed(decimal)) > 0) return num.toFixed(decimal); // number too low

	return num;
};

export const numberToFixedDown = (n: number | string | null, decimal = 8, lowNumber = false) => {
	const num = Math.floor(Number(n) * 10 ** Number(decimal)) / 10 ** Number(decimal);
	if (lowNumber && decimal <= 8 && Number(num.toFixed(decimal)) > 0) return num.toFixed(decimal); // number too low

	return num;
};

export const numberToFixedString = (n: number | string | null, decimal = 8) => {
	if (['undefined', 'null', 'NaN'].includes(String(n))) return '';
	const numberIsExponential = new RegExp(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)/g).test(String(n));
	const spl = String(numberToFixed(Number(n), decimal)).split('.');
	if (!spl.length || !spl[1] || numberIsExponential) return numberToFixed(Number(n), decimal, numberIsExponential);
	const zerosToAdd = decimal - Number(spl[1]).toPrecision().length;
	const z = Array.from(Array(zerosToAdd).keys())
		.map(() => '0')
		.join('');
	return `${spl[0]}.${spl[1]}${z}`;
};
