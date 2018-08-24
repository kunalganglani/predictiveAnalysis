import angular from 'angular';
import { AppCtrl } from './app.controller';
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
  'ngMaterial', 'ngRoute', 'md.data.table'
]).directive('app', app)
  .component('navToolbar', { template: require('./navToolbar/navToolbar.html') })
  .controller('AppCtrl', AppCtrl)
  .controller('employeeTableController', ['$mdEditDialog', '$q', '$scope', '$http', '$timeout', employeeTableController])
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }]);
export default appModule;