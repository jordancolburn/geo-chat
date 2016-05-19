/// <reference path="..\..\app.ts" />

module GeoChat {

    export class DataService {
        private ref: any;
        
        public static inject = ['$firebaseArray'];
        
        constructor(private firebaseArray: any){
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/");
        }
        
        getRooms(){
            this.ref.child("rooms").on("value", function(snapshot) {
            alert(snapshot.val());
});
        }
        
    }
    
    geoChatApp.service('DataService', DataService);
}