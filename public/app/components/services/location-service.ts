/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class LocationService {
        
        constructor() {}
        
        getLocation() : GeoChat.Location {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( (position) => {
                    var loc = new Location();
                    loc.latitude = position.coords.latitude;
                    loc.longitude = position.coords.longitude;
                    return loc;
                });
            } else {
                console.log("Browser doesn't support Geolocation");
                return null;
            }            
        }
        
    }

    geoChatApp.service('LocationService', LocationService);
}