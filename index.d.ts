// Type definitions for arm-template-generator v1.0.0

type ParameterType =
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

interface ArmTemplateMetadata {
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

interface ArmTemplateParameters {
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

interface ArmTemplateOutputs {
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

interface ArmTemplateOptions {
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

interface ArmTemplateTags {
  [key: string]: string;
}

interface Sku {}

interface ArmTemplateResource {
  condition?: string;
  type: string;
  apiVersion: string;
  name: string;
  location?: string;
  dependsOn?: string[];
  tags?: ArmTemplateTags;
  sku?: Sku;
  kind?: string;
  plan?: any;
  properties?: any;
  resources?: ArmTemplateResource[];
}
