'use strict';

/* Directives */

angular.module('TaskDistributorApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });



angular.module('TaskDistributorApp').directive('ngConfirmIt', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.addClass("btn btn-warning");
            
            function clear(elment, attrs){               
                attrs.ngConfirmStatus = "";
                element.html(attrs.ngConfirmOriginalText);
                element.removeClass("btn-danger").addClass("btn-warning");
            }
            
            element.bind('click', function() {
                
                // Execute
                if(attrs.ngConfirmStatus && attrs.ngConfirmStatus=="rdy")
                { 
                    scope.$apply(attrs.ngConfirmIt);
                    clear(element, attrs);   
                    attrs.ngConfirmIt = "done";
                }
                
                // Are you sure ?
                else if(!attrs.ngConfirmStatus || attrs.ngConfirmStatus=="")
                {
                    var message = attrs.ngReallyMessage ? attrs.ngReallyMessage : "Continue?";
                    attrs.ngConfirmOriginalText = element.html();
                    element.html(message)
                    attrs.ngConfirmStatus = "rdy";
                    element.removeClass("btn-warning").addClass("btn-danger");
                }
                
                // Hu ?
                else
                {
                    clear(element, attrs);
                    attrs.ngConfirmStatus= "";
                }
            });
            
            element.bind('blur', function() { clear(element, attrs);   });

        }
    }

}]);