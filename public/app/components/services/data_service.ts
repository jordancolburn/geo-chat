/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class DataService {
        private ref: any;
        private rooms: [];
        public base_url: string;
        public base_ref: any;
        public roomId: string;
        public members: User[];
        public messages: Message[];
        public roomName: string;
        public currentUserId: string;
        public colors: string[];
        
        static $inject = ['$firebaseArray','LocationService','$rootScope'];

        constructor(private $firebaseArray, private LocationService, private $rootScope){
            this.base_url = "https://geo-chat-fe90d.firebaseio.com/"
            this.base_ref = firebase.database().ref();
            this.currentUserId = window.localStorage.getItem('userId');
            this.rooms = this.$firebaseArray(this.base_ref.child('users/'+ this.currentUserId + '/rooms'));
            this.colors = ['red', 'green', 'blue', 'orange', 'DarkBlue', 'Navy',
                            'Indigo', 'OliveDrab', 'DarkRed', 'Sienna', 'Chocolate',
                            'Orchid' 
                            ];
        }
        
        addRoom(roomName: string){
            var rooms = this.base_ref.child("rooms/");
            var room = rooms.push();
            var roomId = room.key;
            room.update({name: roomName});
            this.roomName = roomName;
            this.addUserToRoom(this.currentUserId, null);
            this.changeRoom(roomId);   
        }
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = this.base_ref.child("rooms/" + this.roomId);        
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.$rootScope.$broadcast("room-changed");
            this.ref.child('members').on('child_changed', (snapshot) => {
                this.$rootScope.$broadcast("members-updated");
            });  
            var query = this.ref.child('messages').orderByChild("timestamp").limitToLast(100); 
            this.messages = this.$firebaseArray(query);
            this.ref.child('messages').on("child_added", function(){
                setTimeout(() => {
                    $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
                }, 100)
            });
            this.setupRoomName();
        }

        removeUserFromRoom(userEmail){
            this.base_ref.child('users').orderByChild('Email').equalTo(userEmail).on("child_added", (data) => {
                var room_ref = this.base_ref.child("rooms/" + this.roomId);
                room_ref.child('members/' +  data.key).remove();
                this.base_ref.child('users' + '/' +  data.key).child('/rooms/' + this.roomId).remove();
            });    
        }
        addUserToRoom(userId, userEmail){
            var roomName = this.roomName;
            if(!userId && userEmail){
                this.base_ref.child('users').orderByChild('Email').equalTo(userEmail).on("child_added", (data) => {
                    this.addUserToRoom(data.key, null)
                });
            }
            else{
                this.base_ref.child('users/' + userId).on("value", (data) => {
                    var room_ref =this.base_ref.child("rooms/" + this.roomId);
                    var colors = this.colors;
                    room_ref.child('members' + '/' + userId).set({
                                id: userId,
                                email: data.val().Email,
                                firstName: data.val().FirstName,
                                lastName: data.val().LastName,
                                group: data.val().Group,
                                textLocation: data.val().Location,
                                currentLocation: {latitude: 0, longitude: 0},
                                color: colors[Math.floor(Math.random() * colors.length)]
                    });
                    if (roomName){
                        this.base_ref.child('users' + '/' + userId + '/rooms/' + this.roomId).set({
                            Name: roomName
                        }); 
                    }
                });
            }
        }
 
         setupRoomName(){
            var room_ref = this.base_ref.child("rooms/" + this.roomId);
            room_ref.child("name").on("value", (snapshot) => {
                this.roomName = snapshot.val();
                console.log(snapshot);
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
                userId: this.currentUserId,
                color: user.color
            });
            this.updateLocation(location);
        }

        updateLocation(cur_location: GeoChat.Location){
            this.ref.child("members/" + this.currentUserId + "/currentLocation").update(cur_location);
        }
    }

    geoChatApp.service('DataService', DataService);
}