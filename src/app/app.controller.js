export class AppCtrl {
    constructor($scope, $http) {
      this.url = 'https://github.com/preboot/angular-webpack';
      $scope.user = {
        duration: '6 Months',
        myDate: new Date()
      }

      // Table 
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
      $scope.query = {
        _limit: 5,
        _page: 1
      };
    }
  }