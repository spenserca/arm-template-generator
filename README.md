# arm-template-generator

Have you ever looked through a 2,000 line json ARM template to find that one specific resource you're trying to modify?
Instead of having one gigantic ARM template file, this library allows you to create individual resource files (as
javascript or JSON)
and will build them into an ARM template for you.

By keeping your resource configurations individual it is much easier to find existing resources, create new ones and
logically organize resources.

## getting started

To get started, you'll need to create a directory to hold all of your resource files. In this case, we're using
the `resources`
directory in the root of our project.

Then create either a JSON file with your resource's configuration:

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
