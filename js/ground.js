
const MIN_HEIGHT = 10;

var vertices;
var lastGround; //possible remove?

var grounds = [];
var currentGround;

var lastGroundX = 10;
var lastGroundY = 1;
var lastGroundYhelper = 0;

var rocks = [];

var x = 0; y = 0;


function createGround(leftX, rightX, leftY){
    var newGround = new THREE.Shape();
    // Starting in a proper place
    newGround.moveTo(leftX, leftY - MIN_HEIGHT);
    newGround.lineTo(leftX, leftY);

    // Setting up variables for the loop
    var distance = rightX - leftX;
    var A = leftY;
    var B = Math.random();
    var Y = lastGroundYhelper;  // Y is the variable to make sure that two quadradic curves merged together look smooth
    
    for(i = 0; i < distance; i++){
        newGround.quadraticCurveTo(
            leftX + i + 0.5, 
            A + Y,
            leftX + i + 1,
            A + B
            );
        A += B;
        Y = (B - Y)*0.9;
        lastGroundYhelper = Y;
        B = Math.random()/2;    
    }
    // Finishing the mesh in a proper place
    newGround.lineTo(rightX, leftY - MIN_HEIGHT);

    var geometry = new THREE.ShapeGeometry( newGround );
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000 } );
    ground = new THREE.Mesh(geometry, material);

    //Adding additional variables that will be used in other code
    ground.leftX = leftX;
    ground.rightX = rightX;

    grounds.push(ground);
    scene.add(ground);

    lastGroundY = A;

    generatePoints(leftX, rightX);
    generateRocks(leftX, rightX);
    return lastGroundY;
}



function generatePoints(leftX, rightX){
    var random = Math.random();
    var pointGeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.01 );
    var pointMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    random *= 1 + (rightX - leftX)/2
    for(i = 0; i < 5; i++){
        var point = new THREE.Mesh( pointGeometry, pointMaterial );
        point.position.x = leftX + random + 0.5 * i;
        point.position.y = getGroundY(point, ground) + 0.5;
        pointArray.push(point);
        scene.add(point);
    }
}

function generateRocks(leftX, rightX){

    var random = Math.random();
    var rockGeometry = new THREE.CircleGeometry(ROCK_SIZE, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var circle = new THREE.Mesh(rockGeometry, material);
    random *= 1 + (rightX - leftX) / 2
    circle.position.x = leftX + random;
    circle.position.y = getGroundY(circle, ground) + 0.7;
    rocks.push(circle);
    scene.add(circle);
    circle.falling = true;
}
 
function moveRocks(){
    rocks.forEach(rock => {
        rock.position.x -= SPEED/2;
        var desiredY = getGroundYHelper(rock);
        if(desiredY){
            rock.position.y = desiredY + ROCK_SIZE;
        }else{
            scene.remove(rock);
            rocks.splice(rocks.indexOf(rock), 1);
        }
    })
}


function getGroundY(object, ground){
    vertices = ground.geometry.vertices;
    var xPosition = object.position.x;
    var tempLeft = BIG_INT;
    var tempRight = BIG_INT;
    var desiredYleft;
    var desiredYright;

    vertices.forEach(function(element) {
        if(element.x > xPosition && element.x - xPosition < tempLeft && element.y != 0){
            tempLeft = Math.abs(element.x - xPosition);
            desiredYleft = element.y
        }
        if(element.x < xPosition && xPosition - element.x < tempRight && element.y != 0){
            tempRight = Math.abs(element.x - xPosition);
            desiredYright = element.y
        }

    }, this);
    var lowest = object.position.y - 5;
   
    // Making sure that even if we are on the border of the ground, the output is not distorted by a value that is not found
    if(desiredYleft < lowest){
        return desiredYright;
    }
    if(desiredYright < lowest){
        return desiredYleft;
    }
    return (desiredYleft + desiredYright)/2;
}

// Function does the same as the above getGroundY, but without knowing the current ground
function getGroundYHelper(object){
    var desiredX = object.position.x;
    var desiredGround;
    grounds.forEach(ground => {
        if(ground.leftX <= desiredX && ground.rightX > desiredX){
            desiredGround = ground;
            
        }
    });
    if(desiredGround){
        return getGroundY(object, desiredGround);
    } else {
        return 0;
    }
}


function checkForNewGrounds(object, oldX, oldY, lastY){
    if(oldX - object.position.x < NEW_GROUND_DISTANCE){
        lastGroundX = oldX + 20;
        lastGroundY = createGround(oldX, oldX + 20, oldY, lastY);
    }
}

function updateCurrentGround(x){
    var result = grounds.filter(function(ground){
        return (ground.leftX < x && ground.rightX >= x);
    })
    if(result[0] != currentGround){
        currentGround = result[0];
    }
}