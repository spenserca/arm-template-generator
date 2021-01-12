// Type definitions for arm-template-generator v1.0.0

export type ParameterType =
  | 'string'
  | 'secureString'
  | 'int'
  | 'bool'
  | 'object'
  | 'secureObject'
  | 'array';

export interface ParameterMetadata {
  description: string;
}

export interface ArmTemplateMetadata {
  [key: string]: any;
}

export type ValueType =
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

export interface ArmTemplate {
  $schema: string;
  contentVersion: string;
  metadata?: ArmTemplateMetadata;
  parameters?: ArmTemplateParameters;
  variables?: ArmTemplateVariables;
  resources?: ArmTemplateResource[];
  outputs?: ArmTemplateOutputs;
}

export interface ArmTemplateTags {
  [key: string]: string;
}

export interface Sku {}

export interface ArmTemplateResource {
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

export declare const generateArmTemplate: (
  armTemplateOptions: ArmTemplateOptions
) => ArmTemplate;
