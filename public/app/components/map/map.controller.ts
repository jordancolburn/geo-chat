/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private icons = [];
        private map = { center: { latitude: 36.103, longitude: -115.1745 }, zoom: 18, control: {} };

        public static $inject = ['$scope', 'DataService', 'uiGmapIsReady', 'LocationService', '$rootScope'];
        
        constructor(private $scope: any, private DataService: DataService, private IsReady: any, private LocationService: LocationService, private $rootScope: any) {
            $scope.memberMarkers = DataService.members;
            $scope.$watch('memberMarkers',() => {});
            console.log(DataService.members);
            IsReady.promise().then((maps) => {
                var map = this.map.control.getGMap();
                var GeoMarker = new GeolocationMarker(map);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position: any) => {
                        this.map.center.latitude = position.coords.latitude;
                        this.map.center.longitude = position.coords.longitude;
                    });
                }
                this.$rootScope.$on("members-updated", () => {
                    console.log('members-updated');
                    $scope.memberMarkers = [];
                    $scope.memberMarkers = DataService.members;
                });
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