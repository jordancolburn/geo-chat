/// <reference path="..\..\app.ts" />
/// <reference path="map.controller.ts" />

module GeoChat {

     geoChatApp.directive("map", (): ng.IDirective => ({
         restrict: "AE",
         templateUrl: "app/components/map/map.tpl.html",
         controller: MapCtrl,
         controllerAs: "vm"
     }));

}