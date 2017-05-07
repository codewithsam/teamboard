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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports) {

var events = [];

function on(e,fn){
    if(!events[e]){
        events[e] = [];
    }
    events[e].push(fn);
}
function off(e,fn){
    if(events[e]){
        events[e].forEach(function(f,i){
            if(f === fn){
                events[e].splice(i,1);
            }
        });
    }
}

function emit(e,data){
    if(events[e]){
        events[e].forEach(function(fn,i){
            fn(data);
        });
    }
}

module.exports = {
    $on: on,
    $off: off,
    add: on,
    remove: off,
    $emit: emit,
    subscribe: on,
    publish: emit,
    unsubscribe: off
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(69);

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

var events = __webpack_require__(13);
// var object_json = require('./../object-json/object.json');
/* Share feature of whiteboard
// This code blocks is used to add new members to board by sharing board (by entering emails of users you want to add).
// It sends an ajax post request to /board/:boardid and the server will send a response which will tell if the entered email exists or not
// If it does we add that email into teamToAdd array. Then we move to next event to send all given IDs on server
*/
$(document).ready(function () {
    var teamToAdd = [];
    $('.mememail').change(function (e) {
        var targetEmail = $(this).val();
        var data = {
            email: targetEmail
        };
        var boardid = $(this).data("boardid");
        $.ajax({
            url: '/board/' + boardid,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                $('.added-members').append('<span class="badge member-email">' + response.name + '(' + response.email + ') <i class="fa fa-times-circle"></i></span>');
                teamToAdd.push(response.email);
            },
            error: function () {
                console.log('error adding team members');
            }
        });
    });

    /**
     * This code block is used to remove ids from teamToAdd list array
     */
    $('.added-members').on('click', '.member-email', function (e) {
        console.log('clicked');
        var dta = $(this).text();
        var mail = dta.substr(dta.indexOf('(') + 1, dta.indexOf(')') - dta.indexOf('(') - 1);
        $(this).remove();
        for (var i = 0; i < teamToAdd.length; i++) {
            console.log(teamToAdd[i], mail);
            if (teamToAdd[i] == mail) {
                console.log("asd");
                teamToAdd.splice(i, 1);
            }
        }
    });
    /**
     * This code block is used to send all ids present in teamToAdd array to server where server will add all given IDs to team array of whiteboard schema
     * Server then responds after inserting all given IDs in whiteboard
     * [:todo] We need to add a code which checks if given id already exists in whiteboard team array or not. It already exists then tell user that give Id already a team member
     */
    $('.sendTeamNames').click(function (e) {
        var boardid = $(this).data("boardid");
        var data = {
            formtype: 'addteam',
            teams: teamToAdd
        };
        $.ajax({
            url: '/board/' + boardid + '/addteams',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {}
        });
    });
});


$(document).ready(function () {
    var flag = false;
    $('.sidebar-toggler').click(function () {
        if (!flag) {
            flag = true;
            //show
            $('.sidebar-options').stop(true).animate({
                right: 0
            });
            $(this).animate({
                right: $('.sidebar-options').width()
            });
        } else {
            //hide
            flag = false;
            $('.sidebar-options').stop(true).animate({
                right: -$('.sidebar-options').width() - 5
            });
            $(this).animate({
                right: 0
            });
        }
    });

    $('div.split-pane').splitPane();
    // $('#left-component').on('scroll', function () {
    //     $('#right-component').scrollTop($('#left-component').scrollTop());
    // });
    // $('#right-component').on('scroll', function () {
    //     $('#left-component').scrollTop($('#right-component').scrollTop());
    // });


    $('.capture-icons').on('click', function (evt) {
        $(this).children().siblings().children().removeClass('active');
        $(evt.target).addClass('active');
    });




});


//Fabric.js - line: 11900

/***/ }),

/***/ 69:
/***/ (function(module, exports) {

/**
 * This code block will send a request to server to get all the whiteboards created by user.
 * It will then list out all the recieved list of whiteboard on to the page.
 */
$(document).ready(function () {
    $('.addNewBoard').click(function () {
        var data = {
            name: $('#boardname').val(),
            desc: $("#boarddesc").val()
        }
        $.ajax({
            url: '/',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (res) {
                var str = '<div class="col-md-3 col-sm-4 col-xs-6"> <div class="thumbnail"> <img src="/img/board-ava.svg" alt="..."> <div class="caption"> <h3>' + res.title + '</h3> <p>' + res.description + '</p> <p> <a href="#" class="btn btn-primary" role="button">Open</a> <a href="#" class="btn btn-success" role="button">Share</a> <a href="#" class="btn btn-default" role="button">Delete</a> </p> </div> </div> </div>';
                $('.board-list').append(str);
                console.log(res);
            },
            error: function () {
                console.log("err");
            }
        });
    });
});

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ })

/******/ });