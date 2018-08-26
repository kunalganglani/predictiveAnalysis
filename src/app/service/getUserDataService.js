export function getUserDataService($http, $q){
    var deferObject,
    myMethods = {

      getPromise: function() {
        var promise       =  $http.get('http://localhost:3000/users'),
              deferObject =  deferObject || $q.defer();

              promise.then(
                // OnSuccess function
                function(answer){
                  // This code will only run if we have a successful promise.
                  deferObject.resolve(answer);
                },
                // OnFailure function
                function(reason){
                  // This code will only run if we have a failed promise.
                  deferObject.reject(reason);
                });

         return deferObject.promise;
        }
     };

     return myMethods;

  }