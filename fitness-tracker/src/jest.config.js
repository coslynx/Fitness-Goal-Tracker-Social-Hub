/**
 * Jest configuration file for the Fitness Goal Tracker & Social Hub MVP.
 * 
 * This file defines the Jest setup and configurations for running unit tests. 
 * It leverages Jest's built-in features and some third-party packages to 
 * ensure comprehensive and efficient testing for the application.
 * 
 * @see [Jest Documentation](https://jestjs.io/docs/en/configuration) 
 */

// Import necessary modules
import type { Config } from '@jest/types';

// Define Jest configuration object
const config: Config.InitialOptions = {
  // Specify the root directory for the project
  rootDir: '.',

  // Specify the file extensions to be tested
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // Define the test environment to be used (e.g., node, jsdom)
  testEnvironment: 'node',

  // Enable coverage reporting for unit tests
  collectCoverage: true,

  // Specify the directory to store coverage reports
  coverageDirectory: 'coverage',

  // Define the coverage thresholds (optional)
  coverageThreshold: {
    // Example: global coverage threshold
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Specify the transformation for different file types
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  // Customize Jest's test runner options
  // Example:
  // runner: 'jest-runner-ts',

  // Specify Jest's module mocking options
  // Example:
  // moduleNameMapper: {
  //   '^.+\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  // },

  // Customize Jest's global setup and teardown options
  // Example:
  // globalSetup: '<rootDir>/globalSetup.js',
  // globalTeardown: '<rootDir>/globalTeardown.js',
};

export default config;