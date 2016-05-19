/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />

module GeoChat {

    export class DataService {
        private ref: any;
        
        public static inject = [];
        
        constructor(){
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/");
        }
        
        getRooms(){
            this.ref.child("rooms").on("value", function(snapshot) {
                console.log(snapshot.val());
            });
        }
        
    }
    
    geoChatApp.service('DataService', DataService);
}