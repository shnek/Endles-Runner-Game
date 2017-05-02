var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var gameWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var gameHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

//#TODO: add automatic resizing to the full window, when browser window is being resized. Add a little bit customization, since usually this does not fit the full window.
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    gameWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    gameHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    renderer.setSize( gameWidth, gameHeight ); 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

camera.position.z = CAMERA_DISTANCE;

// Function follows the object in X and Y axis if its further than the CAMERA_DIFF constant.
function followCamera(object){

    var xdiff = camera.position.x - object.position.x;
    var ydiff = camera.position.y - object.position.y;

    if(xdiff > CAMERA_DIFF){
        camera.position.x = object.position.x + CAMERA_DIFF;
    }if(xdiff < -CAMERA_DIFF){
        camera.position.x = object.position.x - CAMERA_DIFF;
    }if(ydiff  > CAMERA_DIFF){
        camera.position.y = object.position.y + CAMERA_DIFF;
    }if(ydiff < -CAMERA_DIFF){
        camera.position.y = object.position.y - CAMERA_DIFF;
    }
}