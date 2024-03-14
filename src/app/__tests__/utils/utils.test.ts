import { expect, test, expectTypeOf } from 'vitest';
import { uniquishId } from '../../utils/utils';

test('uniquish id utility function returns a string of length greater than 1', () => {
    const uniquishValue = uniquishId();
    expectTypeOf(uniquishValue).toMatchTypeOf<string>();
    expect(uniquishValue.length > 1).toBe(true);
});
