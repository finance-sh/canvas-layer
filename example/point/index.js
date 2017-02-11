var animationMap = new AnimationMap('animationMap');
var pointLayer = new COMPointLayer('pointLayer', {
    zIndex: 2,
    opacity: 1,
    datas: {
        points: [
            {
                type: '2',
                lineWidth: 2,
                strokeStyle: '#f00',
                lineAlpha: 1,
                fillStyle: '#f00',
                fillAlpha: 0.5,
                radius: 30,
                centerX: 'center',
                centerY: 'center',
            }, {
                type: '3',
                lineWidth: 40,
                strokeStyle: '#000',
                lineAlpha: 1,
                fillStyle: '#f00',
                fillAlpha: 1,
                radius: 20,
                centerX: '.5rem',
                centerY: '.5rem',
            }
        ]
    }
});
animationMap.addLayer(pointLayer);



window.onresize = function() {
    animationMap.reSize();
};