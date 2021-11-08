module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/build/',
  ],
  moduleDirectories: [
    '<rootDir>/node_modules',
    '<rootDir>/src',
    '<rootDir>/components',
  ],
  moduleNameMapper: {
    'components/(.*)': '<rootDir>/src/components/$1',
    'styles/(.*)': '<rootDir>/src/styles/$1',
    'assets/(.*)': '<rootDir>/src/assets/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'hooks/(.*)': '<rootDir>/src/hooks/$1',
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
    '.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  testMatch: ['<rootDir>/src/**/(*.)test.(js|jsx|ts|tsx)'],
  globals: {
    'ts-jest': {
      babel: true,
      tsConfig: 'tsconfig.json',
    },
  },
};
