


var render = function () {
    checkForNewGrounds(player, lastGroundX, lastGroundY)
    followCamera(player);
    updateCurrentGround(player.position.x);
    fall(player, getGroundY(player, currentGround) - 2.46) 
    move(player);
    requestAnimationFrame( render );
    checkForPoints(player);
    moveRocks();
    updatePlayerDistance(player);
    renderer.render(scene, camera);
};


render();



