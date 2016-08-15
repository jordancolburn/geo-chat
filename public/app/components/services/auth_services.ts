/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />

module GeoChat {

    export class AuthService {
        constructor()
        {
        }
        login(email:string,password:string)
        {   
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(authData) {
                window.localStorage.setItem('userId', authData.uid);
                window.location = '/';
            }).catch(function(error){
               alert(error); 
            });
        }
        logout()
        {
            firebase.auth().signOut();
            window.localStorage.clear();
            window.location = '/';
        }
        
        create(email:string, password:string, firstName: string, lastName: string, group: string, location: string){
            var ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/");
                firebase.auth().createUserWithEmailAndPassword(email, password).then((userData) => {
                    console.log("Successfully created user account with uid:", userData.uid);
                    ref.child('users/' + userData.uid).set({
                        Email: email,
                        FirstName: firstName,
                        LastName: lastName,
                        Group: group,
                        Location: location
                    }).then(() => {
                        this.login(email, password); 
                });
                    
                }).catch(function(error){ alert(error); });
            }
        
    }
        geoChatApp.service('AuthService', AuthService);
}