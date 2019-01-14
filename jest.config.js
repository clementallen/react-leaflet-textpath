module.exports = {
    setupFiles: ['<rootDir>/test.config.js'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
