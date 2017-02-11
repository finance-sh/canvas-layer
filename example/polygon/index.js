var animationMap = new AnimationMap('animationMap');
var polygonLayer = new COMPolygonLayer('polygonLayer', {
    zIndex: 2,
    opacity: 1,
    datas: {
        polygons: [
            {
                type: '1',
                lineWidth: 1,
                strokeStyle: '#f00',
                lineAlpha: 1,
                points: [{
                    x: 106, y: 1
                }, {
                    x: 155, y: 50
                }, {
                    x: 175, y: 30
                }, {
                    x: 106, y: 1
                }]
            }, {
                type: '1',
                lineWidth: 1,
                strokeStyle: '#000',
                lineAlpha: 1,
                points: [{
                    x: 1, y: 1
                }, {
                    x: 50, y: 50
                }, {
                    x: 70, y: 30
                },{
                    x: 1, y: 1
                }]
            }
        ]
    }
});
animationMap.addLayer(polygonLayer);



window.onresize = function() {
    animationMap.reSize();
};