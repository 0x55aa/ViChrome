(function() {
  var editableList, g, include, levels, objectList, _ref;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  if ((_ref = this.vichrome) == null) {
    this.vichrome = {};
  }
  g = this.vichrome;
  g.VICHROME_VERSION = "0.6.3";
  g.object = function(obj) {
    var F;
    F = function() {};
    F.prototype = obj;
    return new F;
  };
  g.extend = function(mixin, obj) {
    var member, name;
    if (obj == null) {
      obj = {};
    }
    for (name in mixin) {
      member = mixin[name];
      obj[name] = member;
    }
    return obj;
  };
  g.extendDeep = function(parent, child) {
    var astr, member, name, toStr;
    if (child == null) {
      child = {};
    }
    toStr = Object.prototype.toString;
    astr = "[object Array]";
    for (name in parent) {
      member = parent[name];
      if (typeof member === "object") {
        child[name] = toStr.call(member) === astr ? [] : {};
        g.extendDeep(member, child[name]);
      } else {
        child[name] = member;
      }
    }
    return child;
  };
  include = function(klass, mixin) {
    return extend(klass.prototype, mixin);
  };
  g.logLevels = {
    DEBUG: 1,
    WARNING: 2,
    ERROR: 3,
    FATAL: 4,
    NONE: 5
  };
  g.LOG_LEVEL = g.logLevels.DEBUG;
  levels = g.logLevels;
  g.logger = {
    printLog: function(a, o) {
      if (o) {
        return console.log("vichrome: " + a + " :%o", o);
      } else {
        return console.log("vichrome:" + a);
      }
    },
    d: function(a, o) {
      if (g.LOG_LEVEL <= g.logLevels.DEBUG) {
        return this.printLog(a, o);
      }
    },
    w: function(a, o) {
      if (g.LOG_LEVEL <= g.logLevels.WARNING) {
        return this.printLog(a, o);
      }
    },
    e: function(a, o) {
      if (g.LOG_LEVEL <= g.logLevels.ERROR) {
        return this.printLog(a, o);
      }
    },
    f: function(a, o) {
      if (g.LOG_LEVEL <= g.logLevels.FATAL) {
        return this.printLog(a, o);
      }
    }
  };
  g.util = {};
  editableList = ["TEXT", "PASSWORD", "NUMBER", "SEARCH", "TEL", "URL", "EMAIL", "TIME", "DATETIME", "DATETIME-LOCAL", "DEATE", "WEEK", "COLOR"];
  objectList = ["EMBED", "OBJECT", "APPLET"];
  g.util.isEditable = function(target) {
    var ignoreList, _ref2, _ref3, _ref4;
    ignoreList = ["TEXTAREA"];
    if (target == null) {
      return false;
    }
    if (target.isContentEditable) {
      return true;
    }
    if (_ref2 = target.nodeName, __indexOf.call(ignoreList, _ref2) >= 0) {
      return true;
    }
    if (((_ref3 = target.nodeName) != null ? _ref3.toUpperCase() : void 0) === "INPUT" && (_ref4 = target.type.toUpperCase(), __indexOf.call(editableList, _ref4) >= 0)) {
      return true;
    }
    return false;
  };
  g.util.isEmbededObject = function(target) {
    var _ref2;
    if (target == null) {
      return false;
    }
    if (_ref2 = target.nodeName, __indexOf.call(objectList, _ref2) >= 0) {
      return true;
    }
    return false;
  };
  g.util.getPlatform = function() {
    var platform;
    if (navigator.userAgent.indexOf("Mac") >= 0) {
      platform = "Mac";
    } else if (navigator.userAgent.indexOf("Linux") >= 0) {
      platform = "Linux";
    } else if (navigator.userAgent.indexOf("Win") >= 0) {
      platform = "Windows";
    } else {
      platform = "";
    }
    g.util.getPlatform = function() {
      return platform;
    };
    return platform;
  };
  g.util.dispatchKeyEvent = function(target, identifier, primary, shift, alt) {
    var e, modifier;
    e = document.createEvent("KeyboardEvent");
    modifier = "";
    if (primary) {
      modifier += "Meta ";
    }
    if (shift) {
      modifier += "Shift ";
    }
    if (alt) {
      modifier += "Alt";
    }
    e.initKeyboardEvent("keydown", true, true, window, identifier, 0x00, modifier, true);
    return target.dispatchEvent(e);
  };
  g.util.dispatchMouseClickEvent = function(target, primary, shift, alt) {
    var ctrl, e, meta, secondary;
    e = document.createEvent("MouseEvents");
    secondary = false;
    if ((target != null ? target.dispatchEvent : void 0) == null) {
      g.logger.e("target is invalid");
      return false;
    }
    switch (g.util.getPlatform()) {
      case "Mac":
        meta = primary;
        ctrl = secondary;
        break;
      case "Linux":
      case "Windows":
        meta = secondary;
        ctrl = primary;
        break;
      default:
        meta = secondary;
        ctrl = primary;
    }
    e.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, ctrl, alt, shift, meta, 0, null);
    target.dispatchEvent(e);
    return true;
  };
  g.util.getLang = function() {
    var lang;
    lang = (navigator.userLanguage || navigator.browserLanguage || navigator.language).substr(0, 2);
    g.util.getLang = function() {
      return lang;
    };
    return lang;
  };
  g.util.benchmark = function(cb, text) {
    var getCurrentTime, start;
    getCurrentTime = function() {
      return (new Date).getTime();
    };
    start = getCurrentTime();
    cb();
    text || (text = "");
    return g.logger.e(text + ("::benchmark result:" + (getCurrentTime() - start) + "ms"));
  };
}).call(this);
