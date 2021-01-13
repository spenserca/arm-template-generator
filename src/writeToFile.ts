import { writeFileSync } from 'fs';
import { ArmTemplate } from '../index';

export const writeToFile = (
  armTemplate: ArmTemplate,
  outputFilePath: string
): void => {
  writeFileSync(outputFilePath, JSON.stringify(armTemplate, null, 2), 'utf8');
};
