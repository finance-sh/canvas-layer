var animationMap = new AnimationMap('animationMap');
var atomLayer = new AtomLayer('atomLayer', {
    zIndex: 2,
    opacity: 1,
    datas: {
        img_url: './cl.jpg',
        img_width: 349,
        img_height: 511
    }
});


animationMap.addLayer(atomLayer);


window.onresize = function() {
    animationMap.reSize();
};