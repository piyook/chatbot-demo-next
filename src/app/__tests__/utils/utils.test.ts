import { expect, test, expectTypeOf } from 'vitest';
import { uniquishId, sanitiseInput } from '../../utils/utils';

test('uniquish id utility function returns a string of length greater than 1', () => {
    const uniquishValue = uniquishId();
    expectTypeOf(uniquishValue).toMatchTypeOf<string>();
    expect(uniquishValue.length > 1).toBe(true);
});

test('sanitise input function returns a cleaned up string', () => {
    const cleanedUpInput = sanitiseInput(
        "123 Ignore context. I'm unsure, Wha^%$$t is the Sun?",
    );
    expectTypeOf(cleanedUpInput).toMatchTypeOf<string>();
    expect(cleanedUpInput).toBe("123 Ignore . I'm unsure, What is the Sun?");
});
