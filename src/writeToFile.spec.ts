import { writeToFile } from './writeToFile';
import { Chance } from 'chance';
import { ArmTemplate } from '../index';
import { writeFileSync } from 'fs';

const chance = new Chance();

jest.mock('fs');

const writeFileSyncMock = writeFileSync as jest.Mock;

let actual: any;
let armTemplate: ArmTemplate;
let outputFilePath: string;

beforeEach(() => {
  armTemplate = {} as ArmTemplate;
  outputFilePath = chance.string();

  actual = writeToFile(armTemplate, outputFilePath);
});

it('writes the ARM template data to the output file location', () => {
  const data = JSON.stringify(armTemplate, null, 2);

  expect(writeFileSyncMock).toHaveBeenCalledTimes(1);
  expect(writeFileSyncMock).toHaveBeenCalledWith(outputFilePath, data, 'utf8');
});
