import { getResources } from './getResources';
import { ArmTemplate, ArmTemplateOptions } from '../index';

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
): ArmTemplate => {
  const armTemplate: ArmTemplate = {
    $schema:
      'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0'
  };

  setArmTemplateParameters(armTemplateOptions, armTemplate);
  setArmTemplateVariables(armTemplateOptions, armTemplate);
  setArmTemplateMetadata(armTemplateOptions, armTemplate);
  setArmTemplateOutputs(armTemplateOptions, armTemplate);
  setArmTemplateResources(armTemplateOptions, armTemplate);

  return armTemplate;
};
