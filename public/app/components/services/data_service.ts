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
        
        static $inject = ['$firebaseArray','LocationService'];

        constructor(private $firebaseArray, private LocationService){}
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
            this.currentUserId = window.localStorage.getItem('userId');
    
            this.ref.child('members').once("value", (snapshot) => {
                var hasUser = snapshot.hasChild(this.currentUserId);
                if (!hasUser){
                    var users_ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/users");
                    users_ref.child(this.currentUserId).once("value", (snapshot) => {
                        this.ref.child('members' + '/' + this.currentUserId).set({
                            id: this.currentUserId,
                            email: snapshot.val().Email,
                            firstName: snapshot.val().FirstName,
                            lastName: snapshot.val().LastName,
                            group: snapshot.val().Group,
                            textLocation: snapshot.val().Location,
                            currentLocation: this.LocationService.getLocation()
                        });           
                    });
                }
            });
            
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.messages = this.$firebaseArray(this.ref.child('messages'));
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
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
            this.ref.child("members").limitToLast(50).on("child_added", (snapshot) => {
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
            var user = null;
            for (var index = 0; index < this.members.length; index++) {
                var element = this.members[index];
                if (element.hasOwnProperty('id') && (element.id === this.currentUserId)){
                    user = element;
                }
            }
            this.ref.child("messages").push().set({
                email: user.email,
                text: messageText,
                timestamp: timespan,
                userId: this.currentUserId
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
            this.ref.child("members/" + this.currentUserId + "/currentLocation/latitude").set(cur_location.latitude);
            this.ref.child("members/"+ this.currentUserId + "/currentLocation/longitude").set(cur_location.longitude);
        }
    }

    geoChatApp.service('DataService', DataService);
}