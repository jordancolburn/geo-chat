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

        addMessageAndTime(messageText: string, timespan: string){
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: timespan,
                userId: 'current_user_id'
            });
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

        getMessages(): any {
            // this.ref.child('rooms/room_one_guid/messages').on('value', function (snapshot) {
            //     // snapshot.val()
            // });
            return [{
                "text": "This is my message 1",
                "timestamp": "timestamp",
                "userId": "id",
                "email": "email1@email.com"
            }, {
                "text": "This is my message2",
                "timestamp": "timestamp",
                "userId": "id",
                "email": "email2@email.com"
                },
            {
                "text": "This is my message3",
                "timestamp": "timestamp",
                "userId": "id",
                "email": "email3@email.com"
            },{
                "text": "This is my message4",
                "timestamp": "timestamp",
                "userId": "id",
                "email": "email4@email.com"
            }]
        }
    }

    geoChatApp.service('DataService', DataService);
}