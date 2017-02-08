var animationMap = new AnimationMap('animationMap');
var atomLayer = new AtomLayer('atomLayer', {
    zIndex: 2,
    opacity: 1
});


animationMap.addLayer(atomLayer);


window.onresize = function() {
    animationMap.reSize();
};