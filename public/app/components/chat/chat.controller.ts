/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        private dataService: any;
        private locationService: any;
        private authService: any;
        public static $inject = ['$scope', 'DataService', 'LocationService', 'AuthService'];

        constructor($scope, DataService, LocationService, AuthService) {
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.locationService = LocationService;
            this.authService = AuthService;
            $scope.$watch('DataService.messages',() => {
                this.messages = DataService.messages;
            });
            this.fixChatScroll(1000);
            
            $('#gen-chat').on('newMessageAdded', () => {
                this.fixChatScroll(1000);
            });

            $('#message-box').keydown((e) => {
                if (e.keyCode === 13) {
                    this.sendMessage($('#message-box').val().trim());
                }
            });
        }

        public sendMessage(text: string): void {
            if (text !== '') {
                this.dataService.addMessageAndTime(text, (new Date()).toISOString(), this.locationService.getLocation());
                $('#message-box').val('');
                this.fixChatScroll(1);
            }
        }

        private fixChatScroll(delay: number): void {
            setTimeout(() => {
                $("#gen-chat").scrollTop($("#gen-chat")[0].scrollHeight);
            }, delay)
        }
        
        public logout(): void
        {
            this.authService.logout();
        }
    }
    
    geoChatApp.controller("ChatCtrl", ChatCtrl);

}