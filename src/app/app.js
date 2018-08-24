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
const appModule = 'app';
angular.module(appModule, [
  'ngMaterial', 'ngRoute', 'md.data.table'
]).config(['$mdThemingProvider', function ($mdThemingProvider) {
  'use strict';
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
}])
  .directive('app', app)
  .component('navToolbar', {
    template: require('./navToolbar/navToolbar.html')
  })
  .controller('AppCtrl', AppCtrl)

  .controller('employeeTableController', ['$mdEditDialog', '$q', '$scope', '$http', '$timeout', function ($mdEditDialog, $q, $scope,$http, $timeout) {
    'use strict';
    $http.get("http://localhost:3000/users").then(function (response) {
      $scope.tableData = {
        count: response.data.length,
        data: response.data
      };
      var idArr = $scope.tableData.data.map(item => item.id);
      getMoreDetails(idArr);
    });
    function getMoreDetails(idArr) {
      var firstFive = idArr.splice(0,5);
      $http.get(`https://td-predictions-staging.herokuapp.com/fire-quit-in-6m/2018-06-01/?user_ids=${firstFive.join()}`).then(
          function(response){
            console.log(response);
          }
        )
    }
    
    
    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];
    
    $scope.options = {
      rowSelection: false,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: true,
      limitSelect: true,
      pageSelect: true
    };
    
    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    
    $scope.editComment = function (event, employee) {
      event.stopPropagation(); // in case autoselect is enabled
      
      var editDialog = {
        modelValue: employee.comment,
        placeholder: 'Add a comment',
        save: function (input) {
          if(input.$modelValue === 'Donald Trump') {
            input.$invalid = true;
            return $q.reject();
          }
          if(input.$modelValue === 'Bernie Sanders') {
            return employee.comment = 'FEEL THE BERN!'
          }
          employee.comment = input.$modelValue;
        },
        targetEvent: event,
        title: 'Add a comment',
        validators: {
          'md-maxlength': 30
        }
      };
      
      var promise;
      
      if($scope.options.largeEditDialog) {
        promise = $mdEditDialog.large(editDialog);
      } else {
        promise = $mdEditDialog.small(editDialog);
      }
      
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };
    
    $scope.toggleLimitOptions = function () {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
    
    $scope.getTypes = function () {
      return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };
    
    $scope.loadStuff = function () {
      $scope.promise = $timeout(function () {
        // loading
      }, 2000);
    }
  }]);
export default appModule;