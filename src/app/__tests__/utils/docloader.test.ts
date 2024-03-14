import { expect, test } from 'vitest';
import { splitDocuments } from '../../utils/docloader';

test('uniquish id utility function returns a string of length greater than 1', async () => {
    const documents = await splitDocuments();
    expect(documents[0].pageContent).toContain(
        'A/ To report a problem with faulty facilities or applicances call 01-800-facility or email help@facilities.uni.ac.uk',
    );
});
