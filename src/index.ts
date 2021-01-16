import { getResources } from './getResources';
import {
  ArmTemplate,
  ArmTemplateGenerator,
  ArmTemplateOptions
} from '../index';
import { writeToFile } from './writeToFile';
import { setArmTemplateProperty } from './setArmTemplateProperty';

const setArmTemplateResources = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate
) => {
  armTemplate.resources = getResources(
    armTemplateOptions.resourcesDir,
    armTemplateOptions.resourcesToExclude || []
  );
};

export const generateArmTemplate = (
  armTemplateOptions: ArmTemplateOptions
): ArmTemplateGenerator => {
  const armTemplate: ArmTemplate = {
    $schema:
      'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0'
  };

  setArmTemplateProperty(armTemplateOptions, armTemplate, 'metadata');
  setArmTemplateProperty(armTemplateOptions, armTemplate, 'parameters');
  setArmTemplateProperty(armTemplateOptions, armTemplate, 'variables');
  setArmTemplateResources(armTemplateOptions, armTemplate);
  setArmTemplateProperty(armTemplateOptions, armTemplate, 'outputs');

  return {
    armTemplate,
    toJSON: () => armTemplate,
    writeToFile: (outputFilePath: string) =>
      writeToFile(armTemplate, outputFilePath)
  };
};
