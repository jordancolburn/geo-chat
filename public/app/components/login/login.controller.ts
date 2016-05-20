
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
            var config = {
                apiKey: "AIzaSyDrcYVv2z1J8txJ0NSUJ3tbG3YQ172gf-c",
                authDomain: "geo-chat-fe90d.firebaseapp.com",
                databaseURL: "https://geo-chat-fe90d.firebaseio.com",
                storageBucket: "geo-chat-fe90d.appspot.com",
            };
            firebase.initializeApp(config);
        }
        
        login(email:string,password:string)
        {   
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                alert('Logged in!');
                window.location = '/';
            }).catch(function(error){
               alert(error); 
            });
        }

    }

    geoChatApp.controller("LoginCtrl", LoginCtrl);

}