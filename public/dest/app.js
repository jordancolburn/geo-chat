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
            this.messages = DataService.getMessages();
        }
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
var GeoChat;
(function (GeoChat) {
    var DataService = (function () {
        function DataService() {
            console.log('starting data service constructor');
            this.changeRoom('room_one_guid');
            this.members = [];
            this.messages = [];
            this.getMessages();
            this.getUsers();
            this.getRoomName();
        }
        DataService.prototype.changeRoom = function (roomId) {
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
        };
        DataService.prototype.getRoomName = function () {
            var _this = this;
            this.ref.child("name").on("child_added", function (snapshot) {
                _this.roomName = snapshot.val();
                console.log(snapshot.val());
            });
        };
        DataService.prototype.getMessages = function () {
            var _this = this;
            this.ref.child("members").on("child_added", function (snapshot) {
                _this.members.push(snapshot.val());
                console.log(snapshot.val());
            });
        };
        DataService.prototype.getUsers = function () {
            var _this = this;
            this.ref.child("messages").on("child_added", function (snapshot) {
                _this.messages.push(snapshot.val());
                console.log(snapshot.val());
            });
            this.ref.child("messages").on("child_changed", function (snapshot) {
                console.log(snapshot.val());
            });
            this.ref.child("messages").on("child_removed", function (snapshot) {
                console.log(snapshot.val());
            });
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
        function MapCtrl(DataService) {
            this.DataService = DataService;
            this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        }
        MapCtrl.$inject = ['DataService'];
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
