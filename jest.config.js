/* eslint-disable @typescript-eslint/no-var-requires */

const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: __dirname });

const customJestConfig = {
  setupFilesAfterEnv: [`${__dirname}/jest.setup.ts`],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '@Elements/(.*)/(.*)$': `${__dirname}/app/Components/Elements/$1/$2`,
    '@Layouts/(.*)/(.*)$': `${__dirname}/app/Components/Layouts/$1/$2`,
    '@Modules/(.*)/(.*)$': `${__dirname}/app/Components/Modules/$1/$2`,
    '@Templates/(.*)/(.*)$': `${__dirname}/app/Components/Templates/$1/$2`,
    '@Helpers/(.*)/(.*)$': `${__dirname}/app/Components/Helpers/$1/$2`,
    '@Context/(.*)$': `${__dirname}/app/Context/$1`,
    '@Hooks/(.*)$': `${__dirname}/app/Hooks/$1`,
    '@Utils/(.*)$': `${__dirname}/app/Utils/$1`,
    '@Constants/(.*)$': `${__dirname}/app/Constants/$1`,
    '@Models/(.*)$': `${__dirname}/app/Models/$1`,
    '@Controllers/(.*)$': `${__dirname}/app/Controllers/$1`,
  },
};

module.exports = createJestConfig(customJestConfig);
