/// <reference path="..\..\app.ts" />
/// <reference path="header.controller.ts" />

module GeoChat {

     geoChatApp.directive("header", (): ng.IDirective => ({
         restrict: "AE",
         templateUrl: "app/components/header/header.tpl.html",
         controller: HeaderCtrl,
         controllerAs: "vm"
     }));

}