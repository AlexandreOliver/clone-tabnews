const nextjest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env.development",
});
/**@type {import('jest').Config} */
const createjestconfig = nextjest({ dir: "./" });
const jestconfig = createjestconfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000, // 1m
});

module.exports = jestconfig;
