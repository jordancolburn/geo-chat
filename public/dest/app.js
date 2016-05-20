/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp = angular.module("geo.chat", ['ngRoute', 'firebase', 'uiGmapgoogle-maps']);
    GeoChat.geoChatApp.run(function ($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (window.localStorage.getItem('userId') == null) {
                // no logged user, we should be going to #login
                if (next.templateUrl == "app/components/login/login.tpl.html") {
                }
                else {
                    // not going to #login, we should redirect now
                    $location.path("/login");
                }
            }
            else {
                if (next.templateUrl == "app/components/login/login.tpl.html") {
                    $location.path("/");
                }
            }
        });
    });
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
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (authData) {
                alert('Logged in!' + authData.uid);
                window.localStorage.setItem('userId', authData.uid);
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
        function DataService($firebaseArray, LocationService) {
            this.$firebaseArray = $firebaseArray;
            this.LocationService = LocationService;
        }
        DataService.prototype.changeRoom = function (roomId) {
            var _this = this;
            this.roomId = roomId;
            this.ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/rooms/" + this.roomId);
            this.currentUserId = window.localStorage.getItem('userId');
            this.ref.child('members').once("value", function (snapshot) {
                var hasUser = snapshot.hasChild(_this.currentUserId);
                if (!hasUser) {
                    var users_ref = new Firebase("https://geo-chat-fe90d.firebaseio.com/users");
                    users_ref.child(_this.currentUserId).once("value", function (snapshot) {
                        _this.ref.child('members' + '/' + _this.currentUserId).set({
                            id: _this.currentUserId,
                            email: snapshot.val().Email,
                            firstName: snapshot.val().FirstName,
                            lastName: snapshot.val().LastName,
                            group: snapshot.val().Group,
                            textLocation: snapshot.val().Location,
                            currentLocation: _this.LocationService.getLocation()
                        });
                    });
                }
            });
            this.members = this.$firebaseArray(this.ref.child('members'));
            this.messages = this.$firebaseArray(this.ref.child('messages'));
            this.setupMessages();
            this.setupUsers();
            this.setupRoomName();
        };
        DataService.prototype.setupRoomName = function () {
            var _this = this;
            this.ref.child("name").on("child_added", function (snapshot) {
                _this.roomName = snapshot.val();
                //console.log(snapshot.val());
            });
        };
        DataService.prototype.setupMessages = function () {
            var _this = this;
            this.ref.child("messages").on("child_added", function (snapshot) {
                _this.messages.push(snapshot.val());
                $('#gen-chat').trigger('newMessageAdded');
                //console.log(snapshot.val());
            });
        };
        DataService.prototype.setupUsers = function () {
            var _this = this;
            this.ref.child("members").limitToLast(50).on("child_added", function (snapshot) {
                _this.members.push(snapshot.val());
                //console.log(snapshot.val());
            });
            this.ref.child("members").on("child_changed", function (snapshot) {
                //console.log(snapshot.val());
            });
            this.ref.child("members").on("child_removed", function (snapshot) {
                //console.log(snapshot.val());
            });
        };
        DataService.prototype.addMessageAndTime = function (messageText, timespan, location) {
            var user = null;
            for (var index = 0; index < this.members.length; index++) {
                var element = this.members[index];
                if (element.hasOwnProperty('id') && (element.id === this.currentUserId)) {
                    user = element;
                }
            }
            this.ref.child("messages").push().set({
                email: user.email,
                text: messageText,
                timestamp: timespan,
                userId: this.currentUserId
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
            this.ref.child("members/" + this.currentUserId + "/currentLocation/latitude").set(cur_location.latitude);
            this.ref.child("members/" + this.currentUserId + "/currentLocation/longitude").set(cur_location.longitude);
        };
        DataService.$inject = ['$firebaseArray', 'LocationService'];
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
/// <reference path="..\..\app.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\..\..\typings\firebase\firebase.d.ts" />
/// <reference path="..\..\models\user.ts" />
/// <reference path="..\..\models\message.ts" />
/// <reference path="..\..\models\location.ts" />
var GeoChat;
(function (GeoChat) {
    var ProfileCtrl = (function () {
        function ProfileCtrl() {
            var config = {
                apiKey: "AIzaSyDrcYVv2z1J8txJ0NSUJ3tbG3YQ172gf-c",
                authDomain: "geo-chat-fe90d.firebaseapp.com",
                databaseURL: "https://geo-chat-fe90d.firebaseio.com",
                storageBucket: "geo-chat-fe90d.appspot.com",
            };
            firebase.initializeApp(config);
            alert(firebase.auth().currentUser.uid);
        }
        ProfileCtrl.prototype.load = function () {
        };
        return ProfileCtrl;
    }());
    GeoChat.ProfileCtrl = ProfileCtrl;
    GeoChat.geoChatApp.controller("ProfileCtrl", ProfileCtrl);
})(GeoChat || (GeoChat = {}));
/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
/// <reference path="app.ts" />
/// <reference path="components\login\login.controller.ts" />
/// <reference path="components\room\room.controller.ts" />
/// <reference path="components\profile\profile.controller.ts" />
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
                when("/profile", {
                templateUrl: "app/components/profile/profile.tpl.html",
                controller: GeoChat.ProfileCtrl,
                controllerAs: "vm",
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
var GeoChat;
(function (GeoChat) {
    var ChatCtrl = (function () {
        function ChatCtrl($scope, DataService, LocationService) {
            var _this = this;
            this.messages = DataService.messages;
            this.dataService = DataService;
            this.locationService = LocationService;
            $scope.$watch('DataService.messages', function () { });
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
        ChatCtrl.$inject = ['$scope', 'DataService', 'LocationService'];
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
            this.updateLocation();
            this.timeoutId = setInterval(function () {
                _this.updateLocation();
            }, 2000);
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
                console.log('test!11');
                navigator.geolocation.getCurrentPosition(function (position) {
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
        function MapCtrl($scope, DataService, IsReady, LocationService) {
            var _this = this;
            this.$scope = $scope;
            this.DataService = DataService;
            this.IsReady = IsReady;
            this.LocationService = LocationService;
            this.isMapReady = false;
            this.icons = [];
            this.map = { center: { latitude: 36.1749700, longitude: -115.1372200 }, zoom: 17, control: {} };
            $scope.memberMarkers = DataService.members;
            $scope.$watch('memberMarkers', function () {
            });
            IsReady.promise().then(function (maps) {
                var map = _this.map.control.getGMap();
                var GeoMarker = new GeolocationMarker(map);
                _this.map.center = LocationService.getLocation();
                setInterval(function () {
                    DataService.updateLocation(LocationService.getLocation());
                }, 15000);
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
        MapCtrl.$inject = ['$scope', 'DataService', 'uiGmapIsReady', 'LocationService'];
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
/// <reference path="login.controller.ts" />
var GeoChat;
(function (GeoChat) {
    GeoChat.geoChatApp.directive("profile", function () { return ({
        restrict: "AE",
        templateUrl: "app/components/profile/profile.tpl.html",
        controller: GeoChat.ProfileCtrl,
        controllerAs: "vm"
    }); });
})(GeoChat || (GeoChat = {}));
