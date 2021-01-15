module.exports = {
  type: 'Microsoft.Storage/storageAccounts',
  apiVersion: '2019-06-01',
  location: '[resourceGroup().location]',
  name: 'atgsajs',
  kind: 'StorageV2'
};
