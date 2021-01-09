import {
  ArmTemplateOptions,
  ArmTemplateParameters,
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
