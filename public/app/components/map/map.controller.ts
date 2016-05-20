/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 14, control: {} };

        public static $inject = ['$scope', 'DataService', 'uiGmapIsReady'];
        
        constructor(private $scope: any, private DataService: DataService, private IsReady: any) {
            $scope.memberMarkers = DataService.members;
            //Need this silliness so the map updates
            $scope.$watch('DataService.members',() => {});
            IsReady.promise().then((maps) => {
                var GeoMarker = new GeolocationMarker(this.map.control.getGMap());
            });
        }      

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}