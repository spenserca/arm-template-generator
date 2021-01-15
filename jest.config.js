module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: [
    'chanceSetup.ts',
    'src/*.d.ts',
    'index.d.ts',
    'requireWrapper.ts',
    'dist'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/src/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
};
