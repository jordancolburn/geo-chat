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
        
        static $inject = ['$firebaseArray','LocationService','$rootScope'];

        constructor(private $firebaseArray, private LocationService, private $rootScope){}
        
        addRoom(roomName: string){
            var rooms = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/");
            var room = rooms.push();
            var roomId = room.key();
            room.set({name: roomName}).then(function(){
                window.location = '/rooms/' + roomId;
            });
        }
        
        changeRoom(roomId: string){
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
            this.currentUserId = window.localStorage.getItem('userId');
    
            this.ref.child('members').once("value", (snapshot) => {
                var hasUser = snapshot.hasChild(this.currentUserId + '/color');
                if (!hasUser){
                    var users_ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/users");
                    var colors = ['red', 'green', 'blue', 'orange', 'DarkBlue', 'Navy',
                                  'Indigo', 'OliveDrab', 'DarkRed', 'Sienna', 'Chocolate',
                                  'Orchid' 
                                  ];
                    users_ref.child(this.currentUserId).once("value", (snapshot) => {
                        this.ref.child('members' + '/' + this.currentUserId).set({
                            id: this.currentUserId,
                            email: snapshot.val().Email,
                            firstName: snapshot.val().FirstName,
                            lastName: snapshot.val().LastName,
                            group: snapshot.val().Group,
                            textLocation: snapshot.val().Location,
                            currentLocation: this.LocationService.getLocation(),
                            color: colors[Math.floor(Math.random() * colors.length)]
                        });           
                    });
                }
            });
            
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.ref.child('members').on('child_changed', (snapshot) => {
                this.$rootScope.$broadcast("members-updated");
            }); 
            this.messages = this.$firebaseArray(this.ref.child('messages'));
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