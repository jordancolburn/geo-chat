/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />

module GeoChat {

    export class RoomCtrl {

        public static $inject = ['DataService','$routeParams'];
        
        constructor(private DataService: DataService, private $routeParams: any) {
            if ($routeParams['roomId']){
                this.DataService.changeRoom($routeParams['roomId']);
            }
        }
              
        addRoom(roomName: string){
            this.DataService.addRoom(roomName);
        }
    }

    geoChatApp.controller("RoomCtrl", RoomCtrl);

}