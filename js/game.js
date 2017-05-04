


var render = function () {
    if(!dead){
        checkForNewGrounds(player, lastGroundX, lastGroundY)
        followCamera(player);
        updateCurrentGround(player.position.x);
        fall(player, getGroundY(player, currentGround) - 2.46) 
        move(player);
        checkForPoints(player);
        // moveRocks();
        checkForRocks(player);
        updatePlayerDistance(player);
        requestAnimationFrame( render );
        renderer.render(scene, camera);
    }
};

render();



