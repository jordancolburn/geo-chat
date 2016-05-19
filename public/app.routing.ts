/// <reference path="..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />

module GeoChat {

    geoChatApp.config(["$routeProvider", "$locationProvider",
        ($routeProvider, $locationProvider) => {
            $routeProvider.
                when("/home", {
                    templateUrl: "components/home/home.tpl.html",
                    caseInsensitiveMatch: true
                }).
                otherwise({
                    redirectTo: "/home"
                });
            $locationProvider.html5Mode(true);
        }]);
}
