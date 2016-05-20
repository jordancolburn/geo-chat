
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
module GeoChat {

    export class LoginCtrl {
        public static $inject = [ 'AuthService'];
        private ref: Firebase;
        private authService: any
        constructor(AuthService)
        { 
            this.authService = AuthService;
        }
        
        login(email:string,password:string)
        {   
            this.authService.login(email,password);
        }
    }

    geoChatApp.controller("LoginCtrl", LoginCtrl);

}