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

export const createArmTemplate = (armTemplateOptions: ArmTemplateOptions) => {
  return {
    $schema:
      'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0',
    metadata: armTemplateOptions.metadata || {},
    parameters: armTemplateOptions.parameters || {},
    variables: armTemplateOptions.variables || {},
    resources: [],
    outputs: armTemplateOptions.outputs || {}
  };
};
