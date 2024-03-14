import { expect, test, describe, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import BotResponse from '../../components/bot-response';

describe('bot-response component tests', () => {
    afterEach(() => {
        cleanup();
    });

    test('Chat page renders expected elements with correct props', async () => {
        const chatItems = [
            {
                id: '123',
                question: 'first question',
                answer: 'This is a first sentence. This is a second sentence.',
            },
        ];

        render(
            <BotResponse
                botAnswer={chatItems[0].answer}
                id={chatItems[0].id}
            />,
        );

        // Need to mock out the scroll into view function to prevent error in component
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        window.HTMLElement.prototype.scrollIntoView = function () {};

        expect(screen.getByRole('botResponse')).toBeDefined();

        // Since sentences are typed one character at a time - need to wait for sentence to be typed
        const firstBotSentence = await waitFor(
            () => screen.getByText('This is a first sentence'),
            { interval: 5000, timeout: 10_000 },
        );

        expect(firstBotSentence).toBeDefined();

        const secondBotSentence = await waitFor(
            () => screen.getByText('This is a second sentence'),
            { interval: 5000, timeout: 10_000 },
        );

        expect(secondBotSentence).toBeDefined();
    });
});
