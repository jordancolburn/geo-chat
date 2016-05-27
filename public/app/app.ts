/// <reference path="..\..\node_modules\angular-typescript\ts\definitely-typed\angularjs\angular.d.ts" />
module GeoChat {
    
    export var geoChatApp = angular.module("geo.chat", ['ngRoute', 'firebase']);

    geoChatApp.run( function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ( window.localStorage.getItem('userId') == null ) {
            // no logged user, we should be going to #login
            if ( next.templateUrl == "app/components/login/login.tpl.html" ) {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path( "/login" );
            }
        } else {
            if ( next.templateUrl == "app/components/login/login.tpl.html" ) {
                $location.path( "/" );
            }            
        }       
    })
});
}