/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _celestar = __webpack_require__(1);

	var _celestar2 = _interopRequireDefault(_celestar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scene, camera, controls, renderer;
	var mesh;
	var radius;

	init();
	animate();

	function init() {
	    radius = 128;

	    scene = new THREE.Scene();

	    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	    camera.position.z = 256;

	    controls = new THREE.OrbitControls(camera);
	    controls.addEventListener('change', render);

	    mesh = new _celestar2.default(radius);
	    scene.add(mesh);

	    var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	    directionalLight.position.set(0, 100, 100);
	    scene.add(directionalLight);

	    renderer = new THREE.WebGLRenderer();
	    renderer.setSize(window.innerWidth, window.innerHeight);

	    document.body.appendChild(renderer.domElement);

	    window.addEventListener('resize', onWindowResize, false);
	}

	function onWindowResize() {

	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();

	    renderer.setSize(window.innerWidth, window.innerHeight);

	    render();
	}

	function animate() {
	    requestAnimationFrame(animate);

	    mesh.rotation.y += 0.0009;
	    renderer.render(scene, camera);
	    controls.update();
	}

	function render() {
	    renderer.render(scene, camera);
	    console.log(mesh.geometry);
	    var iter = distanceVector(camera.position, mesh.position) - radius;
	    if (iter > 0) {
	        if (iter < 100) {
	            var index = Math.floor(iter / 10);
	            mesh.geometry = mesh.geometries[index];
	        }
	    }
	    console.log(iter);
	}

	function distanceVector(v1, v2) {
	    var dx = v1.x - v2.x;
	    var dy = v1.y - v2.y;
	    var dz = v1.z - v2.z;

	    return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _celestarGeometry = __webpack_require__(2);

	var _celestarGeometry2 = _interopRequireDefault(_celestarGeometry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Celestar = function (_THREE$Mesh) {
	    _inherits(Celestar, _THREE$Mesh);

	    function Celestar(radius) {
	        _classCallCheck(this, Celestar);

	        var _this = _possibleConstructorReturn(this, (Celestar.__proto__ || Object.getPrototypeOf(Celestar)).call(this));

	        _this.geometries = [];
	        for (var i = 1; i < 12; i++) {
	            var num = 18 - i;
	            _this.geometries.push(new THREE.SphereGeometry(radius, num * num, num * num));
	        }
	        _this.geometry = new THREE.SphereGeometry(radius, 32, 32);

	        // this.geometry = new CelestarGeometry(128);
	        THREE.ImageUtils.crossOrigin = '';
	        var mapOverlay = THREE.ImageUtils.loadTexture('earth.jpeg');
	        _this.material = new THREE.MeshNormalMaterial({ map: mapOverlay, wireframe: true });
	        return _this;
	    }

	    return Celestar;
	}(THREE.Mesh);

	exports.default = Celestar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CelestarGeometry = function (_THREE$Geometry) {
	    _inherits(CelestarGeometry, _THREE$Geometry);

	    function CelestarGeometry(size) {
	        _classCallCheck(this, CelestarGeometry);

	        var _this = _possibleConstructorReturn(this, (CelestarGeometry.__proto__ || Object.getPrototypeOf(CelestarGeometry)).call(this));

	        for (var i = 0; i < size; i++) {
	            for (var j = 0; j < size; j++) {
	                var vector = new THREE.Vector3(i, j, 0);
	                _this.vertices.push(vector);
	            }
	        }

	        for (var i = 0; i < size - 1; i++) {
	            for (var j = 0; j < size - 1; j++) {
	                _this.faces.push(new THREE.Face3(i * size + j, i * size + j + 1, (i + 1) * size + j));
	                _this.faces.push(new THREE.Face3(i * size + j + 1, (i + 1) * size + j, (i + 1) * size + j + 1));
	            }
	        }
	        console.log(_this.vertices);
	        console.log(_this.faces);

	        _this.computeFaceNormals();
	        return _this;
	    }

	    return CelestarGeometry;
	}(THREE.Geometry);

	exports.default = CelestarGeometry;

/***/ }
/******/ ]);