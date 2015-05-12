angular.module('bloodbankcet.factories', [])

.factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

.factory('register', function($http, appConfig) {
    return {
        register: function(sendData) {
            console.log(sendData);

            return $http({
                method: 'POST',
                url: appConfig.serverUrl + '/register/', 
                data : sendData,
                'Content-Type': 'application/x-www-form-urlencoded ' 
            });

           // return $http.post(appConfig.serverUrl + '/register', sendData);
        }
        // getDashboardData: function() {
        //     return $http.get('config/test-dashboard.json'); //
        // }
    }

})
