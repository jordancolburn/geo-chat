/// <reference path="..\..\app.ts" />
/// <reference path="login.controller.ts" />

module GeoChat {

     geoChatApp.directive("login", (): ng.IDirective => ({
         restrict: "AE",
         templateUrl: "app/components/login/login.tpl.html",
         controller: LoginCtrl,
         controllerAs: "vm"
     }));

}