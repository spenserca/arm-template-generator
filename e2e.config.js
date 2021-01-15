module.exports = {
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/test/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
};
