import { zodNumber } from 'src/schemas/utils/zod-number';
import { expect, test } from 'vitest';

const valid = [
	['0', 0],
	['1', 1],
	['123', 123],
	[0, 0],
	[1, 1],
	[123, 123],
	[123.45, 123.45],
	[123.456, 123.456],
];

test.each(valid)('zodNumber.parse(%s) should return %s', (arg, expected) => {
	expect(zodNumber.parse(arg)).toBe(expected);
});

const invalid = ['', 'abc', null, undefined, true, false, [], {}];

test.each(invalid)('zodNumber.parse(%s) should throw', (arg) => {
	expect(() => zodNumber.parse(arg)).toThrowError();
});