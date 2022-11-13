const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: ".",
})

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/src/mocks/styleMock.js",
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/src/mocks"],
}

module.exports = createJestConfig(customJestConfig)
