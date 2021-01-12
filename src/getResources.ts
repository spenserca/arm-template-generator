import { Dirent, readdirSync } from 'fs';
import { wrappedRequire } from './requireWrapper';
import { ArmTemplateResource } from '../index';

const isResourceFile = (dirent: Dirent) =>
  dirent.isFile() &&
  (dirent.name.endsWith('.js') || dirent.name.endsWith('.json'));

export const getResources = (
  resourcesDir: string,
  resourcesToExclude: string[]
): ArmTemplateResource[] => {
  return readdirSync(resourcesDir, { withFileTypes: true })
    .filter(
      dirent =>
        isResourceFile(dirent) && !resourcesToExclude.includes(dirent.name)
    )
    .map(dirent => wrappedRequire(`${resourcesDir}/${dirent.name}`));
};
