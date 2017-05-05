document.getElementById("menu").addEventListener('click', function(){
    start();
})
var menu = document.getElementById("menu");

var render = function () {
    if(!dead){
        checkForNewGrounds(player, lastGroundX, lastGroundY)
        followCamera(player);
        updateCurrentGround(player.position.x);
        fall(player, getGroundY(player, currentGround) - 2.46) 
        move(player);
        checkForPoints(player);
        moveRocks();
        checkForRocks(player);
        updatePlayerDistance(player);
        requestAnimationFrame( render );
        renderer.render(scene, camera);
    }else{
        menu.style.visibility = 'visible';
        requestAnimationFrame( render );
        renderer.render(scene, camera);
    }
};

render();

function start(){
    scene.children.length = 0;
    flushData();

    createGround(-10, lastGroundX, lastGroundY);
    // Create starting level
    createPlayer();
    console.log("Starting up")
    dead = false;
    menu.style.visibility = 'hidden';
    
}

function flushData(){
    pointArray.length = 0;
    pressed.length = 0;
    grounds.length = 0;

    currentGround = {};

    lastGroundX = 10;
    lastGroundY = 1;
    lastGroundYhelper = 0;

    rocks.length = 0;

}



