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

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _visualyzer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visualyzer */ \"./js/visualyzer.js\");\n\n\nlet isIOS = false;\nlet name = '';\nlet debug = true;\n\nconst screen_desktop = 1024;\nconst screen_standard = 976;\nconst screen_mobile = 640;\n\nlet log = string => {\n    if (debug) console.log(string);\n};\n\nfunction readyStringAnimation() {\n    $('.to-split').each(function (index) {\n        var characters = $(this).text().split('');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(characters, function (i, el) {\n            $this.append('<span>' + el + '</span>');\n        });\n    });\n\n    $('.to-split-word').each(function (index) {\n        var words = $(this).text().split(' ');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(words, function (i, el) {\n            $this.append('<span>' + el + '</span> ');\n        });\n    });\n\n    $('.to-split-word-horizontal').each(function (index) {\n        var words = $(this).text().split(' ');\n\n        let $this = $(this);\n        $this.empty();\n        $.each(words, function (i, el) {\n            $this.append('<span>' + el + '</span> ');\n        });\n    });\n}\n\nfunction showCursor(tag) {\n    $(tag).focus();\n\n    if (isIOS) {\n        let pos = $(tag).offset();\n        let width = $(tag).width();\n        let height = $(tag).height();\n\n        let c_w = $('#custom_cursor').width();\n        let c_h = $('#custom_cursor').height();\n\n        let top = pos.top + height / 2 - c_h / 2;\n        // let left = pos.left + width/2 + 10\n        $('#custom_cursor').offset({ top: top });\n        // $('#custom_cursor').offset({top:top, left:left})\n        $('#custom_cursor').removeClass('hide');\n        $('#custom_cursor').addClass('show');\n\n        $(document).on('click touchstart', function () {\n            $('#custom_cursor').removeClass('show');\n            $('#custom_cursor').addClass('hide');\n        });\n    }\n}\n\nfunction showTag(tag) {\n    tag.removeClass('hide').addClass('show');\n}\n\nfunction hideTag(tag) {\n    tag.removeClass('show').addClass('hide');\n}\n\nfunction showMain() {\n    setTimeout(function () {\n        $('main').addClass('show');\n        $('#turing-logo').addClass('show');\n        $('.step-container').first().find('.animate').addClass('show');\n    }, 500);\n\n    showInput();\n}\n\nfunction showInput() {\n    setTimeout(() => {\n        showTag($('.step-container').first().find('.animate'));\n    }, 1500);\n\n    setTimeout(() => {\n        $('#input-container').find('.animate').removeClass('hide');\n        $('#input-container').find('.animate').removeClass('gone');\n        $('#input-container').find('.animate').css('display', 'block');\n        $('#label-name').removeClass('gone');\n    }, 1500);\n\n    setTimeout(function () {\n        $('#name').prop('disabled', false);\n        showTag($('#name'));\n        showCursor('#name');\n    }, 1500);\n}\n\nfunction hideInput() {\n    $('#name').blur();\n    hideTag($('.step-container').first().find('.animate'));\n    $('#label-name').removeClass('show');\n\n    hideTag($('#name'));\n\n    setTimeout(() => {\n        $('.step-container').first().find('.animate').addClass('gone');\n        $('#label-name').addClass('gone');\n        $('#input-container').css('display', 'none');\n    }, 2000);\n}\n\nfunction showSubmit() {\n    setTimeout(function () {\n        setTimeout(() => {\n            $('#thanks-container').css('display', 'block');\n\n            showTag($('.step-container').eq(1).find('.animate'));\n            $('.step-container').eq(1).find('.animate').removeClass('gone');\n\n            $('#label-thanks').addClass('show').find('.to-split-word-horizontal').addClass('show');\n            $('#label-thanks-arrow').addClass('show');\n        }, 100);\n    }, 2000);\n}\n\nfunction hideSubmit() {\n    hideTag($('#company'));\n}\n\nfunction showList() {\n    $('#input-container').css('display', 'none');\n    $('#thanks-container').css('display', 'none');\n    $('#list-container').css('display', 'block');\n\n    setTimeout(function () {\n        showTag($('.step-container').eq(2).find('.animate'));\n\n        setTimeout(function () {\n            showTag($('#dashboard'));\n        }, 1000);\n    }, 2000);\n}\n\nfunction inputProc() {\n    $('#name').on('keydown', function (e) {\n        $('#label-name').addClass('show').find('.to-split-word-horizontal').addClass('show');\n        $('#label-name-arrow').addClass('show');\n\n        if (e.which == 13) {\n            e.preventDefault();\n\n            name = $(this).val();\n            if (name.length < 1) return;\n\n            hideInput();\n            showSubmit();\n        }\n    });\n    $('#label-name').on('click', function (e) {\n        name = $('#name').val();\n        if (name.length < 1) return;\n\n        hideInput();\n        showSubmit();\n    });\n}\n\nconst routeList = 'list';\n\nlet currentRoute = '';\n\nlet router = new Navigo('/', true, '#');\nrouter.on({\n    list: () => {\n        showList();\n    },\n    '': () => {\n        showMain();\n    }\n});\n\n// set the default route\nrouter.on(() => {\n    showMain();\n});\n// set the 404 route\nrouter.notFound(query => {});\n\nrouter.resolve();\n\n$(document).ready(function () {\n    var md = new MobileDetect(window.navigator.userAgent);\n    isIOS = md.os() === 'iOS';\n\n    readyStringAnimation();\n\n    showMain();\n\n    inputProc();\n\n    var freqData = [{ State: 'AL', freq: { low: 4786, mid: 1319, high: 249 } }, { State: 'AZ', freq: { low: 1101, mid: 412, high: 674 } }, { State: 'CT', freq: { low: 932, mid: 2149, high: 418 } }, { State: 'DE', freq: { low: 832, mid: 1152, high: 1862 } }, { State: 'FL', freq: { low: 4481, mid: 3304, high: 948 } }, { State: 'GA', freq: { low: 1619, mid: 167, high: 1063 } }, { State: 'IA', freq: { low: 1819, mid: 247, high: 1203 } }, { State: 'IL', freq: { low: 4498, mid: 3852, high: 942 } }, { State: 'IN', freq: { low: 797, mid: 1849, high: 1534 } }, { State: 'KS', freq: { low: 162, mid: 379, high: 471 } }];\n\n    Object(_visualyzer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('#dashboard', freqData);\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/visualyzer.js":
/*!**************************!*\
  !*** ./js/visualyzer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst dashboard = function (id, fData) {\n    var barColor = 'steelblue';\n    function segColor(c) {\n        return { low: \"#807dba\", mid: \"#e08214\", high: \"#41ab5d\" }[c];\n    }\n\n    // compute total for each state.\n    fData.forEach(function (d) {\n        d.total = d.freq.low + d.freq.mid + d.freq.high;\n    });\n\n    // function to handle histogram.\n    function histoGram(fD) {\n        var hG = {},\n            hGDim = { t: 60, r: 0, b: 30, l: 0 };\n        hGDim.w = 500 - hGDim.l - hGDim.r, hGDim.h = 300 - hGDim.t - hGDim.b;\n\n        //create svg for histogram.\n        var hGsvg = d3.select(id).append(\"svg\").attr(\"width\", hGDim.w + hGDim.l + hGDim.r).attr(\"height\", hGDim.h + hGDim.t + hGDim.b).append(\"g\").attr(\"transform\", \"translate(\" + hGDim.l + \",\" + hGDim.t + \")\");\n\n        // create function for x-axis mapping.\n        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1).domain(fD.map(function (d) {\n            return d[0];\n        }));\n\n        // Add x-axis to the histogram svg.\n        hGsvg.append(\"g\").attr(\"class\", \"x axis\").attr(\"transform\", \"translate(0,\" + hGDim.h + \")\").call(d3.svg.axis().scale(x).orient(\"bottom\"));\n\n        // Create function for y-axis map.\n        var y = d3.scale.linear().range([hGDim.h, 0]).domain([0, d3.max(fD, function (d) {\n            return d[1];\n        })]);\n\n        // Create bars for histogram to contain rectangles and freq labels.\n        var bars = hGsvg.selectAll(\".bar\").data(fD).enter().append(\"g\").attr(\"class\", \"bar\");\n\n        //create the rectangles.\n        bars.append(\"rect\").attr(\"x\", function (d) {\n            return x(d[0]);\n        }).attr(\"y\", function (d) {\n            return y(d[1]);\n        }).attr(\"width\", x.rangeBand()).attr(\"height\", function (d) {\n            return hGDim.h - y(d[1]);\n        }).attr('fill', barColor).on(\"mouseover\", mouseover) // mouseover is defined below.\n        .on(\"mouseout\", mouseout); // mouseout is defined below.\n\n        //Create the frequency labels above the rectangles.\n        bars.append(\"text\").text(function (d) {\n            return d3.format(\",\")(d[1]);\n        }).attr(\"x\", function (d) {\n            return x(d[0]) + x.rangeBand() / 2;\n        }).attr(\"y\", function (d) {\n            return y(d[1]) - 5;\n        }).attr(\"text-anchor\", \"middle\");\n\n        function mouseover(d) {\n            // utility function to be called on mouseover.\n            // filter for selected state.\n            var st = fData.filter(function (s) {\n                return s.State == d[0];\n            })[0],\n                nD = d3.keys(st.freq).map(function (s) {\n                return { type: s, freq: st.freq[s] };\n            });\n\n            // call update functions of pie-chart and legend.    \n            pC.update(nD);\n            leg.update(nD);\n        }\n\n        function mouseout(d) {\n            // utility function to be called on mouseout.\n            // reset the pie-chart and legend.    \n            pC.update(tF);\n            leg.update(tF);\n        }\n\n        // create function to update the bars. This will be used by pie-chart.\n        hG.update = function (nD, color) {\n            // update the domain of the y-axis map to reflect change in frequencies.\n            y.domain([0, d3.max(nD, function (d) {\n                return d[1];\n            })]);\n\n            // Attach the new data to the bars.\n            var bars = hGsvg.selectAll(\".bar\").data(nD);\n\n            // transition the height and color of rectangles.\n            bars.select(\"rect\").transition().duration(500).attr(\"y\", function (d) {\n                return y(d[1]);\n            }).attr(\"height\", function (d) {\n                return hGDim.h - y(d[1]);\n            }).attr(\"fill\", color);\n\n            // transition the frequency labels location and change value.\n            bars.select(\"text\").transition().duration(500).text(function (d) {\n                return d3.format(\",\")(d[1]);\n            }).attr(\"y\", function (d) {\n                return y(d[1]) - 5;\n            });\n        };\n        return hG;\n    }\n\n    // function to handle pieChart.\n    function pieChart(pD) {\n        var pC = {},\n            pieDim = { w: 250, h: 250 };\n        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;\n\n        // create svg for pie chart.\n        var piesvg = d3.select(id).append(\"svg\").attr(\"width\", pieDim.w).attr(\"height\", pieDim.h).append(\"g\").attr(\"transform\", \"translate(\" + pieDim.w / 2 + \",\" + pieDim.h / 2 + \")\");\n\n        // create function to draw the arcs of the pie slices.\n        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);\n\n        // create a function to compute the pie slice angles.\n        var pie = d3.layout.pie().sort(null).value(function (d) {\n            return d.freq;\n        });\n\n        // Draw the pie slices.\n        piesvg.selectAll(\"path\").data(pie(pD)).enter().append(\"path\").attr(\"d\", arc).each(function (d) {\n            this._current = d;\n        }).style(\"fill\", function (d) {\n            return segColor(d.data.type);\n        }).on(\"mouseover\", mouseover).on(\"mouseout\", mouseout);\n\n        // create function to update pie-chart. This will be used by histogram.\n        pC.update = function (nD) {\n            piesvg.selectAll(\"path\").data(pie(nD)).transition().duration(500).attrTween(\"d\", arcTween);\n        };\n        // Utility function to be called on mouseover a pie slice.\n        function mouseover(d) {\n            // call the update function of histogram with new data.\n            hG.update(fData.map(function (v) {\n                return [v.State, v.freq[d.data.type]];\n            }), segColor(d.data.type));\n        }\n        //Utility function to be called on mouseout a pie slice.\n        function mouseout(d) {\n            // call the update function of histogram with all data.\n            hG.update(fData.map(function (v) {\n                return [v.State, v.total];\n            }), barColor);\n        }\n        // Animating the pie-slice requiring a custom function which specifies\n        // how the intermediate paths should be drawn.\n        function arcTween(a) {\n            var i = d3.interpolate(this._current, a);\n            this._current = i(0);\n            return function (t) {\n                return arc(i(t));\n            };\n        }\n        return pC;\n    }\n\n    // function to handle legend.\n    function legend(lD) {\n        var leg = {};\n\n        // create table for legend.\n        var legend = d3.select(id).append(\"table\").attr('class', 'legend');\n\n        // create one row per segment.\n        var tr = legend.append(\"tbody\").selectAll(\"tr\").data(lD).enter().append(\"tr\");\n\n        // create the first column for each segment.\n        tr.append(\"td\").append(\"svg\").attr(\"width\", '16').attr(\"height\", '16').append(\"rect\").attr(\"width\", '16').attr(\"height\", '16').attr(\"fill\", function (d) {\n            return segColor(d.type);\n        });\n\n        // create the second column for each segment.\n        tr.append(\"td\").text(function (d) {\n            return d.type;\n        });\n\n        // create the third column for each segment.\n        tr.append(\"td\").attr(\"class\", 'legendFreq').text(function (d) {\n            return d3.format(\",\")(d.freq);\n        });\n\n        // create the fourth column for each segment.\n        tr.append(\"td\").attr(\"class\", 'legendPerc').text(function (d) {\n            return getLegend(d, lD);\n        });\n\n        // Utility function to be used to update the legend.\n        leg.update = function (nD) {\n            // update the data attached to the row elements.\n            var l = legend.select(\"tbody\").selectAll(\"tr\").data(nD);\n\n            // update the frequencies.\n            l.select(\".legendFreq\").text(function (d) {\n                return d3.format(\",\")(d.freq);\n            });\n\n            // update the percentage column.\n            l.select(\".legendPerc\").text(function (d) {\n                return getLegend(d, nD);\n            });\n        };\n\n        function getLegend(d, aD) {\n            // Utility function to compute percentage.\n            return d3.format(\"%\")(d.freq / d3.sum(aD.map(function (v) {\n                return v.freq;\n            })));\n        }\n\n        return leg;\n    }\n\n    // calculate total frequency by segment for all state.\n    var tF = ['low', 'mid', 'high'].map(function (d) {\n        return { type: d, freq: d3.sum(fData.map(function (t) {\n                return t.freq[d];\n            })) };\n    });\n\n    // calculate total frequency by state for all segment.\n    var sF = fData.map(function (d) {\n        return [d.State, d.total];\n    });\n\n    var hG = histoGram(sF),\n        // create the histogram.\n    pC = pieChart(tF),\n        // create the pie-chart.\n    leg = legend(tF); // create the legend.\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dashboard);\n\n//# sourceURL=webpack:///./js/visualyzer.js?");

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