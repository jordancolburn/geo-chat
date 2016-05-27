/// <reference path="..\..\app.ts" />
/// <reference path="..\services\auth_services.ts" />

module GeoChat {

    export class HeaderCtrl {
        
        public static $inject = ['AuthService'];

        constructor(private AuthService: AuthService) {        }
        
        logout(): void
        {
            this.AuthService.logout();
        }
    }
    
    geoChatApp.controller("HeaderCtrl", HeaderCtrl);

}