
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
module GeoChat {

    export class LoginCtrl {
        //public static $inject = [ 'DataService'];
        private ref: Firebase;

        constructor()
        { 
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/");
            
        }
        
        login(email:string,password:string)
        {
            console.log("I am in login")
            function authHandler(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
            }
            this.ref.authWithPassword({
                email: email,
                password: password
            }, authHandler);
        }

    }

    geoChatApp.controller("LoginCtrl", LoginCtrl);

}