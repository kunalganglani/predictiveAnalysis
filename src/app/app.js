import angular from 'angular';
import appHTML from './app.html';
import navToolBarHTML from './navToolbar/navToolbar.html';
import AppCtrl from './app.controller';
import getUserDataService from './service/getUserDataService';
import employeeTableController from './employeeTable.controller';
import '../style/app.css';

require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-route');
require('angular-material');
require('angular-material-data-table');
require('angular-chart.js');
require('angular-localforage');
require('offline-js');
require('offline-js/themes/offline-language-english.css');
require('offline-js/themes/offline-theme-slide.css');

const app = () => ({
  template: appHTML,
  controller: 'AppCtrl',
  controllerAs: 'app',
});
const appModule = 'app';
angular.module(appModule, [
  'ngMaterial', 'ngRoute', 'md.data.table', 'chart.js', 'LocalForageModule',
]).directive('app', app)
  .service('myService', ['$http', '$q', getUserDataService])
  .component('navToolbar', { template: navToolBarHTML })
  .controller('AppCtrl', ['$scope', AppCtrl])
  .controller('employeeTableController', ['$mdEditDialog', '$q', '$scope', '$timeout', 'myService', '$mdDialog', '$localForage', employeeTableController])
  .config(['$mdThemingProvider', function themeProviderFn($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }]);
export default appModule;
