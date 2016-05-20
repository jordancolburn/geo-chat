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
        public currentUserId: string;
        
        static $inject = ['$firebaseArray'];

        constructor(private $firebaseArray){}
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
            this.currentUserId = window.localStorage.getItem('userId');
    
            this.ref.child('members').once("value", (snapshot) => {
                var hasUser = snapshot.hasChild(this.currentUserId);
                if (!hasUser){
                    var users_ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/users");
                    users_ref.child(this.currentUserId).once("value", (snapshot) => {
                        //console.log(snapshot.val());
                        this.ref.child('members' + '/' + this.currentUserId).set({
                            email: snapshot.val().Email,
                            firstName: snapshot.val().FirstName,
                            lastName: snapshot.val().LastName,
                            group: snapshot.val().Group,
                            textLocation: snapshot.val().Location
                        });           
                    });
                }
            });
            
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.messages = this.$firebaseArray(this.ref);
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
        }
 
         setupRoomName(){
            this.ref.child("name").on("child_added", (snapshot) => {
                this.roomName = snapshot.val();
                //console.log(snapshot.val());
            });
        }
        
        setupMessages(){
            this.ref.child("messages").on("child_added", (snapshot) => {
                this.messages.push(snapshot.val());
                $('#gen-chat').trigger('newMessageAdded');
                //console.log(snapshot.val());
            });
        }
        
        setupUsers(){
            this.ref.child("members").on("child_added", (snapshot) => {
                this.members.push(snapshot.val());
                //console.log(snapshot.val());
            });
            this.ref.child("members").on("child_changed", (snapshot) => {
                //console.log(snapshot.val());
            });
            this.ref.child("members").on("child_removed", (snapshot) => {
                //console.log(snapshot.val());
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