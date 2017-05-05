var events = require('./../lib/PubSub');
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
                right: -$('.sidebar-options').width()-5
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
});