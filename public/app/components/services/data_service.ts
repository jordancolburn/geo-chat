/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />

module GeoChat {

    export class DataService {
        private ref: any;

        public static inject = [];

        constructor() {
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/");
        }

        getRooms() {
            this.ref.child("rooms").on("value", function (snapshot) {
                console.log(snapshot.val());
            });
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