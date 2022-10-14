export const generateUniqueID = (prefix?: string) => {
  return `${prefix ? prefix + '-' : ''}${(Math.random() * 10 + 1)
    .toString(16)
    .replace('.', '')}`;
};
