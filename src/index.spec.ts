import { generateArmTemplate } from './index';
import { Chance } from 'chance';
import { getResources } from './getResources';
import { ArmTemplate, ArmTemplateOptions, ArmTemplateResource } from '../index';
import { writeToFile } from './writeToFile';
import { setArmTemplateProperty } from './setArmTemplateProperty';

const chance = new Chance();

jest.mock('./getResources');
jest.mock('./setArmTemplateProperty');
jest.mock('./writeToFile');

const getResourcesMock = getResources as jest.Mock;
const setArmTemplatePropertyMock = setArmTemplateProperty as jest.Mock;
const writeToFileMock = writeToFile as jest.Mock;

const armTemplateProperties = [
  'metadata',
  'outputs',
  'parameters',
  'variables'
];

describe('ARM Template', () => {
  describe.each(armTemplateProperties)(
    'ARM template %s',
    (property: string) => {
      let armTemplateOptions: ArmTemplateOptions;
      let armTemplate: ArmTemplate;

      beforeEach(() => {
        armTemplateOptions = {} as ArmTemplateOptions;
        armTemplate = {
          $schema:
            'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
          contentVersion: '1.0.0.0'
        };

        generateArmTemplate(armTemplateOptions).armTemplate;
      });

      it('sets the arm template parameters', () => {
        expect(setArmTemplatePropertyMock).toHaveBeenCalledWith(
          armTemplateOptions,
          armTemplate,
          property
        );
      });
    }
  );

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

        actual = generateArmTemplate(armTemplateOptions).armTemplate;
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

        actual = generateArmTemplate(armTemplateOptions).armTemplate;
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
});

describe('converting to JSON', () => {
  let actual: ArmTemplate;
  let expected: ArmTemplate;

  beforeEach(() => {
    const armTemplateOptions = {
      resourcesDir: chance.string()
    };

    const resources: ArmTemplateResource[] = chance.n(
      () =>
        (({
          [chance.string()]: chance.string()
        } as unknown) as ArmTemplateResource),
      chance.d10()
    );

    expected = {
      $schema:
        'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      resources
    };

    getResourcesMock.mockReturnValue(resources);

    actual = generateArmTemplate(armTemplateOptions).toJSON();
  });

  it('returns the generated ARM template', () => {
    expect(actual).toEqual(expected);
  });
});

describe('writing the ARM template to a file', () => {
  let armTemplate: ArmTemplate;
  let outputFilePath: string;

  beforeEach(() => {
    outputFilePath = chance.string();
    const options = {
      resourcesDir: chance.string()
    };

    const resources: ArmTemplateResource[] = chance.n(
      () =>
        (({
          [chance.string()]: chance.string()
        } as unknown) as ArmTemplateResource),
      chance.d10()
    );

    armTemplate = {
      $schema:
        'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
      contentVersion: '1.0.0.0',
      resources
    };

    getResourcesMock.mockReturnValue(resources);

    generateArmTemplate(options).writeToFile(outputFilePath);
  });

  it('writes the ARM template to the output file path', () => {
    expect(writeToFileMock).toHaveBeenCalledTimes(1);
    expect(writeToFileMock).toHaveBeenCalledWith(armTemplate, outputFilePath);
  });
});
