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

export const createArmTemplate = (
  armTemplateOptions: ArmTemplateOptions
): ArmTemplate => {
  const armTemplate: ArmTemplate = {
    $schema:
      'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0'
  };

  if (armTemplateOptions.parameters) {
    armTemplate.parameters = armTemplateOptions.parameters;
  }
  if (armTemplateOptions.variables) {
    armTemplate.variables = armTemplateOptions.variables;
  }
  if (armTemplateOptions.metadata) {
    armTemplate.metadata = armTemplateOptions.metadata;
  }
  if (armTemplateOptions.outputs) {
    armTemplate.outputs = armTemplateOptions.outputs;
  }
  armTemplate.resources = getResources(
    armTemplateOptions.resourcesDir,
    armTemplateOptions.resourcesToExclude || []
  );

  return armTemplate;
};
