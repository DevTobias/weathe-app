module.exports = {
  extends: ['@infotition/eslint-config/next'],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
