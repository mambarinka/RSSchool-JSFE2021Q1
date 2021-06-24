module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'ts.d', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['<rootDir>/coverage/'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupFilesAfterEnv: ['<rootDir>enzyme.config.js'],
    setupFiles: ['<rootDir>/config/config.ts'],
    testURL: 'http://localhost',
    testEnvironment: 'node',
    coverageDirectory: './coverage/',
    globals: {
      'ts-jest': {
        compiler: 'ttypescript',
      },
    },
  };