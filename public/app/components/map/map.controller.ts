﻿/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />

module GeoChat {

    export class MapCtrl {
        private isMapReady = false;
        private map: any;
        private icons = {};
        private infowindow = new google.maps.InfoWindow();

        public static $inject = ['$scope', '$firebaseArray', 'DataService', 'LocationService', '$rootScope'];
        
        constructor(private $scope: any, private $firebaseArray: any, private DataService: DataService, private LocationService: LocationService, private $rootScope: any) {
            this.loadMap();
        }     
        
        loadMap() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 0, lng: 0},
                zoom: 17
            });
            google.maps.event.addListenerOnce(this.map, 'idle', () => {
                this.mapLoaded();
            });
        } 
        
        mapLoaded() {
            this.DataService.updateLocation(this.LocationService.getLocation());
            var GeoMarker = new GeolocationMarker(this.map);
            var loc = this.LocationService.getLocation();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
            });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            this.setMapCenter(this.LocationService.getLocation());
            this.$rootScope.$on("room-changed", () => {
                this.mapLoaded();
                navigator.geolocation.getCurrentPosition({'coords': this.LocationService.getLocation()});
            });        
            this.$rootScope.$on("members-updated", () => {
                this.updateIcons();
            });                
            setInterval(() => {
                this.DataService.updateLocation(this.LocationService.getLocation());
            }, 30000);
            this.updateIcons();            
        }
        
        updateIcons() {     
            for (var index = 0; index < this.DataService.members.length; index++) {
                var member = this.DataService.members[index];
                if (member.id === window.localStorage.getItem('userId')) {
                    continue;
                }
                var color = 'black';
                if (member.color) {
                    color = member.color;
                }
                var circle = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    scale: 7,
                    strokeColor: 'white',
                    strokeWeight: 1
                };
                var marker = this.icons[member.id];
                if (!marker) {
                    var name = member.firstName + ' ' + member.lastName;
                    marker = new google.maps.Marker({
                        position: {lat: member.currentLocation.latitude, lng: member.currentLocation.longitude},
                        map: this.map,
                        title: name,
                        infoData: member.firstName + ' ' + member.lastName + '</br>' + member.group + '</br>' + member.textLocation,
                        icon: circle
                    });       
                    this.icons[member.id] = marker; 
                    google.maps.event.addListener(marker, 'click', ((marker, infowindow, map) => {
                        return () => {
                            infowindow.setContent(marker.infoData);
                            infowindow.open(map, marker);
                        }
                    })(marker, this.infowindow, this.map));            
                } else {
                    marker.setPosition({lat: member.currentLocation.latitude, lng: member.currentLocation.longitude});    
                }
            }
        }
        
        setMapCenter(position: Location) {
            this.map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));   
        }    
    }

    geoChatApp.controller("MapCtrl", MapCtrl);

}