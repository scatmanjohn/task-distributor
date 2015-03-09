'use strict';

/* Directives */

angular.module('TaskDistributorApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
