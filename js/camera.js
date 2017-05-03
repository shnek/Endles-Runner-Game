var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var gameWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var gameHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var camera = new THREE.OrthographicCamera(-gameWidth/camFactor, gameWidth/camFactor, gameHeight/camFactor, -gameHeight/camFactor, 0.1, 1000 );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

//Automatic window resizing with setting to the same width on every screen.
function onWindowResize(){
    gameWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    gameHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    renderer.setSize( gameWidth, gameHeight ); 
    
    camera.left = -gameWidth/camFactor;
    camera.right = gameWidth/camFactor;
    camera.top = gameHeight/camFactor;
    camera.bottom = -gameHeight/camFactor;
    camera.zoom = gameWidth / zoomFactor;

    camera.updateProjectionMatrix();

}

// Setting basic parameters for the camera
camera.position.z = CAMERA_DISTANCE;
camera.zoom = gameWidth/zoomFactor;
camera.updateProjectionMatrix();


// Function follows the object in X and Y axis if its further than the CAMERA_DIFF constant.
function followCamera(object){

    var xdiff = camera.position.x - object.position.x;
    var ydiff = camera.position.y - object.position.y;

    if(xdiff > CAMERA_X_DIFF){
        camera.position.x = object.position.x + CAMERA_X_DIFF;
    }if(xdiff < -CAMERA_X_DIFF){
        camera.position.x = object.position.x - CAMERA_X_DIFF;
    }if(ydiff  > CAMERA_Y_DIFF){
        camera.position.y = object.position.y + CAMERA_Y_DIFF;
    }if(ydiff < -CAMERA_Y_DIFF){
        camera.position.y = object.position.y - CAMERA_Y_DIFF;
    }
}