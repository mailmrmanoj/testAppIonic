// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller('AppCtrl', function ($scope, $ionicPopup, $ionicLoading) {

    $scope.recognizedText = '';
    $scope.record = function () {
      $ionicLoading.show({
        templateUrl: "templates/loading.html",
        animation: 'fade-in'
      });
      //  $ionicLoading.show({
      //   template: 'Speak after you hear the beep...'
      // }).then(function () {
      //   console.log("The loading indicator is now displayed");
      // });
      var recognition = new SpeechRecognition();
      recognition.lang = 'es-GB';
      recognition.onresult = function (event) {
        if (event.results.length > 0) {
          $scope.recognizedText = event.results[0][0].transcript;
          $scope.$apply()
          showAlert(event.results[0][0].transcript);
        }
      };
      recognition.start();
    };
    // An alert dialog
    function showAlert(text) {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });

      var alertPopup = $ionicPopup.alert({
        title: 'Hey there!',
        template: 'You just said ' + '<span class="boldText">' + '"' + text + '"' + '</span>' + '!!',
        noBackdrop: true
      });
      alertPopup.then(function (res) {
        console.log('Thank you');
      });
    };
  });