
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
module GeoChat {

    export class LoginCtrl {
        public static $inject = [ 'AuthService', 'DataService'];
        private ref: Firebase;
        private authService: any;
        private DataService: any
        private showLogin: boolean;
        
        constructor(AuthService, DataService)
        { 
            this.authService = AuthService;
            this.DataService = DataService;
            this.showLogin = true;
        }
        
        login(email:string,password:string)
        {   

            this.authService.login(email, password);
        }
        
        create(email:string,password:string, firstName: string, lastName: string, group: string, location: string)
        {
            this.authService.create(email, password, firstName, lastName, group, location);
        }
    }

    geoChatApp.controller("LoginCtrl", LoginCtrl);

}