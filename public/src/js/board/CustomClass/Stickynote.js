fabric.StickyNote = fabric.util.createClass(fabric.Rect, {
    type: 'StickyNote',
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('label', options.label || '');
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx) {
        console.log('renderedlalala');
        this.callSuper('_render', ctx);
        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width / 2+10, -this.height / 2 + 20);
        // var notediv = '<div class="canvas-notes" id="'+this._id+'" style="top: '+(this.top+70)+'px; left: '+this.left+'px;width: '+this.width+'px;height: '+this.height+'px;"></div>';
        // $('body').append(notediv);
    }
});
fabric.StickyNote.async = true;
fabric.StickyNote.fromObject = function (object, callback) {
     callback && callback(new fabric.StickyNote(object)); 
};