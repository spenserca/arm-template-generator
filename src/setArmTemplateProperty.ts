import { ArmTemplate, ArmTemplateOptions } from '../index';
import { wrappedRequire } from './requireWrapper';

export const setArmTemplateProperty = (
  armTemplateOptions: ArmTemplateOptions,
  armTemplate: ArmTemplate,
  property: keyof ArmTemplate
): void => {
  if (armTemplateOptions[property]) {
    if (typeof armTemplateOptions[property] === 'string') {
      armTemplate[property] = wrappedRequire(armTemplateOptions[property]);
    } else {
      armTemplate[property] = armTemplateOptions[property];
    }
  }
};
