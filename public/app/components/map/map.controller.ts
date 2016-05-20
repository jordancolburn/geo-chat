﻿/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private googleMap: any;
        private icons = {};
        private map = { center: { latitude: 36.103, longitude: -115.1745 }, zoom: 18, control: {} };

        public static $inject = ['$scope', 'DataService', 'uiGmapIsReady', 'LocationService', '$rootScope'];
        
        constructor(private $scope: any, private DataService: DataService, private IsReady: any, private LocationService: LocationService, private $rootScope: any) {
            //$scope.memberMarkers = DataService.members;
            //console.log(DataService.members);
            IsReady.promise().then((maps) => {
                this.googleMap = this.map.control.getGMap();
                var GeoMarker = new GeolocationMarker(this.googleMap);                
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position: any) => {
                        this.map.center.latitude = position.coords.latitude;
                        this.map.center.longitude = position.coords.longitude;
                    });
                }
                this.$rootScope.$on("members-updated", () => {
                    this.updateIcons();
                    //console.log('members-updated');
                    //$scope.memberMarkers = [];
                    //$scope.memberMarkers = DataService.members;
                });
                setInterval(() => {
                    DataService.updateLocation(LocationService.getLocation());
                }, 15000);
                this.updateIcons();
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
            
            for (var index = 0; index < this.DataService.members.length; index++) {
                var member = this.DataService.members[index];
                if (member.id === window.localStorage.getItem('userId')) {
                    continue;
                }
                var test = this.icons[member.id];
                if (test == null) {
                    var marker = new google.maps.Marker({
                        position: {lat: member.currentLocation.latitude, lng: member.currentLocation.longitude},
                        map: this.googleMap,
                        title: member.firstName + ' ' + member.lastName,
                        icon: redCircle
                    });       
                    this.icons[member.id] = marker;             
                } else {
                    test.setPosition({lat: member.currentLocation.latitude, lng: member.currentLocation.longitude});    
                }
            }
        }

    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}