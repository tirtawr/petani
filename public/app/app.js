//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app = angular.module('FjbHasilTani', [
  'ngRoute',
  'mobile-angular-ui',
  'ui.router',
  'ngCookies',
  'ngFileUpload',
  'angular-cloudinary',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function (cloudinaryProvider) {
//   cloudinaryProvider.config({
//     upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
//     cloud_name: 'dvndkaqtk', // required
//     upload_preset: 'wjrx5otn', // optional
// });
    cloudinaryProvider.config({
      upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
      cloud_name: 'tirtawr', // required
      upload_preset: 'r2mdvcml' // optional
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home',      {url: '/home'      , templateUrl: 'views/home.html',      controller: 'MainController', controllerAs: 'vmMain'})
    .state('login',     {url: '/login'     , templateUrl: 'views/login.html',     controller: 'LoginController'})
    .state('offer-form',{url: '/offer-form', templateUrl: 'views/offer.form.html',controller: 'OfferFormController'})
    .state('my-offers', {url: '/my-offers' , templateUrl: 'views/my.offers.html', controller: 'MyOffersController'})

    .state('categories',{url: '/categories', templateUrl: 'views/categories.html',controller: 'MainController'})
    .state('toggle',    {url: '/toggle'    , templateUrl: 'views/toggle.html',    controller: 'MainController'})
    .state('tabs',      {url: '/tabs'      , templateUrl: 'views/tabs.html',      controller: 'MainController'})
    .state('accordion', {url: '/accordion' , templateUrl: 'views/accordion.html', controller: 'MainController'})
    .state('overlay',   {url: '/overlay'   , templateUrl: 'views/overlay.html',   controller: 'MainController'})
    .state('forms',     {url: '/forms'     , templateUrl: 'views/forms.html',     controller: 'MainController'})
    .state('dropdown',  {url: '/dropdown'  , templateUrl: 'views/dropdown.html',  controller: 'MainController'})
    .state('touch',     {url: '/touch'     , templateUrl: 'views/touch.html',     controller: 'MainController'})
    .state('swipe',     {url: '/swipe'     , templateUrl: 'views/swipe.html',     controller: 'MainController'})
    .state('drag',      {url: '/drag'      , templateUrl: 'views/drag.html',      controller: 'MainController'})
    .state('drag2',     {url: '/drag2'     , templateUrl: 'views/drag2.html',     controller: 'MainController'})
    .state('carousel',  {url: '/carousel'  , templateUrl: 'views/carousel.html',  controller: 'MainController'})

});

//
// `$touch example`
//

app.directive('toucharea', ['$touch', function($touch){
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}]);

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem){
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if( drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function(){
        var res = 0;
        if (id === carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(){
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx    = touch.distanceX,
              t0    = touch.startTransform,
              sign  = Dx < 0 ? -1 : 1,
              angle = sign * Math.min( ( Math.abs(Dx) / 700 ) * 30 , 30 );

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag){
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('input', function() {
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function (scope, element, attrs, ngModel) {
			if (attrs.type !== 'file' || !angular.isDefined(ngModel)) {
				return;
			}

			element.on('change', updateModelWithFile);
			scope.$on('$destroy', function () {
				element.off('change', updateModelWithFile);
			});

			if (attrs.maxsize) {
				var maxsize = parseInt(attrs.maxsize);
				ngModel.$validators.maxsize = function(modelValue, viewValue) {
					var value = modelValue || viewValue;
					if (!angular.isArray(value)) {
						value = [value];
					}
					for (var i = value.length - 1; i >= 0; i--) {
						if (value[i] && value[i].size && value[i].size > maxsize) {
							return false;
						}
					}
					return true;
				};
			}

			if (attrs.accept) {
				var accept = attrs.accept.split(',');
				ngModel.$validators.accept = function(modelValue, viewValue) {
					var value = modelValue || viewValue;
					if (!angular.isArray(value)) {
						value = [value];
					}
					// for (var i = value.length - 1; i >= 0; i--) {
					// 	if (value[i] && accept.indexOf(value[i].type) === -1) {
					// 		return false;
					// 	}
					// }
					return true;
				};
			}

			function updateModelWithFile (event) {
				var files = event.target.files;
				if (!angular.isDefined(attrs.multiple)) {
					files = files[0];
				} else {
					files = Array.prototype.slice.apply(files);
				}
				ngModel.$setViewValue(files, event);
        ngModel.$commitViewValue();
			}
		}
	};
});

app.directive('dragMe', ['$drag', function($drag){
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);
