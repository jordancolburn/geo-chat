/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />
/// <reference path="components\login\login.controller.ts" />
/// <reference path="components\room\room.controller.ts" />
/// <reference path="components\profile\profile.controller.ts" />


module GeoChat {

    geoChatApp.config(["$routeProvider", "$locationProvider",
        ($routeProvider, $locationProvider) => {
            $routeProvider.
                when("/", {
                    templateUrl: "app/components/room/home.tpl.html",
                    controllerAs: "vm",
                    controller: RoomCtrl,
                    caseInsensitiveMatch: true
                }).
                when("/rooms/:roomId", {
                    templateUrl: "app/components/room/room.tpl.html",
                    controller: RoomCtrl,
                    controllerAs: "vm",
                    caseInsensitiveMatch: true
                }).
                  when("/login", {
                    templateUrl: "app/components/login/login.tpl.html",
                    controller: LoginCtrl,
                    controllerAs: "vm",
                    caseInsensitiveMatch: true
                }).              
                when("/profile", {
                    templateUrl: "app/components/profile/profile.tpl.html",
                    controller: ProfileCtrl,
                    controllerAs: "vm",
                    caseInsensitiveMatch: true
                }).
                otherwise({
                    redirectTo: "/"
                });
            $locationProvider.html5Mode(true);
        }]);
}
