const config = {
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  extensionsToTreatAsEsm: ['.ts'],
};

// eslint-disable-next-line no-undef
module.exports = config;
