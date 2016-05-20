/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private members = [];
        private map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 14 };

        public static $inject = ['$scope', 'DataService', 'LocationService'];
        
        constructor(private $scope: any, private DataService: DataService, private LocationService: LocationService) {
            this.members = DataService.members;
            $scope.memberMarkers = DataService.members;
            //Need this silliness so the map updates
            $scope.$watch('DataService.members',() => {})
        }      

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}