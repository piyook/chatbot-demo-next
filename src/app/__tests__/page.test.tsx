import { expect, test, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Page from '../page';

describe('landing page tests', () => {
    afterEach(() => {
        cleanup();
    });

    test('Intro Page', () => {
        render(<Page />);
        expect(screen.getByRole('greeting')).toBeDefined();
        expect(screen.getByRole('userInput')).toBeDefined();
        expect(screen.getByText('Hello')).toBeDefined();
        expect(screen.getByText('How Can I Help You?')).toBeDefined();
    });
});
