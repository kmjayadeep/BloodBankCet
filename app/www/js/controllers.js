angular.module('bloodbankcet.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $ionicPopup, $rootScope, $state, $timeout, $localstorage, update, appConfig) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $rootScope.loggedIn = 0;
    if ($localstorage.get('profile') != undefined) {
        $rootScope.loggedIn = 1;
        $rootScope.profileExists = true;
    }

    $scope.login = function() {
        $localstorage.set('profile', undefined);
        $rootScope.loggedIn = 0;
        $state.go('login');
    }

    $scope.logout = function() {
        $localstorage.set('profile', undefined);
        $rootScope.loggedIn = 0;
        $state.go('app.searchresult');
    }

    /*update.checkupdate()
    .success(function(data){
        console.log(data);
        if(appConfig.version<data.code){
            console.log("Update Found, forceUpdate : " +data.forceUpdate);
            if(data.forceUpdate){
            // var alertPopup = $ionicPopup.alert({
            //     title: 'Update Found',
            //     template: 'Please Update your app'
            // });    
            }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Update Found',
                template: 'Please Update your app'
            });
            }
        }else{
            console.log("No Update Found")
        }
    })
    .error(function(err){
        console.log(err);
    });*/

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };


    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $state, $ionicPopup, $ionicPopover, $stateParams, login, $ionicLoading, $localstorage, $rootScope) {
    $scope.login = {};
    $scope.showLogin = false;

    $scope.loginPopover = $ionicPopover.fromTemplateUrl('templates/login/loginform.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.loginPopover = popover;
    });

    if ($localstorage.get('profile') != "undefined")
        $state.go('app.searchresult');

    if ($localstorage.getObject('loginData') != undefined) {
        $scope.login = $localstorage.getObject('loginData');
    }

    $scope.register = function() {
        $state.go('app.register');
    }

    $scope.loginShow = function() {
        $scope.loginPopover.show();
        console.log("Show login Form");
    }

    $scope.loginSubmit = function() {
        $scope.loginPopover.hide();
        if ($scope.login.Remember) {
            $localstorage.set('loginData', JSON.stringify($scope.login));
        }
        $ionicLoading.show();
        var loginData = {
            email: $scope.login.Email,
            password: $scope.login.Password
        }
        login.login(loginData)
            .success(function(data) {
                $ionicLoading.hide();
                if (data.code == 0) {
                    console.log("logging in");
                    console.log(data.message);
                    $localstorage.set('profile', JSON.stringify(data.message));
                    $rootScope.loggedIn = 1;
                    $state.go('app.searchresult');
                } else {
                    console.log(data.message);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'The Email or password entered is wrong'
                    });
                }
            })
            .error(function(err) {
                console.log(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Some error occured'
                });
                $ionicLoading.hide();
            });
    }

    ionic.material.ink.displayEffect();
})

.controller('DashboardCtrl', function($scope, $rootScope, date, $ionicPopover, $ionicLoading, $stateParams, $timeout, search, $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);


    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('RegisterCtrl', function($scope, $state, $ionicPopup, $ionicLoading, $http, $templateCache, $stateParams, $timeout, register) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.donor = {};
    $scope.submit = function() {
        $ionicLoading.show();
        if ($scope.donor.male == "on") {
            $scope.donor.sex = "m"
        } else if ($scope.donor.female == "on") {
            $scope.donor.sex = "f"
        }
        if ($scope.donor.Password != $scope.donor.ConfPassword) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Passwords don\'t match'
            });
        } else {
            var sendData = $scope.donor;

            register.register(sendData)
                .success(function(data) {
                    console.log(data);
                    if (data.code == 0) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: 'You have been successfully registered'
                        });
                        alertPopup.then(function(res) {
                            $state.go('app.searchresult');
                        });
                    } else if (data.code == 3) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failed',
                            template: 'The Email is already in use' + '</br> Error code : ' + data.code
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failed',
                            template: 'Some Error Occured' + '</br> Error code : ' + data.code
                        });
                    }
                }).error(function(err) {
                    console.log(err);
                }).then(function() {
                    $ionicLoading.hide();
                });

        }

    }

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('ProfileCtrl', function($scope, $state,$rootScope, $ionicPopup, $ionicPopover, $ionicLoading, $localstorage, $stateParams, $timeout, register, profile) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.profileExists = true;
    $scope.profile = {};

    $scope.editPopover = $ionicPopover.fromTemplateUrl('templates/profile/editForm.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.editPopover = popover;
    });

    $scope.showEditForm = function() {
        $scope.editPopover.show();
        console.log("Show edit Form");
    }

    if ($localstorage.get('profile') != "undefined") {
        $rootScope.profileExists = true;
        $scope.profile = $localstorage.getObject('profile');
        console.log($scope.profile);
    } else {
        $rootScope.profileExists = false;
        console.log("No profile found");
    }

    $scope.submit = function() {
        $ionicLoading.show();
        if ($scope.profile.male == "on") {
            $scope.profile.sex = "m"
        } else if ($scope.profile.female == "on") {
            $scope.profile.sex = "f"
        }
        if ($scope.profile.Password != $scope.profile.ConfPassword) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Passwords don\'t match'
            });
        } else {
            var sendData = $scope.profile;
            profile.edit(sendData)
                .success(function(data) {
                    console.log(data);
                    if (data.code == 0) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: 'You have edited profile successfully'
                        });
                        alertPopup.then(function(res) {
                            $state.go('app.searchresult');
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failed',
                            template: 'Some Error Occured' + '</br> Error code : ' + data.code + " - " + data.message
                        });
                    }
                }).error(function(err) {
                    console.log(err);
                }).then(function() {
                    $ionicLoading.hide();
                });
        }
    }

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('SearchResultCtrl', function($scope,$rootScope, $ionicPopup, $state, $ionicLoading, $ionicPopover, $rootScope, date, $stateParams, $timeout, $http, search, $window, $localstorage) {
    // Set Header
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.noResult = 1 + 1;
    $scope.search = {};
    $scope.details = {};
    $rootScope.admin=1

    if ($localstorage.get('profile') != undefined) {
        $rootScope.loggedIn = 1;
        $rootScope.profileExists = true;
    }
    console.log($stateParams);
    if ($stateParams.sendData) {
        $ionicLoading.show();
        var sendData = JSON.parse($stateParams.sendData);
        search.view(sendData)
            .success(function(data) {
                console.log(data);
                if (data.code == 0)
                    $scope.result = data.message;
                console.log($scope.result)
            })
            .error(function(err) {
                console.log(err);
            })
            .then(function() {
                $ionicLoading.hide();
                console.log($scope.result.length)
                if (!$scope.result.length)
                    $scope.noResult = 1;
                else
                    $scope.noResult = 0;
            });
    }


    $scope.popover = $ionicPopover.fromTemplateUrl('templates/search/searchform.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.detailsPopover = $ionicPopover.fromTemplateUrl('templates/search/details.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.detailsPopover = popover;
    });

    $scope.$on('popover.hidden', function() {
        console.log("searchform hidden");
    });

    $rootScope.showSearchForm = function() {
        $scope.popover.show();
        console.log("searchform shown");
    }

    $scope.searchSubmit = function() {
        // $ionicLoading.show();
        console.log($scope.search.year);
        if (date.yearOfAdmission($scope.search.year) != null)
            $scope.search.year = date.yearOfAdmission($scope.search.year);
        $scope.popover.hide();
        var sendData = $scope.search;
        sendData = JSON.stringify(sendData);
        console.log(sendData);
        console.log('Search Submitted');
        $state.go('app.searchresult', {
            'sendData': sendData
        })
    }

    $scope.showdetails = function(index) {
        console.log("show details of " + index);
        $scope.details = $scope.result[index];
        console.log($scope.details);
        $scope.details.year = date.yearToWord(date.year($scope.details.year));
        $scope.detailsPopover.show();
    }

    $scope.call = function(number) {
        console.log("calling " + number);
        $window.open('tel:' + number);
    }

    $scope.message = function(number) {
        console.log("messaging " + number);
        $window.open('sms:' + number);
    }

    $scope.email = function(email) {
            console.log("emailing " + email);
            $window.open('mailto:' + email);
        }
        // Set Ink
    ionic.material.ink.displayEffect();
})

;
