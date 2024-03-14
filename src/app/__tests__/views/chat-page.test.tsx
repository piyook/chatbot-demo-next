import { expect, test, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ChatPage from '../../views/chat-page';

describe('chat page tests', () => {
    afterEach(() => {
        cleanup();
    });

    test('Chat page renders expected elements with correct props', () => {
        const chatItems = [
            {
                id: '123',
                question: 'first question',
                answer: 'This is a first sentence. This is a second sentence.',
            },
        ];

        render(<ChatPage chatItems={chatItems} />);

        expect(screen.getByRole('userQuery')).toBeDefined();
        expect(screen.getByRole('botResponse')).toBeDefined();

        expect(screen.getByRole('chatPage')).toBeDefined();

        expect(screen.queryByRole('responseDisplay')).toBeDefined();
    });

    test('Chat Page doesnt render dialogue box with no question/answer in props', () => {
        const chatItems = [
            {
                id: '123',
                question: undefined,
                answer: undefined,
            },
        ];

        render(<ChatPage chatItems={chatItems} />);

        expect(screen.getByRole('chatPage')).toBeDefined();
        const responseDisplay = screen.queryByRole('responseDisplay');

        expect(responseDisplay).toBeNull();
    });
});
