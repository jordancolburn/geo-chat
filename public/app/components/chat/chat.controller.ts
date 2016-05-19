/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        public static $inject = ['DataService'];

        constructor(DataService)
        { 
            this.messages = DataService.getMessages();
        }

    }

    geoChatApp.controller("ChatCtrl", ChatCtrl);

}