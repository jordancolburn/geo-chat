/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />

module GeoChat {

    export class RoomCtrl {
        public roomName: string;
        public members: User[]
        public static $inject = ['DataService','$routeParams'];
        
        constructor(public DataService: DataService, private $routeParams: any) {
            if ($routeParams['roomId']){
               this.DataService.changeRoom($routeParams['roomId']);
            }
            this.members = DataService.members;
        }
              
        addRoom(roomName: string){
            this.DataService.addRoom(roomName);
        }

        addUserToRoom(userEmail){
            this.DataService.addUserToRoom(null, userEmail);
        }

        removeUserFromRoom(userEmail){
            this.DataService.removeUserFromRoom(userEmail);
        }
    }

    geoChatApp.controller("RoomCtrl", RoomCtrl);

}