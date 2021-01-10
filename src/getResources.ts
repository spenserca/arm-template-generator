import { Dirent, readdirSync } from 'fs';
import { wrappedRequire } from './requireWrapper';

interface ArmTemplateTags {
  [key: string]: string;
}

interface Sku {}

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
    .map(dirent =>
      wrappedRequire(`${__dirname}/${resourcesDir}/${dirent.name}`)
    );
};
