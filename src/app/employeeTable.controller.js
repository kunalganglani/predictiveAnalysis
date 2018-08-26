export function employeeTableController($mdEditDialog, $q, $scope, $http, $timeout, myService, $mdDialog) {
  'use strict';
  function onInit() {
    getUserData();  
  }
  onInit();
  function getUserData() {
    $scope.success = false,
    $scope.error = false;
    let successHandler = function (response) {
      $scope.tableData = {
        count: response.data.length,
        data: response.data
      };
      $scope.success = true;
    }; 
    let errorHandler = function (reason) {
      $scope.somethingWrong = reason.stausText || "Internal Server Error";
      $scope.error = true;
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Alert')
          .textContent($scope.somethingWrong)
          .ariaLabel('Alert Dialog '+ $scope.somethingWrong)
          .ok('Ok')
      );
    }; 
    let askForPromise = myService.getPromise();
    askForPromise.then(
      successHandler,
      errorHandler
    )
  }
  $scope.data = [20,80];
  $scope.colors = ["rgb(159,204,0)", "rgb(250,109,33)"];
  $scope.labels = ["Fire", "Quit"];
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
        if (input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if (input.$modelValue === 'Bernie Sanders') {
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

    if ($scope.options.largeEditDialog) {
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
  $scope.getEmpLeavingProbab = function (emp) {
    return emp.id;
  }
  $scope.getChartData = function (employee) {
    return [20, 50];
  }
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
}