(function() {
  var g, mapping, _ref;
  if ((_ref = this.vichrome) == null) {
    this.vichrome = {};
  }
  g = this.vichrome;
  mapping = {
    nmap: {},
    imap: {},
    cmap: {},
    alias: {}
  };
  g.SettingManager = {
    defaultSettings: {
      "scrollPixelCount": 40,
      "defaultNewTab": "home",
      "commandWaitTimeOut": 2000,
      "fModeAvailableKeys": "fdsaghjklwertyuiovbcnm",
      "fModeIgnoreCase": false,
      "disableAutoFocus": false,
      "smoothScroll": false,
      "enableCompletion": true,
      "searchEngine": "www.google.com",
      "wrapSearch": true,
      "incSearch": true,
      "ignoreCase": true,
      "useMigemo": false,
      "minMigemoLength": 3,
      "minIncSearch": 2,
      "ignoredUrls": ["http*://mail.google.com/*", "http*://www.google.co*/reader/*", "http*://docs.google.com/*", "http*://www.google.com/calendar/*"],
      "commandBoxAlign": "Left-Bottom",
      "commandBoxWidth": 350,
      "keyMappingAndAliases": "### Sample Settings\n\n# aliases\n# in this example you can open extensions page by the command ':ext'\n# and Chrome's option page by the command ':option'\nalias ext OpenNewTab chrome://extensions/\nalias option OpenNewTab chrome://settings/browser\n\n# mappings for opening your favorite web page\nnmap <Space>tw :OpenNewTab http://www.twitter.com\nnmap <Space>gr :OpenNewTab http://www.google.com/reader\nnmap <Space>m :OpenNewTab https://mail.google.com/mail/#inbox\n\n# F for continuous f-Mode\n# this is recomended setting but commented out by default.\n# if you want to use this setting, please delete '#'\n\n#nmap F :GoFMode --newtab --continuous\n\n# pagecmd offers you page specific key mapping.\n# in this example you can use <C-l>, <C-h> for moving between tabs\n# on all web pages regardless of your ignored list setting\n# because pagecmd has higher priority than ignored URLs.\n#pagecmd * nmap <C-l> :MoveToNextTab\n#pagecmd * nmap <C-h> :MoveToPrevTab\n# if you want to use twitter web's key binding, write settings like below\n#pagecmd http*://twitter.com/* nmap f <NOP>\n#pagecmd http*://twitter.com/* nmap r <NOP>\n",
      "keyMappingNormal": {
        "j": "ScrollDown",
        "k": "ScrollUp",
        "h": "ScrollLeft",
        "l": "ScrollRight",
        "<C-f>": "PageDown",
        "<C-b>": "PageUp",
        "<C-d>": "PageHalfDown",
        "<C-u>": "PageHalfUp",
        "gg": "GoTop",
        "G": "GoBottom",
        "t": "OpenNewTab",
        "x": "CloseCurTab",
        "n": "NextSearch",
        "N": "PrevSearch",
        "gt": "MoveToNextTab",
        "gT": "MoveToPrevTab",
        "<C-l>": "MoveToNextTab",
        "<C-h>": "MoveToPrevTab",
        "r": "ReloadTab",
        "H": "BackHist",
        "L": "ForwardHist",
        ":": "GoCommandMode",
        "/": "GoSearchModeForward",
        "?": "GoSearchModeBackward",
        "a": "GoLinkTextSearchMode",
        "f": "GoFMode",
        "F": "GoFMode --newtab",
        "i": "FocusOnFirstInput",
        "u": "RestoreTab",
        "gp": "OpenNewWindow --pop",
        "o": "Open -i",
        "O": "OpenNewTab -i",
        "s": "Open -i g",
        "S": "OpenNewTab -i g",
        "b": "Open -b",
        "B": "OpenNewTab -b",
        "''": "BackToPageMark",
        "<C-ESC>": "GoEmergencyMode",
        "<ESC>": "Escape",
        "<C-[>": "Escape"
      },
      "keyMappingInsert": {
        "<C-l>": "MoveToNextTab",
        "<C-h>": "MoveToPrevTab",
        "<ESC>": "Escape",
        "<C-[>": "Escape"
      },
      "keyMappingCommand": {
        "<TAB>": "FocusNextCandidate",
        "<S-TAB>": "FocusPrevCandidate",
        "<DOWN>": "FocusNextCandidate",
        "<UP>": "FocusPrevCandidate",
        "<ESC>": "Escape",
        "<C-[>": "Escape"
      },
      "aliases": {
        "o": "Open",
        "ot": "OpenNewTab",
        "opt": "OpenOptionPage",
        "help": "OpenNewTab http://github.com/k2nr/ViChrome/wiki/Vichrome-User-Manual",
        "map": "NMap",
        "tabe": "OpenNewTab",
        "tabn": "MoveToNextTab",
        "tabp": "MoveToPrevTab",
        "tabN": "MoveToPrevTab",
        "tabr": "MoveToFirstTab",
        "tabl": "MoveToLastTab",
        "tabc": "CloseCurTab",
        "tabo": "CloseAllTabs --only",
        "tabs": "ShowTabList",
        "q": "CloseAllTabs"
      },
      "pageMap": {}
    },
    userMap: null,
    pageMap: null,
    setCb: null,
    mapApplied: function(args) {
      if (args.length < 2) {
        g.logger.w("less arguments", args);
        return this;
      }
      if (args[1].charAt(0) === ':') {
        this[args[0]] = args.slice(1).join(' ').slice(1);
      } else {
        switch (args[1].toUpperCase()) {
          case "<NOP>":
            this[args[0]] = "<NOP>";
            break;
          case "<DISCARD>":
            this[args[0]] = "<DISCARD>";
            break;
          default:
            this[args[0]] = this[args[1]];
        }
      }
      return this;
    },
    _map: function(map, args) {
      return this.mapApplied.call(map.nmap, args);
    },
    _nmap: function(map, args) {
      return this.mapApplied.call(map.nmap, args);
    },
    _imap: function(map, args) {
      return this.mapApplied.call(map.imap, args);
    },
    _cmap: function(map, args) {
      return this.mapApplied.call(map.cmap, args);
    },
    _alias: function(map, args) {
      if (args.length < 2) {
        g.logger.w("less arguments", args);
        return map.alias;
      }
      map.alias[args[0]] = args.slice(1).join(' ');
      return map.alias;
    },
    _pagecmd: function(map, args) {
      var _name;
      if (this.pageMap[args[0]] == null) {
        this.pageMap[args[0]] = g.extendDeep(mapping);
      }
      return typeof this[_name = "_" + args[1]] === "function" ? this[_name](this.pageMap[args[0]], args.slice(2)) : void 0;
    },
    parseKeyMappingAndAliases: function() {
      var args, line, lines, _i, _len, _name;
      lines = this.get("keyMappingAndAliases").replace(/^[\t ]*/m, "").replace(/[\t ]*$/m, "").replace(/<[A-Za-z0-9]+>/g, function(v) {
        return v.toUpperCase();
      }).split('\n');
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.length === 0) {
          continue;
        }
        if (line.charAt(0) === '#') {
          continue;
        }
        args = line.split(/[\t ]+/);
        if (typeof this[_name = "_" + args[0]] === "function") {
          this[_name](this.userMap, args.slice(1));
        }
      }
      return this;
    },
    initUserMap: function() {
      var com, command, defAliases, defCommand, defInsert, defNormal, defPageMap, key, map, url, _ref2, _ref3, _ref4, _ref5;
      defNormal = this.defaultSettings.keyMappingNormal;
      defInsert = this.defaultSettings.keyMappingInsert;
      defCommand = this.defaultSettings.keyMappingCommand;
      defAliases = this.defaultSettings.aliases;
      defPageMap = this.defaultSettings.pageMap;
      this.userMap = g.extendDeep(mapping);
      for (key in defNormal) {
        command = defNormal[key];
        this.userMap.nmap[key] = command;
      }
      for (key in defInsert) {
        command = defInsert[key];
        this.userMap.imap[key] = command;
      }
      for (key in defCommand) {
        command = defCommand[key];
        this.userMap.cmap[key] = command;
      }
      for (key in defAliases) {
        command = defAliases[key];
        this.userMap.alias[key] = command;
      }
      this.pageMap = {};
      for (url in defPageMap) {
        map = defPageMap[url];
        this.pageMap[url] = g.extendDeep(mapping);
        _ref2 = map.nmap;
        for (key in _ref2) {
          com = _ref2[key];
          this.pageMap[url].nmap[key] = com;
        }
        _ref3 = map.imap;
        for (key in _ref3) {
          com = _ref3[key];
          this.pageMap[url].imap[key] = com;
        }
        _ref4 = map.cmap;
        for (key in _ref4) {
          com = _ref4[key];
          this.pageMap[url].cmap[key] = com;
        }
        _ref5 = map.alias;
        for (key in _ref5) {
          com = _ref5[key];
          this.pageMap[url].alias[key] = com;
        }
      }
      return this;
    },
    getAll: function() {
      var name, settings, value, _ref2;
      settings = {};
      _ref2 = this.defaultSettings;
      for (name in _ref2) {
        value = _ref2[name];
        switch (name) {
          case "keyMappingNormal":
            settings[name] = this.userMap.nmap;
            break;
          case "keyMappingInsert":
            settings[name] = this.userMap.imap;
            break;
          case "keyMappingCommand":
            settings[name] = this.userMap.cmap;
            break;
          case "aliases":
            settings[name] = this.userMap.alias;
            break;
          case "pageMap":
            settings[name] = this.pageMap;
            break;
          default:
            settings[name] = this.get(name);
        }
      }
      return settings;
    },
    get: function(name) {
      if (localStorage[name] != null) {
        return JSON.parse(localStorage.getItem(name));
      } else {
        return this.defaultSettings[name];
      }
    },
    set: function(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
      if (name === "keyMappingAndAliases") {
        this.initUserMap();
        this.parseKeyMappingAndAliases();
      }
      return typeof this.setCb === "function" ? this.setCb(name, value) : void 0;
    },
    setNMap: function(args) {
      return this._map(this.userMap, args);
    },
    setIMap: function(args) {
      return this._imap(this.userMap, args);
    },
    setCMap: function(args) {
      return this._cmap(this.userMap, args);
    },
    setAlias: function(args) {
      return this._alias(this.userMap, args);
    },
    init: function() {
      this.initUserMap();
      return this.parseKeyMappingAndAliases();
    }
  };
}).call(this);
