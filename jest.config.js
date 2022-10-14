module.exports = {
  testEnvironment: 'jsdom',
  snapshotSerializers: [
    /* if needed other snapshotSerializers should go here */
    '@emotion/jest/serializer',
  ],
  moduleNameMapper: {
    '^.+\\.svg.*js$': '<rootDir>/src/config/__mocks__/SvgMock.tsx',
    '\\.svg$': '<rootDir>/src/config/jest-transform-image.js',
  },
};
