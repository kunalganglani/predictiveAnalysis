export class AppCtrl {
  constructor($scope, $http) {
    this.url = 'https://github.com/preboot/angular-webpack';
    $scope.user = {
      duration: '6 Months',
      myDate: new Date()
    }
  }
}