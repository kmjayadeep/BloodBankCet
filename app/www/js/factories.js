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

.factory('date', function(){
    return {
        yearOfAdmission: function(year){
            var changeOver = 6;
            if(year==null)
                return null;
            var today = new Date();
            var curYear = today.getYear()+1900;
            console.log(curYear);
            console.log(year);
            var month = today.getMonth();
            if(month <= changeOver){
                return curYear-year;
            }
            else{
                return curYear-year+1;
            }
        },
        year: function(yearOfAdmission){
            var changeOver = 6;
            if(yearOfAdmission==null)
                return null;
            var today = new Date();
            var curYear = today.getYear()+1900;
            console.log(curYear);
            console.log(yearOfAdmission);
            var month = today.getMonth();
            if(month <= changeOver){
                return curYear-yearOfAdmission;
            }
            else{
                return curYear-yearOfAdmission+1;
            }
        },
        yearToWord: function(year){
            if(year==1)
                return "First Year";
            else if(year==2)
                return "Second Year";
            else if(year==3)
                return "Third Year";
            else if(year==4)
                return "Fourth Year";
        }
    }
})

.factory('register', function($http, appConfig) {
    return {
        register: function(sendData) {
            return $http({
                method: 'POST',
                url: appConfig.serverUrl + '/register/',
                data: sendData,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }
    }
})

.factory('profile', function($http, appConfig) {
    return {
        edit: function(sendData) {
            console.log(sendData);
            return $http({
                method: 'POST',
                url: appConfig.serverUrl + '/profile/edit/',
                data: sendData,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }
    }
})

.factory('search', function($http, appConfig) {
    return {
        view: function(sendData) {
            return $http({
                method: 'POST',
                url: appConfig.serverUrl + '/view',
                data: sendData,
                'Content-Type': 'application/json'
            }); 
        }
    }
})

.factory('login', function($http, appConfig){
    return{
        login: function(sendData) {
            return $http({
                method: 'POST',
                url: appConfig.serverUrl + '/login',
                data: sendData,
                'Content-Type': 'application/json'
            });
        }
    }
})

.factory('update', function($http, appConfig) {
    return {
        checkupdate: function() {
            return $http.get(appConfig.serverUrl + '/version');
        }
    }
})

.factory('settings', function(){
    return{
        changeServer: function(URL) {
            return true;
        }
    }
})