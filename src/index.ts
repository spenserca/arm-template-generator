import { getResources } from './getResources';
import {
  ArmTemplate,
  ArmTemplateGenerator,
  ArmTemplateOptions
} from '../index';
import { writeToFile } from './writeToFile';

const setArmTemplateParameters = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate
) => {
  if (armTemplateOptions.parameters) {
    armTemplate.parameters = armTemplateOptions.parameters;
  }
};

const setArmTemplateVariables = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate
) => {
  if (armTemplateOptions.variables) {
    armTemplate.variables = armTemplateOptions.variables;
  }
};

const setArmTemplateMetadata = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate
) => {
  if (armTemplateOptions.metadata) {
    armTemplate.metadata = armTemplateOptions.metadata;
  }
};

const setArmTemplateOutputs = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate
) => {
  if (armTemplateOptions.outputs) {
    armTemplate.outputs = armTemplateOptions.outputs;
  }
};

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

  setArmTemplateMetadata(armTemplateOptions, armTemplate);
  setArmTemplateParameters(armTemplateOptions, armTemplate);
  setArmTemplateVariables(armTemplateOptions, armTemplate);
  setArmTemplateResources(armTemplateOptions, armTemplate);
  setArmTemplateOutputs(armTemplateOptions, armTemplate);

  return {
    armTemplate,
    toJSON: () => armTemplate,
    writeToFile: (outputFilePath: string) =>
      writeToFile(armTemplate, outputFilePath)
  };
};
