/// <reference path="..\..\app.ts" />
/// <reference path="chat.controller.ts" />

module GeoChat {

     geoChatApp.directive("chat", (): ng.IDirective => ({
         restrict: "AE",
         templateUrl: "app/components/chat/chat.tpl.html",
         controller: ChatCtrl,
         controllerAs: "vm"
     }));

}