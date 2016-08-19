/// <reference path="..\..\app.ts" />

module GeoChat {

    export class ChatCtrl {
        private messages: [any];
        private dataService: any;
        private locationService: any;
        private authService: any;
        private message: string;
        
        public static $inject = ['$scope', 'DataService', 'LocationService', 'AuthService'];

        constructor($scope, DataService, LocationService, AuthService) {
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.locationService = LocationService;
            this.authService = AuthService;
            
            $('#chatMessages').on('newMessageAdded', () => {
                this.fixChatScroll(0);
            });

            //var do$( document ).ready(() => {
            //    this.resizePage();
            //    this.fixChatScroll(0);
            //});
            $( window ).on("resize.chatResize", () => {
                this.resizePage();
                this.fixChatScroll(0);
            });            
            this.resizePage();
            this.fixChatScroll(0);
            
            $scope.$on("$destroy", () => {
                $(window).off("resize.chatResize");
            });
            
        }

        public sendMessage(): void {
            if (this.message && this.message !== '') {
                this.dataService.addMessageAndTime(this.message, (new Date()).toISOString(), this.locationService.getLocation());
                this.message = null;
                this.fixChatScroll(300);
            }
        }

        private fixChatScroll(delay: number): void {
            setTimeout(() => {
                $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
            }, delay)
        }
        
        public showUser(email: string){
            alert(email);
        }
        
        resizePage(): void 
        {
            var containerHeight = $('#chatContainer').height();
            $('#chatMessages').height(containerHeight-40);
        }
        
    }
    
    geoChatApp.controller("ChatCtrl", ChatCtrl);

}