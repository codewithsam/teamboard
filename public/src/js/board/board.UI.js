   var fabricSettings = require('./../configurations/fabric.configure');
   var features = require('./Features');
   var undoRedo = require('./undoRedo');
   var util = require('./../Utility/util');

   module.exports = function () {
       var canvas = fabricSettings.getCanvas();
       features.initialize(canvas);
       undoRedo.initialize(canvas);
       // Extra Features
       var ui_upload = $('.ui-btn-upload');
       var ui_uploadfromURL = $('.ui-btn-from-url');
       var ui_capture = $('.ui-btn-capture');
       var ui_dropbox = $('.ui-btn-dropbox');
       var ui_gdrive = $('.ui-btn-gdrive');

       // Shapes 
       var ui_square = $('.ui-btn-square');
       var ui_rounded_square = $('.ui-btn-rounded-square');
       var ui_parallelogram = $('.ui-btn-parallelogram');
       var ui_rect = $('.ui-btn-rectangle');
       var ui_hexagon = $('.ui-btn-hexagon');
       var ui_triangle = $('.ui-btn-triangle');
       var ui_circle = $('.ui-btn-circle');
       var ui_arrow = $('.ui-btn-arrow');
       var ui_bubble = $('.ui-btn-bubble');
       var ui_star = $('.ui-btn-star');
       var ui_diamond = $('.ui-btn-diamond');


       //Pointer
       var ui_pointer = $('.ui-btn-pointer');

       // Adding text
       var ui_text = $('.ui-btn-text');

       //Sticky Notes
       var ui_notes = $('.ui-btn-notes');

       // Connector lines
       var ui_connector_up = $('.ui-btn-connector-up');
       var ui_connector_down = $('.ui-btn-connector-down');
       var ui_connector_left = $('.ui-btn-connector-left');
       var ui_connector_right = $('.ui-btn-connector-right');
       var ui_connector_north_west = $('.ui-btn-connector-north-west');
       var ui_connector_north_east = $('.ui-btn-connector-north-east');
       var ui_connector_south_west = $('.ui-btn-connector-south-west');
       var ui_connector_south_east = $('.ui-btn-connector-south-east');


       // Comment on object
       var ui_comment = $('.ui-btn-comment');


       //canvas pan zoom
       var ui_expand = $('.ui-btn-expand');

       //hand tool for moving canvas
       var ui_hand = $('.ui-btn-hand');

       //some extra buttons

       var ui_undo = $('.ui_extra_undo');
       var ui_redo = $('.ui_extra_redo');
       var ui_delete = $('.ui_extra_delete');


       var proplist = $('.property-list ul');
       var valuelist = $('.value-list ul');
       /**
        * Required to reset all unused events
        */

       /**
        * 
        * These buttons are disabled until we create features for them.
        */
       ui_redo.addClass('li-disabled');




       /**
        * Below are all the events for UI
        */



       /**
        *          Text Box
        */
       ui_text.click(function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createText({
                   fontFamily: 'arial black',
                   fill: '#000000',
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 50,
                   height: 50,
                   originX: 'center',
                   originY: 'center'
               }, function (err, object) {
                   console.log('IText added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });

       });

       /**
        *           Circle
        */

       ui_circle.on('click', function (evt) {
           console.log('click2');

           canvas.on('mouse:down', function (e) {
               features.createCircle({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 50,
                   height: 50,
                   originX: 'center',
                   originY: 'center',
                   radius: 30,
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2
               }, function (err, object) {
                   console.log('circle added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });


       /**
        *           Square
        */

       ui_square.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createRect({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 100,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2
               }, function (err, object) {
                   console.log('square added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });


       /**
        *           Rectangle
        */


       ui_rect.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createRect({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 50,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2,
                   borderRadius: 2
               }, function (err, object) {
                   console.log('rectangle added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });

       /**
        *           Triangle
        */


       ui_triangle.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createTriangle({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 100,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   strokeWidth: 2,
                   stroke: '#000000'
               }, function (err, object) {
                   console.log('triangle added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });



       /**
        *           Rounded Rectangle
        */

       ui_rounded_square.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createRect({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 100,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2,
                   rx: 10,
                   ry: 10
               }, function (err, object) {
                   console.log('rectangle added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });

       /**
        *           Star
        */


       ui_star.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createStar({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2
               }, function (err, object) {
                   console.log('star added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });

       /**
        *           Hexagon
        */


       ui_hexagon.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createHexagon({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2
               }, function (err, object) {
                   console.log('hexagon added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });

       /**
        *           Diamond
        */


       ui_diamond.on('click', function (evt) {
           canvas.on('mouse:down', function (e) {
               features.createRect({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 100,
                   angle: 45,
                   originX: 'center',
                   originY: 'center',
                   fill: '#ffffff',
                   stroke: '#000000',
                   strokeWidth: 2,
                   borderRadius: 2
               }, function (err, object) {
                   console.log('rectangle added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           });
       });

       ui_notes.on('click', function(evt){
           canvas.on('mouse:down', function(e){
               features.createStickyNote({
                   left: canvas.getPointer(e.e).x,
                   top: canvas.getPointer(e.e).y,
                   width: 100,
                   height: 100,
                   originX: 'center',
                   originY: 'center',
                   fill: '#f5df16',
                   stroke: '#f5df16',
                   strokeWidth: 2,
                   borderRadius: 2,
                   label: 'Edit me'
               }, function (err, object) {
                   console.log('Sticky note added');
                   canvas.add(object);
                   canvas.off('mouse:down');
               });
           })
       });





       /**
        * These are some extra features like undo redo and delete
        */

       ui_undo.on('click', function (evt) {
           var fabricObjects, i;
           var poppedObject = undoRedo.undo();
           if (!poppedObject) {
               console.log('Nothing more to undo!');
               return;
           }
           if (poppedObject.action === 'add') {
               poppedObject = JSON.parse(poppedObject.object);
               fabricObjects = canvas.getObjects();
               for (i = 0; i < fabricObjects.length; i++) {
                   if (fabricObjects[i]._id === poppedObject._id) {
                       fabricObjects[i].dustbin = true;
                       canvas.remove(fabricObjects[i]);
                       break;
                   }
               }
           }
           if (poppedObject.action === 'modify') {
               poppedObject = JSON.parse(poppedObject.object);
               fabricObjects = canvas.getObjects();
               for (i = 0; i < fabricObjects.length; i++) {
                   if (fabricObjects[i]._id === poppedObject._id) {
                       fabricObjects[i].set(poppedObject);
                       canvas.renderAll();
                       break;
                   }
               }
           }
           if (poppedObject.action === 'remove') {
               poppedObject = JSON.parse(poppedObject.object);
               poppedObject.dustbin = true;
               fabric.util.enlivenObjects([poppedObject], function (fabricObjects) {
                   fabricObjects.forEach(function (fabricObject) {
                       canvas.add(fabricObject);
                       canvas.renderAll();
                   });
               });
           }
       });

       ui_redo.on('click', function (evt) {

       });

       ui_delete.on('click', function (evt) {
           var o = canvas.getActiveObject();
           if (o) {
               canvas.remove(o);
           }
       });


       $('.capture-webshot').on('click', function () {
           var uri = $('#webshoturl').val();
           if (!uri) return;
           var screenSize = $('.capture-icons').children().find('img.active');
           var width, height;
           if (!screenSize) {
               width = 1366;
               height = 768;
           } else {
               width = screenSize.data('width');
               height = screenSize.data('height');
           }
           util.showLoader();

           $.ajax({
               url: '/upload/webshot',
               type: 'POST',
               data: {
                   url: uri,
                   width: width,
                   height: height
               },
               dataType: 'json',
               success: function (response) {
                   var winwidth = $(window).width()/2;
                   var winheight = $(window).height()/2;
                   util.hideLoader();
                   features.createImage({
                       url: "/img/webshot/" + response + ".png",
                       left: winwidth,
                       top: winheight
                   }, function (err, object) {
                       if (err) console.log(err);
                       else {
                           console.log('image added');
                           canvas.add(object);
                           $('#webshotModal').modal('hide');
                       }
                   });
               },
               error: function (xhr, status, error) {
                   console.log(error);
                    util.hideLoader();
               }
           });

       });



       $('.image-uploader').submit(function(evt){
           evt.preventDefault();
           var formdata = new FormData(this);
           util.showLoader();
           $.ajax({
               type: 'POST',
               url: $(this).attr('action'),
               data: formdata,
               cache: false,
               contentType: false,
               processData: false,
               success: function(result){
                   console.log('success',result.filename);
                   var winwidth = $(window).width()/2;
                   var winheight = $(window).height()/2;
                   util.hideLoader();
                   features.createImage({
                       url: "/img/uploads/" + result.filename,
                       left: winwidth,
                       top: winheight
                   }, function (err, object) {
                       if (err) console.log(err);
                       else {
                           console.log('image added');
                           canvas.add(object);
                           $('#imgUploadModal').modal('hide');
                       }
                   });
               },
               error: function(err){
                   console.log('error',err);
                   util.hideLoader();                   
               }
           });
       });





       /**
        * Zoom In and Zoom Out function. This is yet to be created. The below code is just a POC.
        * Do not use this until we create a collaboration system.
        */

       //    ui_undo.click(function (e) {
       //        canvas.setZoom(canvas.getZoom() / fabricSettings.getScale());
       //        canvas.renderAll();
       //    });

       //    ui_expand.click(function (e) {
       //        canvas.setZoom(canvas.getZoom() * fabricSettings.getScale());
       //        canvas.renderAll();
       //    });

       $('.canvas-container').on('mousewheel', function (e) {
           e.preventDefault();
           if (e.originalEvent.wheelDelta > 0) {
               canvas.setZoom(canvas.getZoom() * fabricSettings.getScale());
               canvas.renderAll();
           } else {
               canvas.setZoom(canvas.getZoom() / fabricSettings.getScale());
               canvas.renderAll();
           }
       });




       $(valuelist).on('change', function (evt) {
           if ($(evt.target).is('.objectChanger')) {
               var changedVal = $(evt.target).val();
               var prop = $(evt.target).data('prop');
               var selectedObject = canvas.getActiveObject();
               selectedObject.dirty = true;
               console.log(selectedObject._id);
               console.log(prop, changedVal);
               selectedObject.set(prop, changedVal);
               console.log(prop, changedVal);
               canvas.renderAll();
               selectedObject.setCoords();
               selectedObject.dirty = false;
               canvas.trigger('object:modified', {
                   target: selectedObject
               });
           }

       });









   };