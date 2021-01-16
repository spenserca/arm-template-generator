import { generateArmTemplate } from '../src';
import { readFileSync } from 'fs';

import * as crypto from 'crypto';
import {
  ArmTemplateMetadata,
  ArmTemplateOutputs,
  ArmTemplateParameters,
  ArmTemplateVariables
} from '../index';

const md5 = (contents: string) =>
  crypto
    .createHash('md5')
    .update(contents)
    .digest('hex');

describe('when generating an arm template without extra props', () => {
  let actual: any;

  beforeEach(() => {
    actual = JSON.stringify(
      generateArmTemplate({ resourcesDir: `${__dirname}/resources` }),
      null,
      2
    );
  });

  it('matches the expected output', () => {
    const expected = readFileSync(
      `${__dirname}/expectedWithoutProps.json`,
      'utf8'
    )
      .replace(/\r?\n/g, '\n')
      .trim();
    const expectedCheckSum = md5(expected);
    const actualCheckSum = md5(actual.replace(/\r?\n/g, '\n').trim());

    expect(actualCheckSum).toEqual(expectedCheckSum);
  });
});

describe('when generating an arm template with extra props from options', () => {
  let actual: any;

  beforeEach(() => {
    const metadata: ArmTemplateMetadata = {
      'test-metadata': {
        key: 'value'
      }
    };
    const parameters: ArmTemplateParameters = {
      'test-parameter': {
        type: 'string',
        defaultValue: 'default-value',
        metadata: {
          description: 'test-parameter-description'
        }
      }
    };
    const variables: ArmTemplateVariables = {
      'test-string-variable': 'string-string-string'
    };
    const outputs: ArmTemplateOutputs = {
      'test-string-output': {
        type: 'string',
        value: 'test-string-output-value'
      }
    };

    const armTemplateOptions = {
      resourcesDir: `${__dirname}/resources`,
      metadata,
      parameters,
      variables,
      outputs
    };
    actual = JSON.stringify(generateArmTemplate(armTemplateOptions), null, 2);
  });

  it('matches the expected output', () => {
    const expected = readFileSync(`${__dirname}/expectedWithProps.json`, 'utf8')
      .replace(/\r?\n/g, '\n')
      .trim();
    const expectedCheckSum = md5(expected);
    const actualTrimmed = actual.replace(/\r?\n/g, '\n').trim();
    const actualCheckSum = md5(actualTrimmed);

    expect(actualCheckSum).toEqual(expectedCheckSum);
  });
});

describe('when generating an arm template with extra props from js file', () => {
  let actual: any;

  beforeEach(() => {
    const armTemplateOptions = {
      resourcesDir: `${__dirname}/resources`,
      metadata: `${__dirname}/arm-metadata.js`,
      parameters: `${__dirname}/arm-parameters.js`,
      variables: `${__dirname}/arm-variables.js`,
      outputs: `${__dirname}/arm-outputs.js`
    };
    actual = JSON.stringify(generateArmTemplate(armTemplateOptions), null, 2);
  });

  it('matches the expected output', () => {
    const expected = readFileSync(`${__dirname}/expectedWithProps.json`, 'utf8')
      .replace(/\r?\n/g, '\n')
      .trim();
    const expectedCheckSum = md5(expected);
    const actualTrimmed = actual.replace(/\r?\n/g, '\n').trim();
    const actualCheckSum = md5(actualTrimmed);

    expect(actualCheckSum).toEqual(expectedCheckSum);
  });
});

describe('when generating an arm template with extra props from json file', () => {
  let actual: any;

  beforeEach(() => {
    const armTemplateOptions = {
      resourcesDir: `${__dirname}/resources`,
      metadata: `${__dirname}/arm-metadata.json`,
      parameters: `${__dirname}/arm-parameters.json`,
      variables: `${__dirname}/arm-variables.json`,
      outputs: `${__dirname}/arm-outputs.json`
    };
    actual = JSON.stringify(generateArmTemplate(armTemplateOptions), null, 2);
  });

  it('matches the expected output', () => {
    const expected = readFileSync(`${__dirname}/expectedWithProps.json`, 'utf8')
      .replace(/\r?\n/g, '\n')
      .trim();
    const expectedCheckSum = md5(expected);
    let contents = actual.replace(/\r?\n/g, '\n').trim();
    const actualCheckSum = md5(contents);

    expect(actualCheckSum).toEqual(expectedCheckSum);
  });
});
