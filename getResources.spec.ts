import { getResources } from './getResources';
import { Chance } from 'chance';
import { Dirent, readdirSync } from 'fs';
import { wrappedRequire } from './requireWrapper';
import { when } from 'jest-when';

const chance = new Chance();

jest.mock('fs');
jest.mock('./requireWrapper');

const readdirSyncMock = readdirSync as jest.Mock;
const wrappedRequireMock = wrappedRequire as jest.Mock;

let actual: any;
let resourcesDir: string;
let resourceFilePaths: string[];
let expectedResources: any[];

const getRandomDirent = (isFile: boolean): Dirent =>
  ({
    name:
      chance.string() + isFile
        ? chance.pickone(['.js', '.json'])
        : `.${chance.string()}`,
    isFile: () => isFile
  } as Dirent);

beforeEach(() => {
  jest.resetModules();

  const resourcesToExclude = chance.n(chance.string, chance.d10());
  const excludedDirents = resourcesToExclude.map((filename) => {
    const dirent = getRandomDirent(true);
    dirent.name = filename;

    return dirent;
  });
  const nonFileDirents = chance.n(() => getRandomDirent(false), chance.d10());
  const resourceFileDirents = chance.n(
    () => getRandomDirent(true),
    chance.d10()
  );
  resourcesDir = chance.string();

  resourceFilePaths = resourceFileDirents.map(
    (dirent) => `${__dirname}/${resourcesDir}/${dirent.name}`
  );

  expectedResources = resourceFilePaths.map((path) => {
    const resource = { [chance.string()]: chance.string() };

    when(wrappedRequireMock).calledWith(path).mockReturnValueOnce(resource);

    return resource;
  });

  readdirSyncMock.mockReturnValue([
    ...excludedDirents,
    ...nonFileDirents,
    ...resourceFileDirents
  ]);

  actual = getResources(resourcesDir, resourcesToExclude);
});

it('gets the resource files', () => {
  expect(readdirSyncMock).toHaveBeenCalledTimes(1);
  expect(readdirSyncMock).toHaveBeenCalledWith(resourcesDir, {
    withFileTypes: true
  });
});

it('requires the non-excluded resource files', () => {
  expect(wrappedRequireMock).toHaveBeenCalledTimes(resourceFilePaths.length);
  resourceFilePaths.forEach((filePath) => {
    expect(wrappedRequireMock).toHaveBeenCalledWith(filePath);
  });
});

it('returns the non-excluded resource files', () => {
  expect(actual).toEqual(expectedResources);
});
