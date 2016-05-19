/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />

module GeoChat {

    export class MapCtrl {

        private map: any = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        public static $inject = ['DataService'];
        
        constructor(private DataService: DataService) {
            //this.DataService.getRooms();
        }

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}