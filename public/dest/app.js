/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp = angular.module("geo.chat", ['ngRoute', 'firebase', 'uiGmapgoogle-maps']);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.config(["$routeProvider", "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when("/", {
                templateUrl: "app/components/room/room.tpl.html",
                caseInsensitiveMatch: true
            }).
                /*when("/room/:roomId", {
                    templateUrl: "app/components/room/room.tpl.html",
                    caseInsensitiveMatch: true
                }). */
                otherwise({
                redirectTo: "/"
            });
            $locationProvider.html5Mode(true);
        }]);
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
    var User = (function () {
        function User() {
        }
        return User;
    }());
    GeoChat.User = User;
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
var GeoChat;
(function (GeoChat) {
    var ChatCtrl = (function () {
        function ChatCtrl(DataService) {
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.fixChatScroll(1000);
        }
        ChatCtrl.prototype.sendMessage = function (text) {
            this.dataService.addMessageAndTime(text, (new Date()).toISOString());
            $('#message-box').val('');
            this.fixChatScroll(1);
        };
        ChatCtrl.prototype.fixChatScroll = function (deplay) {
            setTimeout(function () {
                $("#gen-chat").scrollTop($("#gen-chat")[0].scrollHeight);
            }, deplay);
        };
        ChatCtrl.$inject = ['DataService'];
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
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
var GeoChat;
(function (GeoChat) {
    var DataService = (function () {
        function DataService() {
            console.log('starting data service constructor');
            this.changeRoom('room_one_guid');
            this.members = [];
            this.messages = [];
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
        }
        DataService.prototype.changeRoom = function (roomId) {
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
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
        DataService.prototype.addMessageAndTime = function (messageText, timespan) {
            this.ref.child("messages").push().set({
                email: 'user_email@test.com',
                text: messageText,
                timestamp: timespan,
                userId: 'current_user_id'
            });
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
        DataService.prototype.getMessages = function () {
            // this.ref.child('rooms/room_one_guid/messages').on('value', function (snapshot) {
            //     // snapshot.val()
            // });
            return [{
                    "text": "This is my message 1",
                    "timestamp": "timestamp",
                    "userId": "id",
                    "email": "email1@email.com"
                }, {
                    "text": "This is my message2",
                    "timestamp": "timestamp",
                    "userId": "id",
                    "email": "email2@email.com"
                },
                {
                    "text": "This is my message3",
                    "timestamp": "timestamp",
                    "userId": "id",
                    "email": "email3@email.com"
                }, {
                    "text": "This is my message4",
                    "timestamp": "timestamp",
                    "userId": "id",
                    "email": "email4@email.com"
                }];
        };
        return DataService;
    }());
    GeoChat.DataService = DataService;
    GeoChat.geoChatApp.service('DataService', DataService);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\app.ts" />
/// <reference path="..\services\data_service.ts" />
var GeoChat;
(function (GeoChat) {
    var MapCtrl = (function () {
        function MapCtrl($scope, DataService) {
            this.$scope = $scope;
            this.DataService = DataService;
            this.isMapReady = false;
            this.members = [];
            this.map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 14 };
            this.members = DataService.members;
            $scope.memberMarkers = DataService.members;
            //Need this silliness so the map updates
            $scope.$watch('DataService.members', function () { });
        }
        MapCtrl.$inject = ['$scope', 'DataService'];
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
