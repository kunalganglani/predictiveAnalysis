export default class AppCtrl {
  constructor($scope) {
    this.url = 'https://github.com/preboot/angular-webpack';
    $scope.fireKey = 'final_fired_prob_6m';
    $scope.quitKey = 'final_quit_prob_6m';
    $scope.user = {
      duration: 'raw_score_stay_left_6m',
      myDate: new Date(),
    };
    $scope.switchDuration = function switchDuration() {
      const monthKey = $scope.user.duration;
      if (monthKey === 'raw_score_stay_left_6m') {
        $scope.fireKey = 'final_fired_prob_6m';
        $scope.quitKey = 'final_quit_prob_6m';
      }
      if (monthKey === 'raw_score_stay_left_1m') {
        $scope.fireKey = 'final_fired_prob_1m';
        $scope.quitKey = 'final_quit_prob_1m';
      }
    };
  }
}
