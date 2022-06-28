import { numberToFixedString, numberToFixedDown, randomInt } from '@/utils/number';

describe('test numbers', () => {
	test('numberToFixedString', () => {
		expect(numberToFixedString(0.1, 4)).toBe('0.1000');
		expect(numberToFixedString(0.12345, 3)).toBe('0.123');
		expect(numberToFixedString(2)).toBe(2);
		expect(numberToFixedString(0)).toBe(0);
		expect(numberToFixedString(0.0e1, 1)).toBe(0);
		expect(numberToFixedString(1.1e1)).toBe(11);
	});

	test('numberToFixedDown', () => {
		expect(numberToFixedDown(0.9991, 3)).toBe(0.999);
		expect(numberToFixedDown(0.9949, 3)).toBe(0.994);
		expect(numberToFixedDown(0.9941, 3)).toBe(0.994);
	});

	test('randomInt', () => {
		const [from, to] = [1, 100];
		expect(randomInt(from, to)).toBeGreaterThanOrEqual(from);
		expect(randomInt(from, to)).toBeLessThanOrEqual(to);
	});
});
