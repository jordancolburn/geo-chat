/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp = angular.module("geo.chat", ['ngRoute', 'firebase', 'uiGmapgoogle-maps']);
})(GeoChat || (GeoChat = {}));
var GeoChat;
(function (GeoChat) {
    var User = (function () {
        function User() {
        }
        return User;
    }());
    GeoChat.User = User;
})(GeoChat || (GeoChat = {}));
var GeoChat;
(function (GeoChat) {
    var Message = (function () {
        function Message() {
        }
        return Message;
    }());
    GeoChat.Message = Message;
})(GeoChat || (GeoChat = {}));
var GeoChat;
(function (GeoChat) {
    var Location = (function () {
        function Location() {
        }
        return Location;
    }());
    GeoChat.Location = Location;
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
var GeoChat;
(function (GeoChat) {
    var LoginCtrl = (function () {
        function LoginCtrl() {
            var config = {
                apiKey: "AIzaSyDrcYVv2z1J8txJ0NSUJ3tbG3YQ172gf-c",
                authDomain: "geo-chat-fe90d.firebaseapp.com",
                databaseURL: "https://geo-chat-fe90d.firebaseio.com",
                storageBucket: "geo-chat-fe90d.appspot.com",
            };
            firebase.initializeApp(config);
        }
        LoginCtrl.prototype.login = function (email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
                alert('Logged in!');
                window.location = '/';
            }).catch(function (error) {
                alert(error);
            });
        };
        return LoginCtrl;
    }());
    GeoChat.LoginCtrl = LoginCtrl;
    GeoChat.geoChatApp.controller("LoginCtrl", LoginCtrl);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
var GeoChat;
(function (GeoChat) {
    var DataService = (function () {
        function DataService($firebaseArray) {
            this.$firebaseArray = $firebaseArray;
        }
        DataService.prototype.changeRoom = function (roomId) {
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.messages = this.$firebaseArray(this.ref);
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
        };
        DataService.prototype.setupRoomName = function () {
            var _this = this;
            this.ref.child("name").on("child_added", function (snapshot) {
                _this.roomName = snapshot.val();
                console.log(snapshot.val());
            });
        };
        DataService.prototype.setupMessages = function () {
            var _this = this;
            this.ref.child("messages").on("child_added", function (snapshot) {
                _this.messages.push(snapshot.val());
                $('#gen-chat').trigger('newMessageAdded');
                console.log(snapshot.val());
            });
        };
        DataService.prototype.setupUsers = function () {
            var _this = this;
            this.ref.child("members").on("child_added", function (snapshot) {
                _this.members.push(snapshot.val());
                console.log(snapshot.val());
            });
            this.ref.child("members").on("child_changed", function (snapshot) {
                console.log(snapshot.val());
            });
            this.ref.child("members").on("child_removed", function (snapshot) {
                console.log(snapshot.val());
            });
        };
        DataService.prototype.addMessageAndTime = function (messageText, timespan, location) {
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: timespan,
                userId: 'current_user_id'
            });
            this.updateLocation(location);
        };
        DataService.prototype.addMessage = function (messageText) {
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: 'current_timestamp',
                userId: 'current_user_id'
            });
        };
        DataService.prototype.updateLocation = function (cur_location) {
            this.ref.child("members/" + "user_id" + "/currentLocation/latitude").set(cur_location.latitude);
            this.ref.child("members/" + "user_id" + "/currentLocation/longitude").set(cur_location.longitude);
        };
        DataService.$inject = ['$firebaseArray'];
        return DataService;
    }());
    GeoChat.DataService = DataService;
    GeoChat.geoChatApp.service('DataService', DataService);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
var GeoChat;
(function (GeoChat) {
    var RoomCtrl = (function () {
        function RoomCtrl(DataService, $routeParams) {
            this.DataService = DataService;
            this.$routeParams = $routeParams;
            this.DataService.changeRoom($routeParams["roomId"]);
        }
        RoomCtrl.$inject = ['DataService', '$routeParams'];
        return RoomCtrl;
    }());
    GeoChat.RoomCtrl = RoomCtrl;
    GeoChat.geoChatApp.controller("RoomCtrl", RoomCtrl);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />
/// <reference path="components\login\login.controller.ts" />
/// <reference path="components\room\room.controller.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.config(["$routeProvider", "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                /*when("/", {
                    templateUrl: "app/components/room/room.tpl.html",
                    caseInsensitiveMatch: true
                }).*/
                when("/login", {
                templateUrl: "app/components/login/login.tpl.html",
                controller: GeoChat.LoginCtrl,
                controllerAs: "vm",
                caseInsensitiveMatch: true
            }).
                when("/room/:roomId", {
                templateUrl: "app/components/room/room.tpl.html",
                controller: GeoChat.RoomCtrl,
                caseInsensitiveMatch: true
            }).
                otherwise({
                redirectTo: "/room/room_one_guid"
            });
            $locationProvider.html5Mode(true);
        }]);
})(GeoChat || (GeoChat = {}));
/// <reference path="User.ts" />
/// <reference path="Message.ts" />
var GeoChat;
(function (GeoChat) {
    var Room = (function () {
        function Room() {
        }
        return Room;
    }());
    GeoChat.Room = Room;
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="login.controller.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.directive("login", function () { return ({
        restrict: "AE",
        templateUrl: "app/components/login/login.tpl.html",
        controller: GeoChat.LoginCtrl,
        controllerAs: "vm"
    }); });
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
var GeoChat;
(function (GeoChat) {
    var LocationService = (function () {
        function LocationService() {
            var _this = this;
            this.lat = 36.1749700;
            this.lon = -115.1372200;
            this.timeoutId = setInterval(function () {
                _this.updateLocation();
            }, 5000);
        }
        LocationService.prototype.getLocation = function () {
            return {
                latitude: this.lat,
                longitude: this.lon
            };
        };
        LocationService.prototype.updateLocation = function () {
            var _this = this;
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    clearTimeout(_this.timeoutId);
                    _this.lat = position.coords.latitude;
                    _this.lon = position.coords.longitude;
                });
            }
            else {
                console.log("Browser doesn't support Geolocation");
                return null;
            }
        };
        return LocationService;
    }());
    GeoChat.LocationService = LocationService;
    GeoChat.geoChatApp.service('LocationService', LocationService);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
/// <reference path="..\services\location-service.ts" />
var GeoChat;
(function (GeoChat) {
    var MapCtrl = (function () {
        function MapCtrl($scope, DataService, IsReady) {
            var _this = this;
            this.$scope = $scope;
            this.DataService = DataService;
            this.IsReady = IsReady;
            this.isMapReady = false;
            this.icons = [];
            this.map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 14, control: {} };
            $scope.memberMarkers = DataService.members;
            $scope.$watch('memberMarkers', function () {
                //this.updateIcons();
            });
            IsReady.promise().then(function (maps) {
                var GeoMarker = new GeolocationMarker(_this.map.control.getGMap());
            });
        }
        MapCtrl.prototype.updateIcons = function () {
            var redCircle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#BD2031',
                fillOpacity: 1,
                scale: 7,
                strokeColor: 'white',
                strokeWeight: 1
            };
            var icons = [];
            console.log(this.DataService.members.length);
            for (var index = 0; index < this.DataService.members.length; index++) {
                var member = this.DataService.members[index];
                console.log('!!!!!!!!!!!!!!!!!');
                console.log(member);
                icons.push({
                    latitude: member.currentLocation.latitude,
                    longitude: member.currentLocation.longitude,
                    id: member.email,
                    icon: redCircle
                });
            }
            this.$scope.memberMarkers = icons;
            console.log(icons);
            console.log(this.DataService.members);
        };
        MapCtrl.$inject = ['$scope', 'DataService', 'uiGmapIsReady'];
        return MapCtrl;
    }());
    GeoChat.MapCtrl = MapCtrl;
    GeoChat.geoChatApp.controller("MapCtrl", MapCtrl);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="map.controller.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.directive("map", function () { return ({
        restrict: "AE",
        templateUrl: "app/components/map/map.tpl.html",
        controller: GeoChat.MapCtrl,
        controllerAs: "vm"
    }); });
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
var GeoChat;
(function (GeoChat) {
    var ChatCtrl = (function () {
        function ChatCtrl(DataService, LocationService) {
            var _this = this;
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.locationService = LocationService;
            this.fixChatScroll(1000);
            $('#gen-chat').on('newMessageAdded', function () {
                _this.fixChatScroll(1000);
            });
        }
        ChatCtrl.prototype.sendMessage = function (text) {
            this.dataService.addMessageAndTime(text, (new Date()).toISOString(), this.locationService.getLocation());
            $('#message-box').val('');
            this.fixChatScroll(1);
        };
        ChatCtrl.prototype.fixChatScroll = function (delay) {
            setTimeout(function () {
                $("#gen-chat").scrollTop($("#gen-chat")[0].scrollHeight);
            }, delay);
        };
        ChatCtrl.$inject = ['DataService', 'LocationService'];
        return ChatCtrl;
    }());
    GeoChat.ChatCtrl = ChatCtrl;
    GeoChat.geoChatApp.controller("ChatCtrl", ChatCtrl);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="chat.controller.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.directive("chat", function () { return ({
        restrict: "AE",
        templateUrl: "app/components/chat/chat.tpl.html",
        controller: GeoChat.ChatCtrl,
        controllerAs: "vm"
    }); });
})(GeoChat || (GeoChat = {}));
