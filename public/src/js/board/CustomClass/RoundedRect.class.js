fabric.RoundedRect = fabric.util.createClass(fabric.Rect, {
    type: 'roundedRect',
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('borderRadius', options.borderRadius || 0);
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject', {
            borderRadius: this.get('borderRadius')
        }));
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);
        ctx.lineJoin = 'round';
        console.log(this.get('borderRadius'));
        ctx.lineWidth = this.get('borderRadius');
        ctx.beginPath();
        ctx.moveTo(400, 60);
        ctx.lineTo(440, 140);
        ctx.lineTo(360, 140);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        console.log(ctx);
    }
});