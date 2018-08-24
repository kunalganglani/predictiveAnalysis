import angular from 'angular';
import { AppCtrl } from './app.controller';
import '../style/app.css';
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};
const MODULE_NAME = 'app';
angular.module(MODULE_NAME, [
  'ngMaterial', 'ngRoute', 'md.data.table'
])
  .directive('app', app)
  .component('navToolbar', {
    template: require('./navToolbar/navToolbar.html')
  })
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;