/// <reference path="..\..\app.ts" />
/// <reference path="login.controller.ts" />

module GeoChat {

     geoChatApp.directive("profile", (): ng.IDirective => ({
         restrict: "AE",
         templateUrl: "app/components/profile/profile.tpl.html",
         controller: ProfileCtrl,
         controllerAs: "vm"
     }));

}