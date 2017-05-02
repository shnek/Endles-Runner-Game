var geometry = new THREE.BoxGeometry( 0.2, 0.5, 0.01 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var player = new THREE.Mesh( geometry, material );
scene.add( player );

var points = 0;
var distance = 0;


player.position.y = getGroundY(player, ground) + 1;

function checkForPoints(object){
    pointArray.forEach(point => {
        if((object.position.x + 0.2) > point.position.x && object.position.x < (point.position.x + 0.1)){
            if((object.position.y + 0.5) > point.position.y && object.position.y < (point.position.y + 0.1)){
                pointArray.splice(pointArray.indexOf(point), 1);
                scene.remove(point);
                points += 1;
            }
          }
    });
    document.getElementById("score").innerHTML = 
    "Score: " + points;
}

function updatePlayerDistance(object){
    if(object.position.x > distance){
        distance = Math.round(object.position.x);
        document.getElementById("distance").innerHTML = 
         "Distance: " + distance;
    }
}