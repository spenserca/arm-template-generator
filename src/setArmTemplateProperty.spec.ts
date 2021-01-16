import { setArmTemplateProperty } from './setArmTemplateProperty';
import { Chance } from 'chance';
import { ArmTemplate, ArmTemplateOptions, FilePath } from '../index';
import { wrappedRequire } from './requireWrapper';

const chance = new Chance();

jest.mock('./requireWrapper');

const wrappedRequireMock = wrappedRequire as jest.Mock;

describe('when setting a property with an object option', () => {
  let armTemplate: any;
  let property: string;
  let propertyValue: { [p: string]: string };

  beforeEach(() => {
    property = chance.pickone([
      'metadata',
      'outputs',
      'parameters',
      'variables'
    ]);
    propertyValue = { [chance.string()]: chance.string() };
    let armTemplateOptions = {
      [property]: propertyValue
    } as ArmTemplateOptions;
    armTemplate = {} as ArmTemplate;

    setArmTemplateProperty(armTemplateOptions, armTemplate, property);
  });

  it('adds the property value to the arm template', () => {
    expect(armTemplate[property]).toEqual(propertyValue);
  });
});

describe('when setting a property with a file path', () => {
  let armTemplate: any;
  let property: string;
  let filePath: FilePath;
  let propertyValue: any;

  beforeEach(() => {
    property = chance.pickone([
      'metadata',
      'outputs',
      'parameters',
      'variables'
    ]);
    filePath = chance.string();
    let armTemplateOptions = {
      [property]: filePath
    } as ArmTemplateOptions;
    armTemplate = {} as ArmTemplate;

    propertyValue = {
      [chance.string()]: chance.string()
    };

    wrappedRequireMock.mockReturnValue(propertyValue);

    setArmTemplateProperty(armTemplateOptions, armTemplate, property);
  });

  it('gets the value from the given file path', () => {
    expect(wrappedRequireMock).toHaveBeenCalledTimes(1);
    expect(wrappedRequireMock).toHaveBeenCalledWith(filePath);
  });

  it('adds the property value to the arm template', () => {
    expect(armTemplate[property]).toEqual(propertyValue);
  });
});

describe('when not passing property to the arm template', () => {
  let armTemplate: any;
  let property: string;

  beforeEach(() => {
    property = chance.pickone([
      'metadata',
      'outputs',
      'parameters',
      'variables'
    ]);
    const options = {
      resourcesDir: chance.string()
    };

    armTemplate = {} as ArmTemplate;

    setArmTemplateProperty(options, armTemplate, property);
  });

  it('does not have a variables property', () => {
    expect(armTemplate[property]).toBeUndefined();
  });
});
