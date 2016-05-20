/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />
/// <reference path="components\login\login.controller.ts" />

module GeoChat {

    geoChatApp.config(["$routeProvider", "$locationProvider",
        ($routeProvider, $locationProvider) => {
            $routeProvider.
                when("/", {
                    templateUrl: "app/components/room/room.tpl.html",
                    caseInsensitiveMatch: true
                }).
                  when("/login", {
                    templateUrl: "app/components/login/login.tpl.html",
                    controller: LoginCtrl,
                    controllerAs: "vm",
                    caseInsensitiveMatch: true
                }).
                /*when("/room/:roomId", {
                    templateUrl: "app/components/room/room.tpl.html",
                    caseInsensitiveMatch: true
                }). */               
                otherwise({
                    redirectTo: "/"
                });
            $locationProvider.html5Mode(true);
        }]);
}
