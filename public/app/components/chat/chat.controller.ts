/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        public static $inject = [ 'DataService'];

        constructor(DataService)
        { 
             this.messages = DataService.messages;
        }

    }

    geoChatApp.controller("ChatCtrl", ChatCtrl);

}