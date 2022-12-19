import type { Config } from 'jest';

const config: Config = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.css$': 'some-css-transformer',
  },
};

export default config;
