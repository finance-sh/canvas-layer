var animationMap = new AnimationMap('animationMap');
var loadingLayer = new LoadingLayer('loadingLayer', {
    zIndex: 2,
    opacity: 1
});


animationMap.addLayer(loadingLayer);



window.onresize = function() {
    animationMap.reSize();
};