/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst baseUrl = 'https://code.turing.services/api/';\n\nconst api = {\n    register: function (repo_url) {\n        let data = { repo_url: repo_url };\n        $.ajax({\n            type: 'GET',\n            url: baseUrl + 'register',\n            dataType: 'JSON',\n            data: data,\n            success: function (data) {},\n            error: function (xhr, status, error) {\n                console.log(status);\n                console.log(error);\n            }\n        });\n    },\n\n    list: function (showTable) {\n        $.ajax({\n            type: 'GET',\n            url: baseUrl + 'list',\n            dataType: 'JSON',\n            success: function (data) {\n                showTable(data);\n            },\n            error: function (xhr, status, error) {\n                console.log(status);\n                console.log(error);\n            }\n        });\n    },\n\n    listUrl: function () {\n        return baseUrl + 'list';\n    },\n\n    lang: function (repo_url, showTable) {\n        let data = { repo_url: repo_url };\n        $.ajax({\n            type: 'GET',\n            url: baseUrl + 'lang',\n            dataType: 'JSON',\n            data: data,\n            success: function (data) {\n                showTable(data);\n            },\n            error: function (xhr, status, error) {\n                console.log(status);\n                console.log(error);\n            }\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (api);\n\n//# sourceURL=webpack:///./js/api.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _visualyzer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visualyzer */ \"./js/visualyzer.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./js/api.js\");\n\n\n\nlet isIOS = false;\nlet repo_url = '';\n\nvar langTable = $('#table-langs').DataTable({\n    columns: [{ title: \"Language\" }, { title: \"File Size\" }, { title: \"Line Count\" }],\n    bPaginate: false,\n    info: false,\n    searching: false,\n    order: [[2, \"desc\"]]\n});\n\nfunction readyStringAnimation() {\n    $('.to-split').each(function (index) {\n        var characters = $(this).text().split('');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(characters, function (i, el) {\n            $this.append('<span>' + el + '</span>');\n        });\n    });\n\n    $('.to-split-word').each(function (index) {\n        var words = $(this).text().split(' ');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(words, function (i, el) {\n            $this.append('<span>' + el + '</span> ');\n        });\n    });\n\n    $('.to-split-word-horizontal').each(function (index) {\n        var words = $(this).text().split(' ');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(words, function (i, el) {\n            $this.append('<span>' + el + '</span> ');\n        });\n    });\n}\n\nfunction showCursor(tag) {\n    $(tag).focus();\n\n    if (isIOS) {\n        let pos = $(tag).offset();\n        let width = $(tag).width();\n        let height = $(tag).height();\n\n        let c_w = $('#custom_cursor').width();\n        let c_h = $('#custom_cursor').height();\n\n        let top = pos.top + height / 2 - c_h / 2;\n        // let left = pos.left + width/2 + 10\n        $('#custom_cursor').offset({ top: top });\n        // $('#custom_cursor').offset({top:top, left:left})\n        $('#custom_cursor').removeClass('hide');\n        $('#custom_cursor').addClass('show');\n\n        $(document).on('click touchstart', function () {\n            $('#custom_cursor').removeClass('show');\n            $('#custom_cursor').addClass('hide');\n        });\n    }\n}\n\nfunction showTag(tag) {\n    tag.removeClass('hide').addClass('show');\n    tag.css('display', 'block');\n}\n\nfunction hideTag(tag) {\n    tag.removeClass('show').addClass('hide');\n    tag.css('display', 'none');\n}\n\nfunction showMain() {\n    setTimeout(function () {\n        $('main').addClass('show');\n        $('#turing-logo').addClass('show');\n        $('.step-container').first().find('.animate').addClass('show');\n    }, 500);\n\n    showInput();\n}\n\nfunction showInput() {\n    setTimeout(() => {\n        showTag($('.step-container').first().find('.animate'));\n    }, 1500);\n\n    setTimeout(() => {\n        $('#input-container').find('.animate').removeClass('hide');\n        $('#input-container').find('.animate').removeClass('gone');\n        $('#input-container').find('.animate').css('display', 'block');\n        $('#label-name').removeClass('gone');\n    }, 1500);\n\n    setTimeout(function () {\n        $('#name').prop('disabled', false);\n        showTag($('#name'));\n        showCursor('#name');\n    }, 1500);\n}\n\nfunction hideInput() {\n    $('#name').blur();\n    hideTag($('.step-container').first().find('.animate'));\n    $('#label-name').removeClass('show');\n\n    hideTag($('#name'));\n\n    setTimeout(() => {\n        $('.step-container').first().find('.animate').addClass('gone');\n        $('#label-name').addClass('gone');\n        $('#input-container').css('display', 'none');\n    }, 2000);\n}\n\nfunction showSubmit() {\n    setTimeout(function () {\n        setTimeout(() => {\n            $('#thanks-container').css('display', 'block');\n\n            showTag($('.step-container').eq(1).find('.animate'));\n            $('.step-container').eq(1).find('.animate').removeClass('gone');\n\n            $('#label-thanks').addClass('show').find('.to-split-word-horizontal').addClass('show');\n            $('#label-thanks-arrow').addClass('show');\n        }, 100);\n    }, 2000);\n}\n\nfunction hideSubmit() {\n    hideTag($('#company'));\n}\n\nfunction showList() {\n    $('#input-container').css('display', 'none');\n    $('#thanks-container').css('display', 'none');\n    $('#list-container').css('display', 'block');\n    $('#lang-container').css('display', 'none');\n\n    setTimeout(function () {\n        showTag($('.step-container').eq(2).find('.animate'));\n\n        setTimeout(function () {\n            showTag($('#list-processing'));\n        }, 1000);\n    }, 2000);\n}\n\nfunction createListTable() {\n    let url = _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listUrl();\n\n    var table = $('#table-processing').DataTable({\n        columns: [{ title: \"No\", data: 'id' }, { title: \"Name\", data: 'url' }, { title: \"Completed\", data: 'percent' }],\n        ajax: url\n    });\n\n    setInterval(function () {\n        let isList = window.location.href.includes('#list');\n        if (isList) {\n            // console.log('table ajax reloading', table)\n            table.ajax.reload(null, false);\n        }\n    }, 5000);\n\n    $('#table-processing tbody').on('click', 'tr', function () {\n        var data = table.row(this).data();\n\n        if (data.percent > 0) {\n            window.location.href = \"#lang?url=\" + data.url;\n        }\n    });\n}\n\nfunction showLangTable(data) {\n    var detail = data.data[0];\n\n    langTable.clear();\n    langTable.rows.add(detail.rows);\n    langTable.draw();\n\n    console.log(detail.rows.length == 0);\n    if (detail.rows.length == 0) {\n        showTag($('#empty-reason'));\n    } else {\n        hideTag($('#empty-reason'));\n    }\n}\n\nfunction showLang(query) {\n    $('#input-container').css('display', 'none');\n    $('#thanks-container').css('display', 'none');\n    $('#list-container').css('display', 'none');\n    $('#lang-container').css('display', 'block');\n\n    showTag($('.step-container').eq(3).find('.animate'));\n\n    let url = query.replace('url=', '');\n    $('#github-url').text(url);\n    _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"].lang(url, showLangTable);\n\n    setTimeout(function () {\n        showTag($('#lang-stats'));\n    }, 1000);\n}\n\nfunction inputProc() {\n    $('#name').on('keydown', function (e) {\n        $('#label-name').addClass('show').find('.to-split-word-horizontal').addClass('show');\n        $('#label-name-arrow').addClass('show');\n\n        if (e.which == 13) {\n            e.preventDefault();\n\n            repo_url = $(this).val();\n            if (repo_url.length < 1) return;\n\n            _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(repo_url);\n\n            hideInput();\n            showSubmit();\n        }\n    });\n    $('#label-name').on('click', function (e) {\n        repo_url = $('#name').val();\n        if (repo_url.length < 1) return;\n\n        _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(repo_url);\n\n        hideInput();\n        showSubmit();\n    });\n}\n\nlet router = new Navigo('/', true, '#');\nrouter.on({\n    list: () => {\n        showList();\n    },\n    lang: (param, query) => {\n        showLang(query);\n    },\n    '': () => {\n        showMain();\n    }\n});\n\n// set the default route\nrouter.on(() => {\n    showMain();\n});\n// set the 404 route\nrouter.notFound(query => {});\n\nrouter.resolve();\n\n$(document).ready(function () {\n    var md = new MobileDetect(window.navigator.userAgent);\n    isIOS = md.os() === 'iOS';\n\n    readyStringAnimation();\n\n    showMain();\n    inputProc();\n    createListTable();\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/visualyzer.js":
/*!**************************!*\
  !*** ./js/visualyzer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar pC;\nvar leg;\n\nconst langColor = {\n    \"Mercury\": \"#ff2b2b\",\n    \"TypeScript\": \"#2b7489\",\n    \"PureBasic\": \"#5a6986\",\n    \"Objective-C++\": \"#6866fb\",\n    \"Self\": \"#0579aa\",\n    \"edn\": \"#db5855\",\n    \"NewLisp\": \"#87AED7\",\n    \"Jupyter Notebook\": \"#DA5B0B\",\n    \"Rebol\": \"#358a5b\",\n    \"Frege\": \"#00cafe\",\n    \"Dart\": \"#00B4AB\",\n    \"AspectJ\": \"#a957b0\",\n    \"Shell\": \"#89e051\",\n    \"Web Ontology Language\": \"#9cc9dd\",\n    \"xBase\": \"#403a40\",\n    \"Eiffel\": \"#946d57\",\n    \"Nix\": \"#7e7eff\",\n    \"RAML\": \"#77d9fb\",\n    \"MTML\": \"#b7e1f4\",\n    \"Racket\": \"#22228f\",\n    \"Elixir\": \"#6e4a7e\",\n    \"SAS\": \"#B34936\",\n    \"Agda\": \"#315665\",\n    \"wisp\": \"#7582D1\",\n    \"D\": \"#ba595e\",\n    \"Kotlin\": \"#F18E33\",\n    \"Opal\": \"#f7ede0\",\n    \"Crystal\": \"#776791\",\n    \"Objective-C\": \"#438eff\",\n    \"ColdFusion CFC\": \"#ed2cd6\",\n    \"Oz\": \"#fab738\",\n    \"Mirah\": \"#c7a938\",\n    \"Objective-J\": \"#ff0c5a\",\n    \"Gosu\": \"#82937f\",\n    \"FreeMarker\": \"#0050b2\",\n    \"Ruby\": \"#701516\",\n    \"Component Pascal\": \"#b0ce4e\",\n    \"Arc\": \"#aa2afe\",\n    \"Brainfuck\": \"#2F2530\",\n    \"Nit\": \"#009917\",\n    \"APL\": \"#5A8164\",\n    \"Go\": \"#375eab\",\n    \"Visual Basic\": \"#945db7\",\n    \"PHP\": \"#4F5D95\",\n    \"Cirru\": \"#ccccff\",\n    \"SQF\": \"#3F3F3F\",\n    \"Glyph\": \"#e4cc98\",\n    \"Java\": \"#b07219\",\n    \"MAXScript\": \"#00a6a6\",\n    \"Scala\": \"#DC322F\",\n    \"Makefile\": \"#427819\",\n    \"ColdFusion\": \"#ed2cd6\",\n    \"Perl\": \"#0298c3\",\n    \"Lua\": \"#000080\",\n    \"Vue\": \"#2c3e50\",\n    \"Verilog\": \"#b2b7f8\",\n    \"Factor\": \"#636746\",\n    \"Haxe\": \"#df7900\",\n    \"Pure Data\": \"#91de79\",\n    \"Forth\": \"#341708\",\n    \"Red\": \"#ee0000\",\n    \"Hy\": \"#7790B2\",\n    \"Volt\": \"#1F1F1F\",\n    \"LSL\": \"#3d9970\",\n    \"eC\": \"#913960\",\n    \"CoffeeScript\": \"#244776\",\n    \"HTML\": \"#e44b23\",\n    \"Lex\": \"#DBCA00\",\n    \"API Blueprint\": \"#2ACCA8\",\n    \"Swift\": \"#ffac45\",\n    \"C\": \"#555555\",\n    \"AutoHotkey\": \"#6594b9\",\n    \"Isabelle\": \"#FEFE00\",\n    \"Metal\": \"#8f14e9\",\n    \"Clarion\": \"#db901e\",\n    \"JSONiq\": \"#40d47e\",\n    \"Boo\": \"#d4bec1\",\n    \"AutoIt\": \"#1C3552\",\n    \"Clojure\": \"#db5855\",\n    \"Rust\": \"#dea584\",\n    \"Prolog\": \"#74283c\",\n    \"SourcePawn\": \"#5c7611\",\n    \"AMPL\": \"#E6EFBB\",\n    \"FORTRAN\": \"#4d41b1\",\n    \"ANTLR\": \"#9DC3FF\",\n    \"Harbour\": \"#0e60e3\",\n    \"Tcl\": \"#e4cc98\",\n    \"BlitzMax\": \"#cd6400\",\n    \"PigLatin\": \"#fcd7de\",\n    \"Lasso\": \"#999999\",\n    \"ECL\": \"#8a1267\",\n    \"VHDL\": \"#adb2cb\",\n    \"Elm\": \"#60B5CC\",\n    \"Propeller Spin\": \"#7fa2a7\",\n    \"X10\": \"#4B6BEF\",\n    \"IDL\": \"#a3522f\",\n    \"ATS\": \"#1ac620\",\n    \"Ada\": \"#02f88c\",\n    \"Unity3D Asset\": \"#ab69a1\",\n    \"Nu\": \"#c9df40\",\n    \"LFE\": \"#004200\",\n    \"SuperCollider\": \"#46390b\",\n    \"Oxygene\": \"#cdd0e3\",\n    \"ASP\": \"#6a40fd\",\n    \"Assembly\": \"#6E4C13\",\n    \"Gnuplot\": \"#f0a9f0\",\n    \"JFlex\": \"#DBCA00\",\n    \"NetLinx\": \"#0aa0ff\",\n    \"Turing\": \"#45f715\",\n    \"Vala\": \"#fbe5cd\",\n    \"Processing\": \"#0096D8\",\n    \"Arduino\": \"#bd79d1\",\n    \"FLUX\": \"#88ccff\",\n    \"NetLogo\": \"#ff6375\",\n    \"C Sharp\": \"#178600\",\n    \"CSS\": \"#563d7c\",\n    \"Emacs Lisp\": \"#c065db\",\n    \"Stan\": \"#b2011d\",\n    \"SaltStack\": \"#646464\",\n    \"QML\": \"#44a51c\",\n    \"Pike\": \"#005390\",\n    \"LOLCODE\": \"#cc9900\",\n    \"ooc\": \"#b0b77e\",\n    \"Handlebars\": \"#01a9d6\",\n    \"J\": \"#9EEDFF\",\n    \"Mask\": \"#f97732\",\n    \"EmberScript\": \"#FFF4F3\",\n    \"TeX\": \"#3D6117\",\n    \"Nemerle\": \"#3d3c6e\",\n    \"KRL\": \"#28431f\",\n    \"Ren'Py\": \"#ff7f7f\",\n    \"Unified Parallel C\": \"#4e3617\",\n    \"Golo\": \"#88562A\",\n    \"Fancy\": \"#7b9db4\",\n    \"OCaml\": \"#3be133\",\n    \"Shen\": \"#120F14\",\n    \"Pascal\": \"#b0ce4e\",\n    \"F#\": \"#b845fc\",\n    \"Puppet\": \"#302B6D\",\n    \"ActionScript\": \"#882B0F\",\n    \"Diff\": \"#88dddd\",\n    \"Ragel in Ruby Host\": \"#9d5200\",\n    \"Fantom\": \"#dbded5\",\n    \"Zephir\": \"#118f9e\",\n    \"Click\": \"#E4E6F3\",\n    \"Smalltalk\": \"#596706\",\n    \"DM\": \"#447265\",\n    \"Ioke\": \"#078193\",\n    \"PogoScript\": \"#d80074\",\n    \"LiveScript\": \"#499886\",\n    \"JavaScript\": \"#f1e05a\",\n    \"VimL\": \"#199f4b\",\n    \"PureScript\": \"#1D222D\",\n    \"ABAP\": \"#E8274B\",\n    \"Matlab\": \"#bb92ac\",\n    \"Slash\": \"#007eff\",\n    \"R\": \"#198ce7\",\n    \"Erlang\": \"#B83998\",\n    \"Pan\": \"#cc0000\",\n    \"LookML\": \"#652B81\",\n    \"Eagle\": \"#814C05\",\n    \"Scheme\": \"#1e4aec\",\n    \"PLSQL\": \"#dad8d8\",\n    \"Python\": \"#3572A5\",\n    \"Max\": \"#c4a79c\",\n    \"Common Lisp\": \"#3fb68b\",\n    \"Latte\": \"#A8FF97\",\n    \"XQuery\": \"#5232e7\",\n    \"Omgrofl\": \"#cabbff\",\n    \"XC\": \"#99DA07\",\n    \"Nimrod\": \"#37775b\",\n    \"SystemVerilog\": \"#DAE1C2\",\n    \"Chapel\": \"#8dc63f\",\n    \"Groovy\": \"#e69f56\",\n    \"Dylan\": \"#6c616e\",\n    \"E\": \"#ccce35\",\n    \"Parrot\": \"#f3ca0a\",\n    \"Grammatical Framework\": \"#79aa7a\",\n    \"Game Maker Language\": \"#8fb200\",\n    \"Papyrus\": \"#6600cc\",\n    \"NetLinx+ERB\": \"#747faa\",\n    \"Clean\": \"#3F85AF\",\n    \"Alloy\": \"#64C800\",\n    \"Squirrel\": \"#800000\",\n    \"PAWN\": \"#dbb284\",\n    \"UnrealScript\": \"#a54c4d\",\n    \"Standard ML\": \"#dc566d\",\n    \"Slim\": \"#ff8f77\",\n    \"Perl6\": \"#0000fb\",\n    \"Julia\": \"#a270ba\",\n    \"Haskell\": \"#29b544\",\n    \"NCL\": \"#28431f\",\n    \"Io\": \"#a9188d\",\n    \"Rouge\": \"#cc0088\",\n    \"cpp\": \"#f34b7d\",\n    \"AGS Script\": \"#B9D9FF\",\n    \"Dogescript\": \"#cca760\",\n    \"nesC\": \"#94B0C7\"\n};\n\nconst dashboard = {\n    load: function (id, header, tF) {\n\n        function segColor(c) {\n            return langColor[c];\n        }\n\n        // function to handle pieChart.\n        function pieChart(pD) {\n            var pC = {},\n                pieDim = { w: 200, h: 200 };\n            pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;\n\n            // create svg for pie chart.\n            var piesvg = d3.select(id).append(\"svg\").attr(\"width\", pieDim.w).attr(\"height\", pieDim.h).append(\"g\").attr(\"transform\", \"translate(\" + pieDim.w / 2 + \",\" + pieDim.h / 2 + \")\");\n\n            // create function to draw the arcs of the pie slices.\n            var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);\n\n            // create a function to compute the pie slice angles.\n            var pie = d3.layout.pie().sort(null).value(function (d) {\n                return d[2];\n            });\n\n            // Draw the pie slices.\n            piesvg.selectAll(\"path\").data(pie(pD)).enter().append(\"path\").attr(\"d\", arc).each(function (d) {\n                this._current = d;\n            }).style(\"fill\", function (d) {\n                return segColor(d.data[0]);\n            }).on(\"mouseover\", mouseover).on(\"mouseout\", mouseout);\n\n            // create function to update pie-chart. This will be used by histogram.\n            pC.update = function (nD) {\n                piesvg.selectAll(\"path\").data(pie(nD)).transition().duration(500).attrTween(\"d\", arcTween);\n            };\n            // Utility function to be called on mouseover a pie slice.\n            function mouseover(d) {}\n            //Utility function to be called on mouseout a pie slice.\n            function mouseout(d) {}\n            // Animating the pie-slice requiring a custom function which specifies\n            // how the intermediate paths should be drawn.\n            function arcTween(a) {\n                var i = d3.interpolate(this._current, a);\n                this._current = i(0);\n                return function (t) {\n                    return arc(i(t));\n                };\n            }\n            return pC;\n        }\n\n        // function to handle legend.\n        function legend(header, lD) {\n            var leg = {};\n\n            // create table for legend.\n            var legend = d3.select(id).append(\"table\").attr('class', 'legend');\n\n            // header = ['']\n            // var thr = legend.append(\"tbody\").selectAll(\"tr\").data(header).enter().append(\"tr\");\n            // thr.append(\"th\").text('Color');\n            // thr.append(\"th\").text('Language');\n            // thr.append(\"th\").text('Line Count');\n            // thr.append(\"th\").text('Percent');\n\n            // create one row per segment.\n            var tr = legend.append(\"tbody\").selectAll(\"tr\").data(lD).enter().append(\"tr\");\n\n            // create the first column for each segment.\n            tr.append(\"td\").append(\"svg\").attr(\"width\", '16').attr(\"height\", '16').append(\"rect\").attr(\"width\", '16').attr(\"height\", '16').attr(\"fill\", function (d) {\n                return segColor(d[0]);\n            });\n\n            // create the second column for each segment.\n            tr.append(\"td\").text(function (d) {\n                return d[0];\n            });\n\n            // create the third column for each segment.\n            tr.append(\"td\").attr(\"class\", 'legendFreq').text(function (d) {\n                return d3.format(\",\")(d[2]);\n            });\n\n            // create the fourth column for each segment.\n            tr.append(\"td\").attr(\"class\", 'legendPerc').text(function (d) {\n                return getLegend(d, lD);\n            });\n\n            // Utility function to be used to update the legend.\n            leg.update = function (header, nD) {\n                // update the data attached to the row elements.\n                var l = legend.select(\"tbody\").selectAll(\"tr\").data(nD);\n\n                // update the frequencies.\n                l.select(\".legendFreq\").text(function (d) {\n                    return d3.format(\",\")(d[2]);\n                });\n\n                // update the percentage column.\n                l.select(\".legendPerc\").text(function (d) {\n                    return getLegend(d, nD);\n                });\n            };\n\n            function getLegend(d, aD) {\n                // Utility function to compute percentage.\n                return d3.format(\"%\")(d[2] / d3.sum(aD.map(function (v) {\n                    return v[2];\n                })));\n            }\n\n            return leg;\n        }\n\n        pC = pieChart(tF);\n        leg = legend(header, tF);\n    },\n\n    update: function (header, tF) {\n        pC.update(tF);\n        leg.update(header, tF);\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dashboard);\n\n//# sourceURL=webpack:///./js/visualyzer.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /sandbox/turing/repos/code_analyzer/view/js/main.js */\"./js/main.js\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js?");

/***/ })

/******/ });