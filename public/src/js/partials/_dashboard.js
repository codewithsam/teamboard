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
                var str = '<div class="col-md-3 col-sm-4 col-xs-6"> <div class="thumbnail"> <img src="/img/board-ava.svg" alt="..."> <div class="caption"> <h3>' + res.title + '</h3> <p>' + res.description + '</p> <p> <a href="/board/'+res._id+'" class="btn btn-primary" role="button">Open</a> <a href="#" class="btn btn-success" role="button">Share</a> <a href="#" class="btn btn-default" role="button">Delete</a> </p> </div> </div> </div>';
                $('.board-list').append(str);
                console.log(res);
            },
            error: function () {
                console.log("err");
            }
        });
    });
});