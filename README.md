# arm-template-generator

Have you ever looked through a 2,000 line json ARM template to find that one specific resource you're trying to modify?
Instead of having one gigantic ARM template file, this library allows you to create individual resource files (as
javascript or JSON)
and will build them into an ARM template for you.

By keeping your resource configurations individual it is much easier to find existing resources, create new ones and
logically organize resources.

## getting started

**You can look at the [e2e tests](https://github.com/spenserca/arm-template-generator/blob/main/test/e2e.spec.ts) to see
an example of how to use this library.**

Install the package with `npm i -D @spenserca/arm-template-generator`.

Then create a directory to hold all of your resource files. In this case, we're using
the `resources`
directory in the root of our project.

Next create either a JSON file with your resource's configuration:

```json
{
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2019-06-01",
  "location": "[resourceGroup().location]",
  "name": "mystorageaccount",
  "kind": "StorageV2"
}
```

or a javascript file that exports the resource's configuration:

```javascript
module.exports = {
  type: 'Microsoft.Storage/storageAccounts',
  apiVersion: '2019-06-01',
  location: '[resourceGroup().location]',
  name: 'mystorageaccount',
  kind: 'StorageV2'
};
```

Once you have your resource file(s) created you can generate your ARM template like this:

```javascript
const { generateArmTemplate } = require('@spenserca/arm-template-generator');

const armTemplateGenerator = generateArmTemplate({
  resourcesDir: `${__dirname}/resources`
});
```

## generateArmTemplate

`generateArmTemplate` returns a JSON object with your ARM template resources' configurations, and some helper methods
for logging and writing your ARM template to a file. It has the following properties:

- armTemplate: the raw ARM template as a JSON object
- toJSON: a convenience function that will include only the ARM template in a JSON.stringify call
- writeToFile: a convenience function that will write your ARM template out to the specified file path

## writing your ARM template to a file

There are a few different ways to write your ARM template out to a file. The easiest way would be to use
the `writeToFile`
function like so:

```javascript
const { generateArmTemplate } = require('@spenserca/arm-template-generator');

const armTemplateGenerator = generateArmTemplate({
  resourcesDir: `${__dirname}/resources`
}).writeToFile(`${__dirname}/arm-template.json`);
```

## options

These are the options that can be passed when generating an ARM template, what they do,
and how to use them.

- [metadata (optional)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-syntax#metadata):
  - This can be used to set metadata of the ARM template
  - It can be an object that adheres to the structure of ARM template metadata, or a string which is a file path to a javascript file which exports a metadata object, or a JSON file that is the metadata object
- [outputs (optional)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-syntax#outputs):
  - This can be used to set outputs of the ARM template
  - It can be an object that adheres to the structure of ARM template outputs, or a string which is a file path to a javascript file which exports an output object, or a JSON file that is the output object
- [parameters (optional)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-syntax#parameters):
  - This can be used to set parameters of the ARM template
  - It can be an object that adheres to the structure of ARM template parameters, or a string which is a file path to a javascript file which exports a parameters object, or a JSON file that is the parameters object
- resourcesToExclude (optional):
  - This is used to exclude specific resource files from being added to the ARM template
  - It should be an array of file names to exclude
- resourcesDir (required):
  - This is used to import the independent resource files
  - It should be the string path to the directory that holds the resource files
- [variables (optional)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-syntax#variables):
  - This can be used to set variables of the ARM template
  - It can be an object that adheres to the structure of ARM template variables, or a string which is a file path to a javascript file which exports a variables object, or a JSON file that is the variables object
