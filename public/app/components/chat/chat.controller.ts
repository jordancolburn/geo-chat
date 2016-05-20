/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        private dataService: any;
        private locationService: any;
        public static $inject = ['DataService', 'LocationService'];

        constructor(DataService, LocationService) {
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.locationService = LocationService;
            this.fixChatScroll(1000);
            $('#gen-chat').on('newMessageAdded', () => {
                this.fixChatScroll(1000);
             });
        }

        public sendMessage(text: string): void {
            this.dataService.addMessageAndTime(text, (new Date()).toISOString());
            this.dataService.updateMemberLocation('current_user_id', this.locationService.getLocation());
            $('#message-box').val('');
            this.fixChatScroll(1);
        }

        private fixChatScroll(delay: number): void {
            setTimeout(() => {
                $("#gen-chat").scrollTop($("#gen-chat")[0].scrollHeight);
            }, delay)
        }
    }

    geoChatApp.controller("ChatCtrl", ChatCtrl);

}