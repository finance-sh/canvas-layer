var animationMap = new AnimationMap('animationMap');
var lineLayer = new COMLineLayer('lineLayer', {
    zIndex: 2,
    opacity: 1,
    datas: {
        lines: [
            {
                lineWidth: 2,
                strokeStyle: '#f00',
                lineAlpha: 1,
                points: [{
                    x: 6, y: 1
                }, {
                    x: 55, y: 50
                }, {
                    x: 75, y: 30
                }]
            }, {
                lineWidth: 2,
                strokeStyle: '#000',
                lineAlpha: 1,
                points: [{
                    x: 1, y: 1
                }, {
                    x: 50, y: 50
                }, {
                    x: 70, y: 30
                }]
            }
        ]
    }
});
animationMap.addLayer(lineLayer);



window.onresize = function() {
    animationMap.reSize();
};