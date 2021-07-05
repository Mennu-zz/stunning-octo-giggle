module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  resetMocks: true,
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
};
