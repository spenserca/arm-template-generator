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

type ValueType =
  | string
  | number
  | boolean
  | object
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

interface ArmTemplateVariables {
  [key: string]: ValueType;
}

export interface ArmTemplateOptions {
  outputs?: any;
  parameters?: ArmTemplateParameters;
  resourcesToExclude?: string[];
  resourcesDir: string;
  variables?: ArmTemplateVariables;
}

interface ArmTemplateTags {}

interface Sku {}

interface ArmTemplateResource {
  condition?: string;
  type: string;
  apiVersion: string;
  name: string;
  location?: string;
  dependsOn?: string[];
  tags?: ArmTemplateTags; // TODO: create tags interface
  sku?: Sku;
  kind?: string;
  plan?: any;
  properties?: any;
  resources?: ArmTemplateResource[];
}

export const createArmTemplate = (armTemplateOptions: ArmTemplateOptions) => {
  return {
    $schema:
      'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0',
    parameters: armTemplateOptions.parameters || {},
    variables: [],
    resources: [],
    outputs: {}
  };
};
