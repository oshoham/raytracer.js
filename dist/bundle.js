/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _objects = __webpack_require__(2);
	
	var _renderer = __webpack_require__(5);
	
	var _renderer2 = _interopRequireDefault(_renderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById('canvas');
	var width = 640 * 0.5;
	var height = 480 * 0.5;
	
	canvas.width = width;
	canvas.height = height;
	canvas.style.cssText = 'width:' + width * 2 + 'px;height:' + height * 2 + 'px';
	
	var renderer = new _renderer2.default(canvas, function (progress) {
	  progress *= 0.001;
	
	  var scene = {
	    camera: {
	      point: new _vector2.default(0.0, 1.8, 10),
	      fieldOfView: 45,
	      direction: new _vector2.default(0.0, 3.0, 0.0)
	    },
	    lights: [new _vector2.default(-30, -10, 20)],
	    objects: [new _objects.Sphere({
	      center: new _vector2.default(0, 3.5, -3),
	      radius: 3,
	      color: new _vector2.default(155, 200, 155),
	      material: {
	        specular: 0.2,
	        lambert: 0.7,
	        ambient: 0.1
	      }
	    }), new _objects.Sphere({
	      center: new _vector2.default(Math.sin(progress * 0.1) * 3.5, 2, -3 + Math.cos(progress * 0.1) * 3.5),
	      radius: 0.2,
	      color: new _vector2.default(155, 155, 155),
	      material: {
	        specular: 0.1,
	        lambert: 0.9,
	        ambient: 0.0
	      }
	    }), new _objects.Sphere({
	      center: new _vector2.default(Math.sin(progress * 0.2) * 4, 3, -3 + Math.cos(progress * 0.2) * 4),
	      radius: 0.1,
	      color: new _vector2.default(255, 255, 255),
	      material: {
	        specular: 0.2,
	        lambert: 0.7,
	        ambient: 0.1
	      }
	    })]
	  };
	
	  return scene;
	});
	
	renderer.play();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * Heavily cribbed from:
	 *   https://github.com/processing/p5.js/blob/master/src/math/p5.Vector.js
	 *   https://github.com/tmcw/literate-raytracer/blob/gh-pages/vector.js
	 */
	
	var Vector = function () {
	  function Vector() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	    _classCallCheck(this, Vector);
	
	    this.x = x;
	    this.y = y;
	    this.z = z;
	  }
	
	  _createClass(Vector, [{
	    key: "copy",
	    value: function copy() {
	      return new Vector(this.x, this.y, this.z);
	    }
	  }, {
	    key: "set",
	    value: function set() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	      if (x instanceof Vector) {
	        this.x = x.x || 0;
	        this.y = x.y || 0;
	        this.z = x.z || 0;
	        return this;
	      }
	
	      this.x = x;
	      this.y = y;
	      this.z = z;
	      return this;
	    }
	  }, {
	    key: "dot",
	    value: function dot(v) {
	      return this.x * (v.x || 0) + this.y * (v.y || 0) + this.z * (v.z || 0);
	    }
	  }, {
	    key: "cross",
	    value: function cross(v) {
	      return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	    }
	  }, {
	    key: "mult",
	    value: function mult() {
	      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	      this.x *= t;
	      this.y *= t;
	      this.z *= t;
	      return this;
	    }
	  }, {
	    key: "div",
	    value: function div(t) {
	      this.x /= t;
	      this.y /= t;
	      this.z /= t;
	      return this;
	    }
	  }, {
	    key: "mag",
	    value: function mag() {
	      return Math.sqrt(this.dot(this));
	    }
	  }, {
	    key: "normalize",
	    value: function normalize() {
	      return this.mag() === 0 ? this : this.div(this.mag());
	    }
	  }, {
	    key: "add",
	    value: function add(v) {
	      this.x += v.x || 0;
	      this.y += v.y || 0;
	      this.z += v.z || 0;
	      return this;
	    }
	  }, {
	    key: "sub",
	    value: function sub(v) {
	      this.x -= v.x || 0;
	      this.y -= v.y || 0;
	      this.z -= v.z || 0;
	      return this;
	    }
	  }, {
	    key: "dist",
	    value: function dist(v) {
	      var d = v.copy().sub(this);
	      return d.mag();
	    }
	  }, {
	    key: "equals",
	    value: function equals(v) {
	      return this.x === v.x && this.y === v.y && this.z === v.z;
	    }
	  }, {
	    key: "lerp",
	    value: function lerp(v, amount) {
	      this.x += (v.x - this.x) * amount || 0;
	      this.y += (v.y - this.y) * amount || 0;
	      this.z += (v.z - this.z) * amount || 0;
	      return this;
	    }
	  }, {
	    key: "setMag",
	    value: function setMag(n) {
	      return this.normalize().mult(n);
	    }
	  }, {
	    key: "limit",
	    value: function limit(max) {
	      var magSq = this.dot(this);
	      if (magSq > max * max) {
	        this.setMag(max);
	      }
	      return this;
	    }
	  }, {
	    key: "heading",
	    value: function heading() {
	      return Math.atan2(this.y, this.x); // in radians
	    }
	  }, {
	    key: "rotate",
	    value: function rotate(angle) {
	      var newHeading = this.heading() + angle;
	      var mag = this.mag();
	      this.x = Math.cos(newHeading) * mag;
	      this.y = Math.sin(newHeading) * mag;
	      return this;
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.x, this.y, this.z];
	    }
	  }], [{
	    key: "dot",
	    value: function dot(a, b) {
	      return a.dot(b);
	    }
	  }, {
	    key: "cross",
	    value: function cross(a, b) {
	      return a.cross(b);
	    }
	  }, {
	    key: "mult",
	    value: function mult(a, t) {
	      return a.copy().mult(t);
	    }
	  }, {
	    key: "div",
	    value: function div(a, t) {
	      return a.copy().div(t);
	    }
	  }, {
	    key: "mag",
	    value: function mag(a) {
	      return a.mag();
	    }
	  }, {
	    key: "normalize",
	    value: function normalize(a) {
	      return Vector.div(a, Vector.mag(a));
	    }
	  }, {
	    key: "add",
	    value: function add(a, b) {
	      return a.copy().add(b);
	    }
	  }, {
	    key: "sub",
	    value: function sub(a, b) {
	      return a.copy().sub(b);
	    }
	  }, {
	    key: "dist",
	    value: function dist(a, b) {
	      return a.dist(b);
	    }
	  }, {
	    key: "lerp",
	    value: function lerp(a, b, amount) {
	      return a.copy().lerp(b, amount);
	    }
	  }, {
	    key: "angleBetween",
	    value: function angleBetween(a, b) {
	      return Math.acos(a.dot(b) / (a.mag() * b.mag())); // in radians
	    }
	  }, {
	    key: "reflectThrough",
	    value: function reflectThrough(a, normal) {
	      var d = Vector.mult(normal, Vector.dot(a, normal));
	      return Vector.sub(Vector.mult(d, 2), a);
	    }
	  }, {
	    key: "UP",
	    get: function get() {
	      return new Vector(0.0, 1.0, 0.0);
	    }
	  }, {
	    key: "ZERO",
	    get: function get() {
	      return new Vector(0.0, 0.0, 0.0);
	    }
	  }]);
	
	  return Vector;
	}();
	
	exports.default = Vector;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sphere = undefined;
	
	var _sphere = __webpack_require__(3);
	
	var _sphere2 = _interopRequireDefault(_sphere);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Sphere = _sphere2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _geometricObject = __webpack_require__(4);
	
	var _geometricObject2 = _interopRequireDefault(_geometricObject);
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sphere = function (_GeometricObject) {
	  _inherits(Sphere, _GeometricObject);
	
	  function Sphere(_ref) {
	    var center = _ref.center,
	        radius = _ref.radius,
	        color = _ref.color,
	        material = _ref.material;
	
	    _classCallCheck(this, Sphere);
	
	    var _this = _possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, color, material));
	
	    _this.center = center;
	    _this.radius = radius;
	    return _this;
	  }
	
	  _createClass(Sphere, [{
	    key: 'calculateIntersection',
	    value: function calculateIntersection(ray) {
	      var eyeToCenter = _vector2.default.sub(this.center, ray.origin);
	      var v = _vector2.default.dot(eyeToCenter, ray.direction);
	      var eoDot = _vector2.default.dot(eyeToCenter, eyeToCenter);
	      var discriminant = this.radius * this.radius - eoDot + v * v;
	
	      if (discriminant < 0) {
	        return;
	      }
	
	      return v - Math.sqrt(discriminant);
	    }
	  }, {
	    key: 'calculateNormal',
	    value: function calculateNormal(pos) {
	      return _vector2.default.normalize(_vector2.default.sub(pos, this.center));
	    }
	  }]);
	
	  return Sphere;
	}(_geometricObject2.default);
	
	exports.default = Sphere;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GeometricObject = function () {
	  function GeometricObject(color, material) {
	    _classCallCheck(this, GeometricObject);
	
	    this.color = color;
	    this.material = material;
	  }
	
	  _createClass(GeometricObject, [{
	    key: "calculateIntersection",
	    value: function calculateIntersection() {
	      return undefined;
	    }
	  }, {
	    key: "calculateNormal",
	    value: function calculateNormal() {
	      return undefined;
	    }
	  }]);
	
	  return GeometricObject;
	}();
	
	exports.default = GeometricObject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _ray = __webpack_require__(6);
	
	var _ray2 = _interopRequireDefault(_ray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_TRACE_DEPTH_LIMIT = 3;
	var DEFAULT_SCENE = {
	  camera: {
	    point: new _vector2.default(0.0, 0.0, 0.0),
	    fieldOfView: 45,
	    direction: new _vector2.default(0.0, 0.0, 0.0)
	  },
	  lights: [],
	  objects: []
	};
	
	var Renderer = function () {
	  function Renderer(canvas) {
	    var generateSceneCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	      return DEFAULT_SCENE;
	    };
	
	    _classCallCheck(this, Renderer);
	
	    var width = canvas.width,
	        height = canvas.height;
	
	
	    this.canvas = canvas;
	    this.context = canvas.getContext('2d');
	    this.data = this.context.getImageData(0, 0, width, height);
	    this.generateScene = generateSceneCallback;
	    this.traceDepthLimit = DEFAULT_TRACE_DEPTH_LIMIT;
	    this.isPlaying = false;
	    this.startTime = null;
	  }
	
	  _createClass(Renderer, [{
	    key: 'render',
	    value: function render(scene) {
	      var camera = scene.camera;
	      var _canvas = this.canvas,
	          width = _canvas.width,
	          height = _canvas.height;
	
	      // all the raytracing stuff goes here
	
	      var eyeVector = _vector2.default.normalize(_vector2.default.sub(camera.direction, camera.point));
	      var vpRight = _vector2.default.normalize(_vector2.default.cross(eyeVector, _vector2.default.UP));
	      var vpUp = _vector2.default.normalize(_vector2.default.cross(vpRight, eyeVector));
	
	      var fovRadians = Math.PI * (camera.fieldOfView / 2) / 180;
	      var heightWidthRatio = height / width;
	      var halfWidth = Math.tan(fovRadians);
	      var halfHeight = heightWidthRatio * halfWidth;
	      var cameraWidth = halfWidth * 2;
	      var cameraHeight = halfHeight * 2;
	      var pixelWidth = cameraWidth / (width - 1);
	      var pixelHeight = cameraHeight / (height - 1);
	
	      var ray = new _ray2.default(camera.point);
	      for (var x = 0; x < width; x++) {
	        for (var y = 0; y < height; y++) {
	          // turn the raw pixel x and y values into values from -1 to 1
	          // and use these values to scale the facing-right and facing-up
	          // vectors so that we generate versions of the `eyeVector` that are
	          // skewed in each necessary direction.
	          var xComp = _vector2.default.mult(vpRight, x * pixelWidth - halfWidth);
	          var yComp = _vector2.default.mult(vpUp, y * pixelHeight - halfHeight);
	
	          ray.direction = _vector2.default.normalize(_vector2.default.add(eyeVector, _vector2.default.add(xComp, yComp)));
	
	          var color = this.trace(ray, scene, 0);
	          var index = x * 4 + y * width * 4;
	          this.data.data[index + 0] = color.x;
	          this.data.data[index + 1] = color.y;
	          this.data.data[index + 2] = color.z;
	          this.data.data[index + 3] = 255;
	        }
	      }
	
	      this.context.putImageData(this.data, 0, 0);
	    }
	  }, {
	    key: 'trace',
	    value: function trace(ray, scene, depth) {
	      if (depth > this.traceDepthLimit) {
	        return;
	      }
	
	      var _intersectScene = this.intersectScene(ray, scene),
	          _intersectScene2 = _slicedToArray(_intersectScene, 2),
	          dist = _intersectScene2[0],
	          object = _intersectScene2[1];
	
	      if (dist === Infinity) {
	        return new _vector2.default(255, 255, 255);
	      }
	
	      // The pointAtTime is another way of saying the 'intersection point'
	      // of this ray into this object. We compute this by simply taking
	      // the direction of the ray and making it as long as the distance
	      // returned by the intersection check.
	      var pointAtTime = _vector2.default.add(ray.origin, _vector2.default.mult(ray.direction, dist));
	
	      return this.surface(ray, scene, object, pointAtTime, object.calculateNormal(pointAtTime), depth);
	    }
	  }, {
	    key: 'intersectScene',
	    value: function intersectScene(ray, scene) {
	      return scene.objects.reduce(function (closest, object) {
	        var dist = object.calculateIntersection(ray);
	        return dist !== undefined && dist < closest[0] ? [dist, object] : closest;
	      }, [Infinity, null]);
	    }
	  }, {
	    key: 'surface',
	    value: function surface(ray, scene, object, pointAtTime, normal, depth) {
	      var _this = this;
	
	      var color = _vector2.default.ZERO;
	      var lambertAmount = 0;
	
	      if (object.material.lambert) {
	        scene.lights.forEach(function (lightPoint) {
	          // First: can we see the light? If not, this is a shadowy area
	          // and it gets no light from the lambert shading process.
	          if (!_this.isLightVisible(pointAtTime, scene, lightPoint)) {
	            return;
	          }
	          // Otherwise, calculate the lambertian reflectance, which
	          // essentially is a 'diffuse' lighting system - direct light
	          // is bright, and from there, less direct light is gradually,
	          // beautifully, less light.
	          var contribution = _vector2.default.dot(_vector2.default.normalize(_vector2.default.sub(lightPoint, pointAtTime)), normal);
	          // sometimes this formula can return negatives, so we check:
	          // we only want positive values for lighting.
	          if (contribution > 0) {
	            lambertAmount += contribution;
	          }
	        });
	      }
	
	      if (object.material.specular) {
	        // This is basically the same thing as what we did in render(), just
	        // instead of looking from the viewpoint of the camera, we're looking
	        // from a point on the surface of a shiny object, seeing what it sees
	        // and making that part of a reflection.
	        var reflectedRay = new _ray2.default(pointAtTime, _vector2.default.reflectThrough(ray.direction, normal));
	        var reflectedColor = this.trace(reflectedRay, scene, depth + 1);
	        if (reflectedColor) {
	          color = _vector2.default.add(color, _vector2.default.mult(reflectedColor, object.material.specular));
	        }
	      }
	
	      // lambert should never 'blow out' the lighting of an object,
	      // even if the ray bounces between a lot of things and hits lights
	      lambertAmount = Math.min(1, lambertAmount);
	
	      // Ambient colors shine bright regardless of whether there's a light visible -
	      // a circle with a totally ambient blue color will always just be a flat blue
	      // circle.
	      return _vector2.default.add(_vector2.default.add(color, _vector2.default.mult(object.color, lambertAmount * object.material.lambert)), _vector2.default.mult(object.color, object.material.ambient));
	    }
	  }, {
	    key: 'isLightVisible',
	    value: function isLightVisible(point, scene, light) {
	      var _intersectScene3 = this.intersectScene(new _ray2.default(point, _vector2.default.normalize(_vector2.default.sub(point, light))), scene),
	          _intersectScene4 = _slicedToArray(_intersectScene3, 1),
	          dist = _intersectScene4[0];
	
	      return dist > -0.005;
	    }
	  }, {
	    key: 'tick',
	    value: function tick(timestamp) {
	      if (!this.startTime) {
	        this.startTime = timestamp;
	      }
	
	      var progress = timestamp - this.startTime;
	      var scene = this.generateScene(progress);
	
	      this.render(scene);
	
	      if (this.isPlaying) {
	        requestAnimationFrame(this.tick.bind(this));
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.isPlaying = true;
	      requestAnimationFrame(this.tick.bind(this));
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.isPlaying = false;
	    }
	  }]);
	
	  return Renderer;
	}();
	
	exports.default = Renderer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector = __webpack_require__(1);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ray = function () {
	  function Ray() {
	    var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector2.default(0, 0, 0);
	    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _vector2.default(0, 0, 1.0);
	
	    _classCallCheck(this, Ray);
	
	    if (origin instanceof Ray) {
	      origin = origin.origin;
	      direction = origin.direction;
	    }
	    this.origin = origin;
	    this.direction = direction;
	  }
	
	  _createClass(Ray, [{
	    key: 'set',
	    value: function set(r) {
	      this.origin = r.origin, this.direction = r.direction;
	    }
	  }]);
	
	  return Ray;
	}();
	
	exports.default = Ray;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map