function employeeTableController($mdEditDialog, $q, $scope,
  $http, $timeout, myService, $mdDialog, $localForage) {
  function getUserStatistics(employeeId) {
    const employee = $scope.tableData.data.filter(item => item.id === employeeId)[0];
    if (!employee.info) {
      employee.success = false,
      employee.error = false;
      const successHandler = function userStatSuccessHandler(response) {
        employee.info = response.data[employee.id];
        employee.success = true;
        $localForage.setItem(`infoFor${employee.id}`, employee.info);
      };
      const errorHandler = function userStatErrorHandler(reason) {
        employee.somethingWrong = reason.stausText || 'Internal Server Error';
        employee.error = true;
      };
      const askForPromise = myService.getUserInfo(employeeId);
      askForPromise.then(
        successHandler,
        errorHandler,
      );
    }
  }

  function getMoreInfo() {
    const empArr = $scope.tableData.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    empArr.map((item) => {
      $localForage.getItem(`infoFor${item.id}`).then((value) => {
        if (value === null) {
          getUserStatistics(item.id);
        } else {
          item.info = value;
          item.success = true;
        }
      });
    });
  }

  function getUserData() {
    $scope.success = false,
      $scope.error = false;
    const successHandler = function successHandler(response) {
      $scope.tableData = {
        count: response.data.length,
        data: response.data,
      };
      $localForage.setItem('allUserNameAndId', $scope.tableData);
      $scope.success = true;
      getMoreInfo();
    };
    const errorHandler = function errorHandler(reason) {
      $scope.somethingWrong = reason.stausText || 'Internal Server Error';
      $scope.error = true;
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Alert')
          .textContent($scope.somethingWrong)
          .ariaLabel(`Alert Dialog ${$scope.somethingWrong}`)
          .ok('Ok'),
      );
    };
    const askForPromise = myService.getPromise();
    askForPromise.then(
      successHandler,
      errorHandler,
    );
  }

  function onInit() {
    $localForage.getItem('allUserNameAndId').then((value) => {
      if (value === null) {
        getUserData();
      } else {
        $scope.tableData = (value);
        $scope.success = true;
        getMoreInfo();
      }
    });
  }
  onInit();
  $scope.data = [20, 80];
  $scope.colors = ['rgb(159,204,0)', 'rgb(250,109,33)'];
  $scope.labels = ['Fire', 'Quit'];
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
    pageSelect: true,
  };
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1,
  };
  $scope.editComment = function editComment(event, employee) {
    event.stopPropagation(); // in case autoselect is enabled
    const editDialog = {
      modelValue: employee.comment,
      placeholder: 'Add a comment',
      save(input) {
        if (input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if (input.$modelValue === 'Bernie Sanders') {
          employee.comment = 'FEEL THE BERN!';
          return employee.comment;
        }
        employee.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30,
      },
    };
    let promise;
    if ($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }

    promise.then((ctrl) => {
      const input = ctrl.getInput();

      input.$viewChangeListeners.push(() => {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };

  $scope.toggleLimitOptions = function toggleLimitOptions() {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  $scope.loadStuff = function loadStuff() {
    $scope.promise = $timeout(() => {
      // loading
    }, 2000);
  };
}

export default employeeTableController;
