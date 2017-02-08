var animationMap = new AnimationMap('animationMap');
var progressLayer = new ProgressLayer('progressLayer', {
    zIndex: 1,
    datas: {
        total_step: 3,
        now_step: 2,
        tips: [
            [{'text': '哈哈1'},{'text': '哈哈11'}],
            [{'text': '哈哈2'}],
            [{'text': '哈哈3'}],
            [{'text': '哈哈4'}]
        ]
    }
});




animationMap.addLayer(progressLayer);




window.onresize = function() {
    animationMap.reSize();
};