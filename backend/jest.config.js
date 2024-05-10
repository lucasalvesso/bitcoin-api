const path = require("path");

const dir = path.resolve(__dirname, "test");
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: dir,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [path.join(dir, "setupTests.ts")],
};
