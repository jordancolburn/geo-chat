/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class LocationService {
        private lat: number;
        private lon: number;
        private timeoutId: number;

        constructor() {
            this.timeoutId = setInterval(() => {
                this.updateLocation();
            }, 5000);
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
                    clearTimeout(this.timeoutId);

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