import { generateArmTemplate } from './index';
import { Chance } from 'chance';
import { getResources } from './getResources';
import {
  ArmTemplateMetadata,
  ArmTemplateOutputs,
  ArmTemplateParameters,
  ArmTemplateVariables,
  ParameterType
} from '../index';

const chance = new Chance();

jest.mock('./getResources');

const getResourcesMock = getResources as jest.Mock;

describe('ARM template parameters', () => {
  describe('when passing parameters to the arm template', () => {
    let actual: any;
    let armTemplateParameters: ArmTemplateParameters;

    beforeEach(() => {
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

      armTemplateParameters = chance
        .n(getRandomArmTemplateParameter, chance.d10())
        .reduce((acc: any, params: ArmTemplateParameters) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        parameters: armTemplateParameters,
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
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

      actual = generateArmTemplate(options);
    });

    it('does not have a parameters property', () => {
      expect(actual.parameters).toBeUndefined();
    });
  });
});

describe('ARM template variables', () => {
  describe('when passing variables to the arm template', () => {
    let actual: any;
    let armTemplateVariables: ArmTemplateVariables;

    beforeEach(() => {
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

      armTemplateVariables = chance
        .n(getRandomArmTemplateVariable, chance.d10())
        .reduce((acc: any, params: ArmTemplateVariables) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        variables: armTemplateVariables,
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
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

      actual = generateArmTemplate(options);
    });

    it('does not have a variables property', () => {
      expect(actual.variables).toBeUndefined();
    });
  });
});

describe('ARM template metadata', () => {
  describe('when passing metadata to the arm template', () => {
    let actual: any;
    let armTemplateMetadata: ArmTemplateMetadata;

    beforeEach(() => {
      const getRandomArmTemplateMetadata = (): ArmTemplateVariables => {
        return {
          [chance.string()]: { [chance.string()]: chance.string() }
        };
      };

      armTemplateMetadata = chance
        .n(getRandomArmTemplateMetadata, chance.d10())
        .reduce((acc: any, params: ArmTemplateVariables) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        metadata: armTemplateMetadata,
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
    });

    it('adds the metadata to the arm template', () => {
      expect(actual.metadata).toEqual(armTemplateMetadata);
    });
  });

  describe('when not passing metadata to the arm template', () => {
    let actual: any;

    beforeEach(() => {
      const options = {
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
    });

    it('does not have a metadata property', () => {
      expect(actual.metadata).toBeUndefined();
    });
  });
});

describe('ARM template outputs', () => {
  describe('when passing outputs to the arm template', () => {
    let actual: any;
    let armTemplateOutputs: ArmTemplateOutputs;

    beforeEach(() => {
      const getRandomArmTemplateOutput = (): ArmTemplateOutputs => {
        const type: ParameterType = chance.pickone([
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
            type: type,
            condition: chance.string(),
            value: chance.string()
          }
        };
      };

      armTemplateOutputs = chance
        .n(getRandomArmTemplateOutput, chance.d10())
        .reduce((acc: any, params: ArmTemplateParameters) => {
          return { ...acc, ...params };
        }, {});

      const options = {
        outputs: armTemplateOutputs,
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
    });

    it('adds the outputs to the arm template', () => {
      expect(actual.outputs).toEqual(armTemplateOutputs);
    });
  });

  describe('when not passing outputs to the arm template', () => {
    let actual: any;

    beforeEach(() => {
      const options = {
        resourcesDir: chance.string()
      };

      actual = generateArmTemplate(options);
    });

    it('does not have a outputs property', () => {
      expect(actual.outputs).toBeUndefined();
    });
  });
});

describe('ARM template resources', () => {
  describe('when passing resources to exclude', () => {
    let actual: any;
    let resourcesDir: string;
    let resourcesToExclude: string[];
    let resources: any[];

    beforeEach(() => {
      resourcesDir = chance.string();

      resourcesToExclude = chance.n(chance.string, chance.d10());

      const armTemplateOptions = {
        resourcesDir: resourcesDir,
        resourcesToExclude: resourcesToExclude
      };
      resources = chance.n(
        () => ({ [chance.string()]: chance.string() }),
        chance.d10()
      );
      getResourcesMock.mockReturnValue(resources);

      actual = generateArmTemplate(armTemplateOptions);
    });

    it('gets the resources', () => {
      expect(getResourcesMock).toHaveBeenCalledTimes(1);
      expect(getResourcesMock).toHaveBeenCalledWith(
        resourcesDir,
        resourcesToExclude
      );
    });

    it('adds the resources to the ARM template', () => {
      expect(actual.resources).toEqual(resources);
    });
  });

  describe('when not passing resources to exclude', () => {
    let actual: any;
    let resourcesDir: string;
    let resources: any[];

    beforeEach(() => {
      resourcesDir = chance.string();

      const armTemplateOptions = {
        resourcesDir: resourcesDir
      };
      resources = chance.n(
        () => ({ [chance.string()]: chance.string() }),
        chance.d10()
      );
      getResourcesMock.mockReturnValue(resources);

      actual = generateArmTemplate(armTemplateOptions);
    });

    it('gets the resources', () => {
      expect(getResourcesMock).toHaveBeenCalledTimes(1);
      expect(getResourcesMock).toHaveBeenCalledWith(resourcesDir, []);
    });

    it('adds the resources to the ARM template', () => {
      expect(actual.resources).toEqual(resources);
    });
  });
});
