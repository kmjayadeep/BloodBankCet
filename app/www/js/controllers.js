angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
