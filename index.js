"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_LOG = "es_feature_symbol_default_log";

var NightVision = function () {
  function NightVision() {
    _classCallCheck(this, NightVision);
  }

  _createClass(NightVision, [{
    key: "init",
    value: function init() {
      {
        var isBrowser = !(typeof process !== "undefined" && typeof require !== "undefined");
        if (!isBrowser) {
          console.log("NightVision only support browser.");
          return false;
        }
      }

      var $ = function $(e) {
        return document.querySelector(e);
      };

      var wrap = document.createElement("div");
      wrap.setAttribute("id", "nightvision_logs");
      $("body").append(wrap);

      var logs = document.createElement("ul");
      logs.setAttribute("id", "nightvision_logs_body");
      $("#nightvision_logs").append(logs);

      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      this.setStyle();

      if (isIOS) {
        window.addEventListener("scroll", function () {
          $("#nightvision_logs").style.transform = "translateY(" + window.scrollY + "px)";
        });
        $("#nightvision_logs").style.position = "absolute";
        $("#nightvision_logs").style.bottom = "-70px";
      }

      console[DEFAULT_LOG] = console.log;
      console.log = function () {
        var _console;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_console = console)[DEFAULT_LOG].apply(_console, args);
        var log = document.createElement("li");
        log.innerText = "> ";
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var arg = _step.value;

            log.innerText += JSON.stringify(arg, false, "\t") + " ";
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        $("#nightvision_logs #nightvision_logs_body").append(log);
        $("#nightvision_logs").scrollTop = "" + $("#nightvision_logs_body").clientHeight;
      };
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      var $ = function $(e) {
        return document.querySelector(e);
      };
      var font = document.createElement("link");
      font.setAttribute("href", "https://fonts.googleapis.com/css?family=Source+Code+Pro");
      font.setAttribute("rel", "stylesheet");

      var style = document.createElement("style");
      style.innerText = "\n    #nightvision_logs{\n      position: fixed;\n      left: 0;\n      bottom: 0;\n      margin: 0;\n      padding: 0;\n      width: 100%;\n      height: 100px;\n      overflow: auto;\n      background: #111;\n      color: #fff;\n      font-weight: normal;\n      z-index: 100000000000000000000000000000000;\n      font-family: 'Source Code Pro', sans-serif;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    #nightvision_logs #nightvision_logs_body{\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    #nightvision_logs li{\n      padding: 10px;\n      border-bottom: solid 1px #999;\n    }\n    ".replace(/\n/g, "").replace(/  /g, "");

      $("head").append(font);
      $("head").append(style);
    }
  }]);

  return NightVision;
}();

