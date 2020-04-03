module.exports = {
    "verbose": true,
    // roots: ['./'],
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: ['default', 'jest-junit'],
    setupFiles: ['./jest.setup-file.ts'],
}