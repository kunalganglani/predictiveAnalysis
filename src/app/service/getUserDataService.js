function getUserDataService($http, $q) {
  const failCounter = {};
  const myMethods = {
    getPromise() {
      const promise = $http.get('https://employee-attrition-prediction.firebaseio.com/users.json');

      // deferObjects ||
      const deferObject = $q.defer();

      promise.then(
        // OnSuccess function
        (answer) => {
          // This code will only run if we have a successful promise.
          deferObject.resolve(answer);
        },
        // OnFailure function
        (reason) => {
          // This code will only run if we have a failed promise.
          deferObject.reject(reason);
        },
      );

      return deferObject.promise;
    },
    getUserInfo(empId) {
      const promise = $http.get(`https://td-predictions-staging.herokuapp.com/fire-quit-in-6m/2018-06-01/?user_ids=${empId}`);

      // deferObjects ||
      const deferObject = $q.defer();

      promise.then(
        // OnSuccess function
        (answer) => {
          // This code will only run if we have a successful promise.
          deferObject.resolve(answer);
        },
        // OnFailure function
        () => {
          if (Object.prototype.hasOwnProperty.call(failCounter, empId)) {
            failCounter.empId = 0;
          }
          // console.log(reason);
          if (failCounter.empId < 3) {
            this.getUserInfo(empId);
            failCounter.empId += 1;
          }
          // This code will only run if we have a failed promise.
          // deferObject.reject(reason);
        },
      );
      return deferObject.promise;
    },
  };
  return myMethods;
}

export default getUserDataService;
