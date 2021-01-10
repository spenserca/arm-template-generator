import { ArmTemplateResource, getResources } from './getResources';

export type ParameterType =
  | 'string'
  | 'secureString'
  | 'int'
  | 'bool'
  | 'object'
  | 'secureObject'
  | 'array';

interface ParameterMetadata {
  description: string;
}

export interface ArmTemplateMetadata {
  [key: string]: any;
}

type ValueType =
  | string
  | number
  | boolean
  | { [key: string]: any }
  | Array<string>
  | Array<number>
  | Array<boolean>
  | Array<object>;

export interface ArmTemplateParameters {
  [key: string]: {
    type: ParameterType;
    defaultValue?: ValueType;
    allowedValues?: ValueType[];
    minValue?: number;
    maxValue?: number;
    minLength?: number;
    maxLength?: number;
    metadata?: ParameterMetadata;
  };
}

export interface ArmTemplateVariables {
  [key: string]: ValueType;
}

export interface ArmTemplateOutputs {
  [outputName: string]: {
    condition?: string;
    type: ParameterType;
    value?: string;
    copy?: {
      count: string;
      input: string;
    };
  };
}

export interface ArmTemplateOptions {
  metadata?: ArmTemplateMetadata;
  outputs?: ArmTemplateOutputs;
  parameters?: ArmTemplateParameters;
  resourcesToExclude?: string[];
  resourcesDir: string;
  variables?: ArmTemplateVariables;
}

interface ArmTemplate {
  $schema: string;
  contentVersion: string;
  metadata?: ArmTemplateMetadata;
  parameters?: ArmTemplateParameters;
  variables?: ArmTemplateVariables;
  resources?: ArmTemplateResource[];
  outputs?: ArmTemplateOutputs;
}

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
