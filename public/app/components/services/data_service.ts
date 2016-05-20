/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class DataService {
        private ref: any;
        public roomId: string;
        public members: User[];
        public messages: Message[];
        public roomName: string;
        
        static $inject = ['$firebaseArray'];

        constructor($firebaseArray){
            console.log('starting data service constructor');
            this.changeRoom('room_one_guid');
            this.members = $firebaseArray(this.ref);
            this.messages = $firebaseArray(this.ref);
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
        }
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
        }
 
         setupRoomName(){
            this.ref.child("name").on("child_added", (snapshot) => {
                this.roomName = snapshot.val();
                console.log(snapshot.val());
            });
        }
        
        setupMessages(){
            this.ref.child("messages").on("child_added", (snapshot) => {
                this.messages.push(snapshot.val());
                $('#gen-chat').trigger('newMessageAdded');
                console.log(snapshot.val());
            });
        }
        
        setupUsers(){
            this.ref.child("members").on("child_added", (snapshot) => {
                this.members.push(snapshot.val());
                console.log(snapshot.val());
            });
            this.ref.child("members").on("child_changed", (snapshot) => {
                console.log(snapshot.val());
            });
            this.ref.child("members").on("child_removed", (snapshot) => {
                console.log(snapshot.val());
            });
        }

        addMessageAndTime(messageText: string, timespan: string, location: GeoChat.Location){
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: timespan,
                userId: 'current_user_id'
            });
            this.updateLocation(location);
            
        }
        addMessage(messageText: string){
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: 'current_timestamp',
                userId: 'current_user_id'
            });
        }

        updateLocation(cur_location: GeoChat.Location){
            this.ref.child("members/"+"user_id"+"/currentLocation/latitude").set( cur_location.latitude);
            this.ref.child("members/"+"user_id"+"/currentLocation/longitude").set(cur_location.longitude);
        }
    }

    geoChatApp.service('DataService', DataService);
}