var socket = require('./socket').getInstance();


module.exports = socket;





/**
 * 
 * 
 * ui_text.click(function (e) {
           var start = false;
           var startx = 0;
           var starty = 0;
           var target = {};
           canvas.on('mouse:down', function(e){
               startx = canvas.getPointer(e.e).x;
               starty = canvas.getPointer(e.e).y;
               start = true;

               features.createText({
               fontFamily: 'arial black',
               fill: '#00000',
               left: canvas.getPointer(e.e).x,
               top: canvas.getPointer(e.e).y,
               width: 50,
               height: 50
           }, function (err, object) {
            //    canvas.add(object);
               target = object;
               canvas.off('mouse:down');
           });
        });
        canvas.on('mouse:move', function(e){
            if(!start){
                return;
            }
            canvas.off('mouse:move');
        });
        canvas.on('mouse:up', function(e){
            var posx = canvas.getPointer(e.e).x - startx;
            var posy = canvas.getPointer(e.e).y - starty;
            console.log(posx,posy);
            target.width=  posx;
            target.height = posy;
            canvas.add(target);
            canvas.off('mouse:up');
        });

       });
 * 
 * 
 * 
 * 
 * 
 */