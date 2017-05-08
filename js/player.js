var geometry = new THREE.BoxGeometry( PLAYER_WIDTH, PLAYER_HEIGHT, 0.01 );
var material = new THREE.MeshBasicMaterial( { color: PLAYER_COLOR } );
var player = new THREE.Mesh( geometry, material );

var points;


function createPlayer(){
    scene.add( player );
    player.position.x = 0;
    player.position.y = getGroundY(player, ground) + 1;

    points = 0;
    distance = 0;

    
}


    // DEBUG MATERIAL: DRAWS X and Y LINES ACCORDING TO THE OBJECT
//  var lineMaterial = new THREE.LineBasicMaterial({
// 	color: 0x0000ff
//     });

//     var lineXGeometry = new THREE.Geometry();
//     lineXGeometry.vertices.push(
//         new THREE.Vector3(player.position.x - 0.5, player.position.y, 0),
//         new THREE.Vector3(player.position.x + 0.5, player.position.y, 0)
//     );
//     var lineYGeometry = new THREE.Geometry();
//     lineYGeometry.vertices.push(
//         new THREE.Vector3(player.position.x , player.position.y - 0.5, 0),
//         new THREE.Vector3(player.position.x, player.position.y + 0.5, 0)
//     );


//     var lineY = new THREE.Line(lineXGeometry, lineMaterial);
//     var lineX = new THREE.Line(lineYGeometry, lineMaterial);

//     scene.add(lineX);
//     scene.add(lineY);



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

function checkForRocks(object){
    rocks.forEach(rock => {
        var xdis = Math.abs(object.position.x - rock.position.x);
        var ydis = Math.abs(object.position.y - rock.position.y);
        if(xdis <= PLAYER_WIDTH/2 + ROCK_SIZE){
            if(ydis <= PLAYER_HEIGHT/2){
                dead = true;
            }else if(ydis <= PLAYER_HEIGHT/2 + ROCK_SIZE){
                var c2 = Math.pow(xdis - PLAYER_WIDTH/2, 2) + Math.pow(ydis - PLAYER_HEIGHT/2, 2);
                 if(Math.sqrt(c2) <= ROCK_SIZE){
                     dead = true;
                 }
            }
        }
    });
}

function updatePlayerDistance(object){
    if(object.position.x > distance){
        distance = Math.round(object.position.x);
        document.getElementById("distance").innerHTML = 
         "Distance: " + distance;
    }
}