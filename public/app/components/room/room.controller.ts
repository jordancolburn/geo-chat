/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />

module GeoChat {

    export class RoomCtrl {

        public static $inject = ['DataService','$routeParams'];
        
        constructor(private DataService: DataService, private $routeParams: any) {
            this.DataService.changeRoom($routeParams["roomId"]);
        }      
    }

    geoChatApp.controller("RoomCtrl", RoomCtrl);

}