const activeCalls = new WeakMap<(value: boolean) => void, number>();

export const withLoading = async <T>(fn: () => Promise<T> | T, onLoading: (value: boolean) => void): Promise<T> => {
  const activeCount = activeCalls.get(onLoading) ?? 0;
  if (activeCount === 0) onLoading(true);
  activeCalls.set(onLoading, activeCount + 1);

  try {
    return await fn();
  } finally {
    const remainingCalls = (activeCalls.get(onLoading) ?? 1) - 1;
    if (remainingCalls === 0) {
      activeCalls.delete(onLoading);
      onLoading(false);
    } else {
      activeCalls.set(onLoading, remainingCalls);
    }
  }
};
