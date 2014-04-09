'use strict';

var app = angular.module('extendTvApp');
  app.controller('MainCtrl', function ($scope, $http, loadWidgets) {
    var widgetsData = loadWidgets.getData();
    widgetsData.then(function(result){
       $scope.widgets = result;
    });


      $scope.series = [{"name":"VCR","color":"#e5e6e7","type":"column","yAxis":1,
          "data": [78,45],"tooltip":{"valueSuffix":" mm"}},
          {"name":"Impressions","color":"#097ca0","type":"spline",
              "data":[70000,69000,95000,14500,18200,21500,25200,36500,23300,18300,63900,96000]
              }];

      $scope.chartConfig = angular.fromJson({
          "chart":{"zoomType":"xy"},"title": {"text": ""},
          "xAxis":[{"categories": [1,2]}],"yAxis":[{"title":{"text":"Impressions"}},{"title":{"text":"VCR","style":{"color":"#DE7C34"}},"labels":{"format":"{value}%","style":{"color":"#DE7C34"}},"opposite":true}],"tooltip":{"shared":true},"legend":{"layout":"vertical","align":"left","x":120,"verticalAlign":"top","y":100,"floating":true,"backgroundColor":"#FFFFFF"},
          "series":$scope.series} );
  });

app.factory('loadWidgets', function($http, $q){
   var getData = function(){
       var deferred = $q.defer();

       $http({method:"GET", url:"/widgets"}).success(function(result){
          deferred.resolve(result);
       });

       return deferred.promise;
   };

    return { getData: getData};
});

app.directive('iconSvg', function(){
    return {
        restrict: "EA",
        scope: {},
        templateUrl: '/styles/icon-sprites.svg',
        link: function(scope, element, attrs) {
            scope.icon_name = attrs.name || attrs.iconSvg;
            scope.icon_name = scope.icon_name.toLowerCase();
            scope.color = attrs.color || "#de7c34";
        }
    }
});

app.filter('appendIconAndHash', function() {
   return function(input) {
       return '#icon-'+ input;
   }
});




