document.getElementById("menu").addEventListener('click', function () {
    start();
})
var menu = document.getElementById("menuContainer");

var render = function () {
    if (!dead) {
        checkForNewGrounds(player, lastGroundX, lastGroundY)
        followCamera(player);
        updateCurrentGround(player.position.x);
        fall(player, getGroundY(player, currentGround) - 2.46)
        move(player);
        checkForPoints(player);
        moveRocks();
        checkForRocks(player);
        updatePlayerDistance(player);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    } else {
        menu.style.visibility = 'visible';
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
};

render();

function start() {
    scene.children.length = 0;
    database.ref('users/' + localStorage.getItem("shnek-name")).set({
        highscore: points
    });
    flushData();

    createGround(-10, lastGroundX, lastGroundY);
    // Create starting level
    createPlayer();
    dead = false;
    menu.style.visibility = 'hidden';

}

function flushData() {
    pointArray.length = 0;
    pressed.length = 0;
    grounds.length = 0;
    player.speed = 0;

    currentGround = {};

    lastGroundX = 10;
    lastGroundY = 1;
    lastGroundYhelper = 0;

    rocks.length = 0;

}
