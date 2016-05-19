/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        private dataService: any;
        public static $inject = ['DataService'];

        constructor(DataService) {
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.fixChatScroll(1000);
        }

        public sendMessage(text: string): void {
            this.dataService.addMessageAndTime(text, (new Date()).toISOString());
            $('#message-box').val('');
            this.fixChatScroll(1);
        }

        private fixChatScroll(deplay: number): void {
            setTimeout(() => {
                $("#gen-chat").scrollTop($("#gen-chat")[0].scrollHeight);
            }, deplay)
        }
    }

    geoChatApp.controller("ChatCtrl", ChatCtrl);

}