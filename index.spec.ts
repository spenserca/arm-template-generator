import {
  ArmTemplateParameters,
  ArmTemplateVariables,
  createArmTemplate,
  ParameterType
} from './index';
import { Chance } from 'chance';

const chance = new Chance();

const getRandomArmTemplateParameter = (): ArmTemplateParameters => {
  const parameterType: ParameterType = chance.pickone([
    'string',
    'secureString',
    'int',
    'bool',
    'object',
    'secureObject',
    'array'
  ]);

  return {
    [chance.string()]: {
      type: parameterType,
      defaultValue: chance.string(),
      allowedValues: [chance.string()],
      minValue: chance.integer(),
      maxValue: chance.integer(),
      minLength: chance.integer(),
      maxLength: chance.integer(),
      metadata: {
        description: chance.string()
      }
    }
  };
};

const getRandomArmTemplateVariable = (): ArmTemplateVariables => {
  return {
    [chance.string()]: chance.pickone([
      chance.string(),
      chance.integer(),
      chance.bool(),
      chance.n(chance.string, chance.d10()),
      chance.n(chance.integer, chance.d10()),
      chance.n(chance.bool, chance.d10())
    ])
  };
};

describe('ARM template parameters', () => {
  describe('when passing parameters to the arm template', () => {
    let actual: any;
    let armTemplateParameters: ArmTemplateParameters;

    beforeEach(() => {
      armTemplateParameters = chance
        .n(getRandomArmTemplateParameter, chance.d10())
        .reduce((acc: any, params: ArmTemplateParameters) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        parameters: armTemplateParameters,
        resourcesDir: chance.string()
      };

      actual = createArmTemplate(options);
    });

    it('adds the parameters to the arm template', () => {
      expect(actual.parameters).toEqual(armTemplateParameters);
    });
  });

  describe('when not passing parameters to the arm template', () => {
    let actual: any;

    beforeEach(() => {
      const options = {
        resourcesDir: chance.string()
      };

      actual = createArmTemplate(options);
    });

    it('has an empty parameter object', () => {
      expect(actual.parameters).toEqual({});
    });
  });
});

describe('ARM template variables', () => {
  describe('when passing variables to the arm template', () => {
    let actual: any;
    let armTemplateVariables: ArmTemplateVariables;

    beforeEach(() => {
      armTemplateVariables = chance
        .n(getRandomArmTemplateVariable, chance.d10())
        .reduce((acc: any, params: ArmTemplateVariables) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        variables: armTemplateVariables,
        resourcesDir: chance.string()
      };

      actual = createArmTemplate(options);
    });

    it('adds the variables to the arm template', () => {
      expect(actual.variables).toEqual(armTemplateVariables);
    });
  });

  describe('when not passing variables to the arm template', () => {
    let actual: any;

    beforeEach(() => {
      const options = {
        resourcesDir: chance.string()
      };

      actual = createArmTemplate(options);
    });

    it('has an empty parameter object', () => {
      expect(actual.variables).toEqual({});
    });
  });
});