/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 14 };

        public static $inject = ['DataService'];
        
        constructor(private DataService: DataService) {
            //this.DataService.getRooms();
        }

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}