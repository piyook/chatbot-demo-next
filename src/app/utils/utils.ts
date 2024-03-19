/**
 * Generates a unique (ish) ID
 * @returns {string} unique id string
 */
export const uniquishId = (): string => {
    return (
        Date.now().toString(16) +
        Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16)
    );
};

/**
 * Function to sanitise user question input to AI
 * @param {string} userQuestion user question
 * @returns {string} sanitised user question
 */
export const sanitiseInput = (userQuestion: string | undefined) => {
    if (!userQuestion) return '';
    // Remove the word 'context' to prevent context switching and any non-allowed characters
    return userQuestion
        .replace('context', '')
        .replaceAll(/[^a-zA-Z\d?!'"`\s]/g, '');
};
