var animationMap = new AnimationMap('animationMap');
var loadingLayer = new LoadingLayer('loadingLayer');


animationMap.addLayer(loadingLayer);



window.onresize = function() {
    animationMap.reSize();
};