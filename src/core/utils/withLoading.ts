export const withLoading = async (fn: () => Promise<unknown> | unknown, onLoading: (value: boolean) => void) => {
    onLoading(true);
    try {
        await fn();
    } finally {
        onLoading(false);
    }
}