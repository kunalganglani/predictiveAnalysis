import angular from 'angular';
require('angular-chart.js');
import { AppCtrl } from './app.controller';
import { getUserDataService } from './service/getUserDataService';
import { employeeTableController } from './employeeTable.controller';
import '../style/app.css';
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};
const appModule = 'app';
angular.module(appModule, [
  'ngMaterial', 'ngRoute', 'md.data.table','chart.js'
]).directive('app', app)
  .service('myService', ['$http', '$q', getUserDataService])
  .component('navToolbar', { template: require('./navToolbar/navToolbar.html') })
  .controller('AppCtrl', AppCtrl)
  .controller('employeeTableController', ['$mdEditDialog', '$q', '$scope', '$http', '$timeout', 'myService', '$mdDialog', employeeTableController])
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }]);
export default appModule;