/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class LocationService {
        private lat: number = 36.1749700;
        private lon: number = -115.1372200;
        private timeoutId: number;

        constructor() {
            this.updateLocation();
            this.timeoutId = setInterval(() => {
                this.updateLocation();
            }, 2000);
        }

        getLocation(): GeoChat.Location {
            return {
                latitude: this.lat,
                longitude: this.lon
            }
        }
        updateLocation(): void {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                });
            } else {
                console.log("Browser doesn't support Geolocation");
                return null;
            }
        }

    }

    geoChatApp.service('LocationService', LocationService);
}