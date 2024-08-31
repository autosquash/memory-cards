export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                diagnostics: false,
            },
        ],
    },
    rootDir: 'src',
    moduleNameMapper: {
        '(.+)\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
        '(.+)\\.module\\.css$': '<rootDir>/__mocks__/cssModulesMock.ts',
        '(.+)\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
}
