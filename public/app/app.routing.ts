/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />

module GeoChat {

    geoChatApp.config(["$routeProvider", "$locationProvider",
        ($routeProvider, $locationProvider) => {
            $routeProvider.
                when("/", {
                    templateUrl: "app/components/home/home.tpl.html",
                    caseInsensitiveMatch: true
                }).
                otherwise({
                    redirectTo: "/"
                });
            $locationProvider.html5Mode(true);
        }]);
}
