var ref = new Firebase('https://geo-chat-fe90d.firebaseio.com/rooms/room_one_guid/members/lif8DaN7OxQiU2brTa1zyRSVf9x2');
lat=36.102756135409884;
long=-115.173185678732;
var i = 0;
var up = true;
var running=true;
while(running){
    if (up){
        lat+=.00005;
    }
    else {
        lat-=.00005; 
    }
    if (i%20 === 0){
        i=0;
        up = !up;
    }
    
    console.log('lat:'+ lat + ' long:' + long);
    ref.child('currentLocation').set({latitude: lat, longitude:long});
    i++;
    sleepFor(600);
}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}