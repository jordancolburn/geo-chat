/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private icons = [];
        private map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 17, control: {} };

        public static $inject = ['$scope', 'DataService', 'uiGmapIsReady', 'LocationService'];
        
        constructor(private $scope: any, private DataService: DataService, private IsReady: any, private LocationService: LocationService) {
            $scope.memberMarkers = DataService.members;
            $scope.$watch('memberMarkers',() => {
            });
            IsReady.promise().then((maps) => {
                var map = this.map.control.getGMap();
                var GeoMarker = new GeolocationMarker(map);
                this.map.center = LocationService.getLocation();
                setInterval(() => {
                    DataService.updateLocation(LocationService.getLocation());
                }, 15000);
            });
        }      
        
        updateIcons() {
            var redCircle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#BD2031',
                fillOpacity: 1,
                scale: 7,
                strokeColor: 'white',
                strokeWeight: 1
            };
            var icons = [];
            console.log(this.DataService.members.length);
            for (var index = 0; index < this.DataService.members.length; index++) {
                var member = this.DataService.members[index];
                console.log('!!!!!!!!!!!!!!!!!');
                console.log(member);
                icons.push({
                    latitude: member.currentLocation.latitude,
                    longitude: member.currentLocation.longitude,
                    id: member.email,
                    icon: redCircle
                });                
            }
            this.$scope.memberMarkers = icons;
            console.log(icons);
            console.log(this.DataService.members);
        }

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}