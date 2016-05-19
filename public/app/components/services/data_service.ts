/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />

module GeoChat {

    export class DataService {
        private ref: any;
        public roomId: string;
        public members: User[];
        public messages: Message[];
        public roomName: string;

        
        constructor(){
            console.log('starting data service constructor');
            this.changeRoom('room_one_guid');
            this.members = [];
            this.messages = [];
            this.getMessages();
            this.getUsers();
            this.getRoomName();
        }
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
        }
 
         getRoomName(){
            this.ref.child("name").on("child_added", (snapshot) => {
                this.roomName = snapshot.val();
                console.log(snapshot.val());
            });
        }
        
        getMessages(){
            this.ref.child("members").on("child_added", (snapshot) => {
                this.members.push(snapshot.val());
                console.log(snapshot.val());
            });
        }
        
        getUsers(){
            this.ref.child("messages").on("child_added", (snapshot) => {
                this.messages.push(snapshot.val());
                console.log(snapshot.val());
            });
            this.ref.child("messages").on("child_changed", (snapshot) => {
                console.log(snapshot.val());
            });
            this.ref.child("messages").on("child_removed", (snapshot) => {
                console.log(snapshot.val());
            });
        }
        
    }
    
    geoChatApp.service('DataService', DataService);
}