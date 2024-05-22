module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  maxWorkers: 2,

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};
