import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($scope, $http) {
    this.url = 'https://github.com/preboot/angular-webpack';
    $scope.user = {
      duration: '6 Months',
      myDate: new Date()
    }
    $scope.selected = [];
    $http.get("http://localhost:3000/users").then(function (response) {
      $scope.tableData = {
        count: response.data.length,
        data: response.data
      };
    });
    $scope.query = {
      _limit: 5,
      _page: 1
    };

    $scope.getDesserts = function () {
      $http.get("http://localhost:3000/users").then(function (response) {
        $scope.tableData = {
          count: response.data.length,
          data: response.data
        };
      });
    };
  }
}
const MODULE_NAME = 'app';
angular.module(MODULE_NAME, [
  'ngMaterial', 'ngRoute', 'md.data.table'
])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;