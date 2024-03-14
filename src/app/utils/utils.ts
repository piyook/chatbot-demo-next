export const uniquishId = (): string => {
    return (
        Date.now().toString(16) +
        Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(16)
    );
};
