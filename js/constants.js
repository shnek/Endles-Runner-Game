//Considered as the biggest number ever
const BIG_INT = 999999999;

//Speed for the player to walk
const SPEED = 0.07;
//Gravity force
const G_FORCE = 0.003;


// COLORS
const PLAYER_COLOR = 0xD62246;
const GROUND_COLOR = 0x0E7C7B;
const ROCK_COLOR = 0x4B1D3F;
const COIN_COLOR = 0x00A8E8;

//Constants for camera alignment
const CAMERA_DIFF = 1;
const CAMERA_X_DIFF = 1;
const CAMERA_Y_DIFF = 0.5;
const CAMERA_DISTANCE = 5;

const PLAYER_WIDTH = 0.2;
const PLAYER_HEIGHT = 0.5;

const NEW_GROUND_DISTANCE = 10;

const HORIZONTAL_SPEED = 0.003;
const TOP_SPEED = 0.09;

const ROCK_SIZE = 0.2;


var pointArray = [];

var distance = 0;

var camFactor = 150;
var zoomFactor = 800;

var dead = true;