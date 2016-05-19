/// <reference path="..\..\app.ts" />

module GeoChat {

    export class MapCtrl {

        private map: any;

        public static $inject = [];
        
        constructor() {
            this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        }

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}