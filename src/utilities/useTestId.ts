/** Use a 'data-testid' attribute for tests */
export const useTestId = (id: string) => {
  if (process.env.NODE_ENV !== 'test') return {};
  return { 'data-testid': id };
};
