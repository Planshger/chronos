const inFlightCalls = new Map<string, Promise<unknown>>();

export function preventDuplicateCall<T>(key: string, operation: () => Promise<T>): Promise<T> {
  const existingCall = inFlightCalls.get(key);
  if (existingCall) {
    return existingCall as Promise<T>;
  }

  const call = Promise.resolve()
    .then(() => operation())
    .finally(() => {
      if (inFlightCalls.get(key) === call) {
        inFlightCalls.delete(key);
      }
    });

  inFlightCalls.set(key, call);
  return call;
}
